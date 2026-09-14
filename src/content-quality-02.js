import {
  isCurrentGrammarId as isHotfix01CurrentGrammarId,
  reclassifiedGrammarIds as hotfix01RetiredGrammarIds
} from './content-quality-01.js';

// These records are useful learner-facing overviews, but each covers multiple
// independent forms and therefore has no single defensible recall answer.
export const overviewOnlyGrammarIds=Object.freeze([
  '35e1c-ja-condition-contrast',
  '35e1c-ja-workplace-register'
]);

export const practiceIneligibleGrammarIds=Object.freeze([
  ...hotfix01RetiredGrammarIds,
  ...overviewOnlyGrammarIds
]);
const overviewOnly=new Set(overviewOnlyGrammarIds);

export const isCurrentGrammarId=isHotfix01CurrentGrammarId;
export const isPracticeEligibleGrammarId=id=>isHotfix01CurrentGrammarId(id)&&!overviewOnly.has(id);

// Current canonical delta. Historical authoring migrations remain immutable.
export const grammarContentCorrections=Object.freeze([
  {
    id:'35e1c-ja-counter-system',
    form_name:'数 + 助数詞',
    formula:'数 + 人／本／枚／個／つ'
  },
  {
    id:'35e1c-ja-condition-contrast',
    title_zh:'条件の「なら・たら・ば・と」比較（概要）',
    form_name:'なら・たら・ば・と（比較概要）',
    formula:'普通形 + なら；た形 + ら；ば形；普通形 + と',
    usage_zh:'非评测比较概览；各条件形式使用独立语法记录进行练习。'
  },
  {
    id:'35e1c-ja-workplace-register',
    title_zh:'職場の敬体・尊敬語・謙譲語（概要）',
    form_name:'敬体・尊敬語・謙譲語（使い分け概要）',
    formula:'です／ます；尊敬語；謙譲語',
    usage_zh:'非评测语域概览；具体形式使用独立语法记录进行练习。'
  }
]);
