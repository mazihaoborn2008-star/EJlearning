import assert from 'node:assert/strict';
import test from 'node:test';
import {safeReturnTarget} from '../public-36/shared.js';

globalThis.location={origin:'https://ej-learning.test'};

test('safe return target preserves app journeys and nested queries',()=>{
 for(const target of ['/lesson.html?id=en-s1-l1&stage=1','/vocabulary-detail.html?id=en-choice&lang=en','/grammar-detail.html?id=ja-copula&lang=ja','/practice.html?source=weakness&type=vocabulary','/progress.html','/?next=%2Flesson.html%3Fid%3Dx'])assert.equal(safeReturnTarget(target),target);
});
test('safe return target rejects redirect and encoding attacks',()=>{
 for(const target of ['https://evil.example/x','//evil.example/x','javascript:alert(1)','%2F%2Fevil.example','/%2F%2Fevil.example','/\\evil.example','/%5Cevil.example','/javascript%3Aalert(1)','/%256Aavascript%253Aalert(1)','/api/me','/auth.html?return=/'])assert.equal(safeReturnTarget(target),'/progress.html',target);
});
