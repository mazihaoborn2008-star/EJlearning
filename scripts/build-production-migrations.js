import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const outputDirectory = path.join(root, 'migrations-production-v2');
const sources = [
  ...Array.from({length: 20}, (_, index) => `migrations-35d/${String(index + 1).padStart(4, '0')}_${[
    'schema', 'seed', 'engine', 'curriculum', 'assessment_refinements', 'v2_domains',
    'v2_representative', 'v2_editorial_guards', 'academic_alignment',
    'academic_expression_example', 'curriculum', 'editorial_refinement',
    'reviewed_speech_link', 'final_editorial_judgments', 'reused_pattern_provenance',
    'request_variants', 'lessons', 'lesson_exam_recommendations', 'distinct_progression',
    'editorial_objectives'
  ][index]}.sql`),
  'migrations-35e1a/0001_core_grammar_curated_examples.sql',
  'migrations-35e1a1/0001_curated_grammar_example_target_roles.sql',
  'migrations-35e1a2/0001_core_vocabulary_curated_usages.sql',
  'migrations-35e1b/0001_core_expressions_multi_turn_dialogues.sql',
  'migrations-35e1c/0001_curriculum_gap_filling_lesson_bundle.sql',
  'migrations-35e1c/0002_lesson_bundle_version.sql',
  'migrations-35e1c/0003_lesson_target_fidelity_corrective.sql',
  'migrations-35e1c/0004_ielts65_vocabulary_discovery_corrective.sql',
  'migrations-35e1c/0005_jlpt_vocabulary_discovery_corrective.sql',
  ...Array.from({length: 27}, (_, index) => `migrations-36/${String(index + 1).padStart(4, '0')}_${[
    'large_vocabulary_schema',
    ...Array.from({length: 25}, (__, chunk) => `vocabulary_chunk_${String(chunk + 1).padStart(2, '0')}`),
    'existing_curated_course_ranks'
  ][index]}.sql`),
  'migrations-staging-schema/0001_curriculum_dataset_versions.sql',
  'migrations-staging-schema/0002_phase4a_email_auth.sql',
  'migrations-staging-schema/0003_phase4b_learner_progress.sql',
  'migrations-staging-schema/0004_phase4c_srs.sql',
  'migrations-staging-schema/0005_phase4e_practice_engine.sql',
  'migrations-staging-schema/0006_phase4f_learner_experience.sql',
  'migrations-content-quality-01/0001_content_quality_hotfix_01.sql',
  'migrations-content-quality-02/0001_content_quality_hotfix_02.sql',
  'migrations-content-quality-03/0001_content_quality_hotfix_03.sql',
  'migrations-curriculum-expansion-01/0001_curriculum_expansion_01a_bundle.sql',
  'migrations-stage5-expansion-02/0001_stage5_expansion_02.sql',
  'migrations-stage5-expansion-02/0002_stage5_lesson_projection.sql',
  'migrations-stage5-expansion-02/0003_stage5_boundary_projection.sql',
  'migrations-stage6-expansion-03/0004_stage6_expansion_03.sql',
  'migrations-stage6-expansion-03/0005_stage6_lesson_projection.sql',
  'migrations-stage6-expansion-03/0006_stage6_prerequisite_reconciliation.sql',
  'migrations-content-quality-04/0001_content_quality_hotfix_04.sql'
];

if (sources.length !== 73) throw Error(`Expected 73 sources, found ${sources.length}`);
fs.mkdirSync(outputDirectory, {recursive: true});

const mappings = sources.map((source, index) => {
  const sourcePath = path.join(root, source);
  if (!fs.existsSync(sourcePath)) throw Error(`Missing audited source: ${source}`);
  const payload = fs.readFileSync(sourcePath);
  const semanticName = path.basename(source).replace(/^\d+_/, '');
  const productionFile = `${String(index + 1).padStart(4, '0')}_${semanticName}`;
  fs.writeFileSync(path.join(outputDirectory, productionFile), payload);
  const copied = fs.readFileSync(path.join(outputDirectory, productionFile));
  if (!payload.equals(copied)) throw Error(`Byte mismatch after copy: ${source}`);
  return {
    sequence: index + 1,
    production_file: productionFile,
    source_file: source.replaceAll('\\', '/'),
    sha256: crypto.createHash('sha256').update(payload).digest('hex'),
    bytes: payload.length
  };
});

const manifest = {
  schema: 'ej-learning-production-migration-manifest-v1',
  database: 'ej-learning-prod-db',
  migration_count: mappings.length,
  payload_policy: 'byte-identical-to-audited-source',
  mappings
};
fs.writeFileSync(path.join(outputDirectory, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({output: path.relative(root, outputDirectory), migrations: mappings.length}));
