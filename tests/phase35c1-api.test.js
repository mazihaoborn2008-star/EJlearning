import test from 'node:test';
import assert from 'node:assert/strict';

const base=process.env.BASE_URL||'http://127.0.0.1:8799';
const get=async path=>{const response=await fetch(base+path);return {response,body:await response.json()};};

test('exam API supports bounded current-domain search and useful filters',async()=>{
 let result=await get('/api/v2/academic/alignments?framework=IELTS&target=6.5&domain=vocabulary&search=evaluate&limit=24');
 assert.equal(result.response.status,200);assert.equal(result.body.data.length,1);assert.equal(result.body.data[0].title,'evaluate');assert.equal(result.body.data[0].meaning_zh,'评估');assert.equal(result.body.data[0].part_of_speech,'verb');
 result=await get('/api/v2/academic/alignments?framework=IELTS&target=6.5&domain=vocabulary&part_of_speech=verb&limit=24');
 assert.equal(result.response.status,200);assert(result.body.data.every(x=>x.domain==='vocabulary'&&x.part_of_speech==='verb'));
 result=await get('/api/v2/academic/alignments?framework=JLPT&target=N3&domain=sentences&unit_type=sentence&limit=24');
 assert.equal(result.response.status,200);assert(result.body.data.length>0);assert(result.body.data.every(x=>x.domain==='sentences'&&x.unit_type==='sentence'));
});

test('exam filters remain strict and pagination stays bounded',async()=>{
 for(const path of [
  '/api/v2/academic/alignments?framework=IELTS&target=6.5&search=test',
  '/api/v2/academic/alignments?framework=IELTS&target=6.5&domain=grammar&part_of_speech=verb',
  '/api/v2/academic/alignments?framework=JLPT&target=N3&domain=sentences&unit_type=invalid',
  '/api/v2/academic/alignments?framework=IELTS&target=6.5&domain=vocabulary&limit=101'
 ])assert.equal((await get(path)).response.status,400,path);
 const result=await get('/api/v2/academic/alignments?framework=IELTS&target=6.5&domain=vocabulary&limit=1&offset=0');
 assert.equal(result.response.status,200);assert.equal(result.body.data.length,1);assert.equal(result.body.pagination.limit,1);assert.equal(typeof result.body.pagination.has_more,'boolean');
});
