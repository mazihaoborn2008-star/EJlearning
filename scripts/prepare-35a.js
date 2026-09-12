// Copy immutable legacy migrations into the isolated migration stream.
import fs from 'node:fs';
for (const name of fs.readdirSync('migrations')) {
  const source = fs.readFileSync('migrations/'+name);
  const target = 'migrations-v2/'+name;
  if (fs.existsSync(target) && !source.equals(fs.readFileSync(target))) throw Error('Legacy migration mismatch: '+name);
  fs.writeFileSync(target, source);
}
