const kana=s=>s.replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60));
// Align author-supplied readings using kana/punctuation anchors; never infer a pronunciation.
export function readingTokens(text,reading){
 const pieces=text.match(/[一-龯々]+|[^一-龯々]+/gu)||[],out=[];let pos=0;
 for(let i=0;i<pieces.length;i++){
  const part=pieces[i];if(/^[一-龯々]/u.test(part)){
   const anchor=pieces[i+1]?kana(pieces[i+1]):null;
   const end=anchor?reading.indexOf(anchor,pos+1):reading.length;
   if(end<=pos)throw Error('Reading alignment failed: '+text+' / '+reading+' / '+part);
   out.push({text:part,reading:reading.slice(pos,end)});pos=end;
  }else{const expected=kana(part);if(reading.slice(pos,pos+expected.length)!==expected)throw Error('Reading mismatch: '+text+' / '+part+' / '+reading.slice(pos));out.push(expected===part?{text:part}:{text:part,reading:expected});pos+=expected.length;}
 }if(pos!==reading.length)throw Error('Trailing reading: '+text);return out;
}
