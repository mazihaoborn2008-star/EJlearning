const encoder=new TextEncoder(),decoder=new TextDecoder();
const TOKEN=/^[A-Za-z0-9_-]{40,4096}$/;
const b64=bytes=>btoa(String.fromCharCode(...bytes)).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'');
const unb64=value=>{const raw=atob(value.replaceAll('-','+').replaceAll('_','/')+'='.repeat((4-value.length%4)%4));return Uint8Array.from(raw,c=>c.charCodeAt(0));};
async function key(secret){if(typeof secret!=='string'||secret.length<32)throw Error('REMEDIATION_SECRET_UNAVAILABLE');const material=await crypto.subtle.digest('SHA-256',encoder.encode(`ej-learning:remediation:v1:${secret}`));return crypto.subtle.importKey('raw',material,{name:'AES-GCM'},false,['encrypt','decrypt']);}
export async function createRemediationToken(context,secret){const iv=crypto.getRandomValues(new Uint8Array(12)),plain=encoder.encode(JSON.stringify({...context,v:1,purpose:'wrong-answer-explanation'})),cipher=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv,additionalData:encoder.encode('remediation-context-v1')},await key(secret),plain)),token=new Uint8Array(iv.length+cipher.length);token.set(iv);token.set(cipher,iv.length);return b64(token);}
export async function openRemediationToken(token,secret){
 if(!TOKEN.test(token||''))throw Error('INVALID_REMEDIATION');
 try{const bytes=unb64(token);if(b64(bytes)!==token)throw Error('INVALID_REMEDIATION');const value=JSON.parse(decoder.decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:bytes.slice(0,12),additionalData:encoder.encode('remediation-context-v1')},await key(secret),bytes.slice(12))));if(value?.v!==1||value?.purpose!=='wrong-answer-explanation')throw Error('INVALID_REMEDIATION');return value;}catch(error){if(error?.message==='REMEDIATION_SECRET_UNAVAILABLE')throw error;throw Error('INVALID_REMEDIATION');}
}
