import fs from 'node:fs';
import path from 'node:path';
import {DatabaseSync} from 'node:sqlite';
import {loadConfig, loadPolicy} from './staging-db-policy.js';

const policy = loadPolicy();
const db = new DatabaseSync(':memory:');
const migrations = [];

for (const configFile of policy.bootstrap_migration_configs) {
  const config = loadConfig(path.resolve(configFile));
  const directory = config.d1_databases.find(binding => binding.binding === policy.database.binding)?.migrations_dir;
  if (!directory) throw Error(`${configFile} has no ${policy.database.binding} migration directory`);
  for (const file of fs.readdirSync(path.resolve(directory)).filter(name => name.endsWith('.sql')).sort()) {
    const before = Number(db.prepare('SELECT total_changes() AS n').get().n);
    const sql = fs.readFileSync(path.resolve(directory, file), 'utf8');
    db.exec(sql);
    const after = Number(db.prepare('SELECT total_changes() AS n').get().n);
    migrations.push({config: configFile, migration: `${directory}/${file}`, logical_row_changes: after - before});
  }
}

const counts = db.prepare(`SELECT
  (SELECT COUNT(*) FROM v2_vocabulary_items WHERE language='en' AND publication_state='published') AS en_vocabulary,
  (SELECT COUNT(*) FROM v2_vocabulary_items WHERE language='ja' AND publication_state='published') AS ja_vocabulary,
  (SELECT COUNT(*) FROM v2_grammar_points WHERE language='en' AND publication_state='published') AS en_grammar,
  (SELECT COUNT(*) FROM v2_grammar_points WHERE language='ja' AND publication_state='published') AS ja_grammar,
  (SELECT COUNT(*) FROM lesson_units WHERE status='published') AS lessons`).get();
const logicalRowChanges = migrations.reduce((sum, migration) => sum + migration.logical_row_changes, 0);

console.log(JSON.stringify({
  method: 'SQLite total_changes() across the exact Phase 3.6 bootstrap SQL chain; excludes Wrangler migration-ledger writes and D1 internal/index accounting',
  migration_files: migrations.length,
  logical_row_changes: logicalRowChanges,
  counts,
  by_config: Object.values(migrations.reduce((groups, migration) => {
    const group = groups[migration.config] ||= {config: migration.config, migration_files: 0, logical_row_changes: 0};
    group.migration_files += 1;
    group.logical_row_changes += migration.logical_row_changes;
    return groups;
  }, {}))
}, (_key, value) => value === undefined ? undefined : value, 2));

db.close();
