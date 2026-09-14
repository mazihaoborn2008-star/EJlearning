import {$,esc,shell,safeReturnTarget} from './shared.js';

shell('auth');
const main=$('#main');
const returnTarget=safeReturnTarget(new URLSearchParams(location.search).get('return'));
let email='';
let countdownTimer;

const mask=value=>{const [local,domain]=value.split('@');return `${local.slice(0,1)}${local.length>1?'***':''}@${domain}`;};
const request=async(path,options={})=>{
 const response=await fetch(path,{credentials:'same-origin',...options,headers:{Accept:'application/json',...(options.body?{'Content-Type':'application/json'}:{}),...options.headers}});
 const body=await response.json().catch(()=>({error:{message:'登录服务暂时不可用。'}}));
 if(!response.ok){const failure=Error(body.error?.message||'登录服务暂时不可用。');failure.code=body.error?.code;throw failure;}
 return body;
};

function status(message,kind=''){
 const node=$('#auth-status');if(!node)return;node.textContent=message;node.className=`auth-status ${kind}`;
}

function startCountdown(seconds=60){
 clearInterval(countdownTimer);const button=$('#resend');let left=seconds;
 const paint=()=>{button.disabled=left>0;button.textContent=left>0?`${left} 秒后重新发送`:'重新发送验证码';};paint();
 countdownTimer=setInterval(()=>{left-=1;paint();if(left<=0)clearInterval(countdownTimer);},1000);
}

function renderEmail(){
 main.innerHTML=`<section class="auth-layout"><div class="auth-intro"><div class="eyebrow">Your learning, remembered</div><h1>登录言间</h1><p>用邮箱验证码登录，无需设置密码。不登录也可以继续浏览所有学习内容。</p></div><section class="card auth-card" aria-labelledby="auth-title"><div class="auth-step">第 1 步，共 2 步</div><h2 id="auth-title">输入邮箱</h2><form id="email-form" novalidate><label for="email">邮箱地址</label><input id="email" name="email" type="email" inputmode="email" autocomplete="email" maxlength="254" required placeholder="name@example.com"><button class="primary" type="submit">发送验证码</button><p id="auth-status" class="auth-status" role="status" aria-live="polite"></p></form><p class="auth-note">我们只会用这个邮箱确认你的身份。</p></section></section>`;
 const form=$('#email-form');form.addEventListener('submit',async event=>{event.preventDefault();const button=$('button[type=submit]',form);email=$('#email').value.trim();button.disabled=true;button.textContent='正在发送…';status('');try{const result=await request('/api/auth/email/send-code',{method:'POST',body:JSON.stringify({email})});renderCode(result.resend_after||60);}catch(failure){status(failure.message,'error');button.disabled=false;button.textContent='发送验证码';}});
 $('#email').focus();
}

function renderCode(resendAfter){
 main.innerHTML=`<section class="auth-layout"><div class="auth-intro"><div class="eyebrow">Check your inbox</div><h1>输入验证码</h1><p>验证码有效期为 10 分钟，请勿转发给他人。</p></div><section class="card auth-card" aria-labelledby="auth-title"><div class="auth-step">第 2 步，共 2 步</div><h2 id="auth-title">查看邮箱</h2><p>已向 <strong>${esc(mask(email))}</strong> 发送验证码。</p><form id="code-form" novalidate><label for="code">6 位验证码</label><input id="code" name="code" class="otp-input" type="text" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}" maxlength="6" required aria-describedby="auth-status"><button class="primary" type="submit">登录</button><p id="auth-status" class="auth-status" role="status" aria-live="polite"></p></form><div class="auth-actions"><button id="resend" type="button">重新发送验证码</button><button id="change-email" class="text-button" type="button">更换邮箱</button></div></section></section>`;
 startCountdown(resendAfter);
 $('#change-email').onclick=()=>{clearInterval(countdownTimer);renderEmail();$('#email').value=email;};
 $('#resend').onclick=async()=>{const button=$('#resend');button.disabled=true;status('正在重新发送…');try{const result=await request('/api/auth/email/send-code',{method:'POST',body:JSON.stringify({email})});status('新的验证码已发送。','success');startCountdown(result.resend_after||60);}catch(failure){status(failure.message,'error');if(failure.code==='RESEND_COOLDOWN')startCountdown(60);else button.disabled=false;}};
 $('#code-form').addEventListener('submit',async event=>{event.preventDefault();const form=event.currentTarget,button=$('button[type=submit]',form),code=$('#code').value.trim();if(!/^\d{6}$/.test(code)){status('请输入 6 位数字验证码。','error');return;}button.disabled=true;button.textContent='正在登录…';status('');try{await request('/api/auth/email/verify',{method:'POST',body:JSON.stringify({email,code})});status('登录成功，正在返回刚才的页面…','success');location.assign(returnTarget);}catch(failure){status(failure.message,'error');button.disabled=false;button.textContent='登录';$('#code').select();}});
 $('#code').focus();
}

function renderAccount(user){
 main.innerHTML=`<section class="auth-layout"><div class="auth-intro"><div class="eyebrow">Welcome back</div><h1>你已登录</h1><p>当前账户已经安全连接到这台设备。</p></div><section class="card auth-card"><h2>账户</h2><dl class="account-summary"><dt>邮箱</dt><dd>${esc(user.email)}</dd></dl><div class="auth-actions"><a class="button primary" href="${esc(returnTarget)}">继续刚才的学习</a><button id="logout" type="button">退出登录</button></div><p id="auth-status" class="auth-status" role="status" aria-live="polite"></p></section></section>`;
 $('#logout').onclick=async()=>{const button=$('#logout');button.disabled=true;status('正在退出…');try{await request('/api/auth/logout',{method:'POST'});location.reload();}catch(failure){status(failure.message,'error');button.disabled=false;}};
}

request('/api/me').then(state=>state.authenticated?renderAccount(state.user):renderEmail()).catch(renderEmail);
