import fs from 'node:fs';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {createHash} from 'node:crypto';
const read=p=>JSON.parse(fs.readFileSync(p)),audit=read('docs/phase35c/audit-staging.json'),release=read('docs/phase35c/release-verification.json');assert(audit.passed&&release.passed);
assert.equal(audit.migrations.length,fs.readdirSync('migrations-35c').length,'Remote audit must cover final migrations');
const db=new DatabaseSync(':memory:');for(const f of fs.readdirSync('migrations-35c').sort())db.exec(fs.readFileSync('migrations-35c/'+f,'utf8'));
const c=audit.counts,table=(headers,rows)=>'| '+headers.join(' | ')+' |\n| '+headers.map(()=>'---').join(' | ')+' |\n'+rows.map(r=>'| '+r.join(' | ')+' |').join('\n');
const stages=kind=>table(['语言','1','2','3','4','5','6','合计'],['en','ja'].map(lang=>{const counts=Array.from({length:6},(_,i)=>c[kind][lang+'/'+(i+1)]||0);return [lang==='en'?'English':'日本語',...counts,counts.reduce((a,b)=>a+b,0)];}));
const topics=new Map(db.prepare('SELECT * FROM v2_topics').all().map(t=>[t.id,t.name_zh]));
const content={};for(const {name} of db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE 'v2_%'").all())content[name]=db.prepare('SELECT * FROM '+name+' ORDER BY rowid').all();fs.writeFileSync('docs/phase35c/curriculum-final.json',JSON.stringify(content,null,2));
const review={reviewer:'model_assisted',independentProfessionalCertification:false,policy:'editorial-policy.md',reviewPasses:['Chinese semantic anchor and independent language destination','Concrete patterns and source preservation','Lexical sense/POS and natural usage distinctions','Explicit independent difficulty judgments','Actual lexical forms, grammar variants, dialogue turn ownership','Reading reconstruction, publication, exam provenance and coverage'],records:[]};
for(const name of ['vocabulary_items','vocabulary_senses','vocabulary_examples','grammar_points','grammar_examples','sentence_units','sentence_expressions'])for(const row of content['v2_'+name])review.records.push({domain:name,id:row.id,sha256:createHash('sha256').update(JSON.stringify(row)).digest('hex'),reviewStatus:'model_assisted_review',certified:false});
review.remainingFindings=audit.warnings.map(w=>({...w,disposition:w.code==='orphan_vocabulary'?'保留：有词条内例句或搭配；暂未进入完整Sentence知识图谱。':w.code==='optional_sentence_ipa'?'保留：句子IPA为可选；英文词汇IPA完整。':'已复核为独立短词或分钟量词；单字风险检测继续保留，不能等同于自动分词。'}));
fs.writeFileSync('docs/phase35c/editorial-review.json',JSON.stringify(review,null,2));
const report=`# Phase 3.5C 完成报告

已将 Phase 3.5B Product UI V2 扩展为可浏览的双语分阶段课程，并在新的隔离环境完成验证。

**Staging:** [ej-learning-35c](https://ej-learning-35c.yanjian-language-learning.workers.dev)  
**D1:** ej-learning-35c-db / c854a0e6-d576-4254-b4b6-449fc7517437

## 迁移与内容规模

- 183 / 183 个 legacy Concept 已完成编辑迁移；原始表与源迁移保留，逐表比对一致。
- 51 个原待审映射均已有语义优先的编辑决定；未解决项 **0**。
- ${c.crosswalk} 条多对多来源映射保留 Concept、语言表达 ID、主映射/提取/例句角色；原始 JSON 和 SHA-256 可追溯。
- 695 个词汇条目（英语 345、日语 350），155 个语法点（英语 73、日语 82）。日语略高于约 50–80 的目标，保留了迁移必需的普通体及礼貌表达区别。
- 265 个语义单元、459 个语言表达；${c.vocabularyLinks} 条词汇链接、${c.grammarLinks} 条语法链接。对话链接注明实际轮次。

## Vocabulary Stage 分布

${stages('vocabulary')}

## Grammar Level 分布

${stages('grammar')}

## Sentence / Expression 分布

${table(['类型','语义单元'],Object.entries(c.sentencesByType))}

${table(['生活主题','语义单元'],Object.entries(c.sentencesByTopic).map(([id,n])=>[topics.get(id),n]))}

body 与 health 是保留的代表样本主题和迁移主题，名称相同但来源不同。没有删除原主题。

表达的综合难度分布如下；词汇 / 语法 / 综合的完整组合见 [远程课程审计](audit-staging.json) 的 independentDifficulty 字段。三个维度分别编辑，不取最大值、平均值或 legacy 单级换算。

${table(['语言','1','2','3','4','5','6'],['en','ja'].map(lang=>[lang,...Array.from({length:6},(_,i)=>c.difficulty[lang+'/'+(i+1)]||0)]))}

## 学术 / 考试参考

${table(['框架 / 目标 / 状态','条数'],Object.entries(c.alignments))}

共 76 条对齐，全部 **draft / 待独立审校**。十个目标均有词汇、语法和表达参考。内部 Stage/Level 与目标维度分离；没有官方完整词表、直接等级等价或成绩保证。

[IELTS 官方说明](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-speaking)按词汇和语法的范围、准确性与使用能力评价表达；[JLPT 官方 FAQ](https://www.jlpt.jp/e/faq/index.html)说明不公布完整词汇、汉字和语法项目清单。这些来源说明分类边界，**不为本课程逐项分数组归属背书**。

## 主要编辑决定

- thirsty 为英语形容词，喉が渇く为日语状态表达；分别保留自然例句，不要求词性或结构对称。
- 英语 plan 分为名词与动词；动词保留 plan to / plan on。日语予定独立建项。rain、work也区分实际出现的名词/动词义。
- feedback 与日语意見限定为改进反馈；気遣い用名词教学，并另连实际句中的気遣う。描述性短语可保留，但不伪称对应的单词。
- appointment/予約、时间 buffer/余裕、任务过多的 overwhelmed、愉快期待 look forward to 均限定语义范围。
- 样态そう与传闻そう独立；源项 104 复用自然样态句且补全语法来源映射。
- 源项 180 保留工作打断参加的语境，区分 would have 的未实现结果和つもりでした的过去意图。
- 源项 170 补全ので后的请求。16 个礼貌回应按原映射作为情境，保留上下文。
- 全部 pattern 使用完成的具体例句；英文愿望动词变体和省略请求均说明语气与适用条件。

## QA 结果与保留项

最终课程审计 **0 错误**：无缺失词汇 IPA/日语读音、未注音汉字、振假名重建错误、无效外键/跨语言关系、缺失关键句子链接、未解决源项或空 Stage/Level。重复词头/义项及重复表达检测未发现未处理重复。故障注入测试证明这些检查能发现坏数据，而不只是对当前样本返回通过。

保留并明确报告：

- 336 个词汇条目已有词条内例句或搭配，但尚未链接完整 Sentence。当前知识图谱不是全量覆盖；所有已发布表达都有关键词汇与语法链接，语法点均有真实反向例句。
- 102 个表达没有可选句子 IPA；所有英文词汇条目均有 IPA。
- 35 个单字日语链接触发短片段警告。已按上下文核对为独立词或分钟量词；复合词内部的错误子串链接已移除，检测仍保持启用。
- 全部考试对齐仍为待审，未将模型生成内容标作 verified。

这是一轮**模型辅助编辑审查，不是独立专业语言学认证**。逐项内容哈希与审查范围见 [editorial-review.json](editorial-review.json)，来源决定见 [editorial-decisions.json](editorial-decisions.json)。

## 验证与边界

- 从空 D1 应用全部 16 个迁移；本地与新 staging 的课程/legacy 表均与干净迁移重放逐表一致，外键检查通过。
- 本地 42 项 API、V2、legacy、引擎及数据库测试全部通过；staging 24 项 API/内容回归全部通过。
- 360 / 390 / 430 / 1440：双语六阶段库、Sentence 场景与对话、跨域往返、考试目标、空搜索状态、触摸、键盘、读音和无横向溢出检查通过。
- 旧版浏览器回归验证定位、推荐、checkpoint、独立语言掌握度、重试与存储失效；V2 不写入或转移学习状态。
- 私有源码、迁移、配置、审计与秘密路径均不可由公开 assets 访问。
- [环境比对](release-verification.json)确认生产和已有 Phase 3 / 3.5A / 3.5B staging 的部署、设置、schema、迁移与内容哈希一致；85 个受保护本地文件未改变。仅排除旧环境自身可能清理的临时 assessment sessions。
- UI 沿用 3.5B，仅隔离副本的课程范围文字与词性筛选标签适配扩展内容。Worker、API、learner engine、placement、recommendations、mastery、checkpoint、localStorage 模型和 AI Preview 均未改造。
- 未开始 Phase 3.5D 或 Phase 4。

运行命令和隔离发布约束见 [runbook.md](runbook.md)。
`;
fs.writeFileSync('docs/phase35c/completion.md',report);console.log('Completion report and complete structured model-review ledger written.');
