export {
  controlledCompletionAnswer,
  controlledCompletionForms,
  grammarContentCorrections,
  isCurrentGrammarId,
  isPracticeEligibleGrammarId,
  overviewOnlyGrammarIds,
  practiceIneligibleGrammarIds
} from './content-quality-03.js';

export const enWouldLikeContentCorrection=Object.freeze({
  id:'en-would-like',
  title_zh:'would like / would love / would prefer：礼貌愿望、邀请与偏好（对比）',
  form_name:'would like / would love / would prefer（对比）',
  formula:'would like + noun / to + V / person + to + V; would love + to + V; would prefer + noun / to + V',
  core_zh:'对比三个不等同的 would 结构：would like 表达礼貌愿望、提议或邀请；would love (to) 表达热切意愿或愿望；would prefer 表达相对于其他选择的偏好。',
  purpose_zh:'辨认 would like、would love (to) 与 would prefer 的不同交际功能，不把三者当作同义替换。',
  when_zh:'礼貌表达愿望、提议或邀请时用 would like；热切回应或表达强烈愿望时用 would love (to)；比较选择或表达相对偏好时用 would prefer。',
  mistakes_zh:'三者不能自由互换；to 后用动词原形。would rather 不接 to，不要与 would prefer 混同。',
  nuance_zh:'would like 通常较礼貌中性；would love (to) 语气更热切；would prefer 通常明示或暗含备选项。',
  usage_zh:'本记录是封闭选择的对比概览，只用于辨认 grouped contrast label；不用于输入式回忆或句子填空。'
});

const allowedExerciseTypes=Object.freeze(['grammar_form_selection']);

export const grammarPracticeAuthorities=Object.freeze({
  'en-would-like':Object.freeze({
    allowed_exercise_types:allowedExerciseTypes,
    controlled_completion:'NOT FOR CC',
    legacy_cc_fallback:false,
    typed_recall:false,
    tokenless_grading:false
  })
});

export const grammarPracticeAuthority=id=>grammarPracticeAuthorities[id]||null;

export function isGrammarExerciseTypeAllowed(id,exerciseType){
  const authority=grammarPracticeAuthority(id);
  return !authority||authority.allowed_exercise_types.includes(exerciseType);
}

export function materializeGrammarExerciseTypes(id,requested,{directExplicitRecall=false}={}){
  const authority=grammarPracticeAuthority(id);
  if(!authority)return requested;
  if(directExplicitRecall)return [];
  return [...authority.allowed_exercise_types];
}

export function isTokenlessGrammarGradingAllowed(id){
  return grammarPracticeAuthority(id)?.tokenless_grading!==false;
}
