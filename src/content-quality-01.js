// Reviewed content policy for Content Quality Hotfix 01.
// These IDs are pragmatic expression categories, not grammatical forms.
export const reclassifiedGrammarIds=Object.freeze(['en-greeting','ja-greeting']);
const reclassified=new Set(reclassifiedGrammarIds);

export const isCurrentGrammarId=id=>!reclassified.has(id);

// Canonical learner-facing corrections. Historical migrations remain immutable;
// migrations-content-quality-01 applies this reviewed delta to current content.
export const grammarContentCorrections=Object.freeze([
 {id:'ja-polite-negative',formula:'Vます → Vません'},
 {id:'ja-polite-past',formula:'Vます → Vました'},
 {id:'ja-copula',formula:'名词 / な形容词 + です'},
 {id:'ja-sou',formula:'Vます → Vそうだ'},
 {id:'ja-tai',form_name:'Vます → Vたい',formula:'Vます → Vたい'},
 {id:'ja-mashou',form_name:'Vます → Vましょう',formula:'Vます → Vましょう'},
 {id:'ja-masen-ka',form_name:'Vます → Vませんか',formula:'Vます → Vませんか',core_zh:'把动词ます形中的「ます」替换为「ませんか」，用于礼貌地邀请对方。',purpose_zh:'礼貌地邀请对方一起做某事。'},
 {id:'ja-hajimeru',form_name:'Vます → V始める',formula:'Vます → V始める'},
 {id:'ja-hearsay-sou',when_zh:'转述所得信息；动词辞书形接「そうだ」，不使用去掉「ます」后的形式。',mistakes_zh:'不要把传闻的「普通形 + そうだ」与样态的「Vます → Vそうだ」混淆。',nuance_zh:'这里转述听到的信息，不是根据眼前迹象作判断。'},
 {id:'ja-zaru-wo-enai',form_name:'Vない（去掉「ない」）+ ざるを得ない',formula:'Vない（去掉「ない」）+ ざるを得ない'},
 {id:'ja-kanenai',form_name:'Vます → Vかねない',formula:'Vます → Vかねない'},
 {id:'ja-polite-present',form_name:'Vます',formula:'动词ます形（如「行きます」）'},
 {id:'ja-honorific-request',form_name:'お + Vます（去掉「ます」）+ ください',formula:'お + Vます（去掉「ます」）+ ください'}
]);
