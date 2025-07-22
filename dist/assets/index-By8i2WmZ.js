(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();/**
* @vue/shared v3.5.17
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function po(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const Qe={},Xi=[],un=()=>{},Xf=()=>!1,Is=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),mo=t=>t.startsWith("onUpdate:"),Mt=Object.assign,go=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},jf=Object.prototype.hasOwnProperty,Ye=(t,e)=>jf.call(t,e),Fe=Array.isArray,xr=t=>Us(t)==="[object Map]",qf=t=>Us(t)==="[object Set]",Be=t=>typeof t=="function",ht=t=>typeof t=="string",rr=t=>typeof t=="symbol",rt=t=>t!==null&&typeof t=="object",qc=t=>(rt(t)||Be(t))&&Be(t.then)&&Be(t.catch),Yf=Object.prototype.toString,Us=t=>Yf.call(t),Kf=t=>Us(t).slice(8,-1),$f=t=>Us(t)==="[object Object]",_o=t=>ht(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Mr=po(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Ds=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},Zf=/-(\w)/g,jn=Ds(t=>t.replace(Zf,(e,n)=>n?n.toUpperCase():"")),Jf=/\B([A-Z])/g,vi=Ds(t=>t.replace(Jf,"-$1").toLowerCase()),Yc=Ds(t=>t.charAt(0).toUpperCase()+t.slice(1)),Qs=Ds(t=>t?`on${Yc(t)}`:""),Gn=(t,e)=>!Object.is(t,e),ea=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},Xa=(t,e,n,i=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:i,value:n})},Qf=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let jo;const Ns=()=>jo||(jo=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function vo(t){if(Fe(t)){const e={};for(let n=0;n<t.length;n++){const i=t[n],r=ht(i)?ih(i):vo(i);if(r)for(const s in r)e[s]=r[s]}return e}else if(ht(t)||rt(t))return t}const eh=/;(?![^(]*\))/g,th=/:([^]+)/,nh=/\/\*[^]*?\*\//g;function ih(t){const e={};return t.replace(nh,"").split(eh).forEach(n=>{if(n){const i=n.split(th);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function xo(t){let e="";if(ht(t))e=t;else if(Fe(t))for(let n=0;n<t.length;n++){const i=xo(t[n]);i&&(e+=i+" ")}else if(rt(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const rh="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",sh=po(rh);function Kc(t){return!!t||t===""}/**
* @vue/reactivity v3.5.17
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Lt;class ah{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=Lt,!e&&Lt&&(this.index=(Lt.scopes||(Lt.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=Lt;try{return Lt=this,e()}finally{Lt=n}}}on(){++this._on===1&&(this.prevScope=Lt,Lt=this)}off(){this._on>0&&--this._on===0&&(Lt=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,i;for(n=0,i=this.effects.length;n<i;n++)this.effects[n].stop();for(this.effects.length=0,n=0,i=this.cleanups.length;n<i;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,i=this.scopes.length;n<i;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function oh(){return Lt}let Je;const ta=new WeakSet;class $c{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Lt&&Lt.active&&Lt.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,ta.has(this)&&(ta.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Jc(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,qo(this),Qc(this);const e=Je,n=en;Je=this,en=!0;try{return this.fn()}finally{eu(this),Je=e,en=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)yo(e);this.deps=this.depsTail=void 0,qo(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?ta.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){ja(this)&&this.run()}get dirty(){return ja(this)}}let Zc=0,Sr,yr;function Jc(t,e=!1){if(t.flags|=8,e){t.next=yr,yr=t;return}t.next=Sr,Sr=t}function Mo(){Zc++}function So(){if(--Zc>0)return;if(yr){let e=yr;for(yr=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;Sr;){let e=Sr;for(Sr=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){t||(t=i)}e=n}}if(t)throw t}function Qc(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function eu(t){let e,n=t.depsTail,i=n;for(;i;){const r=i.prevDep;i.version===-1?(i===n&&(n=r),yo(i),lh(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=r}t.deps=e,t.depsTail=n}function ja(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(tu(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function tu(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===Pr)||(t.globalVersion=Pr,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!ja(t))))return;t.flags|=2;const e=t.dep,n=Je,i=en;Je=t,en=!0;try{Qc(t);const r=t.fn(t._value);(e.version===0||Gn(r,t._value))&&(t.flags|=128,t._value=r,e.version++)}catch(r){throw e.version++,r}finally{Je=n,en=i,eu(t),t.flags&=-3}}function yo(t,e=!1){const{dep:n,prevSub:i,nextSub:r}=t;if(i&&(i.nextSub=r,t.prevSub=void 0),r&&(r.prevSub=i,t.nextSub=void 0),n.subs===t&&(n.subs=i,!i&&n.computed)){n.computed.flags&=-5;for(let s=n.computed.deps;s;s=s.nextDep)yo(s,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function lh(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let en=!0;const nu=[];function Rn(){nu.push(en),en=!1}function Cn(){const t=nu.pop();en=t===void 0?!0:t}function qo(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=Je;Je=void 0;try{e()}finally{Je=n}}}let Pr=0;class ch{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Eo{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Je||!en||Je===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Je)n=this.activeLink=new ch(Je,this),Je.deps?(n.prevDep=Je.depsTail,Je.depsTail.nextDep=n,Je.depsTail=n):Je.deps=Je.depsTail=n,iu(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const i=n.nextDep;i.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=i),n.prevDep=Je.depsTail,n.nextDep=void 0,Je.depsTail.nextDep=n,Je.depsTail=n,Je.deps===n&&(Je.deps=i)}return n}trigger(e){this.version++,Pr++,this.notify(e)}notify(e){Mo();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{So()}}}function iu(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)iu(i)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const qa=new WeakMap,li=Symbol(""),Ya=Symbol(""),Lr=Symbol("");function gt(t,e,n){if(en&&Je){let i=qa.get(t);i||qa.set(t,i=new Map);let r=i.get(n);r||(i.set(n,r=new Eo),r.map=i,r.key=n),r.track()}}function Tn(t,e,n,i,r,s){const a=qa.get(t);if(!a){Pr++;return}const o=l=>{l&&l.trigger()};if(Mo(),e==="clear")a.forEach(o);else{const l=Fe(t),c=l&&_o(n);if(l&&n==="length"){const u=Number(i);a.forEach((h,f)=>{(f==="length"||f===Lr||!rr(f)&&f>=u)&&o(h)})}else switch((n!==void 0||a.has(void 0))&&o(a.get(n)),c&&o(a.get(Lr)),e){case"add":l?c&&o(a.get("length")):(o(a.get(li)),xr(t)&&o(a.get(Ya)));break;case"delete":l||(o(a.get(li)),xr(t)&&o(a.get(Ya)));break;case"set":xr(t)&&o(a.get(li));break}}So()}function Mi(t){const e=qe(t);return e===t?e:(gt(e,"iterate",Lr),tn(t)?e:e.map(At))}function bo(t){return gt(t=qe(t),"iterate",Lr),t}const uh={__proto__:null,[Symbol.iterator](){return na(this,Symbol.iterator,At)},concat(...t){return Mi(this).concat(...t.map(e=>Fe(e)?Mi(e):e))},entries(){return na(this,"entries",t=>(t[1]=At(t[1]),t))},every(t,e){return mn(this,"every",t,e,void 0,arguments)},filter(t,e){return mn(this,"filter",t,e,n=>n.map(At),arguments)},find(t,e){return mn(this,"find",t,e,At,arguments)},findIndex(t,e){return mn(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return mn(this,"findLast",t,e,At,arguments)},findLastIndex(t,e){return mn(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return mn(this,"forEach",t,e,void 0,arguments)},includes(...t){return ia(this,"includes",t)},indexOf(...t){return ia(this,"indexOf",t)},join(t){return Mi(this).join(t)},lastIndexOf(...t){return ia(this,"lastIndexOf",t)},map(t,e){return mn(this,"map",t,e,void 0,arguments)},pop(){return lr(this,"pop")},push(...t){return lr(this,"push",t)},reduce(t,...e){return Yo(this,"reduce",t,e)},reduceRight(t,...e){return Yo(this,"reduceRight",t,e)},shift(){return lr(this,"shift")},some(t,e){return mn(this,"some",t,e,void 0,arguments)},splice(...t){return lr(this,"splice",t)},toReversed(){return Mi(this).toReversed()},toSorted(t){return Mi(this).toSorted(t)},toSpliced(...t){return Mi(this).toSpliced(...t)},unshift(...t){return lr(this,"unshift",t)},values(){return na(this,"values",At)}};function na(t,e,n){const i=bo(t),r=i[e]();return i!==t&&!tn(t)&&(r._next=r.next,r.next=()=>{const s=r._next();return s.value&&(s.value=n(s.value)),s}),r}const fh=Array.prototype;function mn(t,e,n,i,r,s){const a=bo(t),o=a!==t&&!tn(t),l=a[e];if(l!==fh[e]){const h=l.apply(t,s);return o?At(h):h}let c=n;a!==t&&(o?c=function(h,f){return n.call(this,At(h),f,t)}:n.length>2&&(c=function(h,f){return n.call(this,h,f,t)}));const u=l.call(a,c,i);return o&&r?r(u):u}function Yo(t,e,n,i){const r=bo(t);let s=n;return r!==t&&(tn(t)?n.length>3&&(s=function(a,o,l){return n.call(this,a,o,l,t)}):s=function(a,o,l){return n.call(this,a,At(o),l,t)}),r[e](s,...i)}function ia(t,e,n){const i=qe(t);gt(i,"iterate",Lr);const r=i[e](...n);return(r===-1||r===!1)&&Ro(n[0])?(n[0]=qe(n[0]),i[e](...n)):r}function lr(t,e,n=[]){Rn(),Mo();const i=qe(t)[e].apply(t,n);return So(),Cn(),i}const hh=po("__proto__,__v_isRef,__isVue"),ru=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(rr));function dh(t){rr(t)||(t=String(t));const e=qe(this);return gt(e,"has",t),e.hasOwnProperty(t)}class su{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,i){if(n==="__v_skip")return e.__v_skip;const r=this._isReadonly,s=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return s;if(n==="__v_raw")return i===(r?s?Eh:cu:s?lu:ou).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const a=Fe(e);if(!r){let l;if(a&&(l=uh[n]))return l;if(n==="hasOwnProperty")return dh}const o=Reflect.get(e,n,vt(e)?e:i);return(rr(n)?ru.has(n):hh(n))||(r||gt(e,"get",n),s)?o:vt(o)?a&&_o(n)?o:o.value:rt(o)?r?uu(o):Ao(o):o}}class au extends su{constructor(e=!1){super(!1,e)}set(e,n,i,r){let s=e[n];if(!this._isShallow){const l=hi(s);if(!tn(i)&&!hi(i)&&(s=qe(s),i=qe(i)),!Fe(e)&&vt(s)&&!vt(i))return l?!1:(s.value=i,!0)}const a=Fe(e)&&_o(n)?Number(n)<e.length:Ye(e,n),o=Reflect.set(e,n,i,vt(e)?e:r);return e===qe(r)&&(a?Gn(i,s)&&Tn(e,"set",n,i):Tn(e,"add",n,i)),o}deleteProperty(e,n){const i=Ye(e,n);e[n];const r=Reflect.deleteProperty(e,n);return r&&i&&Tn(e,"delete",n,void 0),r}has(e,n){const i=Reflect.has(e,n);return(!rr(n)||!ru.has(n))&&gt(e,"has",n),i}ownKeys(e){return gt(e,"iterate",Fe(e)?"length":li),Reflect.ownKeys(e)}}class ph extends su{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const mh=new au,gh=new ph,_h=new au(!0);const Ka=t=>t,Wr=t=>Reflect.getPrototypeOf(t);function vh(t,e,n){return function(...i){const r=this.__v_raw,s=qe(r),a=xr(s),o=t==="entries"||t===Symbol.iterator&&a,l=t==="keys"&&a,c=r[t](...i),u=n?Ka:e?$a:At;return!e&&gt(s,"iterate",l?Ya:li),{next(){const{value:h,done:f}=c.next();return f?{value:h,done:f}:{value:o?[u(h[0]),u(h[1])]:u(h),done:f}},[Symbol.iterator](){return this}}}}function Xr(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function xh(t,e){const n={get(r){const s=this.__v_raw,a=qe(s),o=qe(r);t||(Gn(r,o)&&gt(a,"get",r),gt(a,"get",o));const{has:l}=Wr(a),c=e?Ka:t?$a:At;if(l.call(a,r))return c(s.get(r));if(l.call(a,o))return c(s.get(o));s!==a&&s.get(r)},get size(){const r=this.__v_raw;return!t&&gt(qe(r),"iterate",li),Reflect.get(r,"size",r)},has(r){const s=this.__v_raw,a=qe(s),o=qe(r);return t||(Gn(r,o)&&gt(a,"has",r),gt(a,"has",o)),r===o?s.has(r):s.has(r)||s.has(o)},forEach(r,s){const a=this,o=a.__v_raw,l=qe(o),c=e?Ka:t?$a:At;return!t&&gt(l,"iterate",li),o.forEach((u,h)=>r.call(s,c(u),c(h),a))}};return Mt(n,t?{add:Xr("add"),set:Xr("set"),delete:Xr("delete"),clear:Xr("clear")}:{add(r){!e&&!tn(r)&&!hi(r)&&(r=qe(r));const s=qe(this);return Wr(s).has.call(s,r)||(s.add(r),Tn(s,"add",r,r)),this},set(r,s){!e&&!tn(s)&&!hi(s)&&(s=qe(s));const a=qe(this),{has:o,get:l}=Wr(a);let c=o.call(a,r);c||(r=qe(r),c=o.call(a,r));const u=l.call(a,r);return a.set(r,s),c?Gn(s,u)&&Tn(a,"set",r,s):Tn(a,"add",r,s),this},delete(r){const s=qe(this),{has:a,get:o}=Wr(s);let l=a.call(s,r);l||(r=qe(r),l=a.call(s,r)),o&&o.call(s,r);const c=s.delete(r);return l&&Tn(s,"delete",r,void 0),c},clear(){const r=qe(this),s=r.size!==0,a=r.clear();return s&&Tn(r,"clear",void 0,void 0),a}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=vh(r,t,e)}),n}function To(t,e){const n=xh(t,e);return(i,r,s)=>r==="__v_isReactive"?!t:r==="__v_isReadonly"?t:r==="__v_raw"?i:Reflect.get(Ye(n,r)&&r in i?n:i,r,s)}const Mh={get:To(!1,!1)},Sh={get:To(!1,!0)},yh={get:To(!0,!1)};const ou=new WeakMap,lu=new WeakMap,cu=new WeakMap,Eh=new WeakMap;function bh(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Th(t){return t.__v_skip||!Object.isExtensible(t)?0:bh(Kf(t))}function Ao(t){return hi(t)?t:wo(t,!1,mh,Mh,ou)}function Ah(t){return wo(t,!1,_h,Sh,lu)}function uu(t){return wo(t,!0,gh,yh,cu)}function wo(t,e,n,i,r){if(!rt(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const s=Th(t);if(s===0)return t;const a=r.get(t);if(a)return a;const o=new Proxy(t,s===2?i:n);return r.set(t,o),o}function Er(t){return hi(t)?Er(t.__v_raw):!!(t&&t.__v_isReactive)}function hi(t){return!!(t&&t.__v_isReadonly)}function tn(t){return!!(t&&t.__v_isShallow)}function Ro(t){return t?!!t.__v_raw:!1}function qe(t){const e=t&&t.__v_raw;return e?qe(e):t}function wh(t){return!Ye(t,"__v_skip")&&Object.isExtensible(t)&&Xa(t,"__v_skip",!0),t}const At=t=>rt(t)?Ao(t):t,$a=t=>rt(t)?uu(t):t;function vt(t){return t?t.__v_isRef===!0:!1}function Ko(t){return Rh(t,!1)}function Rh(t,e){return vt(t)?t:new Ch(t,e)}class Ch{constructor(e,n){this.dep=new Eo,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:qe(e),this._value=n?e:At(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,i=this.__v_isShallow||tn(e)||hi(e);e=i?e:qe(e),Gn(e,n)&&(this._rawValue=e,this._value=i?e:At(e),this.dep.trigger())}}function Ph(t){return vt(t)?t.value:t}const Lh={get:(t,e,n)=>e==="__v_raw"?t:Ph(Reflect.get(t,e,n)),set:(t,e,n,i)=>{const r=t[e];return vt(r)&&!vt(n)?(r.value=n,!0):Reflect.set(t,e,n,i)}};function fu(t){return Er(t)?t:new Proxy(t,Lh)}class Ih{constructor(e,n,i){this.fn=e,this.setter=n,this._value=void 0,this.dep=new Eo(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Pr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&Je!==this)return Jc(this,!0),!0}get value(){const e=this.dep.track();return tu(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function Uh(t,e,n=!1){let i,r;return Be(t)?i=t:(i=t.get,r=t.set),new Ih(i,r,n)}const jr={},Es=new WeakMap;let ni;function Dh(t,e=!1,n=ni){if(n){let i=Es.get(n);i||Es.set(n,i=[]),i.push(t)}}function Nh(t,e,n=Qe){const{immediate:i,deep:r,once:s,scheduler:a,augmentJob:o,call:l}=n,c=M=>r?M:tn(M)||r===!1||r===0?Hn(M,1):Hn(M);let u,h,f,p,g=!1,_=!1;if(vt(t)?(h=()=>t.value,g=tn(t)):Er(t)?(h=()=>c(t),g=!0):Fe(t)?(_=!0,g=t.some(M=>Er(M)||tn(M)),h=()=>t.map(M=>{if(vt(M))return M.value;if(Er(M))return c(M);if(Be(M))return l?l(M,2):M()})):Be(t)?e?h=l?()=>l(t,2):t:h=()=>{if(f){Rn();try{f()}finally{Cn()}}const M=ni;ni=u;try{return l?l(t,3,[p]):t(p)}finally{ni=M}}:h=un,e&&r){const M=h,y=r===!0?1/0:r;h=()=>Hn(M(),y)}const m=oh(),d=()=>{u.stop(),m&&m.active&&go(m.effects,u)};if(s&&e){const M=e;e=(...y)=>{M(...y),d()}}let A=_?new Array(t.length).fill(jr):jr;const E=M=>{if(!(!(u.flags&1)||!u.dirty&&!M))if(e){const y=u.run();if(r||g||(_?y.some((L,P)=>Gn(L,A[P])):Gn(y,A))){f&&f();const L=ni;ni=u;try{const P=[y,A===jr?void 0:_&&A[0]===jr?[]:A,p];A=y,l?l(e,3,P):e(...P)}finally{ni=L}}}else u.run()};return o&&o(E),u=new $c(h),u.scheduler=a?()=>a(E,!1):E,p=M=>Dh(M,!1,u),f=u.onStop=()=>{const M=Es.get(u);if(M){if(l)l(M,4);else for(const y of M)y();Es.delete(u)}},e?i?E(!0):A=u.run():a?a(E.bind(null,!0),!0):u.run(),d.pause=u.pause.bind(u),d.resume=u.resume.bind(u),d.stop=d,d}function Hn(t,e=1/0,n){if(e<=0||!rt(t)||t.__v_skip||(n=n||new Set,n.has(t)))return t;if(n.add(t),e--,vt(t))Hn(t.value,e,n);else if(Fe(t))for(let i=0;i<t.length;i++)Hn(t[i],e,n);else if(qf(t)||xr(t))t.forEach(i=>{Hn(i,e,n)});else if($f(t)){for(const i in t)Hn(t[i],e,n);for(const i of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,i)&&Hn(t[i],e,n)}return t}/**
* @vue/runtime-core v3.5.17
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Br(t,e,n,i){try{return i?t(...i):t()}catch(r){Fs(r,e,n)}}function hn(t,e,n,i){if(Be(t)){const r=Br(t,e,n,i);return r&&qc(r)&&r.catch(s=>{Fs(s,e,n)}),r}if(Fe(t)){const r=[];for(let s=0;s<t.length;s++)r.push(hn(t[s],e,n,i));return r}}function Fs(t,e,n,i=!0){const r=e?e.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:a}=e&&e.appContext.config||Qe;if(e){let o=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${n}`;for(;o;){const u=o.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](t,l,c)===!1)return}o=o.parent}if(s){Rn(),Br(s,null,10,[t,l,c]),Cn();return}}Fh(t,n,r,i,a)}function Fh(t,e,n,i=!0,r=!1){if(r)throw t;console.error(t)}const wt=[];let an=-1;const ji=[];let kn=null,Hi=0;const hu=Promise.resolve();let bs=null;function Oh(t){const e=bs||hu;return t?e.then(this?t.bind(this):t):e}function Bh(t){let e=an+1,n=wt.length;for(;e<n;){const i=e+n>>>1,r=wt[i],s=Ir(r);s<t||s===t&&r.flags&2?e=i+1:n=i}return e}function Co(t){if(!(t.flags&1)){const e=Ir(t),n=wt[wt.length-1];!n||!(t.flags&2)&&e>=Ir(n)?wt.push(t):wt.splice(Bh(e),0,t),t.flags|=1,du()}}function du(){bs||(bs=hu.then(mu))}function kh(t){Fe(t)?ji.push(...t):kn&&t.id===-1?kn.splice(Hi+1,0,t):t.flags&1||(ji.push(t),t.flags|=1),du()}function $o(t,e,n=an+1){for(;n<wt.length;n++){const i=wt[n];if(i&&i.flags&2){if(t&&i.id!==t.uid)continue;wt.splice(n,1),n--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function pu(t){if(ji.length){const e=[...new Set(ji)].sort((n,i)=>Ir(n)-Ir(i));if(ji.length=0,kn){kn.push(...e);return}for(kn=e,Hi=0;Hi<kn.length;Hi++){const n=kn[Hi];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}kn=null,Hi=0}}const Ir=t=>t.id==null?t.flags&2?-1:1/0:t.id;function mu(t){try{for(an=0;an<wt.length;an++){const e=wt[an];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Br(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;an<wt.length;an++){const e=wt[an];e&&(e.flags&=-2)}an=-1,wt.length=0,pu(),bs=null,(wt.length||ji.length)&&mu()}}let cn=null,gu=null;function Ts(t){const e=cn;return cn=t,gu=t&&t.type.__scopeId||null,e}function zh(t,e=cn,n){if(!e||t._n)return t;const i=(...r)=>{i._d&&sl(-1);const s=Ts(e);let a;try{a=t(...r)}finally{Ts(s),i._d&&sl(1)}return a};return i._n=!0,i._c=!0,i._d=!0,i}function Zn(t,e,n,i){const r=t.dirs,s=e&&e.dirs;for(let a=0;a<r.length;a++){const o=r[a];s&&(o.oldValue=s[a].value);let l=o.dir[i];l&&(Rn(),hn(l,n,8,[t.el,o,t,e]),Cn())}}const Hh=Symbol("_vte"),Gh=t=>t.__isTeleport;function Po(t,e){t.shapeFlag&6&&t.component?(t.transition=e,Po(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}/*! #__NO_SIDE_EFFECTS__ */function Vh(t,e){return Be(t)?Mt({name:t.name},e,{setup:t}):t}function _u(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}function br(t,e,n,i,r=!1){if(Fe(t)){t.forEach((g,_)=>br(g,e&&(Fe(e)?e[_]:e),n,i,r));return}if(Tr(i)&&!r){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&br(t,e,n,i.component.subTree);return}const s=i.shapeFlag&4?Do(i.component):i.el,a=r?null:s,{i:o,r:l}=t,c=e&&e.r,u=o.refs===Qe?o.refs={}:o.refs,h=o.setupState,f=qe(h),p=h===Qe?()=>!1:g=>Ye(f,g);if(c!=null&&c!==l&&(ht(c)?(u[c]=null,p(c)&&(h[c]=null)):vt(c)&&(c.value=null)),Be(l))Br(l,o,12,[a,u]);else{const g=ht(l),_=vt(l);if(g||_){const m=()=>{if(t.f){const d=g?p(l)?h[l]:u[l]:l.value;r?Fe(d)&&go(d,s):Fe(d)?d.includes(s)||d.push(s):g?(u[l]=[s],p(l)&&(h[l]=u[l])):(l.value=[s],t.k&&(u[t.k]=l.value))}else g?(u[l]=a,p(l)&&(h[l]=a)):_&&(l.value=a,t.k&&(u[t.k]=a))};a?(m.id=-1,kt(m,n)):m()}}}Ns().requestIdleCallback;Ns().cancelIdleCallback;const Tr=t=>!!t.type.__asyncLoader,vu=t=>t.type.__isKeepAlive;function Wh(t,e){xu(t,"a",e)}function Xh(t,e){xu(t,"da",e)}function xu(t,e,n=Rt){const i=t.__wdc||(t.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return t()});if(Os(e,i,n),n){let r=n.parent;for(;r&&r.parent;)vu(r.parent.vnode)&&jh(i,e,n,r),r=r.parent}}function jh(t,e,n,i){const r=Os(e,t,i,!0);yu(()=>{go(i[e],r)},n)}function Os(t,e,n=Rt,i=!1){if(n){const r=n[t]||(n[t]=[]),s=e.__weh||(e.__weh=(...a)=>{Rn();const o=kr(n),l=hn(e,n,t,a);return o(),Cn(),l});return i?r.unshift(s):r.push(s),s}}const Pn=t=>(e,n=Rt)=>{(!Dr||t==="sp")&&Os(t,(...i)=>e(...i),n)},qh=Pn("bm"),Mu=Pn("m"),Yh=Pn("bu"),Kh=Pn("u"),Su=Pn("bum"),yu=Pn("um"),$h=Pn("sp"),Zh=Pn("rtg"),Jh=Pn("rtc");function Qh(t,e=Rt){Os("ec",t,e)}const ed=Symbol.for("v-ndc"),Za=t=>t?Wu(t)?Do(t):Za(t.parent):null,Ar=Mt(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Za(t.parent),$root:t=>Za(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>bu(t),$forceUpdate:t=>t.f||(t.f=()=>{Co(t.update)}),$nextTick:t=>t.n||(t.n=Oh.bind(t.proxy)),$watch:t=>yd.bind(t)}),ra=(t,e)=>t!==Qe&&!t.__isScriptSetup&&Ye(t,e),td={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:i,data:r,props:s,accessCache:a,type:o,appContext:l}=t;let c;if(e[0]!=="$"){const p=a[e];if(p!==void 0)switch(p){case 1:return i[e];case 2:return r[e];case 4:return n[e];case 3:return s[e]}else{if(ra(i,e))return a[e]=1,i[e];if(r!==Qe&&Ye(r,e))return a[e]=2,r[e];if((c=t.propsOptions[0])&&Ye(c,e))return a[e]=3,s[e];if(n!==Qe&&Ye(n,e))return a[e]=4,n[e];Ja&&(a[e]=0)}}const u=Ar[e];let h,f;if(u)return e==="$attrs"&&gt(t.attrs,"get",""),u(t);if((h=o.__cssModules)&&(h=h[e]))return h;if(n!==Qe&&Ye(n,e))return a[e]=4,n[e];if(f=l.config.globalProperties,Ye(f,e))return f[e]},set({_:t},e,n){const{data:i,setupState:r,ctx:s}=t;return ra(r,e)?(r[e]=n,!0):i!==Qe&&Ye(i,e)?(i[e]=n,!0):Ye(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(s[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:i,appContext:r,propsOptions:s}},a){let o;return!!n[a]||t!==Qe&&Ye(t,a)||ra(e,a)||(o=s[0])&&Ye(o,a)||Ye(i,a)||Ye(Ar,a)||Ye(r.config.globalProperties,a)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:Ye(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function Zo(t){return Fe(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let Ja=!0;function nd(t){const e=bu(t),n=t.proxy,i=t.ctx;Ja=!1,e.beforeCreate&&Jo(e.beforeCreate,t,"bc");const{data:r,computed:s,methods:a,watch:o,provide:l,inject:c,created:u,beforeMount:h,mounted:f,beforeUpdate:p,updated:g,activated:_,deactivated:m,beforeDestroy:d,beforeUnmount:A,destroyed:E,unmounted:M,render:y,renderTracked:L,renderTriggered:P,errorCaptured:I,serverPrefetch:x,expose:b,inheritAttrs:H,components:O,directives:N,filters:V}=e;if(c&&id(c,i,null),a)for(const j in a){const X=a[j];Be(X)&&(i[j]=X.bind(n))}if(r){const j=r.call(n,n);rt(j)&&(t.data=Ao(j))}if(Ja=!0,s)for(const j in s){const X=s[j],ue=Be(X)?X.bind(n,n):Be(X.get)?X.get.bind(n,n):un,ae=!Be(X)&&Be(X.set)?X.set.bind(n):un,be=Xd({get:ue,set:ae});Object.defineProperty(i,j,{enumerable:!0,configurable:!0,get:()=>be.value,set:he=>be.value=he})}if(o)for(const j in o)Eu(o[j],i,n,j);if(l){const j=Be(l)?l.call(n):l;Reflect.ownKeys(j).forEach(X=>{cd(X,j[X])})}u&&Jo(u,t,"c");function Q(j,X){Fe(X)?X.forEach(ue=>j(ue.bind(n))):X&&j(X.bind(n))}if(Q(qh,h),Q(Mu,f),Q(Yh,p),Q(Kh,g),Q(Wh,_),Q(Xh,m),Q(Qh,I),Q(Jh,L),Q(Zh,P),Q(Su,A),Q(yu,M),Q($h,x),Fe(b))if(b.length){const j=t.exposed||(t.exposed={});b.forEach(X=>{Object.defineProperty(j,X,{get:()=>n[X],set:ue=>n[X]=ue})})}else t.exposed||(t.exposed={});y&&t.render===un&&(t.render=y),H!=null&&(t.inheritAttrs=H),O&&(t.components=O),N&&(t.directives=N),x&&_u(t)}function id(t,e,n=un){Fe(t)&&(t=Qa(t));for(const i in t){const r=t[i];let s;rt(r)?"default"in r?s=vs(r.from||i,r.default,!0):s=vs(r.from||i):s=vs(r),vt(s)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>s.value,set:a=>s.value=a}):e[i]=s}}function Jo(t,e,n){hn(Fe(t)?t.map(i=>i.bind(e.proxy)):t.bind(e.proxy),e,n)}function Eu(t,e,n,i){let r=i.includes(".")?Ou(n,i):()=>n[i];if(ht(t)){const s=e[t];Be(s)&&aa(r,s)}else if(Be(t))aa(r,t.bind(n));else if(rt(t))if(Fe(t))t.forEach(s=>Eu(s,e,n,i));else{const s=Be(t.handler)?t.handler.bind(n):e[t.handler];Be(s)&&aa(r,s,t)}}function bu(t){const e=t.type,{mixins:n,extends:i}=e,{mixins:r,optionsCache:s,config:{optionMergeStrategies:a}}=t.appContext,o=s.get(e);let l;return o?l=o:!r.length&&!n&&!i?l=e:(l={},r.length&&r.forEach(c=>As(l,c,a,!0)),As(l,e,a)),rt(e)&&s.set(e,l),l}function As(t,e,n,i=!1){const{mixins:r,extends:s}=e;s&&As(t,s,n,!0),r&&r.forEach(a=>As(t,a,n,!0));for(const a in e)if(!(i&&a==="expose")){const o=rd[a]||n&&n[a];t[a]=o?o(t[a],e[a]):e[a]}return t}const rd={data:Qo,props:el,emits:el,methods:mr,computed:mr,beforeCreate:Et,created:Et,beforeMount:Et,mounted:Et,beforeUpdate:Et,updated:Et,beforeDestroy:Et,beforeUnmount:Et,destroyed:Et,unmounted:Et,activated:Et,deactivated:Et,errorCaptured:Et,serverPrefetch:Et,components:mr,directives:mr,watch:ad,provide:Qo,inject:sd};function Qo(t,e){return e?t?function(){return Mt(Be(t)?t.call(this,this):t,Be(e)?e.call(this,this):e)}:e:t}function sd(t,e){return mr(Qa(t),Qa(e))}function Qa(t){if(Fe(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function Et(t,e){return t?[...new Set([].concat(t,e))]:e}function mr(t,e){return t?Mt(Object.create(null),t,e):e}function el(t,e){return t?Fe(t)&&Fe(e)?[...new Set([...t,...e])]:Mt(Object.create(null),Zo(t),Zo(e??{})):e}function ad(t,e){if(!t)return e;if(!e)return t;const n=Mt(Object.create(null),t);for(const i in e)n[i]=Et(t[i],e[i]);return n}function Tu(){return{app:null,config:{isNativeTag:Xf,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let od=0;function ld(t,e){return function(i,r=null){Be(i)||(i=Mt({},i)),r!=null&&!rt(r)&&(r=null);const s=Tu(),a=new WeakSet,o=[];let l=!1;const c=s.app={_uid:od++,_component:i,_props:r,_container:null,_context:s,_instance:null,version:jd,get config(){return s.config},set config(u){},use(u,...h){return a.has(u)||(u&&Be(u.install)?(a.add(u),u.install(c,...h)):Be(u)&&(a.add(u),u(c,...h))),c},mixin(u){return s.mixins.includes(u)||s.mixins.push(u),c},component(u,h){return h?(s.components[u]=h,c):s.components[u]},directive(u,h){return h?(s.directives[u]=h,c):s.directives[u]},mount(u,h,f){if(!l){const p=c._ceVNode||Vn(i,r);return p.appContext=s,f===!0?f="svg":f===!1&&(f=void 0),t(p,u,f),l=!0,c._container=u,u.__vue_app__=c,Do(p.component)}},onUnmount(u){o.push(u)},unmount(){l&&(hn(o,c._instance,16),t(null,c._container),delete c._container.__vue_app__)},provide(u,h){return s.provides[u]=h,c},runWithContext(u){const h=qi;qi=c;try{return u()}finally{qi=h}}};return c}}let qi=null;function cd(t,e){if(Rt){let n=Rt.provides;const i=Rt.parent&&Rt.parent.provides;i===n&&(n=Rt.provides=Object.create(i)),n[t]=e}}function vs(t,e,n=!1){const i=Rt||cn;if(i||qi){let r=qi?qi._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(r&&t in r)return r[t];if(arguments.length>1)return n&&Be(e)?e.call(i&&i.proxy):e}}const Au={},wu=()=>Object.create(Au),Ru=t=>Object.getPrototypeOf(t)===Au;function ud(t,e,n,i=!1){const r={},s=wu();t.propsDefaults=Object.create(null),Cu(t,e,r,s);for(const a in t.propsOptions[0])a in r||(r[a]=void 0);n?t.props=i?r:Ah(r):t.type.props?t.props=r:t.props=s,t.attrs=s}function fd(t,e,n,i){const{props:r,attrs:s,vnode:{patchFlag:a}}=t,o=qe(r),[l]=t.propsOptions;let c=!1;if((i||a>0)&&!(a&16)){if(a&8){const u=t.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(Bs(t.emitsOptions,f))continue;const p=e[f];if(l)if(Ye(s,f))p!==s[f]&&(s[f]=p,c=!0);else{const g=jn(f);r[g]=eo(l,o,g,p,t,!1)}else p!==s[f]&&(s[f]=p,c=!0)}}}else{Cu(t,e,r,s)&&(c=!0);let u;for(const h in o)(!e||!Ye(e,h)&&((u=vi(h))===h||!Ye(e,u)))&&(l?n&&(n[h]!==void 0||n[u]!==void 0)&&(r[h]=eo(l,o,h,void 0,t,!0)):delete r[h]);if(s!==o)for(const h in s)(!e||!Ye(e,h))&&(delete s[h],c=!0)}c&&Tn(t.attrs,"set","")}function Cu(t,e,n,i){const[r,s]=t.propsOptions;let a=!1,o;if(e)for(let l in e){if(Mr(l))continue;const c=e[l];let u;r&&Ye(r,u=jn(l))?!s||!s.includes(u)?n[u]=c:(o||(o={}))[u]=c:Bs(t.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,a=!0)}if(s){const l=qe(n),c=o||Qe;for(let u=0;u<s.length;u++){const h=s[u];n[h]=eo(r,l,h,c[h],t,!Ye(c,h))}}return a}function eo(t,e,n,i,r,s){const a=t[n];if(a!=null){const o=Ye(a,"default");if(o&&i===void 0){const l=a.default;if(a.type!==Function&&!a.skipFactory&&Be(l)){const{propsDefaults:c}=r;if(n in c)i=c[n];else{const u=kr(r);i=c[n]=l.call(null,e),u()}}else i=l;r.ce&&r.ce._setProp(n,i)}a[0]&&(s&&!o?i=!1:a[1]&&(i===""||i===vi(n))&&(i=!0))}return i}const hd=new WeakMap;function Pu(t,e,n=!1){const i=n?hd:e.propsCache,r=i.get(t);if(r)return r;const s=t.props,a={},o=[];let l=!1;if(!Be(t)){const u=h=>{l=!0;const[f,p]=Pu(h,e,!0);Mt(a,f),p&&o.push(...p)};!n&&e.mixins.length&&e.mixins.forEach(u),t.extends&&u(t.extends),t.mixins&&t.mixins.forEach(u)}if(!s&&!l)return rt(t)&&i.set(t,Xi),Xi;if(Fe(s))for(let u=0;u<s.length;u++){const h=jn(s[u]);tl(h)&&(a[h]=Qe)}else if(s)for(const u in s){const h=jn(u);if(tl(h)){const f=s[u],p=a[h]=Fe(f)||Be(f)?{type:f}:Mt({},f),g=p.type;let _=!1,m=!0;if(Fe(g))for(let d=0;d<g.length;++d){const A=g[d],E=Be(A)&&A.name;if(E==="Boolean"){_=!0;break}else E==="String"&&(m=!1)}else _=Be(g)&&g.name==="Boolean";p[0]=_,p[1]=m,(_||Ye(p,"default"))&&o.push(h)}}const c=[a,o];return rt(t)&&i.set(t,c),c}function tl(t){return t[0]!=="$"&&!Mr(t)}const Lo=t=>t[0]==="_"||t==="$stable",Io=t=>Fe(t)?t.map(on):[on(t)],dd=(t,e,n)=>{if(e._n)return e;const i=zh((...r)=>Io(e(...r)),n);return i._c=!1,i},Lu=(t,e,n)=>{const i=t._ctx;for(const r in t){if(Lo(r))continue;const s=t[r];if(Be(s))e[r]=dd(r,s,i);else if(s!=null){const a=Io(s);e[r]=()=>a}}},Iu=(t,e)=>{const n=Io(e);t.slots.default=()=>n},Uu=(t,e,n)=>{for(const i in e)(n||!Lo(i))&&(t[i]=e[i])},pd=(t,e,n)=>{const i=t.slots=wu();if(t.vnode.shapeFlag&32){const r=e.__;r&&Xa(i,"__",r,!0);const s=e._;s?(Uu(i,e,n),n&&Xa(i,"_",s,!0)):Lu(e,i)}else e&&Iu(t,e)},md=(t,e,n)=>{const{vnode:i,slots:r}=t;let s=!0,a=Qe;if(i.shapeFlag&32){const o=e._;o?n&&o===1?s=!1:Uu(r,e,n):(s=!e.$stable,Lu(e,r)),a=e}else e&&(Iu(t,e),a={default:1});if(s)for(const o in r)!Lo(o)&&a[o]==null&&delete r[o]},kt=Cd;function gd(t){return _d(t)}function _d(t,e){const n=Ns();n.__VUE__=!0;const{insert:i,remove:r,patchProp:s,createElement:a,createText:o,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:f,setScopeId:p=un,insertStaticContent:g}=t,_=(w,R,B,re=null,J=null,ne=null,de=void 0,se=null,ce=!!R.dynamicChildren)=>{if(w===R)return;w&&!cr(w,R)&&(re=U(w),he(w,J,ne,!0),w=null),R.patchFlag===-2&&(ce=!1,R.dynamicChildren=null);const{type:le,ref:S,shapeFlag:v}=R;switch(le){case ks:m(w,R,B,re);break;case Ji:d(w,R,B,re);break;case oa:w==null&&A(R,B,re,de);break;case bn:O(w,R,B,re,J,ne,de,se,ce);break;default:v&1?y(w,R,B,re,J,ne,de,se,ce):v&6?N(w,R,B,re,J,ne,de,se,ce):(v&64||v&128)&&le.process(w,R,B,re,J,ne,de,se,ce,me)}S!=null&&J?br(S,w&&w.ref,ne,R||w,!R):S==null&&w&&w.ref!=null&&br(w.ref,null,ne,w,!0)},m=(w,R,B,re)=>{if(w==null)i(R.el=o(R.children),B,re);else{const J=R.el=w.el;R.children!==w.children&&c(J,R.children)}},d=(w,R,B,re)=>{w==null?i(R.el=l(R.children||""),B,re):R.el=w.el},A=(w,R,B,re)=>{[w.el,w.anchor]=g(w.children,R,B,re,w.el,w.anchor)},E=({el:w,anchor:R},B,re)=>{let J;for(;w&&w!==R;)J=f(w),i(w,B,re),w=J;i(R,B,re)},M=({el:w,anchor:R})=>{let B;for(;w&&w!==R;)B=f(w),r(w),w=B;r(R)},y=(w,R,B,re,J,ne,de,se,ce)=>{R.type==="svg"?de="svg":R.type==="math"&&(de="mathml"),w==null?L(R,B,re,J,ne,de,se,ce):x(w,R,J,ne,de,se,ce)},L=(w,R,B,re,J,ne,de,se)=>{let ce,le;const{props:S,shapeFlag:v,transition:F,dirs:q}=w;if(ce=w.el=a(w.type,ne,S&&S.is,S),v&8?u(ce,w.children):v&16&&I(w.children,ce,null,re,J,sa(w,ne),de,se),q&&Zn(w,null,re,"created"),P(ce,w,w.scopeId,de,re),S){for(const fe in S)fe!=="value"&&!Mr(fe)&&s(ce,fe,null,S[fe],ne,re);"value"in S&&s(ce,"value",null,S.value,ne),(le=S.onVnodeBeforeMount)&&rn(le,re,w)}q&&Zn(w,null,re,"beforeMount");const $=vd(J,F);$&&F.beforeEnter(ce),i(ce,R,B),((le=S&&S.onVnodeMounted)||$||q)&&kt(()=>{le&&rn(le,re,w),$&&F.enter(ce),q&&Zn(w,null,re,"mounted")},J)},P=(w,R,B,re,J)=>{if(B&&p(w,B),re)for(let ne=0;ne<re.length;ne++)p(w,re[ne]);if(J){let ne=J.subTree;if(R===ne||ku(ne.type)&&(ne.ssContent===R||ne.ssFallback===R)){const de=J.vnode;P(w,de,de.scopeId,de.slotScopeIds,J.parent)}}},I=(w,R,B,re,J,ne,de,se,ce=0)=>{for(let le=ce;le<w.length;le++){const S=w[le]=se?zn(w[le]):on(w[le]);_(null,S,R,B,re,J,ne,de,se)}},x=(w,R,B,re,J,ne,de)=>{const se=R.el=w.el;let{patchFlag:ce,dynamicChildren:le,dirs:S}=R;ce|=w.patchFlag&16;const v=w.props||Qe,F=R.props||Qe;let q;if(B&&Jn(B,!1),(q=F.onVnodeBeforeUpdate)&&rn(q,B,R,w),S&&Zn(R,w,B,"beforeUpdate"),B&&Jn(B,!0),(v.innerHTML&&F.innerHTML==null||v.textContent&&F.textContent==null)&&u(se,""),le?b(w.dynamicChildren,le,se,B,re,sa(R,J),ne):de||X(w,R,se,null,B,re,sa(R,J),ne,!1),ce>0){if(ce&16)H(se,v,F,B,J);else if(ce&2&&v.class!==F.class&&s(se,"class",null,F.class,J),ce&4&&s(se,"style",v.style,F.style,J),ce&8){const $=R.dynamicProps;for(let fe=0;fe<$.length;fe++){const C=$[fe],Z=v[C],G=F[C];(G!==Z||C==="value")&&s(se,C,Z,G,J,B)}}ce&1&&w.children!==R.children&&u(se,R.children)}else!de&&le==null&&H(se,v,F,B,J);((q=F.onVnodeUpdated)||S)&&kt(()=>{q&&rn(q,B,R,w),S&&Zn(R,w,B,"updated")},re)},b=(w,R,B,re,J,ne,de)=>{for(let se=0;se<R.length;se++){const ce=w[se],le=R[se],S=ce.el&&(ce.type===bn||!cr(ce,le)||ce.shapeFlag&198)?h(ce.el):B;_(ce,le,S,null,re,J,ne,de,!0)}},H=(w,R,B,re,J)=>{if(R!==B){if(R!==Qe)for(const ne in R)!Mr(ne)&&!(ne in B)&&s(w,ne,R[ne],null,J,re);for(const ne in B){if(Mr(ne))continue;const de=B[ne],se=R[ne];de!==se&&ne!=="value"&&s(w,ne,se,de,J,re)}"value"in B&&s(w,"value",R.value,B.value,J)}},O=(w,R,B,re,J,ne,de,se,ce)=>{const le=R.el=w?w.el:o(""),S=R.anchor=w?w.anchor:o("");let{patchFlag:v,dynamicChildren:F,slotScopeIds:q}=R;q&&(se=se?se.concat(q):q),w==null?(i(le,B,re),i(S,B,re),I(R.children||[],B,S,J,ne,de,se,ce)):v>0&&v&64&&F&&w.dynamicChildren?(b(w.dynamicChildren,F,B,J,ne,de,se),(R.key!=null||J&&R===J.subTree)&&Du(w,R,!0)):X(w,R,B,S,J,ne,de,se,ce)},N=(w,R,B,re,J,ne,de,se,ce)=>{R.slotScopeIds=se,w==null?R.shapeFlag&512?J.ctx.activate(R,B,re,de,ce):V(R,B,re,J,ne,de,ce):Y(w,R,ce)},V=(w,R,B,re,J,ne,de)=>{const se=w.component=kd(w,re,J);if(vu(w)&&(se.ctx.renderer=me),zd(se,!1,de),se.asyncDep){if(J&&J.registerDep(se,Q,de),!w.el){const ce=se.subTree=Vn(Ji);d(null,ce,R,B)}}else Q(se,w,R,B,J,ne,de)},Y=(w,R,B)=>{const re=R.component=w.component;if(wd(w,R,B))if(re.asyncDep&&!re.asyncResolved){j(re,R,B);return}else re.next=R,re.update();else R.el=w.el,re.vnode=R},Q=(w,R,B,re,J,ne,de)=>{const se=()=>{if(w.isMounted){let{next:v,bu:F,u:q,parent:$,vnode:fe}=w;{const Me=Nu(w);if(Me){v&&(v.el=fe.el,j(w,v,de)),Me.asyncDep.then(()=>{w.isUnmounted||se()});return}}let C=v,Z;Jn(w,!1),v?(v.el=fe.el,j(w,v,de)):v=fe,F&&ea(F),(Z=v.props&&v.props.onVnodeBeforeUpdate)&&rn(Z,$,v,fe),Jn(w,!0);const G=il(w),ge=w.subTree;w.subTree=G,_(ge,G,h(ge.el),U(ge),w,J,ne),v.el=G.el,C===null&&Rd(w,G.el),q&&kt(q,J),(Z=v.props&&v.props.onVnodeUpdated)&&kt(()=>rn(Z,$,v,fe),J)}else{let v;const{el:F,props:q}=R,{bm:$,m:fe,parent:C,root:Z,type:G}=w,ge=Tr(R);Jn(w,!1),$&&ea($),!ge&&(v=q&&q.onVnodeBeforeMount)&&rn(v,C,R),Jn(w,!0);{Z.ce&&Z.ce._def.shadowRoot!==!1&&Z.ce._injectChildStyle(G);const Me=w.subTree=il(w);_(null,Me,B,re,w,J,ne),R.el=Me.el}if(fe&&kt(fe,J),!ge&&(v=q&&q.onVnodeMounted)){const Me=R;kt(()=>rn(v,C,Me),J)}(R.shapeFlag&256||C&&Tr(C.vnode)&&C.vnode.shapeFlag&256)&&w.a&&kt(w.a,J),w.isMounted=!0,R=B=re=null}};w.scope.on();const ce=w.effect=new $c(se);w.scope.off();const le=w.update=ce.run.bind(ce),S=w.job=ce.runIfDirty.bind(ce);S.i=w,S.id=w.uid,ce.scheduler=()=>Co(S),Jn(w,!0),le()},j=(w,R,B)=>{R.component=w;const re=w.vnode.props;w.vnode=R,w.next=null,fd(w,R.props,re,B),md(w,R.children,B),Rn(),$o(w),Cn()},X=(w,R,B,re,J,ne,de,se,ce=!1)=>{const le=w&&w.children,S=w?w.shapeFlag:0,v=R.children,{patchFlag:F,shapeFlag:q}=R;if(F>0){if(F&128){ae(le,v,B,re,J,ne,de,se,ce);return}else if(F&256){ue(le,v,B,re,J,ne,de,se,ce);return}}q&8?(S&16&&ve(le,J,ne),v!==le&&u(B,v)):S&16?q&16?ae(le,v,B,re,J,ne,de,se,ce):ve(le,J,ne,!0):(S&8&&u(B,""),q&16&&I(v,B,re,J,ne,de,se,ce))},ue=(w,R,B,re,J,ne,de,se,ce)=>{w=w||Xi,R=R||Xi;const le=w.length,S=R.length,v=Math.min(le,S);let F;for(F=0;F<v;F++){const q=R[F]=ce?zn(R[F]):on(R[F]);_(w[F],q,B,null,J,ne,de,se,ce)}le>S?ve(w,J,ne,!0,!1,v):I(R,B,re,J,ne,de,se,ce,v)},ae=(w,R,B,re,J,ne,de,se,ce)=>{let le=0;const S=R.length;let v=w.length-1,F=S-1;for(;le<=v&&le<=F;){const q=w[le],$=R[le]=ce?zn(R[le]):on(R[le]);if(cr(q,$))_(q,$,B,null,J,ne,de,se,ce);else break;le++}for(;le<=v&&le<=F;){const q=w[v],$=R[F]=ce?zn(R[F]):on(R[F]);if(cr(q,$))_(q,$,B,null,J,ne,de,se,ce);else break;v--,F--}if(le>v){if(le<=F){const q=F+1,$=q<S?R[q].el:re;for(;le<=F;)_(null,R[le]=ce?zn(R[le]):on(R[le]),B,$,J,ne,de,se,ce),le++}}else if(le>F)for(;le<=v;)he(w[le],J,ne,!0),le++;else{const q=le,$=le,fe=new Map;for(le=$;le<=F;le++){const Se=R[le]=ce?zn(R[le]):on(R[le]);Se.key!=null&&fe.set(Se.key,le)}let C,Z=0;const G=F-$+1;let ge=!1,Me=0;const Te=new Array(G);for(le=0;le<G;le++)Te[le]=0;for(le=q;le<=v;le++){const Se=w[le];if(Z>=G){he(Se,J,ne,!0);continue}let Re;if(Se.key!=null)Re=fe.get(Se.key);else for(C=$;C<=F;C++)if(Te[C-$]===0&&cr(Se,R[C])){Re=C;break}Re===void 0?he(Se,J,ne,!0):(Te[Re-$]=le+1,Re>=Me?Me=Re:ge=!0,_(Se,R[Re],B,null,J,ne,de,se,ce),Z++)}const ye=ge?xd(Te):Xi;for(C=ye.length-1,le=G-1;le>=0;le--){const Se=$+le,Re=R[Se],De=Se+1<S?R[Se+1].el:re;Te[le]===0?_(null,Re,B,De,J,ne,de,se,ce):ge&&(C<0||le!==ye[C]?be(Re,B,De,2):C--)}}},be=(w,R,B,re,J=null)=>{const{el:ne,type:de,transition:se,children:ce,shapeFlag:le}=w;if(le&6){be(w.component.subTree,R,B,re);return}if(le&128){w.suspense.move(R,B,re);return}if(le&64){de.move(w,R,B,me);return}if(de===bn){i(ne,R,B);for(let v=0;v<ce.length;v++)be(ce[v],R,B,re);i(w.anchor,R,B);return}if(de===oa){E(w,R,B);return}if(re!==2&&le&1&&se)if(re===0)se.beforeEnter(ne),i(ne,R,B),kt(()=>se.enter(ne),J);else{const{leave:v,delayLeave:F,afterLeave:q}=se,$=()=>{w.ctx.isUnmounted?r(ne):i(ne,R,B)},fe=()=>{v(ne,()=>{$(),q&&q()})};F?F(ne,$,fe):fe()}else i(ne,R,B)},he=(w,R,B,re=!1,J=!1)=>{const{type:ne,props:de,ref:se,children:ce,dynamicChildren:le,shapeFlag:S,patchFlag:v,dirs:F,cacheIndex:q}=w;if(v===-2&&(J=!1),se!=null&&(Rn(),br(se,null,B,w,!0),Cn()),q!=null&&(R.renderCache[q]=void 0),S&256){R.ctx.deactivate(w);return}const $=S&1&&F,fe=!Tr(w);let C;if(fe&&(C=de&&de.onVnodeBeforeUnmount)&&rn(C,R,w),S&6)_e(w.component,B,re);else{if(S&128){w.suspense.unmount(B,re);return}$&&Zn(w,null,R,"beforeUnmount"),S&64?w.type.remove(w,R,B,me,re):le&&!le.hasOnce&&(ne!==bn||v>0&&v&64)?ve(le,R,B,!1,!0):(ne===bn&&v&384||!J&&S&16)&&ve(ce,R,B),re&&K(w)}(fe&&(C=de&&de.onVnodeUnmounted)||$)&&kt(()=>{C&&rn(C,R,w),$&&Zn(w,null,R,"unmounted")},B)},K=w=>{const{type:R,el:B,anchor:re,transition:J}=w;if(R===bn){oe(B,re);return}if(R===oa){M(w);return}const ne=()=>{r(B),J&&!J.persisted&&J.afterLeave&&J.afterLeave()};if(w.shapeFlag&1&&J&&!J.persisted){const{leave:de,delayLeave:se}=J,ce=()=>de(B,ne);se?se(w.el,ne,ce):ce()}else ne()},oe=(w,R)=>{let B;for(;w!==R;)B=f(w),r(w),w=B;r(R)},_e=(w,R,B)=>{const{bum:re,scope:J,job:ne,subTree:de,um:se,m:ce,a:le,parent:S,slots:{__:v}}=w;nl(ce),nl(le),re&&ea(re),S&&Fe(v)&&v.forEach(F=>{S.renderCache[F]=void 0}),J.stop(),ne&&(ne.flags|=8,he(de,w,R,B)),se&&kt(se,R),kt(()=>{w.isUnmounted=!0},R),R&&R.pendingBranch&&!R.isUnmounted&&w.asyncDep&&!w.asyncResolved&&w.suspenseId===R.pendingId&&(R.deps--,R.deps===0&&R.resolve())},ve=(w,R,B,re=!1,J=!1,ne=0)=>{for(let de=ne;de<w.length;de++)he(w[de],R,B,re,J)},U=w=>{if(w.shapeFlag&6)return U(w.component.subTree);if(w.shapeFlag&128)return w.suspense.next();const R=f(w.anchor||w.el),B=R&&R[Hh];return B?f(B):R};let Le=!1;const Ce=(w,R,B)=>{w==null?R._vnode&&he(R._vnode,null,null,!0):_(R._vnode||null,w,R,null,null,null,B),R._vnode=w,Le||(Le=!0,$o(),pu(),Le=!1)},me={p:_,um:he,m:be,r:K,mt:V,mc:I,pc:X,pbc:b,n:U,o:t};return{render:Ce,hydrate:void 0,createApp:ld(Ce)}}function sa({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function Jn({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function vd(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function Du(t,e,n=!1){const i=t.children,r=e.children;if(Fe(i)&&Fe(r))for(let s=0;s<i.length;s++){const a=i[s];let o=r[s];o.shapeFlag&1&&!o.dynamicChildren&&((o.patchFlag<=0||o.patchFlag===32)&&(o=r[s]=zn(r[s]),o.el=a.el),!n&&o.patchFlag!==-2&&Du(a,o)),o.type===ks&&(o.el=a.el),o.type===Ji&&!o.el&&(o.el=a.el)}}function xd(t){const e=t.slice(),n=[0];let i,r,s,a,o;const l=t.length;for(i=0;i<l;i++){const c=t[i];if(c!==0){if(r=n[n.length-1],t[r]<c){e[i]=r,n.push(i);continue}for(s=0,a=n.length-1;s<a;)o=s+a>>1,t[n[o]]<c?s=o+1:a=o;c<t[n[s]]&&(s>0&&(e[i]=n[s-1]),n[s]=i)}}for(s=n.length,a=n[s-1];s-- >0;)n[s]=a,a=e[a];return n}function Nu(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Nu(e)}function nl(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const Md=Symbol.for("v-scx"),Sd=()=>vs(Md);function aa(t,e,n){return Fu(t,e,n)}function Fu(t,e,n=Qe){const{immediate:i,deep:r,flush:s,once:a}=n,o=Mt({},n),l=e&&i||!e&&s!=="post";let c;if(Dr){if(s==="sync"){const p=Sd();c=p.__watcherHandles||(p.__watcherHandles=[])}else if(!l){const p=()=>{};return p.stop=un,p.resume=un,p.pause=un,p}}const u=Rt;o.call=(p,g,_)=>hn(p,u,g,_);let h=!1;s==="post"?o.scheduler=p=>{kt(p,u&&u.suspense)}:s!=="sync"&&(h=!0,o.scheduler=(p,g)=>{g?p():Co(p)}),o.augmentJob=p=>{e&&(p.flags|=4),h&&(p.flags|=2,u&&(p.id=u.uid,p.i=u))};const f=Nh(t,e,o);return Dr&&(c?c.push(f):l&&f()),f}function yd(t,e,n){const i=this.proxy,r=ht(t)?t.includes(".")?Ou(i,t):()=>i[t]:t.bind(i,i);let s;Be(e)?s=e:(s=e.handler,n=e);const a=kr(this),o=Fu(r,s.bind(i),n);return a(),o}function Ou(t,e){const n=e.split(".");return()=>{let i=t;for(let r=0;r<n.length&&i;r++)i=i[n[r]];return i}}const Ed=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${jn(e)}Modifiers`]||t[`${vi(e)}Modifiers`];function bd(t,e,...n){if(t.isUnmounted)return;const i=t.vnode.props||Qe;let r=n;const s=e.startsWith("update:"),a=s&&Ed(i,e.slice(7));a&&(a.trim&&(r=n.map(u=>ht(u)?u.trim():u)),a.number&&(r=n.map(Qf)));let o,l=i[o=Qs(e)]||i[o=Qs(jn(e))];!l&&s&&(l=i[o=Qs(vi(e))]),l&&hn(l,t,6,r);const c=i[o+"Once"];if(c){if(!t.emitted)t.emitted={};else if(t.emitted[o])return;t.emitted[o]=!0,hn(c,t,6,r)}}function Bu(t,e,n=!1){const i=e.emitsCache,r=i.get(t);if(r!==void 0)return r;const s=t.emits;let a={},o=!1;if(!Be(t)){const l=c=>{const u=Bu(c,e,!0);u&&(o=!0,Mt(a,u))};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}return!s&&!o?(rt(t)&&i.set(t,null),null):(Fe(s)?s.forEach(l=>a[l]=null):Mt(a,s),rt(t)&&i.set(t,a),a)}function Bs(t,e){return!t||!Is(e)?!1:(e=e.slice(2).replace(/Once$/,""),Ye(t,e[0].toLowerCase()+e.slice(1))||Ye(t,vi(e))||Ye(t,e))}function il(t){const{type:e,vnode:n,proxy:i,withProxy:r,propsOptions:[s],slots:a,attrs:o,emit:l,render:c,renderCache:u,props:h,data:f,setupState:p,ctx:g,inheritAttrs:_}=t,m=Ts(t);let d,A;try{if(n.shapeFlag&4){const M=r||i,y=M;d=on(c.call(y,M,u,h,p,f,g)),A=o}else{const M=e;d=on(M.length>1?M(h,{attrs:o,slots:a,emit:l}):M(h,null)),A=e.props?o:Td(o)}}catch(M){wr.length=0,Fs(M,t,1),d=Vn(Ji)}let E=d;if(A&&_!==!1){const M=Object.keys(A),{shapeFlag:y}=E;M.length&&y&7&&(s&&M.some(mo)&&(A=Ad(A,s)),E=Qi(E,A,!1,!0))}return n.dirs&&(E=Qi(E,null,!1,!0),E.dirs=E.dirs?E.dirs.concat(n.dirs):n.dirs),n.transition&&Po(E,n.transition),d=E,Ts(m),d}const Td=t=>{let e;for(const n in t)(n==="class"||n==="style"||Is(n))&&((e||(e={}))[n]=t[n]);return e},Ad=(t,e)=>{const n={};for(const i in t)(!mo(i)||!(i.slice(9)in e))&&(n[i]=t[i]);return n};function wd(t,e,n){const{props:i,children:r,component:s}=t,{props:a,children:o,patchFlag:l}=e,c=s.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return i?rl(i,a,c):!!a;if(l&8){const u=e.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(a[f]!==i[f]&&!Bs(c,f))return!0}}}else return(r||o)&&(!o||!o.$stable)?!0:i===a?!1:i?a?rl(i,a,c):!0:!!a;return!1}function rl(t,e,n){const i=Object.keys(e);if(i.length!==Object.keys(t).length)return!0;for(let r=0;r<i.length;r++){const s=i[r];if(e[s]!==t[s]&&!Bs(n,s))return!0}return!1}function Rd({vnode:t,parent:e},n){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===t&&(i.el=t.el),i===t)(t=e.vnode).el=n,e=e.parent;else break}}const ku=t=>t.__isSuspense;function Cd(t,e){e&&e.pendingBranch?Fe(t)?e.effects.push(...t):e.effects.push(t):kh(t)}const bn=Symbol.for("v-fgt"),ks=Symbol.for("v-txt"),Ji=Symbol.for("v-cmt"),oa=Symbol.for("v-stc"),wr=[];let zt=null;function zu(t=!1){wr.push(zt=t?null:[])}function Pd(){wr.pop(),zt=wr[wr.length-1]||null}let Ur=1;function sl(t,e=!1){Ur+=t,t<0&&zt&&e&&(zt.hasOnce=!0)}function Hu(t){return t.dynamicChildren=Ur>0?zt||Xi:null,Pd(),Ur>0&&zt&&zt.push(t),t}function Ld(t,e,n,i,r,s){return Hu(ws(t,e,n,i,r,s,!0))}function Id(t,e,n,i,r){return Hu(Vn(t,e,n,i,r,!0))}function Gu(t){return t?t.__v_isVNode===!0:!1}function cr(t,e){return t.type===e.type&&t.key===e.key}const Vu=({key:t})=>t??null,xs=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?ht(t)||vt(t)||Be(t)?{i:cn,r:t,k:e,f:!!n}:t:null);function ws(t,e=null,n=null,i=0,r=null,s=t===bn?0:1,a=!1,o=!1){const l={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&Vu(e),ref:e&&xs(e),scopeId:gu,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:i,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:cn};return o?(Uo(l,n),s&128&&t.normalize(l)):n&&(l.shapeFlag|=ht(n)?8:16),Ur>0&&!a&&zt&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&zt.push(l),l}const Vn=Ud;function Ud(t,e=null,n=null,i=0,r=null,s=!1){if((!t||t===ed)&&(t=Ji),Gu(t)){const o=Qi(t,e,!0);return n&&Uo(o,n),Ur>0&&!s&&zt&&(o.shapeFlag&6?zt[zt.indexOf(t)]=o:zt.push(o)),o.patchFlag=-2,o}if(Wd(t)&&(t=t.__vccOpts),e){e=Dd(e);let{class:o,style:l}=e;o&&!ht(o)&&(e.class=xo(o)),rt(l)&&(Ro(l)&&!Fe(l)&&(l=Mt({},l)),e.style=vo(l))}const a=ht(t)?1:ku(t)?128:Gh(t)?64:rt(t)?4:Be(t)?2:0;return ws(t,e,n,i,r,a,s,!0)}function Dd(t){return t?Ro(t)||Ru(t)?Mt({},t):t:null}function Qi(t,e,n=!1,i=!1){const{props:r,ref:s,patchFlag:a,children:o,transition:l}=t,c=e?Fd(r||{},e):r,u={__v_isVNode:!0,__v_skip:!0,type:t.type,props:c,key:c&&Vu(c),ref:e&&e.ref?n&&s?Fe(s)?s.concat(xs(e)):[s,xs(e)]:xs(e):s,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:o,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==bn?a===-1?16:a|16:a,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:l,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&Qi(t.ssContent),ssFallback:t.ssFallback&&Qi(t.ssFallback),el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return l&&i&&Po(u,l.clone(u)),u}function Nd(t=" ",e=0){return Vn(ks,null,t,e)}function on(t){return t==null||typeof t=="boolean"?Vn(Ji):Fe(t)?Vn(bn,null,t.slice()):Gu(t)?zn(t):Vn(ks,null,String(t))}function zn(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:Qi(t)}function Uo(t,e){let n=0;const{shapeFlag:i}=t;if(e==null)e=null;else if(Fe(e))n=16;else if(typeof e=="object")if(i&65){const r=e.default;r&&(r._c&&(r._d=!1),Uo(t,r()),r._c&&(r._d=!0));return}else{n=32;const r=e._;!r&&!Ru(e)?e._ctx=cn:r===3&&cn&&(cn.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else Be(e)?(e={default:e,_ctx:cn},n=32):(e=String(e),i&64?(n=16,e=[Nd(e)]):n=8);t.children=e,t.shapeFlag|=n}function Fd(...t){const e={};for(let n=0;n<t.length;n++){const i=t[n];for(const r in i)if(r==="class")e.class!==i.class&&(e.class=xo([e.class,i.class]));else if(r==="style")e.style=vo([e.style,i.style]);else if(Is(r)){const s=e[r],a=i[r];a&&s!==a&&!(Fe(s)&&s.includes(a))&&(e[r]=s?[].concat(s,a):a)}else r!==""&&(e[r]=i[r])}return e}function rn(t,e,n,i=null){hn(t,e,7,[n,i])}const Od=Tu();let Bd=0;function kd(t,e,n){const i=t.type,r=(e?e.appContext:t.appContext)||Od,s={uid:Bd++,vnode:t,type:i,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new ah(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Pu(i,r),emitsOptions:Bu(i,r),emit:null,emitted:null,propsDefaults:Qe,inheritAttrs:i.inheritAttrs,ctx:Qe,data:Qe,props:Qe,attrs:Qe,slots:Qe,refs:Qe,setupState:Qe,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=bd.bind(null,s),t.ce&&t.ce(s),s}let Rt=null,Rs,to;{const t=Ns(),e=(n,i)=>{let r;return(r=t[n])||(r=t[n]=[]),r.push(i),s=>{r.length>1?r.forEach(a=>a(s)):r[0](s)}};Rs=e("__VUE_INSTANCE_SETTERS__",n=>Rt=n),to=e("__VUE_SSR_SETTERS__",n=>Dr=n)}const kr=t=>{const e=Rt;return Rs(t),t.scope.on(),()=>{t.scope.off(),Rs(e)}},al=()=>{Rt&&Rt.scope.off(),Rs(null)};function Wu(t){return t.vnode.shapeFlag&4}let Dr=!1;function zd(t,e=!1,n=!1){e&&to(e);const{props:i,children:r}=t.vnode,s=Wu(t);ud(t,i,s,e),pd(t,r,n||e);const a=s?Hd(t,e):void 0;return e&&to(!1),a}function Hd(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,td);const{setup:i}=n;if(i){Rn();const r=t.setupContext=i.length>1?Vd(t):null,s=kr(t),a=Br(i,t,0,[t.props,r]),o=qc(a);if(Cn(),s(),(o||t.sp)&&!Tr(t)&&_u(t),o){if(a.then(al,al),e)return a.then(l=>{ol(t,l)}).catch(l=>{Fs(l,t,0)});t.asyncDep=a}else ol(t,a)}else Xu(t)}function ol(t,e,n){Be(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:rt(e)&&(t.setupState=fu(e)),Xu(t)}function Xu(t,e,n){const i=t.type;t.render||(t.render=i.render||un);{const r=kr(t);Rn();try{nd(t)}finally{Cn(),r()}}}const Gd={get(t,e){return gt(t,"get",""),t[e]}};function Vd(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,Gd),slots:t.slots,emit:t.emit,expose:e}}function Do(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(fu(wh(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Ar)return Ar[n](t)},has(e,n){return n in e||n in Ar}})):t.proxy}function Wd(t){return Be(t)&&"__vccOpts"in t}const Xd=(t,e)=>Uh(t,e,Dr),jd="3.5.17";/**
* @vue/runtime-dom v3.5.17
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let no;const ll=typeof window<"u"&&window.trustedTypes;if(ll)try{no=ll.createPolicy("vue",{createHTML:t=>t})}catch{}const ju=no?t=>no.createHTML(t):t=>t,qd="http://www.w3.org/2000/svg",Yd="http://www.w3.org/1998/Math/MathML",En=typeof document<"u"?document:null,cl=En&&En.createElement("template"),Kd={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,i)=>{const r=e==="svg"?En.createElementNS(qd,t):e==="mathml"?En.createElementNS(Yd,t):n?En.createElement(t,{is:n}):En.createElement(t);return t==="select"&&i&&i.multiple!=null&&r.setAttribute("multiple",i.multiple),r},createText:t=>En.createTextNode(t),createComment:t=>En.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>En.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,i,r,s){const a=n?n.previousSibling:e.lastChild;if(r&&(r===s||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),n),!(r===s||!(r=r.nextSibling)););else{cl.innerHTML=ju(i==="svg"?`<svg>${t}</svg>`:i==="mathml"?`<math>${t}</math>`:t);const o=cl.content;if(i==="svg"||i==="mathml"){const l=o.firstChild;for(;l.firstChild;)o.appendChild(l.firstChild);o.removeChild(l)}e.insertBefore(o,n)}return[a?a.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},$d=Symbol("_vtc");function Zd(t,e,n){const i=t[$d];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const ul=Symbol("_vod"),Jd=Symbol("_vsh"),Qd=Symbol(""),ep=/(^|;)\s*display\s*:/;function tp(t,e,n){const i=t.style,r=ht(n);let s=!1;if(n&&!r){if(e)if(ht(e))for(const a of e.split(";")){const o=a.slice(0,a.indexOf(":")).trim();n[o]==null&&Ms(i,o,"")}else for(const a in e)n[a]==null&&Ms(i,a,"");for(const a in n)a==="display"&&(s=!0),Ms(i,a,n[a])}else if(r){if(e!==n){const a=i[Qd];a&&(n+=";"+a),i.cssText=n,s=ep.test(n)}}else e&&t.removeAttribute("style");ul in t&&(t[ul]=s?i.display:"",t[Jd]&&(i.display="none"))}const fl=/\s*!important$/;function Ms(t,e,n){if(Fe(n))n.forEach(i=>Ms(t,e,i));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const i=np(t,e);fl.test(n)?t.setProperty(vi(i),n.replace(fl,""),"important"):t[i]=n}}const hl=["Webkit","Moz","ms"],la={};function np(t,e){const n=la[e];if(n)return n;let i=jn(e);if(i!=="filter"&&i in t)return la[e]=i;i=Yc(i);for(let r=0;r<hl.length;r++){const s=hl[r]+i;if(s in t)return la[e]=s}return e}const dl="http://www.w3.org/1999/xlink";function pl(t,e,n,i,r,s=sh(e)){i&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(dl,e.slice(6,e.length)):t.setAttributeNS(dl,e,n):n==null||s&&!Kc(n)?t.removeAttribute(e):t.setAttribute(e,s?"":rr(n)?String(n):n)}function ml(t,e,n,i,r){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?ju(n):n);return}const s=t.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){const o=s==="OPTION"?t.getAttribute("value")||"":t.value,l=n==null?t.type==="checkbox"?"on":"":String(n);(o!==l||!("_value"in t))&&(t.value=l),n==null&&t.removeAttribute(e),t._value=n;return}let a=!1;if(n===""||n==null){const o=typeof t[e];o==="boolean"?n=Kc(n):n==null&&o==="string"?(n="",a=!0):o==="number"&&(n=0,a=!0)}try{t[e]=n}catch{}a&&t.removeAttribute(r||e)}function ip(t,e,n,i){t.addEventListener(e,n,i)}function rp(t,e,n,i){t.removeEventListener(e,n,i)}const gl=Symbol("_vei");function sp(t,e,n,i,r=null){const s=t[gl]||(t[gl]={}),a=s[e];if(i&&a)a.value=i;else{const[o,l]=ap(e);if(i){const c=s[e]=cp(i,r);ip(t,o,c,l)}else a&&(rp(t,o,a,l),s[e]=void 0)}}const _l=/(?:Once|Passive|Capture)$/;function ap(t){let e;if(_l.test(t)){e={};let i;for(;i=t.match(_l);)t=t.slice(0,t.length-i[0].length),e[i[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):vi(t.slice(2)),e]}let ca=0;const op=Promise.resolve(),lp=()=>ca||(op.then(()=>ca=0),ca=Date.now());function cp(t,e){const n=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=n.attached)return;hn(up(i,n.value),e,5,[i])};return n.value=t,n.attached=lp(),n}function up(t,e){if(Fe(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(i=>r=>!r._stopped&&i&&i(r))}else return e}const vl=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,fp=(t,e,n,i,r,s)=>{const a=r==="svg";e==="class"?Zd(t,i,a):e==="style"?tp(t,n,i):Is(e)?mo(e)||sp(t,e,n,i,s):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):hp(t,e,i,a))?(ml(t,e,i),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&pl(t,e,i,a,s,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!ht(i))?ml(t,jn(e),i,s,e):(e==="true-value"?t._trueValue=i:e==="false-value"&&(t._falseValue=i),pl(t,e,i,a))};function hp(t,e,n,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in t&&vl(e)&&Be(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=t.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return vl(e)&&ht(n)?!1:e in t}const dp=Mt({patchProp:fp},Kd);let xl;function pp(){return xl||(xl=gd(dp))}const mp=(...t)=>{const e=pp().createApp(...t),{mount:n}=e;return e.mount=i=>{const r=_p(i);if(!r)return;const s=e._component;!Be(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const a=n(r,!1,gp(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),a},e};function gp(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function _p(t){return ht(t)?document.querySelector(t):t}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const No="152",Si={ROTATE:0,DOLLY:1,PAN:2},yi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},vp=0,Ml=1,xp=2,qu=1,Mp=2,yn=3,qn=0,Ct=1,An=2,Wn=0,Yi=1,Sl=2,yl=3,El=4,Sp=5,Gi=100,yp=101,Ep=102,bl=103,Tl=104,bp=200,Tp=201,Ap=202,wp=203,Yu=204,Ku=205,Rp=206,Cp=207,Pp=208,Lp=209,Ip=210,Up=0,Dp=1,Np=2,io=3,Fp=4,Op=5,Bp=6,kp=7,$u=0,zp=1,Hp=2,wn=0,Gp=1,Vp=2,Wp=3,Zu=4,Xp=5,Ju=300,er=301,tr=302,ro=303,so=304,zs=306,ao=1e3,Jt=1001,oo=1002,Tt=1003,Al=1004,ua=1005,Wt=1006,jp=1007,Nr=1008,di=1009,qp=1010,Yp=1011,Qu=1012,Kp=1013,ai=1014,oi=1015,Fr=1016,$p=1017,Zp=1018,Ki=1020,Jp=1021,Qt=1023,Qp=1024,em=1025,ci=1026,nr=1027,tm=1028,nm=1029,im=1030,rm=1031,sm=1033,fa=33776,ha=33777,da=33778,pa=33779,wl=35840,Rl=35841,Cl=35842,Pl=35843,am=36196,Ll=37492,Il=37496,Ul=37808,Dl=37809,Nl=37810,Fl=37811,Ol=37812,Bl=37813,kl=37814,zl=37815,Hl=37816,Gl=37817,Vl=37818,Wl=37819,Xl=37820,jl=37821,ma=36492,om=36283,ql=36284,Yl=36285,Kl=36286,ef=3e3,ui=3001,lm=3200,cm=3201,tf=0,um=1,fi="",Ne="srgb",dn="srgb-linear",nf="display-p3",ga=7680,fm=519,$l=35044,Zl="300 es",lo=1035;class xi{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const pt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],_a=Math.PI/180,co=180/Math.PI;function zr(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(pt[t&255]+pt[t>>8&255]+pt[t>>16&255]+pt[t>>24&255]+"-"+pt[e&255]+pt[e>>8&255]+"-"+pt[e>>16&15|64]+pt[e>>24&255]+"-"+pt[n&63|128]+pt[n>>8&255]+"-"+pt[n>>16&255]+pt[n>>24&255]+pt[i&255]+pt[i>>8&255]+pt[i>>16&255]+pt[i>>24&255]).toLowerCase()}function _t(t,e,n){return Math.max(e,Math.min(n,t))}function hm(t,e){return(t%e+e)%e}function va(t,e,n){return(1-n)*t+n*e}function Jl(t){return(t&t-1)===0&&t!==0}function dm(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function qr(t,e){switch(e.constructor){case Float32Array:return t;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function Ft(t,e){switch(e.constructor){case Float32Array:return t;case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}class Oe{constructor(e=0,n=0){Oe.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(_t(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xe{constructor(){Xe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(e,n,i,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=n,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],p=i[5],g=i[8],_=r[0],m=r[3],d=r[6],A=r[1],E=r[4],M=r[7],y=r[2],L=r[5],P=r[8];return s[0]=a*_+o*A+l*y,s[3]=a*m+o*E+l*L,s[6]=a*d+o*M+l*P,s[1]=c*_+u*A+h*y,s[4]=c*m+u*E+h*L,s[7]=c*d+u*M+h*P,s[2]=f*_+p*A+g*y,s[5]=f*m+p*E+g*L,s[8]=f*d+p*M+g*P,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return n*a*u-n*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,f=o*l-u*s,p=c*s-a*l,g=n*h+i*f+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=h*_,e[1]=(r*c-u*i)*_,e[2]=(o*i-r*a)*_,e[3]=f*_,e[4]=(u*n-r*l)*_,e[5]=(r*s-o*n)*_,e[6]=p*_,e[7]=(i*l-c*n)*_,e[8]=(a*n-i*s)*_,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+n,0,0,1),this}scale(e,n){return this.premultiply(xa.makeScale(e,n)),this}rotate(e){return this.premultiply(xa.makeRotation(-e)),this}translate(e,n){return this.premultiply(xa.makeTranslation(e,n)),this}makeTranslation(e,n){return this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const xa=new Xe;function rf(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Cs(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}const Ql={};function Rr(t){t in Ql||(Ql[t]=!0,console.warn(t))}function $i(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Ma(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}const pm=new Xe().fromArray([.8224621,.0331941,.0170827,.177538,.9668058,.0723974,-1e-7,1e-7,.9105199]),mm=new Xe().fromArray([1.2249401,-.0420569,-.0196376,-.2249404,1.0420571,-.0786361,1e-7,0,1.0982735]);function gm(t){return t.convertSRGBToLinear().applyMatrix3(mm)}function _m(t){return t.applyMatrix3(pm).convertLinearToSRGB()}const vm={[dn]:t=>t,[Ne]:t=>t.convertSRGBToLinear(),[nf]:gm},xm={[dn]:t=>t,[Ne]:t=>t.convertLinearToSRGB(),[nf]:_m},qt={enabled:!0,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(t){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!t},get workingColorSpace(){return dn},set workingColorSpace(t){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(t,e,n){if(this.enabled===!1||e===n||!e||!n)return t;const i=vm[e],r=xm[n];if(i===void 0||r===void 0)throw new Error(`Unsupported color space conversion, "${e}" to "${n}".`);return r(i(t))},fromWorkingColorSpace:function(t,e){return this.convert(t,this.workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this.workingColorSpace)}};let Ei;class sf{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ei===void 0&&(Ei=Cs("canvas")),Ei.width=e.width,Ei.height=e.height;const i=Ei.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Ei}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Cs("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=$i(s[a]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor($i(n[i]/255)*255):n[i]=$i(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}class af{constructor(e=null){this.isSource=!0,this.uuid=zr(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Sa(r[a].image)):s.push(Sa(r[a]))}else s=Sa(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Sa(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?sf.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Mm=0;class Ut extends xi{constructor(e=Ut.DEFAULT_IMAGE,n=Ut.DEFAULT_MAPPING,i=Jt,r=Jt,s=Wt,a=Nr,o=Qt,l=di,c=Ut.DEFAULT_ANISOTROPY,u=fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Mm++}),this.uuid=zr(),this.name="",this.source=new af(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Oe(0,0),this.repeat=new Oe(1,1),this.center=new Oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Rr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===ui?Ne:fi),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ju)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ao:e.x=e.x-Math.floor(e.x);break;case Jt:e.x=e.x<0?0:1;break;case oo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ao:e.y=e.y-Math.floor(e.y);break;case Jt:e.y=e.y<0?0:1;break;case oo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Rr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Ne?ui:ef}set encoding(e){Rr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===ui?Ne:fi}}Ut.DEFAULT_IMAGE=null;Ut.DEFAULT_MAPPING=Ju;Ut.DEFAULT_ANISOTROPY=1;class ft{constructor(e=0,n=0,i=0,r=1){ft.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*n+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*n+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*n+a[7]*i+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],p=l[5],g=l[9],_=l[2],m=l[6],d=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const E=(c+1)/2,M=(p+1)/2,y=(d+1)/2,L=(u+f)/4,P=(h+_)/4,I=(g+m)/4;return E>M&&E>y?E<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(E),r=L/i,s=P/i):M>y?M<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),i=L/r,s=I/r):y<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(y),i=P/s,r=I/s),this.set(i,r,s,n),this}let A=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(A)<.001&&(A=1),this.x=(m-g)/A,this.y=(h-_)/A,this.z=(f-u)/A,this.w=Math.acos((c+p+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class pi extends xi{constructor(e=1,n=1,i={}){super(),this.isWebGLRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new ft(0,0,e,n),this.scissorTest=!1,this.viewport=new ft(0,0,e,n);const r={width:e,height:n,depth:1};i.encoding!==void 0&&(Rr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===ui?Ne:fi),this.texture=new Ut(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.internalFormat=i.internalFormat!==void 0?i.internalFormat:null,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:Wt,this.depthBuffer=i.depthBuffer!==void 0?i.depthBuffer:!0,this.stencilBuffer=i.stencilBuffer!==void 0?i.stencilBuffer:!1,this.depthTexture=i.depthTexture!==void 0?i.depthTexture:null,this.samples=i.samples!==void 0?i.samples:0}setSize(e,n,i=1){(this.width!==e||this.height!==n||this.depth!==i)&&(this.width=e,this.height=n,this.depth=i,this.texture.image.width=e,this.texture.image.height=n,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new af(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class of extends Ut{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Tt,this.minFilter=Tt,this.wrapR=Jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Sm extends Ut{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Tt,this.minFilter=Tt,this.wrapR=Jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class mi{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],h=i[r+3];const f=s[a+0],p=s[a+1],g=s[a+2],_=s[a+3];if(o===0){e[n+0]=l,e[n+1]=c,e[n+2]=u,e[n+3]=h;return}if(o===1){e[n+0]=f,e[n+1]=p,e[n+2]=g,e[n+3]=_;return}if(h!==_||l!==f||c!==p||u!==g){let m=1-o;const d=l*f+c*p+u*g+h*_,A=d>=0?1:-1,E=1-d*d;if(E>Number.EPSILON){const y=Math.sqrt(E),L=Math.atan2(y,d*A);m=Math.sin(m*L)/y,o=Math.sin(o*L)/y}const M=o*A;if(l=l*m+f*M,c=c*m+p*M,u=u*m+g*M,h=h*m+_*M,m===1-o){const y=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=y,c*=y,u*=y,h*=y}}e[n]=l,e[n+1]=c,e[n+2]=u,e[n+3]=h}static multiplyQuaternionsFlat(e,n,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],h=s[a],f=s[a+1],p=s[a+2],g=s[a+3];return e[n]=o*g+u*h+l*p-c*f,e[n+1]=l*g+u*f+c*h-o*p,e[n+2]=c*g+u*p+o*f-l*h,e[n+3]=u*g-o*h-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),h=o(s/2),f=l(i/2),p=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=f*u*h+c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h-f*p*g;break;case"YXZ":this._x=f*u*h+c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h+f*p*g;break;case"ZXY":this._x=f*u*h-c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h-f*p*g;break;case"ZYX":this._x=f*u*h-c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h+f*p*g;break;case"YZX":this._x=f*u*h+c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h-f*p*g;break;case"XZY":this._x=f*u*h-c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],a=n[1],o=n[5],l=n[9],c=n[2],u=n[6],h=n[10],f=i+o+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(i>o&&i>h){const p=2*Math.sqrt(1+i-o-h);this._w=(u-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-i-h);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-i-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(_t(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,a=e._w,o=n._x,l=n._y,c=n._z,u=n._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-n;return this._w=p*a+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-n)*u)/c,f=Math.sin(n*u)/c;return this._w=a*h+this._w*f,this._x=i*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=Math.random(),n=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(n*Math.cos(r),i*Math.sin(s),i*Math.cos(s),n*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(e=0,n=0,i=0){z.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(ec.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(ec.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=l*n+a*r-o*i,u=l*i+o*n-s*r,h=l*r+s*i-a*n,f=-s*n-a*i-o*r;return this.x=c*l+f*-s+u*-o-h*-a,this.y=u*l+f*-a+h*-s-c*-o,this.z=h*l+f*-o+c*-a-u*-s,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,a=n.x,o=n.y,l=n.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ya.copy(this).projectOnVector(e),this.sub(ya)}reflect(e){return this.sub(ya.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(_t(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,n=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(n),this.y=i*Math.sin(n),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ya=new z,ec=new mi;class Hr{constructor(e=new z(1/0,1/0,1/0),n=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(_n.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(_n.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=_n.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){if(e.updateWorldMatrix(!1,!1),e.boundingBox!==void 0)e.boundingBox===null&&e.computeBoundingBox(),bi.copy(e.boundingBox),bi.applyMatrix4(e.matrixWorld),this.union(bi);else{const r=e.geometry;if(r!==void 0)if(n&&r.attributes!==void 0&&r.attributes.position!==void 0){const s=r.attributes.position;for(let a=0,o=s.count;a<o;a++)_n.fromBufferAttribute(s,a).applyMatrix4(e.matrixWorld),this.expandByPoint(_n)}else r.boundingBox===null&&r.computeBoundingBox(),bi.copy(r.boundingBox),bi.applyMatrix4(e.matrixWorld),this.union(bi)}const i=e.children;for(let r=0,s=i.length;r<s;r++)this.expandByObject(i[r],n);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,_n),_n.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ur),Yr.subVectors(this.max,ur),Ti.subVectors(e.a,ur),Ai.subVectors(e.b,ur),wi.subVectors(e.c,ur),Dn.subVectors(Ai,Ti),Nn.subVectors(wi,Ai),Qn.subVectors(Ti,wi);let n=[0,-Dn.z,Dn.y,0,-Nn.z,Nn.y,0,-Qn.z,Qn.y,Dn.z,0,-Dn.x,Nn.z,0,-Nn.x,Qn.z,0,-Qn.x,-Dn.y,Dn.x,0,-Nn.y,Nn.x,0,-Qn.y,Qn.x,0];return!Ea(n,Ti,Ai,wi,Yr)||(n=[1,0,0,0,1,0,0,0,1],!Ea(n,Ti,Ai,wi,Yr))?!1:(Kr.crossVectors(Dn,Nn),n=[Kr.x,Kr.y,Kr.z],Ea(n,Ti,Ai,wi,Yr))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,_n).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(_n).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const gn=[new z,new z,new z,new z,new z,new z,new z,new z],_n=new z,bi=new Hr,Ti=new z,Ai=new z,wi=new z,Dn=new z,Nn=new z,Qn=new z,ur=new z,Yr=new z,Kr=new z,ei=new z;function Ea(t,e,n,i,r){for(let s=0,a=t.length-3;s<=a;s+=3){ei.fromArray(t,s);const o=r.x*Math.abs(ei.x)+r.y*Math.abs(ei.y)+r.z*Math.abs(ei.z),l=e.dot(ei),c=n.dot(ei),u=i.dot(ei);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const ym=new Hr,fr=new z,ba=new z;class Fo{constructor(e=new z,n=-1){this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):ym.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;fr.subVectors(e,this.center);const n=fr.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(fr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ba.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(fr.copy(e.center).add(ba)),this.expandByPoint(fr.copy(e.center).sub(ba))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const vn=new z,Ta=new z,$r=new z,Fn=new z,Aa=new z,Zr=new z,wa=new z;class Em{constructor(e=new z,n=new z(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,vn)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=vn.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(vn.copy(this.origin).addScaledVector(this.direction,n),vn.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Ta.copy(e).add(n).multiplyScalar(.5),$r.copy(n).sub(e).normalize(),Fn.copy(this.origin).sub(Ta);const s=e.distanceTo(n)*.5,a=-this.direction.dot($r),o=Fn.dot(this.direction),l=-Fn.dot($r),c=Fn.lengthSq(),u=Math.abs(1-a*a);let h,f,p,g;if(u>0)if(h=a*l-o,f=a*o-l,g=s*u,h>=0)if(f>=-g)if(f<=g){const _=1/u;h*=_,f*=_,p=h*(h+a*f+2*o)+f*(a*h+f+2*l)+c}else f=s,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-a*s+o)),f=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(h=Math.max(0,-(a*s+o)),f=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+f*(f+2*l)+c);else f=a>0?-s:s,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Ta).addScaledVector($r,f),p}intersectSphere(e,n){vn.subVectors(e.center,this.origin);const i=vn.dot(this.direction),r=vn.dot(vn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,vn)!==null}intersectTriangle(e,n,i,r,s){Aa.subVectors(n,e),Zr.subVectors(i,e),wa.crossVectors(Aa,Zr);let a=this.direction.dot(wa),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Fn.subVectors(this.origin,e);const l=o*this.direction.dot(Zr.crossVectors(Fn,Zr));if(l<0)return null;const c=o*this.direction.dot(Aa.cross(Fn));if(c<0||l+c>a)return null;const u=-o*Fn.dot(wa);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class st{constructor(){st.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(e,n,i,r,s,a,o,l,c,u,h,f,p,g,_,m){const d=this.elements;return d[0]=e,d[4]=n,d[8]=i,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=u,d[10]=h,d[14]=f,d[3]=p,d[7]=g,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new st().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/Ri.setFromMatrixColumn(e,0).length(),s=1/Ri.setFromMatrixColumn(e,1).length(),a=1/Ri.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=a*u,p=a*h,g=o*u,_=o*h;n[0]=l*u,n[4]=-l*h,n[8]=c,n[1]=p+g*c,n[5]=f-_*c,n[9]=-o*l,n[2]=_-f*c,n[6]=g+p*c,n[10]=a*l}else if(e.order==="YXZ"){const f=l*u,p=l*h,g=c*u,_=c*h;n[0]=f+_*o,n[4]=g*o-p,n[8]=a*c,n[1]=a*h,n[5]=a*u,n[9]=-o,n[2]=p*o-g,n[6]=_+f*o,n[10]=a*l}else if(e.order==="ZXY"){const f=l*u,p=l*h,g=c*u,_=c*h;n[0]=f-_*o,n[4]=-a*h,n[8]=g+p*o,n[1]=p+g*o,n[5]=a*u,n[9]=_-f*o,n[2]=-a*c,n[6]=o,n[10]=a*l}else if(e.order==="ZYX"){const f=a*u,p=a*h,g=o*u,_=o*h;n[0]=l*u,n[4]=g*c-p,n[8]=f*c+_,n[1]=l*h,n[5]=_*c+f,n[9]=p*c-g,n[2]=-c,n[6]=o*l,n[10]=a*l}else if(e.order==="YZX"){const f=a*l,p=a*c,g=o*l,_=o*c;n[0]=l*u,n[4]=_-f*h,n[8]=g*h+p,n[1]=h,n[5]=a*u,n[9]=-o*u,n[2]=-c*u,n[6]=p*h+g,n[10]=f-_*h}else if(e.order==="XZY"){const f=a*l,p=a*c,g=o*l,_=o*c;n[0]=l*u,n[4]=-h,n[8]=c*u,n[1]=f*h+_,n[5]=a*u,n[9]=p*h-g,n[2]=g*h-p,n[6]=o*u,n[10]=_*h+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(bm,e,Tm)}lookAt(e,n,i){const r=this.elements;return Ot.subVectors(e,n),Ot.lengthSq()===0&&(Ot.z=1),Ot.normalize(),On.crossVectors(i,Ot),On.lengthSq()===0&&(Math.abs(i.z)===1?Ot.x+=1e-4:Ot.z+=1e-4,Ot.normalize(),On.crossVectors(i,Ot)),On.normalize(),Jr.crossVectors(Ot,On),r[0]=On.x,r[4]=Jr.x,r[8]=Ot.x,r[1]=On.y,r[5]=Jr.y,r[9]=Ot.y,r[2]=On.z,r[6]=Jr.z,r[10]=Ot.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],p=i[13],g=i[2],_=i[6],m=i[10],d=i[14],A=i[3],E=i[7],M=i[11],y=i[15],L=r[0],P=r[4],I=r[8],x=r[12],b=r[1],H=r[5],O=r[9],N=r[13],V=r[2],Y=r[6],Q=r[10],j=r[14],X=r[3],ue=r[7],ae=r[11],be=r[15];return s[0]=a*L+o*b+l*V+c*X,s[4]=a*P+o*H+l*Y+c*ue,s[8]=a*I+o*O+l*Q+c*ae,s[12]=a*x+o*N+l*j+c*be,s[1]=u*L+h*b+f*V+p*X,s[5]=u*P+h*H+f*Y+p*ue,s[9]=u*I+h*O+f*Q+p*ae,s[13]=u*x+h*N+f*j+p*be,s[2]=g*L+_*b+m*V+d*X,s[6]=g*P+_*H+m*Y+d*ue,s[10]=g*I+_*O+m*Q+d*ae,s[14]=g*x+_*N+m*j+d*be,s[3]=A*L+E*b+M*V+y*X,s[7]=A*P+E*H+M*Y+y*ue,s[11]=A*I+E*O+M*Q+y*ae,s[15]=A*x+E*N+M*j+y*be,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],p=e[14],g=e[3],_=e[7],m=e[11],d=e[15];return g*(+s*l*h-r*c*h-s*o*f+i*c*f+r*o*p-i*l*p)+_*(+n*l*p-n*c*f+s*a*f-r*a*p+r*c*u-s*l*u)+m*(+n*c*h-n*o*p-s*a*h+i*a*p+s*o*u-i*c*u)+d*(-r*o*u-n*l*h+n*o*f+r*a*h-i*a*f+i*l*u)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],p=e[11],g=e[12],_=e[13],m=e[14],d=e[15],A=h*m*c-_*f*c+_*l*p-o*m*p-h*l*d+o*f*d,E=g*f*c-u*m*c-g*l*p+a*m*p+u*l*d-a*f*d,M=u*_*c-g*h*c+g*o*p-a*_*p-u*o*d+a*h*d,y=g*h*l-u*_*l-g*o*f+a*_*f+u*o*m-a*h*m,L=n*A+i*E+r*M+s*y;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/L;return e[0]=A*P,e[1]=(_*f*s-h*m*s-_*r*p+i*m*p+h*r*d-i*f*d)*P,e[2]=(o*m*s-_*l*s+_*r*c-i*m*c-o*r*d+i*l*d)*P,e[3]=(h*l*s-o*f*s-h*r*c+i*f*c+o*r*p-i*l*p)*P,e[4]=E*P,e[5]=(u*m*s-g*f*s+g*r*p-n*m*p-u*r*d+n*f*d)*P,e[6]=(g*l*s-a*m*s-g*r*c+n*m*c+a*r*d-n*l*d)*P,e[7]=(a*f*s-u*l*s+u*r*c-n*f*c-a*r*p+n*l*p)*P,e[8]=M*P,e[9]=(g*h*s-u*_*s-g*i*p+n*_*p+u*i*d-n*h*d)*P,e[10]=(a*_*s-g*o*s+g*i*c-n*_*c-a*i*d+n*o*d)*P,e[11]=(u*o*s-a*h*s-u*i*c+n*h*c+a*i*p-n*o*p)*P,e[12]=y*P,e[13]=(u*_*r-g*h*r+g*i*f-n*_*f-u*i*m+n*h*m)*P,e[14]=(g*o*r-a*_*r-g*i*l+n*_*l+a*i*m-n*o*m)*P,e[15]=(a*h*r-u*o*r+u*i*l-n*h*l-a*i*f+n*o*f)*P,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,a=n._y,o=n._z,l=n._w,c=s+s,u=a+a,h=o+o,f=s*c,p=s*u,g=s*h,_=a*u,m=a*h,d=o*h,A=l*c,E=l*u,M=l*h,y=i.x,L=i.y,P=i.z;return r[0]=(1-(_+d))*y,r[1]=(p+M)*y,r[2]=(g-E)*y,r[3]=0,r[4]=(p-M)*L,r[5]=(1-(f+d))*L,r[6]=(m+A)*L,r[7]=0,r[8]=(g+E)*P,r[9]=(m-A)*P,r[10]=(1-(f+_))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=Ri.set(r[0],r[1],r[2]).length();const a=Ri.set(r[4],r[5],r[6]).length(),o=Ri.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Yt.copy(this);const c=1/s,u=1/a,h=1/o;return Yt.elements[0]*=c,Yt.elements[1]*=c,Yt.elements[2]*=c,Yt.elements[4]*=u,Yt.elements[5]*=u,Yt.elements[6]*=u,Yt.elements[8]*=h,Yt.elements[9]*=h,Yt.elements[10]*=h,n.setFromRotationMatrix(Yt),i.x=s,i.y=a,i.z=o,this}makePerspective(e,n,i,r,s,a){const o=this.elements,l=2*s/(n-e),c=2*s/(i-r),u=(n+e)/(n-e),h=(i+r)/(i-r),f=-(a+s)/(a-s),p=-2*a*s/(a-s);return o[0]=l,o[4]=0,o[8]=u,o[12]=0,o[1]=0,o[5]=c,o[9]=h,o[13]=0,o[2]=0,o[6]=0,o[10]=f,o[14]=p,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(e,n,i,r,s,a){const o=this.elements,l=1/(n-e),c=1/(i-r),u=1/(a-s),h=(n+e)*l,f=(i+r)*c,p=(a+s)*u;return o[0]=2*l,o[4]=0,o[8]=0,o[12]=-h,o[1]=0,o[5]=2*c,o[9]=0,o[13]=-f,o[2]=0,o[6]=0,o[10]=-2*u,o[14]=-p,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const Ri=new z,Yt=new st,bm=new z(0,0,0),Tm=new z(1,1,1),On=new z,Jr=new z,Ot=new z,tc=new st,nc=new mi;class Hs{constructor(e=0,n=0,i=0,r=Hs.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],h=r[2],f=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(_t(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-_t(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(_t(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-_t(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(_t(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-_t(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return tc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(tc,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return nc.setFromEuler(this),this.setFromQuaternion(nc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Hs.DEFAULT_ORDER="XYZ";class lf{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Am=0;const ic=new z,Ci=new mi,xn=new st,Qr=new z,hr=new z,wm=new z,Rm=new mi,rc=new z(1,0,0),sc=new z(0,1,0),ac=new z(0,0,1),Cm={type:"added"},oc={type:"removed"};class xt extends xi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Am++}),this.uuid=zr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xt.DEFAULT_UP.clone();const e=new z,n=new Hs,i=new mi,r=new z(1,1,1);function s(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new st},normalMatrix:{value:new Xe}}),this.matrix=new st,this.matrixWorld=new st,this.matrixAutoUpdate=xt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new lf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Ci.setFromAxisAngle(e,n),this.quaternion.multiply(Ci),this}rotateOnWorldAxis(e,n){return Ci.setFromAxisAngle(e,n),this.quaternion.premultiply(Ci),this}rotateX(e){return this.rotateOnAxis(rc,e)}rotateY(e){return this.rotateOnAxis(sc,e)}rotateZ(e){return this.rotateOnAxis(ac,e)}translateOnAxis(e,n){return ic.copy(e).applyQuaternion(this.quaternion),this.position.add(ic.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(rc,e)}translateY(e){return this.translateOnAxis(sc,e)}translateZ(e){return this.translateOnAxis(ac,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xn.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Qr.copy(e):Qr.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),hr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xn.lookAt(hr,Qr,this.up):xn.lookAt(Qr,hr,this.up),this.quaternion.setFromRotationMatrix(xn),r&&(xn.extractRotation(r.matrixWorld),Ci.setFromRotationMatrix(xn),this.quaternion.premultiply(Ci.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Cm)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(oc)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){for(let e=0;e<this.children.length;e++){const n=this.children[e];n.parent=null,n.dispatchEvent(oc)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),xn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xn.multiply(e.parent.matrixWorld)),e.applyMatrix4(xn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n){let i=[];this[e]===n&&i.push(this);for(let r=0,s=this.children.length;r<s;r++){const a=this.children[r].getObjectsByProperty(e,n);a.length>0&&(i=i.concat(a))}return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hr,e,wm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hr,Rm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++){const s=n[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),n===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(n){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),f=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations,this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}xt.DEFAULT_UP=new z(0,1,0);xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Kt=new z,Mn=new z,Ra=new z,Sn=new z,Pi=new z,Li=new z,lc=new z,Ca=new z,Pa=new z,La=new z;let es=!1;class Zt{constructor(e=new z,n=new z,i=new z){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Kt.subVectors(e,n),r.cross(Kt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Kt.subVectors(r,n),Mn.subVectors(i,n),Ra.subVectors(e,n);const a=Kt.dot(Kt),o=Kt.dot(Mn),l=Kt.dot(Ra),c=Mn.dot(Mn),u=Mn.dot(Ra),h=a*c-o*o;if(h===0)return s.set(-2,-1,-1);const f=1/h,p=(c*l-o*u)*f,g=(a*u-o*l)*f;return s.set(1-p-g,g,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,Sn),Sn.x>=0&&Sn.y>=0&&Sn.x+Sn.y<=1}static getUV(e,n,i,r,s,a,o,l){return es===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),es=!0),this.getInterpolation(e,n,i,r,s,a,o,l)}static getInterpolation(e,n,i,r,s,a,o,l){return this.getBarycoord(e,n,i,r,Sn),l.setScalar(0),l.addScaledVector(s,Sn.x),l.addScaledVector(a,Sn.y),l.addScaledVector(o,Sn.z),l}static isFrontFacing(e,n,i,r){return Kt.subVectors(i,n),Mn.subVectors(e,n),Kt.cross(Mn).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Kt.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),Kt.cross(Mn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Zt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Zt.getBarycoord(e,this.a,this.b,this.c,n)}getUV(e,n,i,r,s){return es===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),es=!0),Zt.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}getInterpolation(e,n,i,r,s){return Zt.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return Zt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Zt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let a,o;Pi.subVectors(r,i),Li.subVectors(s,i),Ca.subVectors(e,i);const l=Pi.dot(Ca),c=Li.dot(Ca);if(l<=0&&c<=0)return n.copy(i);Pa.subVectors(e,r);const u=Pi.dot(Pa),h=Li.dot(Pa);if(u>=0&&h<=u)return n.copy(r);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),n.copy(i).addScaledVector(Pi,a);La.subVectors(e,s);const p=Pi.dot(La),g=Li.dot(La);if(g>=0&&p<=g)return n.copy(s);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),n.copy(i).addScaledVector(Li,o);const m=u*g-p*h;if(m<=0&&h-u>=0&&p-g>=0)return lc.subVectors(s,r),o=(h-u)/(h-u+(p-g)),n.copy(r).addScaledVector(lc,o);const d=1/(m+_+f);return a=_*d,o=f*d,n.copy(i).addScaledVector(Pi,a).addScaledVector(Li,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let Pm=0;class Gr extends xi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Pm++}),this.uuid=zr(),this.name="",this.type="Material",this.blending=Yi,this.side=qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=Yu,this.blendDst=Ku,this.blendEquation=Gi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=io,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ga,this.stencilZFail=ga,this.stencilZPass=ga,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Yi&&(i.blending=this.blending),this.side!==qn&&(i.side=this.side),this.vertexColors&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=this.transparent),i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.stencilWrite=this.stencilWrite,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(i.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=this.premultipliedAlpha),this.forceSinglePass===!0&&(i.forceSinglePass=this.forceSinglePass),this.wireframe===!0&&(i.wireframe=this.wireframe),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=this.flatShading),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(n){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const cf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$t={h:0,s:0,l:0},ts={h:0,s:0,l:0};function Ia(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Ve{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,n===void 0&&i===void 0?this.set(e):this.setRGB(e,n,i)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Ne){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qt.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=qt.workingColorSpace){return this.r=e,this.g=n,this.b=i,qt.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=qt.workingColorSpace){if(e=hm(e,1),n=_t(n,0,1),i=_t(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,a=2*i-s;this.r=Ia(a,s,e+1/3),this.g=Ia(a,s,e),this.b=Ia(a,s,e-1/3)}return qt.toWorkingColorSpace(this,r),this}setStyle(e,n=Ne){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Ne){const i=cf[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=$i(e.r),this.g=$i(e.g),this.b=$i(e.b),this}copyLinearToSRGB(e){return this.r=Ma(e.r),this.g=Ma(e.g),this.b=Ma(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ne){return qt.fromWorkingColorSpace(mt.copy(this),e),Math.round(_t(mt.r*255,0,255))*65536+Math.round(_t(mt.g*255,0,255))*256+Math.round(_t(mt.b*255,0,255))}getHexString(e=Ne){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=qt.workingColorSpace){qt.fromWorkingColorSpace(mt.copy(this),n);const i=mt.r,r=mt.g,s=mt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,n=qt.workingColorSpace){return qt.fromWorkingColorSpace(mt.copy(this),n),e.r=mt.r,e.g=mt.g,e.b=mt.b,e}getStyle(e=Ne){qt.fromWorkingColorSpace(mt.copy(this),e);const n=mt.r,i=mt.g,r=mt.b;return e!==Ne?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL($t),$t.h+=e,$t.s+=n,$t.l+=i,this.setHSL($t.h,$t.s,$t.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL($t),e.getHSL(ts);const i=va($t.h,ts.h,n),r=va($t.s,ts.s,n),s=va($t.l,ts.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const mt=new Ve;Ve.NAMES=cf;class Oo extends Gr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=$u,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const it=new z,ns=new Oe;class fn{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=$l,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)ns.fromBufferAttribute(this,n),ns.applyMatrix3(e),this.setXY(n,ns.x,ns.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)it.fromBufferAttribute(this,n),it.applyMatrix3(e),this.setXYZ(n,it.x,it.y,it.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)it.fromBufferAttribute(this,n),it.applyMatrix4(e),this.setXYZ(n,it.x,it.y,it.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)it.fromBufferAttribute(this,n),it.applyNormalMatrix(e),this.setXYZ(n,it.x,it.y,it.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)it.fromBufferAttribute(this,n),it.transformDirection(e),this.setXYZ(n,it.x,it.y,it.z);return this}set(e,n=0){return this.array.set(e,n),this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=qr(n,this.array)),n}setX(e,n){return this.normalized&&(n=Ft(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=qr(n,this.array)),n}setY(e,n){return this.normalized&&(n=Ft(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=qr(n,this.array)),n}setZ(e,n){return this.normalized&&(n=Ft(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=qr(n,this.array)),n}setW(e,n){return this.normalized&&(n=Ft(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=Ft(n,this.array),i=Ft(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=Ft(n,this.array),i=Ft(i,this.array),r=Ft(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=Ft(n,this.array),i=Ft(i,this.array),r=Ft(r,this.array),s=Ft(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==$l&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class uf extends fn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class ff extends fn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Dt extends fn{constructor(e,n,i){super(new Float32Array(e),n,i)}}let Lm=0;const Gt=new st,Ua=new xt,Ii=new z,Bt=new Hr,dr=new Hr,ut=new z;class Ln extends xi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Lm++}),this.uuid=zr(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(rf(e)?ff:uf)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Xe().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Gt.makeRotationFromQuaternion(e),this.applyMatrix4(Gt),this}rotateX(e){return Gt.makeRotationX(e),this.applyMatrix4(Gt),this}rotateY(e){return Gt.makeRotationY(e),this.applyMatrix4(Gt),this}rotateZ(e){return Gt.makeRotationZ(e),this.applyMatrix4(Gt),this}translate(e,n,i){return Gt.makeTranslation(e,n,i),this.applyMatrix4(Gt),this}scale(e,n,i){return Gt.makeScale(e,n,i),this.applyMatrix4(Gt),this}lookAt(e){return Ua.lookAt(e),Ua.updateMatrix(),this.applyMatrix4(Ua.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ii).negate(),this.translate(Ii.x,Ii.y,Ii.z),this}setFromPoints(e){const n=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Dt(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hr);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];Bt.setFromBufferAttribute(s),this.morphTargetsRelative?(ut.addVectors(this.boundingBox.min,Bt.min),this.boundingBox.expandByPoint(ut),ut.addVectors(this.boundingBox.max,Bt.max),this.boundingBox.expandByPoint(ut)):(this.boundingBox.expandByPoint(Bt.min),this.boundingBox.expandByPoint(Bt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new z,1/0);return}if(e){const i=this.boundingSphere.center;if(Bt.setFromBufferAttribute(e),n)for(let s=0,a=n.length;s<a;s++){const o=n[s];dr.setFromBufferAttribute(o),this.morphTargetsRelative?(ut.addVectors(Bt.min,dr.min),Bt.expandByPoint(ut),ut.addVectors(Bt.max,dr.max),Bt.expandByPoint(ut)):(Bt.expandByPoint(dr.min),Bt.expandByPoint(dr.max))}Bt.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)ut.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(ut));if(n)for(let s=0,a=n.length;s<a;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)ut.fromBufferAttribute(o,c),l&&(Ii.fromBufferAttribute(e,c),ut.add(Ii)),r=Math.max(r,i.distanceToSquared(ut))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=n.position.array,s=n.normal.array,a=n.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new fn(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let b=0;b<o;b++)c[b]=new z,u[b]=new z;const h=new z,f=new z,p=new z,g=new Oe,_=new Oe,m=new Oe,d=new z,A=new z;function E(b,H,O){h.fromArray(r,b*3),f.fromArray(r,H*3),p.fromArray(r,O*3),g.fromArray(a,b*2),_.fromArray(a,H*2),m.fromArray(a,O*2),f.sub(h),p.sub(h),_.sub(g),m.sub(g);const N=1/(_.x*m.y-m.x*_.y);isFinite(N)&&(d.copy(f).multiplyScalar(m.y).addScaledVector(p,-_.y).multiplyScalar(N),A.copy(p).multiplyScalar(_.x).addScaledVector(f,-m.x).multiplyScalar(N),c[b].add(d),c[H].add(d),c[O].add(d),u[b].add(A),u[H].add(A),u[O].add(A))}let M=this.groups;M.length===0&&(M=[{start:0,count:i.length}]);for(let b=0,H=M.length;b<H;++b){const O=M[b],N=O.start,V=O.count;for(let Y=N,Q=N+V;Y<Q;Y+=3)E(i[Y+0],i[Y+1],i[Y+2])}const y=new z,L=new z,P=new z,I=new z;function x(b){P.fromArray(s,b*3),I.copy(P);const H=c[b];y.copy(H),y.sub(P.multiplyScalar(P.dot(H))).normalize(),L.crossVectors(I,H);const N=L.dot(u[b])<0?-1:1;l[b*4]=y.x,l[b*4+1]=y.y,l[b*4+2]=y.z,l[b*4+3]=N}for(let b=0,H=M.length;b<H;++b){const O=M[b],N=O.start,V=O.count;for(let Y=N,Q=N+V;Y<Q;Y+=3)x(i[Y+0]),x(i[Y+1]),x(i[Y+2])}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new fn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const r=new z,s=new z,a=new z,o=new z,l=new z,c=new z,u=new z,h=new z;if(e)for(let f=0,p=e.count;f<p;f+=3){const g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(n,g),s.fromBufferAttribute(n,_),a.fromBufferAttribute(n,m),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=n.count;f<p;f+=3)r.fromBufferAttribute(n,f+0),s.fromBufferAttribute(n,f+1),a.fromBufferAttribute(n,f+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeGeometries() instead."),this}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)ut.fromBufferAttribute(e,n),ut.normalize(),e.setXYZ(n,ut.x,ut.y,ut.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,f=new c.constructor(l.length*u);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?p=l[_]*o.data.stride+o.offset:p=l[_]*u;for(let d=0;d<u;d++)f[g++]=c[p++]}return new fn(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Ln,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){const f=c[u],p=e(f,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const p=c[h];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(n))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(n));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const cc=new st,sn=new Em,is=new Fo,uc=new z,Ui=new z,Di=new z,Ni=new z,Da=new z,rs=new z,ss=new Oe,as=new Oe,os=new Oe,fc=new z,hc=new z,dc=new z,ls=new z,cs=new z;class It extends xt{constructor(e=new Ln,n=new Oo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){rs.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],h=s[l];u!==0&&(Da.fromBufferAttribute(h,e),a?rs.addScaledVector(Da,u):rs.addScaledVector(Da.sub(n),u))}n.add(rs)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),is.copy(i.boundingSphere),is.applyMatrix4(s),sn.copy(e.ray).recast(e.near),!(is.containsPoint(sn.origin)===!1&&(sn.intersectSphere(is,uc)===null||sn.origin.distanceToSquared(uc)>(e.far-e.near)**2))&&(cc.copy(s).invert(),sn.copy(e.ray).applyMatrix4(cc),!(i.boundingBox!==null&&sn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n)))}_computeIntersections(e,n){let i;const r=this.geometry,s=this.material,a=r.index,o=r.attributes.position,l=r.attributes.uv,c=r.attributes.uv1,u=r.attributes.normal,h=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(s))for(let p=0,g=h.length;p<g;p++){const _=h[p],m=s[_.materialIndex],d=Math.max(_.start,f.start),A=Math.min(a.count,Math.min(_.start+_.count,f.start+f.count));for(let E=d,M=A;E<M;E+=3){const y=a.getX(E),L=a.getX(E+1),P=a.getX(E+2);i=us(this,m,e,sn,l,c,u,y,L,P),i&&(i.faceIndex=Math.floor(E/3),i.face.materialIndex=_.materialIndex,n.push(i))}}else{const p=Math.max(0,f.start),g=Math.min(a.count,f.start+f.count);for(let _=p,m=g;_<m;_+=3){const d=a.getX(_),A=a.getX(_+1),E=a.getX(_+2);i=us(this,s,e,sn,l,c,u,d,A,E),i&&(i.faceIndex=Math.floor(_/3),n.push(i))}}else if(o!==void 0)if(Array.isArray(s))for(let p=0,g=h.length;p<g;p++){const _=h[p],m=s[_.materialIndex],d=Math.max(_.start,f.start),A=Math.min(o.count,Math.min(_.start+_.count,f.start+f.count));for(let E=d,M=A;E<M;E+=3){const y=E,L=E+1,P=E+2;i=us(this,m,e,sn,l,c,u,y,L,P),i&&(i.faceIndex=Math.floor(E/3),i.face.materialIndex=_.materialIndex,n.push(i))}}else{const p=Math.max(0,f.start),g=Math.min(o.count,f.start+f.count);for(let _=p,m=g;_<m;_+=3){const d=_,A=_+1,E=_+2;i=us(this,s,e,sn,l,c,u,d,A,E),i&&(i.faceIndex=Math.floor(_/3),n.push(i))}}}}function Im(t,e,n,i,r,s,a,o){let l;if(e.side===Ct?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===qn,o),l===null)return null;cs.copy(o),cs.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(cs);return c<n.near||c>n.far?null:{distance:c,point:cs.clone(),object:t}}function us(t,e,n,i,r,s,a,o,l,c){t.getVertexPosition(o,Ui),t.getVertexPosition(l,Di),t.getVertexPosition(c,Ni);const u=Im(t,e,n,i,Ui,Di,Ni,ls);if(u){r&&(ss.fromBufferAttribute(r,o),as.fromBufferAttribute(r,l),os.fromBufferAttribute(r,c),u.uv=Zt.getInterpolation(ls,Ui,Di,Ni,ss,as,os,new Oe)),s&&(ss.fromBufferAttribute(s,o),as.fromBufferAttribute(s,l),os.fromBufferAttribute(s,c),u.uv1=Zt.getInterpolation(ls,Ui,Di,Ni,ss,as,os,new Oe),u.uv2=u.uv1),a&&(fc.fromBufferAttribute(a,o),hc.fromBufferAttribute(a,l),dc.fromBufferAttribute(a,c),u.normal=Zt.getInterpolation(ls,Ui,Di,Ni,fc,hc,dc,new z),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new z,materialIndex:0};Zt.getNormal(Ui,Di,Ni,h.normal),u.face=h}return u}class sr extends Ln{constructor(e=1,n=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],h=[];let f=0,p=0;g("z","y","x",-1,-1,i,n,e,a,s,0),g("z","y","x",1,-1,i,n,-e,a,s,1),g("x","z","y",1,1,e,i,n,r,a,2),g("x","z","y",1,-1,e,i,-n,r,a,3),g("x","y","z",1,-1,e,n,i,r,s,4),g("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Dt(c,3)),this.setAttribute("normal",new Dt(u,3)),this.setAttribute("uv",new Dt(h,2));function g(_,m,d,A,E,M,y,L,P,I,x){const b=M/P,H=y/I,O=M/2,N=y/2,V=L/2,Y=P+1,Q=I+1;let j=0,X=0;const ue=new z;for(let ae=0;ae<Q;ae++){const be=ae*H-N;for(let he=0;he<Y;he++){const K=he*b-O;ue[_]=K*A,ue[m]=be*E,ue[d]=V,c.push(ue.x,ue.y,ue.z),ue[_]=0,ue[m]=0,ue[d]=L>0?1:-1,u.push(ue.x,ue.y,ue.z),h.push(he/P),h.push(1-ae/I),j+=1}}for(let ae=0;ae<I;ae++)for(let be=0;be<P;be++){const he=f+be+Y*ae,K=f+be+Y*(ae+1),oe=f+(be+1)+Y*(ae+1),_e=f+(be+1)+Y*ae;l.push(he,K,_e),l.push(K,oe,_e),X+=6}o.addGroup(p,X,x),p+=X,f+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ir(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function bt(t){const e={};for(let n=0;n<t.length;n++){const i=ir(t[n]);for(const r in i)e[r]=i[r]}return e}function Um(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function hf(t){return t.getRenderTarget()===null?t.outputColorSpace:dn}const Dm={clone:ir,merge:bt};var Nm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Fm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class gi extends Gr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Nm,this.fragmentShader=Fm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ir(e.uniforms),this.uniformsGroups=Um(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?n.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?n.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[r]={type:"m4",value:a.toArray()}:n.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class df extends xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new st,this.projectionMatrix=new st,this.projectionMatrixInverse=new st}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(-n[8],-n[9],-n[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Xt extends df{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=co*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(_a*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return co*2*Math.atan(Math.tan(_a*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,n,i,r,s,a){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(_a*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,n-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Fi=-90,Oi=1;class Om extends xt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i;const r=new Xt(Fi,Oi,e,n);r.layers=this.layers,r.up.set(0,1,0),r.lookAt(1,0,0),this.add(r);const s=new Xt(Fi,Oi,e,n);s.layers=this.layers,s.up.set(0,1,0),s.lookAt(-1,0,0),this.add(s);const a=new Xt(Fi,Oi,e,n);a.layers=this.layers,a.up.set(0,0,-1),a.lookAt(0,1,0),this.add(a);const o=new Xt(Fi,Oi,e,n);o.layers=this.layers,o.up.set(0,0,1),o.lookAt(0,-1,0),this.add(o);const l=new Xt(Fi,Oi,e,n);l.layers=this.layers,l.up.set(0,1,0),l.lookAt(0,0,1),this.add(l);const c=new Xt(Fi,Oi,e,n);c.layers=this.layers,c.up.set(0,1,0),c.lookAt(0,0,-1),this.add(c)}update(e,n){this.parent===null&&this.updateMatrixWorld();const i=this.renderTarget,[r,s,a,o,l,c]=this.children,u=e.getRenderTarget(),h=e.toneMapping,f=e.xr.enabled;e.toneMapping=wn,e.xr.enabled=!1;const p=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0),e.render(n,r),e.setRenderTarget(i,1),e.render(n,s),e.setRenderTarget(i,2),e.render(n,a),e.setRenderTarget(i,3),e.render(n,o),e.setRenderTarget(i,4),e.render(n,l),i.texture.generateMipmaps=p,e.setRenderTarget(i,5),e.render(n,c),e.setRenderTarget(u),e.toneMapping=h,e.xr.enabled=f,i.texture.needsPMREMUpdate=!0}}class pf extends Ut{constructor(e,n,i,r,s,a,o,l,c,u){e=e!==void 0?e:[],n=n!==void 0?n:er,super(e,n,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Bm extends pi{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];n.encoding!==void 0&&(Rr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===ui?Ne:fi),this.texture=new pf(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Wt}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new sr(5,5,5),s=new gi({name:"CubemapFromEquirect",uniforms:ir(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ct,blending:Wn});s.uniforms.tEquirect.value=n;const a=new It(r,s),o=n.minFilter;return n.minFilter===Nr&&(n.minFilter=Wt),new Om(1,10,this).update(e,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(n,i,r);e.setRenderTarget(s)}}const Na=new z,km=new z,zm=new Xe;class ii{constructor(e=new z(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Na.subVectors(i,n).cross(km.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(Na),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||zm.getNormalMatrix(e),r=this.coplanarPoint(Na).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ti=new Fo,fs=new z;class Bo{constructor(e=new ii,n=new ii,i=new ii,r=new ii,s=new ii,a=new ii){this.planes=[e,n,i,r,s,a]}set(e,n,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e){const n=this.planes,i=e.elements,r=i[0],s=i[1],a=i[2],o=i[3],l=i[4],c=i[5],u=i[6],h=i[7],f=i[8],p=i[9],g=i[10],_=i[11],m=i[12],d=i[13],A=i[14],E=i[15];return n[0].setComponents(o-r,h-l,_-f,E-m).normalize(),n[1].setComponents(o+r,h+l,_+f,E+m).normalize(),n[2].setComponents(o+s,h+c,_+p,E+d).normalize(),n[3].setComponents(o-s,h-c,_-p,E-d).normalize(),n[4].setComponents(o-a,h-u,_-g,E-A).normalize(),n[5].setComponents(o+a,h+u,_+g,E+A).normalize(),this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ti.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),ti.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ti)}intersectsSprite(e){return ti.center.set(0,0,0),ti.radius=.7071067811865476,ti.applyMatrix4(e.matrixWorld),this.intersectsSphere(ti)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(fs.x=r.normal.x>0?e.max.x:e.min.x,fs.y=r.normal.y>0?e.max.y:e.min.y,fs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(fs)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function mf(){let t=null,e=!1,n=null,i=null;function r(s,a){n(s,a),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function Hm(t,e){const n=e.isWebGL2,i=new WeakMap;function r(c,u){const h=c.array,f=c.usage,p=t.createBuffer();t.bindBuffer(u,p),t.bufferData(u,h,f),c.onUploadCallback();let g;if(h instanceof Float32Array)g=t.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(n)g=t.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=t.UNSIGNED_SHORT;else if(h instanceof Int16Array)g=t.SHORT;else if(h instanceof Uint32Array)g=t.UNSIGNED_INT;else if(h instanceof Int32Array)g=t.INT;else if(h instanceof Int8Array)g=t.BYTE;else if(h instanceof Uint8Array)g=t.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)g=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:p,type:g,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version}}function s(c,u,h){const f=u.array,p=u.updateRange;t.bindBuffer(h,c),p.count===-1?t.bufferSubData(h,0,f):(n?t.bufferSubData(h,p.offset*f.BYTES_PER_ELEMENT,f,p.offset,p.count):t.bufferSubData(h,p.offset*f.BYTES_PER_ELEMENT,f.subarray(p.offset,p.offset+p.count)),p.count=-1),u.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);u&&(t.deleteBuffer(u.buffer),i.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const f=i.get(c);(!f||f.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);h===void 0?i.set(c,r(c,u)):h.version<c.version&&(s(h.buffer,c,u),h.version=c.version)}return{get:a,remove:o,update:l}}class ko extends Ln{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,a=n/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,h=e/o,f=n/l,p=[],g=[],_=[],m=[];for(let d=0;d<u;d++){const A=d*f-a;for(let E=0;E<c;E++){const M=E*h-s;g.push(M,-A,0),_.push(0,0,1),m.push(E/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let A=0;A<o;A++){const E=A+c*d,M=A+c*(d+1),y=A+1+c*(d+1),L=A+1+c*d;p.push(E,M,L),p.push(M,y,L)}this.setIndex(p),this.setAttribute("position",new Dt(g,3)),this.setAttribute("normal",new Dt(_,3)),this.setAttribute("uv",new Dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ko(e.width,e.height,e.widthSegments,e.heightSegments)}}var Gm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Vm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wm=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Xm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,jm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,qm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ym="vec3 transformed = vec3( position );",Km=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$m=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Zm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			 return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Jm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Qm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,eg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,tg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ng=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ig=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,rg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,sg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,ag=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,og=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,lg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,cg=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ug=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,fg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,hg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,dg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,pg="gl_FragColor = linearToOutputTexel( gl_FragColor );",mg=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,gg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,_g=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,vg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,xg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Mg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Sg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,yg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Eg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,bg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Tg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ag=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,wg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Rg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Cg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Pg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Lg=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,Ig=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ug=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Dg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ng=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Fg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif`,Og=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Bg=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,kg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,zg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,Hg=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gg=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vg=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Wg=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Xg=`#ifdef USE_MAP
	diffuseColor *= texture2D( map, vMapUv );
#endif`,jg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,qg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Yg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Kg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$g=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Zg=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Jg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Qg=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,e_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,t_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#ifdef USE_NORMALMAP_TANGENTSPACE
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal, vNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 geometryNormal = normal;`,n_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,i_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,r_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,s_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,a_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,o_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,l_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,c_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,u_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,f_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,h_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,d_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,p_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,m_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,g_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,__=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,v_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,x_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,M_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,S_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,y_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,E_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,b_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,T_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,A_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,w_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,R_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,C_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,P_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,L_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
#endif`,I_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,U_=`#ifdef USE_UV
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,D_=`#ifdef USE_UV
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,N_=`#ifdef USE_UV
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,F_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const O_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,B_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,k_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,z_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,H_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,G_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,V_=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,W_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,X_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,j_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,q_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Y_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,K_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Z_=`#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,J_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Q_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ev=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,nv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,rv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,sv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,av=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ov=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,lv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,uv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,hv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,dv=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,mv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,ze={alphamap_fragment:Gm,alphamap_pars_fragment:Vm,alphatest_fragment:Wm,alphatest_pars_fragment:Xm,aomap_fragment:jm,aomap_pars_fragment:qm,begin_vertex:Ym,beginnormal_vertex:Km,bsdfs:$m,iridescence_fragment:Zm,bumpmap_pars_fragment:Jm,clipping_planes_fragment:Qm,clipping_planes_pars_fragment:eg,clipping_planes_pars_vertex:tg,clipping_planes_vertex:ng,color_fragment:ig,color_pars_fragment:rg,color_pars_vertex:sg,color_vertex:ag,common:og,cube_uv_reflection_fragment:lg,defaultnormal_vertex:cg,displacementmap_pars_vertex:ug,displacementmap_vertex:fg,emissivemap_fragment:hg,emissivemap_pars_fragment:dg,encodings_fragment:pg,encodings_pars_fragment:mg,envmap_fragment:gg,envmap_common_pars_fragment:_g,envmap_pars_fragment:vg,envmap_pars_vertex:xg,envmap_physical_pars_fragment:Lg,envmap_vertex:Mg,fog_vertex:Sg,fog_pars_vertex:yg,fog_fragment:Eg,fog_pars_fragment:bg,gradientmap_pars_fragment:Tg,lightmap_fragment:Ag,lightmap_pars_fragment:wg,lights_lambert_fragment:Rg,lights_lambert_pars_fragment:Cg,lights_pars_begin:Pg,lights_toon_fragment:Ig,lights_toon_pars_fragment:Ug,lights_phong_fragment:Dg,lights_phong_pars_fragment:Ng,lights_physical_fragment:Fg,lights_physical_pars_fragment:Og,lights_fragment_begin:Bg,lights_fragment_maps:kg,lights_fragment_end:zg,logdepthbuf_fragment:Hg,logdepthbuf_pars_fragment:Gg,logdepthbuf_pars_vertex:Vg,logdepthbuf_vertex:Wg,map_fragment:Xg,map_pars_fragment:jg,map_particle_fragment:qg,map_particle_pars_fragment:Yg,metalnessmap_fragment:Kg,metalnessmap_pars_fragment:$g,morphcolor_vertex:Zg,morphnormal_vertex:Jg,morphtarget_pars_vertex:Qg,morphtarget_vertex:e_,normal_fragment_begin:t_,normal_fragment_maps:n_,normal_pars_fragment:i_,normal_pars_vertex:r_,normal_vertex:s_,normalmap_pars_fragment:a_,clearcoat_normal_fragment_begin:o_,clearcoat_normal_fragment_maps:l_,clearcoat_pars_fragment:c_,iridescence_pars_fragment:u_,output_fragment:f_,packing:h_,premultiplied_alpha_fragment:d_,project_vertex:p_,dithering_fragment:m_,dithering_pars_fragment:g_,roughnessmap_fragment:__,roughnessmap_pars_fragment:v_,shadowmap_pars_fragment:x_,shadowmap_pars_vertex:M_,shadowmap_vertex:S_,shadowmask_pars_fragment:y_,skinbase_vertex:E_,skinning_pars_vertex:b_,skinning_vertex:T_,skinnormal_vertex:A_,specularmap_fragment:w_,specularmap_pars_fragment:R_,tonemapping_fragment:C_,tonemapping_pars_fragment:P_,transmission_fragment:L_,transmission_pars_fragment:I_,uv_pars_fragment:U_,uv_pars_vertex:D_,uv_vertex:N_,worldpos_vertex:F_,background_vert:O_,background_frag:B_,backgroundCube_vert:k_,backgroundCube_frag:z_,cube_vert:H_,cube_frag:G_,depth_vert:V_,depth_frag:W_,distanceRGBA_vert:X_,distanceRGBA_frag:j_,equirect_vert:q_,equirect_frag:Y_,linedashed_vert:K_,linedashed_frag:$_,meshbasic_vert:Z_,meshbasic_frag:J_,meshlambert_vert:Q_,meshlambert_frag:ev,meshmatcap_vert:tv,meshmatcap_frag:nv,meshnormal_vert:iv,meshnormal_frag:rv,meshphong_vert:sv,meshphong_frag:av,meshphysical_vert:ov,meshphysical_frag:lv,meshtoon_vert:cv,meshtoon_frag:uv,points_vert:fv,points_frag:hv,shadow_vert:dv,shadow_frag:pv,sprite_vert:mv,sprite_frag:gv},xe={common:{diffuse:{value:new Ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new Oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new Ve(16777215)},opacity:{value:1},center:{value:new Oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaTest:{value:0}}},ln={basic:{uniforms:bt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:bt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new Ve(0)}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:bt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new Ve(0)},specular:{value:new Ve(1118481)},shininess:{value:30}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:bt([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new Ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:bt([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new Ve(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:bt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:bt([xe.points,xe.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:bt([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:bt([xe.common,xe.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:bt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:bt([xe.sprite,xe.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distanceRGBA:{uniforms:bt([xe.common,xe.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distanceRGBA_vert,fragmentShader:ze.distanceRGBA_frag},shadow:{uniforms:bt([xe.lights,xe.fog,{color:{value:new Ve(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};ln.physical={uniforms:bt([ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new Oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new Ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new Oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new Ve(0)},specularColor:{value:new Ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};const hs={r:0,b:0,g:0};function _v(t,e,n,i,r,s,a){const o=new Ve(0);let l=s===!0?0:1,c,u,h=null,f=0,p=null;function g(m,d){let A=!1,E=d.isScene===!0?d.background:null;switch(E&&E.isTexture&&(E=(d.backgroundBlurriness>0?n:e).get(E)),E===null?_(o,l):E&&E.isColor&&(_(E,1),A=!0),t.xr.getEnvironmentBlendMode()){case"opaque":A=!0;break;case"additive":i.buffers.color.setClear(0,0,0,1,a),A=!0;break;case"alpha-blend":i.buffers.color.setClear(0,0,0,0,a),A=!0;break}(t.autoClear||A)&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),E&&(E.isCubeTexture||E.mapping===zs)?(u===void 0&&(u=new It(new sr(1,1,1),new gi({name:"BackgroundCubeMaterial",uniforms:ir(ln.backgroundCube.uniforms),vertexShader:ln.backgroundCube.vertexShader,fragmentShader:ln.backgroundCube.fragmentShader,side:Ct,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(L,P,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=E,u.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,u.material.toneMapped=E.colorSpace!==Ne,(h!==E||f!==E.version||p!==t.toneMapping)&&(u.material.needsUpdate=!0,h=E,f=E.version,p=t.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new It(new ko(2,2),new gi({name:"BackgroundMaterial",uniforms:ir(ln.background.uniforms),vertexShader:ln.background.vertexShader,fragmentShader:ln.background.fragmentShader,side:qn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,c.material.toneMapped=E.colorSpace!==Ne,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(h!==E||f!==E.version||p!==t.toneMapping)&&(c.material.needsUpdate=!0,h=E,f=E.version,p=t.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function _(m,d){m.getRGB(hs,hf(t)),i.buffers.color.setClear(hs.r,hs.g,hs.b,d,a)}return{getClearColor:function(){return o},setClearColor:function(m,d=1){o.set(m),l=d,_(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,_(o,l)},render:g}}function vv(t,e,n,i){const r=t.getParameter(t.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||s!==null,o={},l=m(null);let c=l,u=!1;function h(V,Y,Q,j,X){let ue=!1;if(a){const ae=_(j,Q,Y);c!==ae&&(c=ae,p(c.object)),ue=d(V,j,Q,X),ue&&A(V,j,Q,X)}else{const ae=Y.wireframe===!0;(c.geometry!==j.id||c.program!==Q.id||c.wireframe!==ae)&&(c.geometry=j.id,c.program=Q.id,c.wireframe=ae,ue=!0)}X!==null&&n.update(X,t.ELEMENT_ARRAY_BUFFER),(ue||u)&&(u=!1,I(V,Y,Q,j),X!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,n.get(X).buffer))}function f(){return i.isWebGL2?t.createVertexArray():s.createVertexArrayOES()}function p(V){return i.isWebGL2?t.bindVertexArray(V):s.bindVertexArrayOES(V)}function g(V){return i.isWebGL2?t.deleteVertexArray(V):s.deleteVertexArrayOES(V)}function _(V,Y,Q){const j=Q.wireframe===!0;let X=o[V.id];X===void 0&&(X={},o[V.id]=X);let ue=X[Y.id];ue===void 0&&(ue={},X[Y.id]=ue);let ae=ue[j];return ae===void 0&&(ae=m(f()),ue[j]=ae),ae}function m(V){const Y=[],Q=[],j=[];for(let X=0;X<r;X++)Y[X]=0,Q[X]=0,j[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Y,enabledAttributes:Q,attributeDivisors:j,object:V,attributes:{},index:null}}function d(V,Y,Q,j){const X=c.attributes,ue=Y.attributes;let ae=0;const be=Q.getAttributes();for(const he in be)if(be[he].location>=0){const oe=X[he];let _e=ue[he];if(_e===void 0&&(he==="instanceMatrix"&&V.instanceMatrix&&(_e=V.instanceMatrix),he==="instanceColor"&&V.instanceColor&&(_e=V.instanceColor)),oe===void 0||oe.attribute!==_e||_e&&oe.data!==_e.data)return!0;ae++}return c.attributesNum!==ae||c.index!==j}function A(V,Y,Q,j){const X={},ue=Y.attributes;let ae=0;const be=Q.getAttributes();for(const he in be)if(be[he].location>=0){let oe=ue[he];oe===void 0&&(he==="instanceMatrix"&&V.instanceMatrix&&(oe=V.instanceMatrix),he==="instanceColor"&&V.instanceColor&&(oe=V.instanceColor));const _e={};_e.attribute=oe,oe&&oe.data&&(_e.data=oe.data),X[he]=_e,ae++}c.attributes=X,c.attributesNum=ae,c.index=j}function E(){const V=c.newAttributes;for(let Y=0,Q=V.length;Y<Q;Y++)V[Y]=0}function M(V){y(V,0)}function y(V,Y){const Q=c.newAttributes,j=c.enabledAttributes,X=c.attributeDivisors;Q[V]=1,j[V]===0&&(t.enableVertexAttribArray(V),j[V]=1),X[V]!==Y&&((i.isWebGL2?t:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](V,Y),X[V]=Y)}function L(){const V=c.newAttributes,Y=c.enabledAttributes;for(let Q=0,j=Y.length;Q<j;Q++)Y[Q]!==V[Q]&&(t.disableVertexAttribArray(Q),Y[Q]=0)}function P(V,Y,Q,j,X,ue){i.isWebGL2===!0&&(Q===t.INT||Q===t.UNSIGNED_INT)?t.vertexAttribIPointer(V,Y,Q,X,ue):t.vertexAttribPointer(V,Y,Q,j,X,ue)}function I(V,Y,Q,j){if(i.isWebGL2===!1&&(V.isInstancedMesh||j.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;E();const X=j.attributes,ue=Q.getAttributes(),ae=Y.defaultAttributeValues;for(const be in ue){const he=ue[be];if(he.location>=0){let K=X[be];if(K===void 0&&(be==="instanceMatrix"&&V.instanceMatrix&&(K=V.instanceMatrix),be==="instanceColor"&&V.instanceColor&&(K=V.instanceColor)),K!==void 0){const oe=K.normalized,_e=K.itemSize,ve=n.get(K);if(ve===void 0)continue;const U=ve.buffer,Le=ve.type,Ce=ve.bytesPerElement;if(K.isInterleavedBufferAttribute){const me=K.data,we=me.stride,w=K.offset;if(me.isInstancedInterleavedBuffer){for(let R=0;R<he.locationSize;R++)y(he.location+R,me.meshPerAttribute);V.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let R=0;R<he.locationSize;R++)M(he.location+R);t.bindBuffer(t.ARRAY_BUFFER,U);for(let R=0;R<he.locationSize;R++)P(he.location+R,_e/he.locationSize,Le,oe,we*Ce,(w+_e/he.locationSize*R)*Ce)}else{if(K.isInstancedBufferAttribute){for(let me=0;me<he.locationSize;me++)y(he.location+me,K.meshPerAttribute);V.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let me=0;me<he.locationSize;me++)M(he.location+me);t.bindBuffer(t.ARRAY_BUFFER,U);for(let me=0;me<he.locationSize;me++)P(he.location+me,_e/he.locationSize,Le,oe,_e*Ce,_e/he.locationSize*me*Ce)}}else if(ae!==void 0){const oe=ae[be];if(oe!==void 0)switch(oe.length){case 2:t.vertexAttrib2fv(he.location,oe);break;case 3:t.vertexAttrib3fv(he.location,oe);break;case 4:t.vertexAttrib4fv(he.location,oe);break;default:t.vertexAttrib1fv(he.location,oe)}}}}L()}function x(){O();for(const V in o){const Y=o[V];for(const Q in Y){const j=Y[Q];for(const X in j)g(j[X].object),delete j[X];delete Y[Q]}delete o[V]}}function b(V){if(o[V.id]===void 0)return;const Y=o[V.id];for(const Q in Y){const j=Y[Q];for(const X in j)g(j[X].object),delete j[X];delete Y[Q]}delete o[V.id]}function H(V){for(const Y in o){const Q=o[Y];if(Q[V.id]===void 0)continue;const j=Q[V.id];for(const X in j)g(j[X].object),delete j[X];delete Q[V.id]}}function O(){N(),u=!0,c!==l&&(c=l,p(c.object))}function N(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:O,resetDefaultState:N,dispose:x,releaseStatesOfGeometry:b,releaseStatesOfProgram:H,initAttributes:E,enableAttribute:M,disableUnusedAttributes:L}}function xv(t,e,n,i){const r=i.isWebGL2;let s;function a(c){s=c}function o(c,u){t.drawArrays(s,c,u),n.update(u,s,1)}function l(c,u,h){if(h===0)return;let f,p;if(r)f=t,p="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),p="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[p](s,c,u,h),n.update(u,s,h)}this.setMode=a,this.render=o,this.renderInstances=l}function Mv(t,e,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");i=t.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(P){if(P==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&t.constructor.name==="WebGL2RenderingContext";let o=n.precision!==void 0?n.precision:"highp";const l=s(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),u=n.logarithmicDepthBuffer===!0,h=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),f=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=t.getParameter(t.MAX_TEXTURE_SIZE),g=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),_=t.getParameter(t.MAX_VERTEX_ATTRIBS),m=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),d=t.getParameter(t.MAX_VARYING_VECTORS),A=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),E=f>0,M=a||e.has("OES_texture_float"),y=E&&M,L=a?t.getParameter(t.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:d,maxFragmentUniforms:A,vertexTextures:E,floatFragmentTextures:M,floatVertexTextures:y,maxSamples:L}}function Sv(t){const e=this;let n=null,i=0,r=!1,s=!1;const a=new ii,o=new Xe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||i!==0||r;return r=f,i=h.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){n=u(h,f,0)},this.setState=function(h,f,p){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,d=t.get(h);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const A=s?0:i,E=A*4;let M=d.clippingState||null;l.value=M,M=u(g,f,E,p);for(let y=0;y!==E;++y)M[y]=n[y];d.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,f,p,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const d=p+_*4,A=f.matrixWorldInverse;o.getNormalMatrix(A),(m===null||m.length<d)&&(m=new Float32Array(d));for(let E=0,M=p;E!==_;++E,M+=4)a.copy(h[E]).applyMatrix4(A,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function yv(t){let e=new WeakMap;function n(a,o){return o===ro?a.mapping=er:o===so&&(a.mapping=tr),a}function i(a){if(a&&a.isTexture&&a.isRenderTargetTexture===!1){const o=a.mapping;if(o===ro||o===so)if(e.has(a)){const l=e.get(a).texture;return n(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Bm(l.height/2);return c.fromEquirectangularTexture(t,a),e.set(a,c),a.addEventListener("dispose",r),n(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class gf extends df{constructor(e=-1,n=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Vi=4,pc=[.125,.215,.35,.446,.526,.582],si=20,Fa=new gf,mc=new Ve;let Oa=null;const ri=(1+Math.sqrt(5))/2,Bi=1/ri,gc=[new z(1,1,1),new z(-1,1,1),new z(1,1,-1),new z(-1,1,-1),new z(0,ri,Bi),new z(0,ri,-Bi),new z(Bi,0,ri),new z(-Bi,0,ri),new z(ri,Bi,0),new z(-ri,Bi,0)];class _c{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){Oa=this._renderer.getRenderTarget(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=xc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Oa),e.scissorTest=!1,ds(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===er||e.mapping===tr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Oa=this._renderer.getRenderTarget();const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Wt,minFilter:Wt,generateMipmaps:!1,type:Fr,format:Qt,colorSpace:dn,depthBuffer:!1},r=vc(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=vc(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ev(s)),this._blurMaterial=bv(s,e,n)}return r}_compileMaterial(e){const n=new It(this._lodPlanes[0],e);this._renderer.compile(n,Fa)}_sceneToCubeUV(e,n,i,r){const o=new Xt(90,1,n,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(mc),u.toneMapping=wn,u.autoClear=!1;const p=new Oo({name:"PMREM.Background",side:Ct,depthWrite:!1,depthTest:!1}),g=new It(new sr,p);let _=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(mc),_=!0);for(let d=0;d<6;d++){const A=d%3;A===0?(o.up.set(0,l[d],0),o.lookAt(c[d],0,0)):A===1?(o.up.set(0,0,l[d]),o.lookAt(0,c[d],0)):(o.up.set(0,l[d],0),o.lookAt(0,0,c[d]));const E=this._cubeSize;ds(r,A*E,d>2?E:0,E,E),u.setRenderTarget(r),_&&u.render(g,o),u.render(e,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=m}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===er||e.mapping===tr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=xc());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new It(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;ds(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(a,Fa)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=gc[(r-1)%gc.length];this._blur(e,r-1,r,s,a)}n.autoClear=i}_blur(e,n,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,n,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new It(this._lodPlanes[r],c),f=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*si-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):si;m>si&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${si}`);const d=[];let A=0;for(let P=0;P<si;++P){const I=P/_,x=Math.exp(-I*I/2);d.push(x),P===0?A+=x:P<m&&(A+=2*x)}for(let P=0;P<d.length;P++)d[P]=d[P]/A;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:E}=this;f.dTheta.value=g,f.mipInt.value=E-i;const M=this._sizeLods[r],y=3*M*(r>E-Vi?r-E+Vi:0),L=4*(this._cubeSize-M);ds(n,y,L,3*M,2*M),l.setRenderTarget(n),l.render(h,Fa)}}function Ev(t){const e=[],n=[],i=[];let r=t;const s=t-Vi+1+pc.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);n.push(o);let l=1/o;a>t-Vi?l=pc[a-t+Vi-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,g=6,_=3,m=2,d=1,A=new Float32Array(_*g*p),E=new Float32Array(m*g*p),M=new Float32Array(d*g*p);for(let L=0;L<p;L++){const P=L%3*2/3-1,I=L>2?0:-1,x=[P,I,0,P+2/3,I,0,P+2/3,I+1,0,P,I,0,P+2/3,I+1,0,P,I+1,0];A.set(x,_*g*L),E.set(f,m*g*L);const b=[L,L,L,L,L,L];M.set(b,d*g*L)}const y=new Ln;y.setAttribute("position",new fn(A,_)),y.setAttribute("uv",new fn(E,m)),y.setAttribute("faceIndex",new fn(M,d)),e.push(y),r>Vi&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function vc(t,e,n){const i=new pi(t,e,n);return i.texture.mapping=zs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ds(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function bv(t,e,n){const i=new Float32Array(si),r=new z(0,1,0);return new gi({name:"SphericalGaussianBlur",defines:{n:si,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:zo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function xc(){return new gi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Mc(){return new gi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function zo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Tv(t){let e=new WeakMap,n=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===ro||l===so,u=l===er||l===tr;if(c||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return n===null&&(n=new _c(t)),h=c?n.fromEquirectangular(o,h):n.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{const h=o.image;if(c&&h&&h.height>0||u&&h&&r(h)){n===null&&(n=new _c(t));const f=c?n.fromEquirectangular(o):n.fromCubemap(o);return e.set(o,f),o.addEventListener("dispose",s),f.texture}else return null}}}return o}function r(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:a}}function Av(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(i){i.isWebGL2?n("EXT_color_buffer_float"):(n("WEBGL_depth_texture"),n("OES_texture_float"),n("OES_texture_half_float"),n("OES_texture_half_float_linear"),n("OES_standard_derivatives"),n("OES_element_index_uint"),n("OES_vertex_array_object"),n("ANGLE_instanced_arrays")),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture")},get:function(i){const r=n(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function wv(t,e,n,i){const r={},s=new WeakMap;function a(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete r[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function o(h,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,n.memory.geometries++),f}function l(h){const f=h.attributes;for(const g in f)e.update(f[g],t.ARRAY_BUFFER);const p=h.morphAttributes;for(const g in p){const _=p[g];for(let m=0,d=_.length;m<d;m++)e.update(_[m],t.ARRAY_BUFFER)}}function c(h){const f=[],p=h.index,g=h.attributes.position;let _=0;if(p!==null){const A=p.array;_=p.version;for(let E=0,M=A.length;E<M;E+=3){const y=A[E+0],L=A[E+1],P=A[E+2];f.push(y,L,L,P,P,y)}}else{const A=g.array;_=g.version;for(let E=0,M=A.length/3-1;E<M;E+=3){const y=E+0,L=E+1,P=E+2;f.push(y,L,L,P,P,y)}}const m=new(rf(f)?ff:uf)(f,1);m.version=_;const d=s.get(h);d&&e.remove(d),s.set(h,m)}function u(h){const f=s.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function Rv(t,e,n,i){const r=i.isWebGL2;let s;function a(f){s=f}let o,l;function c(f){o=f.type,l=f.bytesPerElement}function u(f,p){t.drawElements(s,p,o,f*l),n.update(p,s,1)}function h(f,p,g){if(g===0)return;let _,m;if(r)_=t,m="drawElementsInstanced";else if(_=e.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",_===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}_[m](s,p,o,f*l,g),n.update(p,s,g)}this.setMode=a,this.setIndex=c,this.render=u,this.renderInstances=h}function Cv(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(n.calls++,a){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){n.frame++,n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function Pv(t,e){return t[0]-e[0]}function Lv(t,e){return Math.abs(e[1])-Math.abs(t[1])}function Iv(t,e,n){const i={},r=new Float32Array(8),s=new WeakMap,a=new ft,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,u,h){const f=c.morphTargetInfluences;if(e.isWebGL2===!0){const g=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,_=g!==void 0?g.length:0;let m=s.get(u);if(m===void 0||m.count!==_){let Y=function(){N.dispose(),s.delete(u),u.removeEventListener("dispose",Y)};var p=Y;m!==void 0&&m.texture.dispose();const E=u.morphAttributes.position!==void 0,M=u.morphAttributes.normal!==void 0,y=u.morphAttributes.color!==void 0,L=u.morphAttributes.position||[],P=u.morphAttributes.normal||[],I=u.morphAttributes.color||[];let x=0;E===!0&&(x=1),M===!0&&(x=2),y===!0&&(x=3);let b=u.attributes.position.count*x,H=1;b>e.maxTextureSize&&(H=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const O=new Float32Array(b*H*4*_),N=new of(O,b,H,_);N.type=oi,N.needsUpdate=!0;const V=x*4;for(let Q=0;Q<_;Q++){const j=L[Q],X=P[Q],ue=I[Q],ae=b*H*4*Q;for(let be=0;be<j.count;be++){const he=be*V;E===!0&&(a.fromBufferAttribute(j,be),O[ae+he+0]=a.x,O[ae+he+1]=a.y,O[ae+he+2]=a.z,O[ae+he+3]=0),M===!0&&(a.fromBufferAttribute(X,be),O[ae+he+4]=a.x,O[ae+he+5]=a.y,O[ae+he+6]=a.z,O[ae+he+7]=0),y===!0&&(a.fromBufferAttribute(ue,be),O[ae+he+8]=a.x,O[ae+he+9]=a.y,O[ae+he+10]=a.z,O[ae+he+11]=ue.itemSize===4?a.w:1)}}m={count:_,texture:N,size:new Oe(b,H)},s.set(u,m),u.addEventListener("dispose",Y)}let d=0;for(let E=0;E<f.length;E++)d+=f[E];const A=u.morphTargetsRelative?1:1-d;h.getUniforms().setValue(t,"morphTargetBaseInfluence",A),h.getUniforms().setValue(t,"morphTargetInfluences",f),h.getUniforms().setValue(t,"morphTargetsTexture",m.texture,n),h.getUniforms().setValue(t,"morphTargetsTextureSize",m.size)}else{const g=f===void 0?0:f.length;let _=i[u.id];if(_===void 0||_.length!==g){_=[];for(let M=0;M<g;M++)_[M]=[M,0];i[u.id]=_}for(let M=0;M<g;M++){const y=_[M];y[0]=M,y[1]=f[M]}_.sort(Lv);for(let M=0;M<8;M++)M<g&&_[M][1]?(o[M][0]=_[M][0],o[M][1]=_[M][1]):(o[M][0]=Number.MAX_SAFE_INTEGER,o[M][1]=0);o.sort(Pv);const m=u.morphAttributes.position,d=u.morphAttributes.normal;let A=0;for(let M=0;M<8;M++){const y=o[M],L=y[0],P=y[1];L!==Number.MAX_SAFE_INTEGER&&P?(m&&u.getAttribute("morphTarget"+M)!==m[L]&&u.setAttribute("morphTarget"+M,m[L]),d&&u.getAttribute("morphNormal"+M)!==d[L]&&u.setAttribute("morphNormal"+M,d[L]),r[M]=P,A+=P):(m&&u.hasAttribute("morphTarget"+M)===!0&&u.deleteAttribute("morphTarget"+M),d&&u.hasAttribute("morphNormal"+M)===!0&&u.deleteAttribute("morphNormal"+M),r[M]=0)}const E=u.morphTargetsRelative?1:1-A;h.getUniforms().setValue(t,"morphTargetBaseInfluence",E),h.getUniforms().setValue(t,"morphTargetInfluences",r)}}return{update:l}}function Uv(t,e,n,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,h=e.get(l,u);return r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER)),h}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:a}}const _f=new Ut,vf=new of,xf=new Sm,Mf=new pf,Sc=[],yc=[],Ec=new Float32Array(16),bc=new Float32Array(9),Tc=new Float32Array(4);function ar(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Sc[r];if(s===void 0&&(s=new Float32Array(r),Sc[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=n,t[a].toArray(s,o)}return s}function at(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function ot(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Gs(t,e){let n=yc[e];n===void 0&&(n=new Int32Array(e),yc[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function Dv(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function Nv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(at(n,e))return;t.uniform2fv(this.addr,e),ot(n,e)}}function Fv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(at(n,e))return;t.uniform3fv(this.addr,e),ot(n,e)}}function Ov(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(at(n,e))return;t.uniform4fv(this.addr,e),ot(n,e)}}function Bv(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(at(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),ot(n,e)}else{if(at(n,i))return;Tc.set(i),t.uniformMatrix2fv(this.addr,!1,Tc),ot(n,i)}}function kv(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(at(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),ot(n,e)}else{if(at(n,i))return;bc.set(i),t.uniformMatrix3fv(this.addr,!1,bc),ot(n,i)}}function zv(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(at(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),ot(n,e)}else{if(at(n,i))return;Ec.set(i),t.uniformMatrix4fv(this.addr,!1,Ec),ot(n,i)}}function Hv(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function Gv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(at(n,e))return;t.uniform2iv(this.addr,e),ot(n,e)}}function Vv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(at(n,e))return;t.uniform3iv(this.addr,e),ot(n,e)}}function Wv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(at(n,e))return;t.uniform4iv(this.addr,e),ot(n,e)}}function Xv(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function jv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(at(n,e))return;t.uniform2uiv(this.addr,e),ot(n,e)}}function qv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(at(n,e))return;t.uniform3uiv(this.addr,e),ot(n,e)}}function Yv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(at(n,e))return;t.uniform4uiv(this.addr,e),ot(n,e)}}function Kv(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2D(e||_f,r)}function $v(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||xf,r)}function Zv(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||Mf,r)}function Jv(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||vf,r)}function Qv(t){switch(t){case 5126:return Dv;case 35664:return Nv;case 35665:return Fv;case 35666:return Ov;case 35674:return Bv;case 35675:return kv;case 35676:return zv;case 5124:case 35670:return Hv;case 35667:case 35671:return Gv;case 35668:case 35672:return Vv;case 35669:case 35673:return Wv;case 5125:return Xv;case 36294:return jv;case 36295:return qv;case 36296:return Yv;case 35678:case 36198:case 36298:case 36306:case 35682:return Kv;case 35679:case 36299:case 36307:return $v;case 35680:case 36300:case 36308:case 36293:return Zv;case 36289:case 36303:case 36311:case 36292:return Jv}}function e0(t,e){t.uniform1fv(this.addr,e)}function t0(t,e){const n=ar(e,this.size,2);t.uniform2fv(this.addr,n)}function n0(t,e){const n=ar(e,this.size,3);t.uniform3fv(this.addr,n)}function i0(t,e){const n=ar(e,this.size,4);t.uniform4fv(this.addr,n)}function r0(t,e){const n=ar(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function s0(t,e){const n=ar(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function a0(t,e){const n=ar(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function o0(t,e){t.uniform1iv(this.addr,e)}function l0(t,e){t.uniform2iv(this.addr,e)}function c0(t,e){t.uniform3iv(this.addr,e)}function u0(t,e){t.uniform4iv(this.addr,e)}function f0(t,e){t.uniform1uiv(this.addr,e)}function h0(t,e){t.uniform2uiv(this.addr,e)}function d0(t,e){t.uniform3uiv(this.addr,e)}function p0(t,e){t.uniform4uiv(this.addr,e)}function m0(t,e,n){const i=this.cache,r=e.length,s=Gs(n,r);at(i,s)||(t.uniform1iv(this.addr,s),ot(i,s));for(let a=0;a!==r;++a)n.setTexture2D(e[a]||_f,s[a])}function g0(t,e,n){const i=this.cache,r=e.length,s=Gs(n,r);at(i,s)||(t.uniform1iv(this.addr,s),ot(i,s));for(let a=0;a!==r;++a)n.setTexture3D(e[a]||xf,s[a])}function _0(t,e,n){const i=this.cache,r=e.length,s=Gs(n,r);at(i,s)||(t.uniform1iv(this.addr,s),ot(i,s));for(let a=0;a!==r;++a)n.setTextureCube(e[a]||Mf,s[a])}function v0(t,e,n){const i=this.cache,r=e.length,s=Gs(n,r);at(i,s)||(t.uniform1iv(this.addr,s),ot(i,s));for(let a=0;a!==r;++a)n.setTexture2DArray(e[a]||vf,s[a])}function x0(t){switch(t){case 5126:return e0;case 35664:return t0;case 35665:return n0;case 35666:return i0;case 35674:return r0;case 35675:return s0;case 35676:return a0;case 5124:case 35670:return o0;case 35667:case 35671:return l0;case 35668:case 35672:return c0;case 35669:case 35673:return u0;case 5125:return f0;case 36294:return h0;case 36295:return d0;case 36296:return p0;case 35678:case 36198:case 36298:case 36306:case 35682:return m0;case 35679:case 36299:case 36307:return g0;case 35680:case 36300:case 36308:case 36293:return _0;case 36289:case 36303:case 36311:case 36292:return v0}}class M0{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.setValue=Qv(n.type)}}class S0{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.size=n.size,this.setValue=x0(n.type)}}class y0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,n[o.id],i)}}}const Ba=/(\w+)(\])?(\[|\.)?/g;function Ac(t,e){t.seq.push(e),t.map[e.id]=e}function E0(t,e,n){const i=t.name,r=i.length;for(Ba.lastIndex=0;;){const s=Ba.exec(i),a=Ba.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Ac(n,c===void 0?new M0(o,t,e):new S0(o,t,e));break}else{let h=n.map[o];h===void 0&&(h=new y0(o),Ac(n,h)),n=h}}}class Ss{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),a=e.getUniformLocation(n,s.name);E0(s,a,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,a=n.length;s!==a;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in n&&i.push(a)}return i}}function wc(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}let b0=0;function T0(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}function A0(t){switch(t){case dn:return["Linear","( value )"];case Ne:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",t),["Linear","( value )"]}}function Rc(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+T0(t.getShaderSource(e),a)}else return r}function w0(t,e){const n=A0(e);return"vec4 "+t+"( vec4 value ) { return LinearTo"+n[0]+n[1]+"; }"}function R0(t,e){let n;switch(e){case Gp:n="Linear";break;case Vp:n="Reinhard";break;case Wp:n="OptimizedCineon";break;case Zu:n="ACESFilmic";break;case Xp:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function C0(t){return[t.extensionDerivatives||t.envMapCubeUVHeight||t.bumpMap||t.normalMapTangentSpace||t.clearcoatNormalMap||t.flatShading||t.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(t.extensionFragDepth||t.logarithmicDepthBuffer)&&t.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",t.extensionDrawBuffers&&t.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(t.extensionShaderTextureLOD||t.envMap||t.transmission)&&t.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(gr).join(`
`)}function P0(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function L0(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),a=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[a]={type:s.type,location:t.getAttribLocation(e,a),locationSize:o}}return n}function gr(t){return t!==""}function Cc(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Pc(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const I0=/^[ \t]*#include +<([\w\d./]+)>/gm;function uo(t){return t.replace(I0,U0)}function U0(t,e){const n=ze[e];if(n===void 0)throw new Error("Can not resolve #include <"+e+">");return uo(n)}const D0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Lc(t){return t.replace(D0,N0)}function N0(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ic(t){let e="precision "+t.precision+` float;
precision `+t.precision+" int;";return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function F0(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===qu?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===Mp?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===yn&&(e="SHADOWMAP_TYPE_VSM"),e}function O0(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case er:case tr:e="ENVMAP_TYPE_CUBE";break;case zs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function B0(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case tr:e="ENVMAP_MODE_REFRACTION";break}return e}function k0(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case $u:e="ENVMAP_BLENDING_MULTIPLY";break;case zp:e="ENVMAP_BLENDING_MIX";break;case Hp:e="ENVMAP_BLENDING_ADD";break}return e}function z0(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function H0(t,e,n,i){const r=t.getContext(),s=n.defines;let a=n.vertexShader,o=n.fragmentShader;const l=F0(n),c=O0(n),u=B0(n),h=k0(n),f=z0(n),p=n.isWebGL2?"":C0(n),g=P0(s),_=r.createProgram();let m,d,A=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=[g].filter(gr).join(`
`),m.length>0&&(m+=`
`),d=[p,g].filter(gr).join(`
`),d.length>0&&(d+=`
`)):(m=[Ic(n),"#define SHADER_NAME "+n.shaderName,g,n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors&&n.isWebGL2?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gr).join(`
`),d=[p,Ic(n),"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+u:"",n.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==wn?"#define TONE_MAPPING":"",n.toneMapping!==wn?ze.tonemapping_pars_fragment:"",n.toneMapping!==wn?R0("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",ze.encodings_pars_fragment,w0("linearToOutputTexel",n.outputColorSpace),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(gr).join(`
`)),a=uo(a),a=Cc(a,n),a=Pc(a,n),o=uo(o),o=Cc(o,n),o=Pc(o,n),a=Lc(a),o=Lc(o),n.isWebGL2&&n.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,m=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",n.glslVersion===Zl?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Zl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const E=A+m+a,M=A+d+o,y=wc(r,r.VERTEX_SHADER,E),L=wc(r,r.FRAGMENT_SHADER,M);if(r.attachShader(_,y),r.attachShader(_,L),n.index0AttributeName!==void 0?r.bindAttribLocation(_,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_),t.debug.checkShaderErrors){const x=r.getProgramInfoLog(_).trim(),b=r.getShaderInfoLog(y).trim(),H=r.getShaderInfoLog(L).trim();let O=!0,N=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(O=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,_,y,L);else{const V=Rc(r,y,"vertex"),Y=Rc(r,L,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Program Info Log: `+x+`
`+V+`
`+Y)}else x!==""?console.warn("THREE.WebGLProgram: Program Info Log:",x):(b===""||H==="")&&(N=!1);N&&(this.diagnostics={runnable:O,programLog:x,vertexShader:{log:b,prefix:m},fragmentShader:{log:H,prefix:d}})}r.deleteShader(y),r.deleteShader(L);let P;this.getUniforms=function(){return P===void 0&&(P=new Ss(r,_)),P};let I;return this.getAttributes=function(){return I===void 0&&(I=L0(r,_)),I},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.name=n.shaderName,this.id=b0++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=y,this.fragmentShader=L,this}let G0=0;class V0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new W0(e),n.set(e,i)),i}}class W0{constructor(e){this.id=G0++,this.code=e,this.usedTimes=0}}function X0(t,e,n,i,r,s,a){const o=new lf,l=new V0,c=[],u=r.isWebGL2,h=r.logarithmicDepthBuffer,f=r.vertexTextures;let p=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return x===1?"uv1":x===2?"uv2":x===3?"uv3":"uv"}function m(x,b,H,O,N){const V=O.fog,Y=N.geometry,Q=x.isMeshStandardMaterial?O.environment:null,j=(x.isMeshStandardMaterial?n:e).get(x.envMap||Q),X=j&&j.mapping===zs?j.image.height:null,ue=g[x.type];x.precision!==null&&(p=r.getMaxPrecision(x.precision),p!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",p,"instead."));const ae=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,be=ae!==void 0?ae.length:0;let he=0;Y.morphAttributes.position!==void 0&&(he=1),Y.morphAttributes.normal!==void 0&&(he=2),Y.morphAttributes.color!==void 0&&(he=3);let K,oe,_e,ve;if(ue){const $e=ln[ue];K=$e.vertexShader,oe=$e.fragmentShader}else K=x.vertexShader,oe=x.fragmentShader,l.update(x),_e=l.getVertexShaderID(x),ve=l.getFragmentShaderID(x);const U=t.getRenderTarget(),Le=N.isInstancedMesh===!0,Ce=!!x.map,me=!!x.matcap,we=!!j,w=!!x.aoMap,R=!!x.lightMap,B=!!x.bumpMap,re=!!x.normalMap,J=!!x.displacementMap,ne=!!x.emissiveMap,de=!!x.metalnessMap,se=!!x.roughnessMap,ce=x.clearcoat>0,le=x.iridescence>0,S=x.sheen>0,v=x.transmission>0,F=ce&&!!x.clearcoatMap,q=ce&&!!x.clearcoatNormalMap,$=ce&&!!x.clearcoatRoughnessMap,fe=le&&!!x.iridescenceMap,C=le&&!!x.iridescenceThicknessMap,Z=S&&!!x.sheenColorMap,G=S&&!!x.sheenRoughnessMap,ge=!!x.specularMap,Me=!!x.specularColorMap,Te=!!x.specularIntensityMap,ye=v&&!!x.transmissionMap,Se=v&&!!x.thicknessMap,Re=!!x.gradientMap,De=!!x.alphaMap,et=x.alphaTest>0,D=!!x.extensions,ee=!!Y.attributes.uv1,pe=!!Y.attributes.uv2,Ee=!!Y.attributes.uv3;return{isWebGL2:u,shaderID:ue,shaderName:x.type,vertexShader:K,fragmentShader:oe,defines:x.defines,customVertexShaderID:_e,customFragmentShaderID:ve,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:p,instancing:Le,instancingColor:Le&&N.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:U===null?t.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:dn,map:Ce,matcap:me,envMap:we,envMapMode:we&&j.mapping,envMapCubeUVHeight:X,aoMap:w,lightMap:R,bumpMap:B,normalMap:re,displacementMap:f&&J,emissiveMap:ne,normalMapObjectSpace:re&&x.normalMapType===um,normalMapTangentSpace:re&&x.normalMapType===tf,metalnessMap:de,roughnessMap:se,clearcoat:ce,clearcoatMap:F,clearcoatNormalMap:q,clearcoatRoughnessMap:$,iridescence:le,iridescenceMap:fe,iridescenceThicknessMap:C,sheen:S,sheenColorMap:Z,sheenRoughnessMap:G,specularMap:ge,specularColorMap:Me,specularIntensityMap:Te,transmission:v,transmissionMap:ye,thicknessMap:Se,gradientMap:Re,opaque:x.transparent===!1&&x.blending===Yi,alphaMap:De,alphaTest:et,combine:x.combine,mapUv:Ce&&_(x.map.channel),aoMapUv:w&&_(x.aoMap.channel),lightMapUv:R&&_(x.lightMap.channel),bumpMapUv:B&&_(x.bumpMap.channel),normalMapUv:re&&_(x.normalMap.channel),displacementMapUv:J&&_(x.displacementMap.channel),emissiveMapUv:ne&&_(x.emissiveMap.channel),metalnessMapUv:de&&_(x.metalnessMap.channel),roughnessMapUv:se&&_(x.roughnessMap.channel),clearcoatMapUv:F&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:q&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:C&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:Z&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:G&&_(x.sheenRoughnessMap.channel),specularMapUv:ge&&_(x.specularMap.channel),specularColorMapUv:Me&&_(x.specularColorMap.channel),specularIntensityMapUv:Te&&_(x.specularIntensityMap.channel),transmissionMapUv:ye&&_(x.transmissionMap.channel),thicknessMapUv:Se&&_(x.thicknessMap.channel),alphaMapUv:De&&_(x.alphaMap.channel),vertexTangents:re&&!!Y.attributes.tangent,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,vertexUv1s:ee,vertexUv2s:pe,vertexUv3s:Ee,pointsUvs:N.isPoints===!0&&!!Y.attributes.uv&&(Ce||De),fog:!!V,useFog:x.fog===!0,fogExp2:V&&V.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:N.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:be,morphTextureStride:he,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:t.shadowMap.enabled&&H.length>0,shadowMapType:t.shadowMap.type,toneMapping:x.toneMapped?t.toneMapping:wn,useLegacyLights:t.useLegacyLights,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===An,flipSided:x.side===Ct,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionDerivatives:D&&x.extensions.derivatives===!0,extensionFragDepth:D&&x.extensions.fragDepth===!0,extensionDrawBuffers:D&&x.extensions.drawBuffers===!0,extensionShaderTextureLOD:D&&x.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),customProgramCacheKey:x.customProgramCacheKey()}}function d(x){const b=[];if(x.shaderID?b.push(x.shaderID):(b.push(x.customVertexShaderID),b.push(x.customFragmentShaderID)),x.defines!==void 0)for(const H in x.defines)b.push(H),b.push(x.defines[H]);return x.isRawShaderMaterial===!1&&(A(b,x),E(b,x),b.push(t.outputColorSpace)),b.push(x.customProgramCacheKey),b.join()}function A(x,b){x.push(b.precision),x.push(b.outputColorSpace),x.push(b.envMapMode),x.push(b.envMapCubeUVHeight),x.push(b.mapUv),x.push(b.alphaMapUv),x.push(b.lightMapUv),x.push(b.aoMapUv),x.push(b.bumpMapUv),x.push(b.normalMapUv),x.push(b.displacementMapUv),x.push(b.emissiveMapUv),x.push(b.metalnessMapUv),x.push(b.roughnessMapUv),x.push(b.clearcoatMapUv),x.push(b.clearcoatNormalMapUv),x.push(b.clearcoatRoughnessMapUv),x.push(b.iridescenceMapUv),x.push(b.iridescenceThicknessMapUv),x.push(b.sheenColorMapUv),x.push(b.sheenRoughnessMapUv),x.push(b.specularMapUv),x.push(b.specularColorMapUv),x.push(b.specularIntensityMapUv),x.push(b.transmissionMapUv),x.push(b.thicknessMapUv),x.push(b.combine),x.push(b.fogExp2),x.push(b.sizeAttenuation),x.push(b.morphTargetsCount),x.push(b.morphAttributeCount),x.push(b.numDirLights),x.push(b.numPointLights),x.push(b.numSpotLights),x.push(b.numSpotLightMaps),x.push(b.numHemiLights),x.push(b.numRectAreaLights),x.push(b.numDirLightShadows),x.push(b.numPointLightShadows),x.push(b.numSpotLightShadows),x.push(b.numSpotLightShadowsWithMaps),x.push(b.shadowMapType),x.push(b.toneMapping),x.push(b.numClippingPlanes),x.push(b.numClipIntersection),x.push(b.depthPacking)}function E(x,b){o.disableAll(),b.isWebGL2&&o.enable(0),b.supportsVertexTextures&&o.enable(1),b.instancing&&o.enable(2),b.instancingColor&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),x.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.skinning&&o.enable(4),b.morphTargets&&o.enable(5),b.morphNormals&&o.enable(6),b.morphColors&&o.enable(7),b.premultipliedAlpha&&o.enable(8),b.shadowMapEnabled&&o.enable(9),b.useLegacyLights&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),x.push(o.mask)}function M(x){const b=g[x.type];let H;if(b){const O=ln[b];H=Dm.clone(O.uniforms)}else H=x.uniforms;return H}function y(x,b){let H;for(let O=0,N=c.length;O<N;O++){const V=c[O];if(V.cacheKey===b){H=V,++H.usedTimes;break}}return H===void 0&&(H=new H0(t,b,x,s),c.push(H)),H}function L(x){if(--x.usedTimes===0){const b=c.indexOf(x);c[b]=c[c.length-1],c.pop(),x.destroy()}}function P(x){l.remove(x)}function I(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:M,acquireProgram:y,releaseProgram:L,releaseShaderCache:P,programs:c,dispose:I}}function j0(){let t=new WeakMap;function e(s){let a=t.get(s);return a===void 0&&(a={},t.set(s,a)),a}function n(s){t.delete(s)}function i(s,a,o){t.get(s)[a]=o}function r(){t=new WeakMap}return{get:e,remove:n,update:i,dispose:r}}function q0(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function Uc(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Dc(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function a(h,f,p,g,_,m){let d=t[e];return d===void 0?(d={id:h.id,object:h,geometry:f,material:p,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},t[e]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=h.renderOrder,d.z=_,d.group=m),e++,d}function o(h,f,p,g,_,m){const d=a(h,f,p,g,_,m);p.transmission>0?i.push(d):p.transparent===!0?r.push(d):n.push(d)}function l(h,f,p,g,_,m){const d=a(h,f,p,g,_,m);p.transmission>0?i.unshift(d):p.transparent===!0?r.unshift(d):n.unshift(d)}function c(h,f){n.length>1&&n.sort(h||q0),i.length>1&&i.sort(f||Uc),r.length>1&&r.sort(f||Uc)}function u(){for(let h=e,f=t.length;h<f;h++){const p=t[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function Y0(){let t=new WeakMap;function e(i,r){const s=t.get(i);let a;return s===void 0?(a=new Dc,t.set(i,[a])):r>=s.length?(a=new Dc,s.push(a)):a=s[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function K0(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new z,color:new Ve};break;case"SpotLight":n={position:new z,direction:new z,color:new Ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new z,color:new Ve,distance:0,decay:0};break;case"HemisphereLight":n={direction:new z,skyColor:new Ve,groundColor:new Ve};break;case"RectAreaLight":n={color:new Ve,position:new z,halfWidth:new z,halfHeight:new z};break}return t[e.id]=n,n}}}function $0(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let Z0=0;function J0(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function Q0(t,e){const n=new K0,i=$0(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let u=0;u<9;u++)r.probe.push(new z);const s=new z,a=new st,o=new st;function l(u,h){let f=0,p=0,g=0;for(let H=0;H<9;H++)r.probe[H].set(0,0,0);let _=0,m=0,d=0,A=0,E=0,M=0,y=0,L=0,P=0,I=0;u.sort(J0);const x=h===!0?Math.PI:1;for(let H=0,O=u.length;H<O;H++){const N=u[H],V=N.color,Y=N.intensity,Q=N.distance,j=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)f+=V.r*Y*x,p+=V.g*Y*x,g+=V.b*Y*x;else if(N.isLightProbe)for(let X=0;X<9;X++)r.probe[X].addScaledVector(N.sh.coefficients[X],Y);else if(N.isDirectionalLight){const X=n.get(N);if(X.color.copy(N.color).multiplyScalar(N.intensity*x),N.castShadow){const ue=N.shadow,ae=i.get(N);ae.shadowBias=ue.bias,ae.shadowNormalBias=ue.normalBias,ae.shadowRadius=ue.radius,ae.shadowMapSize=ue.mapSize,r.directionalShadow[_]=ae,r.directionalShadowMap[_]=j,r.directionalShadowMatrix[_]=N.shadow.matrix,M++}r.directional[_]=X,_++}else if(N.isSpotLight){const X=n.get(N);X.position.setFromMatrixPosition(N.matrixWorld),X.color.copy(V).multiplyScalar(Y*x),X.distance=Q,X.coneCos=Math.cos(N.angle),X.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),X.decay=N.decay,r.spot[d]=X;const ue=N.shadow;if(N.map&&(r.spotLightMap[P]=N.map,P++,ue.updateMatrices(N),N.castShadow&&I++),r.spotLightMatrix[d]=ue.matrix,N.castShadow){const ae=i.get(N);ae.shadowBias=ue.bias,ae.shadowNormalBias=ue.normalBias,ae.shadowRadius=ue.radius,ae.shadowMapSize=ue.mapSize,r.spotShadow[d]=ae,r.spotShadowMap[d]=j,L++}d++}else if(N.isRectAreaLight){const X=n.get(N);X.color.copy(V).multiplyScalar(Y),X.halfWidth.set(N.width*.5,0,0),X.halfHeight.set(0,N.height*.5,0),r.rectArea[A]=X,A++}else if(N.isPointLight){const X=n.get(N);if(X.color.copy(N.color).multiplyScalar(N.intensity*x),X.distance=N.distance,X.decay=N.decay,N.castShadow){const ue=N.shadow,ae=i.get(N);ae.shadowBias=ue.bias,ae.shadowNormalBias=ue.normalBias,ae.shadowRadius=ue.radius,ae.shadowMapSize=ue.mapSize,ae.shadowCameraNear=ue.camera.near,ae.shadowCameraFar=ue.camera.far,r.pointShadow[m]=ae,r.pointShadowMap[m]=j,r.pointShadowMatrix[m]=N.shadow.matrix,y++}r.point[m]=X,m++}else if(N.isHemisphereLight){const X=n.get(N);X.skyColor.copy(N.color).multiplyScalar(Y*x),X.groundColor.copy(N.groundColor).multiplyScalar(Y*x),r.hemi[E]=X,E++}}A>0&&(e.isWebGL2||t.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=xe.LTC_FLOAT_1,r.rectAreaLTC2=xe.LTC_FLOAT_2):t.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=xe.LTC_HALF_1,r.rectAreaLTC2=xe.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=f,r.ambient[1]=p,r.ambient[2]=g;const b=r.hash;(b.directionalLength!==_||b.pointLength!==m||b.spotLength!==d||b.rectAreaLength!==A||b.hemiLength!==E||b.numDirectionalShadows!==M||b.numPointShadows!==y||b.numSpotShadows!==L||b.numSpotMaps!==P)&&(r.directional.length=_,r.spot.length=d,r.rectArea.length=A,r.point.length=m,r.hemi.length=E,r.directionalShadow.length=M,r.directionalShadowMap.length=M,r.pointShadow.length=y,r.pointShadowMap.length=y,r.spotShadow.length=L,r.spotShadowMap.length=L,r.directionalShadowMatrix.length=M,r.pointShadowMatrix.length=y,r.spotLightMatrix.length=L+P-I,r.spotLightMap.length=P,r.numSpotLightShadowsWithMaps=I,b.directionalLength=_,b.pointLength=m,b.spotLength=d,b.rectAreaLength=A,b.hemiLength=E,b.numDirectionalShadows=M,b.numPointShadows=y,b.numSpotShadows=L,b.numSpotMaps=P,r.version=Z0++)}function c(u,h){let f=0,p=0,g=0,_=0,m=0;const d=h.matrixWorldInverse;for(let A=0,E=u.length;A<E;A++){const M=u[A];if(M.isDirectionalLight){const y=r.directional[f];y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(d),f++}else if(M.isSpotLight){const y=r.spot[g];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(d),y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(d),g++}else if(M.isRectAreaLight){const y=r.rectArea[_];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(d),o.identity(),a.copy(M.matrixWorld),a.premultiply(d),o.extractRotation(a),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),_++}else if(M.isPointLight){const y=r.point[p];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(d),p++}else if(M.isHemisphereLight){const y=r.hemi[m];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(d),m++}}}return{setup:l,setupView:c,state:r}}function Nc(t,e){const n=new Q0(t,e),i=[],r=[];function s(){i.length=0,r.length=0}function a(h){i.push(h)}function o(h){r.push(h)}function l(h){n.setup(i,h)}function c(h){n.setupView(i,h)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:n},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function ex(t,e){let n=new WeakMap;function i(s,a=0){const o=n.get(s);let l;return o===void 0?(l=new Nc(t,e),n.set(s,[l])):a>=o.length?(l=new Nc(t,e),o.push(l)):l=o[a],l}function r(){n=new WeakMap}return{get:i,dispose:r}}class tx extends Gr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=lm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class nx extends Gr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ix=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,rx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function sx(t,e,n){let i=new Bo;const r=new Oe,s=new Oe,a=new ft,o=new tx({depthPacking:cm}),l=new nx,c={},u=n.maxTextureSize,h={[qn]:Ct,[Ct]:qn,[An]:An},f=new gi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Oe},radius:{value:4}},vertexShader:ix,fragmentShader:rx}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new Ln;g.setAttribute("position",new fn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new It(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qu;let d=this.type;this.render=function(y,L,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||y.length===0)return;const I=t.getRenderTarget(),x=t.getActiveCubeFace(),b=t.getActiveMipmapLevel(),H=t.state;H.setBlending(Wn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const O=d!==yn&&this.type===yn,N=d===yn&&this.type!==yn;for(let V=0,Y=y.length;V<Y;V++){const Q=y[V],j=Q.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;r.copy(j.mapSize);const X=j.getFrameExtents();if(r.multiply(X),s.copy(j.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/X.x),r.x=s.x*X.x,j.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/X.y),r.y=s.y*X.y,j.mapSize.y=s.y)),j.map===null||O===!0||N===!0){const ae=this.type!==yn?{minFilter:Tt,magFilter:Tt}:{};j.map!==null&&j.map.dispose(),j.map=new pi(r.x,r.y,ae),j.map.texture.name=Q.name+".shadowMap",j.camera.updateProjectionMatrix()}t.setRenderTarget(j.map),t.clear();const ue=j.getViewportCount();for(let ae=0;ae<ue;ae++){const be=j.getViewport(ae);a.set(s.x*be.x,s.y*be.y,s.x*be.z,s.y*be.w),H.viewport(a),j.updateMatrices(Q,ae),i=j.getFrustum(),M(L,P,j.camera,Q,this.type)}j.isPointLightShadow!==!0&&this.type===yn&&A(j,P),j.needsUpdate=!1}d=this.type,m.needsUpdate=!1,t.setRenderTarget(I,x,b)};function A(y,L){const P=e.update(_);f.defines.VSM_SAMPLES!==y.blurSamples&&(f.defines.VSM_SAMPLES=y.blurSamples,p.defines.VSM_SAMPLES=y.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new pi(r.x,r.y)),f.uniforms.shadow_pass.value=y.map.texture,f.uniforms.resolution.value=y.mapSize,f.uniforms.radius.value=y.radius,t.setRenderTarget(y.mapPass),t.clear(),t.renderBufferDirect(L,null,P,f,_,null),p.uniforms.shadow_pass.value=y.mapPass.texture,p.uniforms.resolution.value=y.mapSize,p.uniforms.radius.value=y.radius,t.setRenderTarget(y.map),t.clear(),t.renderBufferDirect(L,null,P,p,_,null)}function E(y,L,P,I){let x=null;const b=P.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(b!==void 0)x=b;else if(x=P.isPointLight===!0?l:o,t.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0){const H=x.uuid,O=L.uuid;let N=c[H];N===void 0&&(N={},c[H]=N);let V=N[O];V===void 0&&(V=x.clone(),N[O]=V),x=V}if(x.visible=L.visible,x.wireframe=L.wireframe,I===yn?x.side=L.shadowSide!==null?L.shadowSide:L.side:x.side=L.shadowSide!==null?L.shadowSide:h[L.side],x.alphaMap=L.alphaMap,x.alphaTest=L.alphaTest,x.map=L.map,x.clipShadows=L.clipShadows,x.clippingPlanes=L.clippingPlanes,x.clipIntersection=L.clipIntersection,x.displacementMap=L.displacementMap,x.displacementScale=L.displacementScale,x.displacementBias=L.displacementBias,x.wireframeLinewidth=L.wireframeLinewidth,x.linewidth=L.linewidth,P.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const H=t.properties.get(x);H.light=P}return x}function M(y,L,P,I,x){if(y.visible===!1)return;if(y.layers.test(L.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&x===yn)&&(!y.frustumCulled||i.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,y.matrixWorld);const O=e.update(y),N=y.material;if(Array.isArray(N)){const V=O.groups;for(let Y=0,Q=V.length;Y<Q;Y++){const j=V[Y],X=N[j.materialIndex];if(X&&X.visible){const ue=E(y,X,I,x);t.renderBufferDirect(P,null,O,ue,y,j)}}}else if(N.visible){const V=E(y,N,I,x);t.renderBufferDirect(P,null,O,V,y,null)}}const H=y.children;for(let O=0,N=H.length;O<N;O++)M(H[O],L,P,I,x)}}function ax(t,e,n){const i=n.isWebGL2;function r(){let D=!1;const ee=new ft;let pe=null;const Ee=new ft(0,0,0,0);return{setMask:function(Ae){pe!==Ae&&!D&&(t.colorMask(Ae,Ae,Ae,Ae),pe=Ae)},setLocked:function(Ae){D=Ae},setClear:function(Ae,$e,Ze,dt,Un){Un===!0&&(Ae*=dt,$e*=dt,Ze*=dt),ee.set(Ae,$e,Ze,dt),Ee.equals(ee)===!1&&(t.clearColor(Ae,$e,Ze,dt),Ee.copy(ee))},reset:function(){D=!1,pe=null,Ee.set(-1,0,0,0)}}}function s(){let D=!1,ee=null,pe=null,Ee=null;return{setTest:function(Ae){Ae?U(t.DEPTH_TEST):Le(t.DEPTH_TEST)},setMask:function(Ae){ee!==Ae&&!D&&(t.depthMask(Ae),ee=Ae)},setFunc:function(Ae){if(pe!==Ae){switch(Ae){case Up:t.depthFunc(t.NEVER);break;case Dp:t.depthFunc(t.ALWAYS);break;case Np:t.depthFunc(t.LESS);break;case io:t.depthFunc(t.LEQUAL);break;case Fp:t.depthFunc(t.EQUAL);break;case Op:t.depthFunc(t.GEQUAL);break;case Bp:t.depthFunc(t.GREATER);break;case kp:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}pe=Ae}},setLocked:function(Ae){D=Ae},setClear:function(Ae){Ee!==Ae&&(t.clearDepth(Ae),Ee=Ae)},reset:function(){D=!1,ee=null,pe=null,Ee=null}}}function a(){let D=!1,ee=null,pe=null,Ee=null,Ae=null,$e=null,Ze=null,dt=null,Un=null;return{setTest:function(tt){D||(tt?U(t.STENCIL_TEST):Le(t.STENCIL_TEST))},setMask:function(tt){ee!==tt&&!D&&(t.stencilMask(tt),ee=tt)},setFunc:function(tt,Ht,nn){(pe!==tt||Ee!==Ht||Ae!==nn)&&(t.stencilFunc(tt,Ht,nn),pe=tt,Ee=Ht,Ae=nn)},setOp:function(tt,Ht,nn){($e!==tt||Ze!==Ht||dt!==nn)&&(t.stencilOp(tt,Ht,nn),$e=tt,Ze=Ht,dt=nn)},setLocked:function(tt){D=tt},setClear:function(tt){Un!==tt&&(t.clearStencil(tt),Un=tt)},reset:function(){D=!1,ee=null,pe=null,Ee=null,Ae=null,$e=null,Ze=null,dt=null,Un=null}}}const o=new r,l=new s,c=new a,u=new WeakMap,h=new WeakMap;let f={},p={},g=new WeakMap,_=[],m=null,d=!1,A=null,E=null,M=null,y=null,L=null,P=null,I=null,x=!1,b=null,H=null,O=null,N=null,V=null;const Y=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Q=!1,j=0;const X=t.getParameter(t.VERSION);X.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(X)[1]),Q=j>=1):X.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),Q=j>=2);let ue=null,ae={};const be=t.getParameter(t.SCISSOR_BOX),he=t.getParameter(t.VIEWPORT),K=new ft().fromArray(be),oe=new ft().fromArray(he);function _e(D,ee,pe,Ee){const Ae=new Uint8Array(4),$e=t.createTexture();t.bindTexture(D,$e),t.texParameteri(D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(D,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Ze=0;Ze<pe;Ze++)i&&(D===t.TEXTURE_3D||D===t.TEXTURE_2D_ARRAY)?t.texImage3D(ee,0,t.RGBA,1,1,Ee,0,t.RGBA,t.UNSIGNED_BYTE,Ae):t.texImage2D(ee+Ze,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,Ae);return $e}const ve={};ve[t.TEXTURE_2D]=_e(t.TEXTURE_2D,t.TEXTURE_2D,1),ve[t.TEXTURE_CUBE_MAP]=_e(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(ve[t.TEXTURE_2D_ARRAY]=_e(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),ve[t.TEXTURE_3D]=_e(t.TEXTURE_3D,t.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),U(t.DEPTH_TEST),l.setFunc(io),J(!1),ne(Ml),U(t.CULL_FACE),B(Wn);function U(D){f[D]!==!0&&(t.enable(D),f[D]=!0)}function Le(D){f[D]!==!1&&(t.disable(D),f[D]=!1)}function Ce(D,ee){return p[D]!==ee?(t.bindFramebuffer(D,ee),p[D]=ee,i&&(D===t.DRAW_FRAMEBUFFER&&(p[t.FRAMEBUFFER]=ee),D===t.FRAMEBUFFER&&(p[t.DRAW_FRAMEBUFFER]=ee)),!0):!1}function me(D,ee){let pe=_,Ee=!1;if(D)if(pe=g.get(ee),pe===void 0&&(pe=[],g.set(ee,pe)),D.isWebGLMultipleRenderTargets){const Ae=D.texture;if(pe.length!==Ae.length||pe[0]!==t.COLOR_ATTACHMENT0){for(let $e=0,Ze=Ae.length;$e<Ze;$e++)pe[$e]=t.COLOR_ATTACHMENT0+$e;pe.length=Ae.length,Ee=!0}}else pe[0]!==t.COLOR_ATTACHMENT0&&(pe[0]=t.COLOR_ATTACHMENT0,Ee=!0);else pe[0]!==t.BACK&&(pe[0]=t.BACK,Ee=!0);Ee&&(n.isWebGL2?t.drawBuffers(pe):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(pe))}function we(D){return m!==D?(t.useProgram(D),m=D,!0):!1}const w={[Gi]:t.FUNC_ADD,[yp]:t.FUNC_SUBTRACT,[Ep]:t.FUNC_REVERSE_SUBTRACT};if(i)w[bl]=t.MIN,w[Tl]=t.MAX;else{const D=e.get("EXT_blend_minmax");D!==null&&(w[bl]=D.MIN_EXT,w[Tl]=D.MAX_EXT)}const R={[bp]:t.ZERO,[Tp]:t.ONE,[Ap]:t.SRC_COLOR,[Yu]:t.SRC_ALPHA,[Ip]:t.SRC_ALPHA_SATURATE,[Pp]:t.DST_COLOR,[Rp]:t.DST_ALPHA,[wp]:t.ONE_MINUS_SRC_COLOR,[Ku]:t.ONE_MINUS_SRC_ALPHA,[Lp]:t.ONE_MINUS_DST_COLOR,[Cp]:t.ONE_MINUS_DST_ALPHA};function B(D,ee,pe,Ee,Ae,$e,Ze,dt){if(D===Wn){d===!0&&(Le(t.BLEND),d=!1);return}if(d===!1&&(U(t.BLEND),d=!0),D!==Sp){if(D!==A||dt!==x){if((E!==Gi||L!==Gi)&&(t.blendEquation(t.FUNC_ADD),E=Gi,L=Gi),dt)switch(D){case Yi:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Sl:t.blendFunc(t.ONE,t.ONE);break;case yl:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case El:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Yi:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Sl:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case yl:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case El:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}M=null,y=null,P=null,I=null,A=D,x=dt}return}Ae=Ae||ee,$e=$e||pe,Ze=Ze||Ee,(ee!==E||Ae!==L)&&(t.blendEquationSeparate(w[ee],w[Ae]),E=ee,L=Ae),(pe!==M||Ee!==y||$e!==P||Ze!==I)&&(t.blendFuncSeparate(R[pe],R[Ee],R[$e],R[Ze]),M=pe,y=Ee,P=$e,I=Ze),A=D,x=!1}function re(D,ee){D.side===An?Le(t.CULL_FACE):U(t.CULL_FACE);let pe=D.side===Ct;ee&&(pe=!pe),J(pe),D.blending===Yi&&D.transparent===!1?B(Wn):B(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.premultipliedAlpha),l.setFunc(D.depthFunc),l.setTest(D.depthTest),l.setMask(D.depthWrite),o.setMask(D.colorWrite);const Ee=D.stencilWrite;c.setTest(Ee),Ee&&(c.setMask(D.stencilWriteMask),c.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),c.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),se(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?U(t.SAMPLE_ALPHA_TO_COVERAGE):Le(t.SAMPLE_ALPHA_TO_COVERAGE)}function J(D){b!==D&&(D?t.frontFace(t.CW):t.frontFace(t.CCW),b=D)}function ne(D){D!==vp?(U(t.CULL_FACE),D!==H&&(D===Ml?t.cullFace(t.BACK):D===xp?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Le(t.CULL_FACE),H=D}function de(D){D!==O&&(Q&&t.lineWidth(D),O=D)}function se(D,ee,pe){D?(U(t.POLYGON_OFFSET_FILL),(N!==ee||V!==pe)&&(t.polygonOffset(ee,pe),N=ee,V=pe)):Le(t.POLYGON_OFFSET_FILL)}function ce(D){D?U(t.SCISSOR_TEST):Le(t.SCISSOR_TEST)}function le(D){D===void 0&&(D=t.TEXTURE0+Y-1),ue!==D&&(t.activeTexture(D),ue=D)}function S(D,ee,pe){pe===void 0&&(ue===null?pe=t.TEXTURE0+Y-1:pe=ue);let Ee=ae[pe];Ee===void 0&&(Ee={type:void 0,texture:void 0},ae[pe]=Ee),(Ee.type!==D||Ee.texture!==ee)&&(ue!==pe&&(t.activeTexture(pe),ue=pe),t.bindTexture(D,ee||ve[D]),Ee.type=D,Ee.texture=ee)}function v(){const D=ae[ue];D!==void 0&&D.type!==void 0&&(t.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function F(){try{t.compressedTexImage2D.apply(t,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function q(){try{t.compressedTexImage3D.apply(t,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function $(){try{t.texSubImage2D.apply(t,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function fe(){try{t.texSubImage3D.apply(t,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function C(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Z(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function G(){try{t.texStorage2D.apply(t,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ge(){try{t.texStorage3D.apply(t,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Me(){try{t.texImage2D.apply(t,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Te(){try{t.texImage3D.apply(t,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ye(D){K.equals(D)===!1&&(t.scissor(D.x,D.y,D.z,D.w),K.copy(D))}function Se(D){oe.equals(D)===!1&&(t.viewport(D.x,D.y,D.z,D.w),oe.copy(D))}function Re(D,ee){let pe=h.get(ee);pe===void 0&&(pe=new WeakMap,h.set(ee,pe));let Ee=pe.get(D);Ee===void 0&&(Ee=t.getUniformBlockIndex(ee,D.name),pe.set(D,Ee))}function De(D,ee){const Ee=h.get(ee).get(D);u.get(ee)!==Ee&&(t.uniformBlockBinding(ee,Ee,D.__bindingPointIndex),u.set(ee,Ee))}function et(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),i===!0&&(t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null)),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),f={},ue=null,ae={},p={},g=new WeakMap,_=[],m=null,d=!1,A=null,E=null,M=null,y=null,L=null,P=null,I=null,x=!1,b=null,H=null,O=null,N=null,V=null,K.set(0,0,t.canvas.width,t.canvas.height),oe.set(0,0,t.canvas.width,t.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:U,disable:Le,bindFramebuffer:Ce,drawBuffers:me,useProgram:we,setBlending:B,setMaterial:re,setFlipSided:J,setCullFace:ne,setLineWidth:de,setPolygonOffset:se,setScissorTest:ce,activeTexture:le,bindTexture:S,unbindTexture:v,compressedTexImage2D:F,compressedTexImage3D:q,texImage2D:Me,texImage3D:Te,updateUBOMapping:Re,uniformBlockBinding:De,texStorage2D:G,texStorage3D:ge,texSubImage2D:$,texSubImage3D:fe,compressedTexSubImage2D:C,compressedTexSubImage3D:Z,scissor:ye,viewport:Se,reset:et}}function ox(t,e,n,i,r,s,a){const o=r.isWebGL2,l=r.maxTextures,c=r.maxCubemapSize,u=r.maxTextureSize,h=r.maxSamples,f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let _;const m=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function A(S,v){return d?new OffscreenCanvas(S,v):Cs("canvas")}function E(S,v,F,q){let $=1;if((S.width>q||S.height>q)&&($=q/Math.max(S.width,S.height)),$<1||v===!0)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap){const fe=v?dm:Math.floor,C=fe($*S.width),Z=fe($*S.height);_===void 0&&(_=A(C,Z));const G=F?A(C,Z):_;return G.width=C,G.height=Z,G.getContext("2d").drawImage(S,0,0,C,Z),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+S.width+"x"+S.height+") to ("+C+"x"+Z+")."),G}else return"data"in S&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+S.width+"x"+S.height+")."),S;return S}function M(S){return Jl(S.width)&&Jl(S.height)}function y(S){return o?!1:S.wrapS!==Jt||S.wrapT!==Jt||S.minFilter!==Tt&&S.minFilter!==Wt}function L(S,v){return S.generateMipmaps&&v&&S.minFilter!==Tt&&S.minFilter!==Wt}function P(S){t.generateMipmap(S)}function I(S,v,F,q,$=!1){if(o===!1)return v;if(S!==null){if(t[S]!==void 0)return t[S];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let fe=v;return v===t.RED&&(F===t.FLOAT&&(fe=t.R32F),F===t.HALF_FLOAT&&(fe=t.R16F),F===t.UNSIGNED_BYTE&&(fe=t.R8)),v===t.RG&&(F===t.FLOAT&&(fe=t.RG32F),F===t.HALF_FLOAT&&(fe=t.RG16F),F===t.UNSIGNED_BYTE&&(fe=t.RG8)),v===t.RGBA&&(F===t.FLOAT&&(fe=t.RGBA32F),F===t.HALF_FLOAT&&(fe=t.RGBA16F),F===t.UNSIGNED_BYTE&&(fe=q===Ne&&$===!1?t.SRGB8_ALPHA8:t.RGBA8),F===t.UNSIGNED_SHORT_4_4_4_4&&(fe=t.RGBA4),F===t.UNSIGNED_SHORT_5_5_5_1&&(fe=t.RGB5_A1)),(fe===t.R16F||fe===t.R32F||fe===t.RG16F||fe===t.RG32F||fe===t.RGBA16F||fe===t.RGBA32F)&&e.get("EXT_color_buffer_float"),fe}function x(S,v,F){return L(S,F)===!0||S.isFramebufferTexture&&S.minFilter!==Tt&&S.minFilter!==Wt?Math.log2(Math.max(v.width,v.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?v.mipmaps.length:1}function b(S){return S===Tt||S===Al||S===ua?t.NEAREST:t.LINEAR}function H(S){const v=S.target;v.removeEventListener("dispose",H),N(v),v.isVideoTexture&&g.delete(v)}function O(S){const v=S.target;v.removeEventListener("dispose",O),Y(v)}function N(S){const v=i.get(S);if(v.__webglInit===void 0)return;const F=S.source,q=m.get(F);if(q){const $=q[v.__cacheKey];$.usedTimes--,$.usedTimes===0&&V(S),Object.keys(q).length===0&&m.delete(F)}i.remove(S)}function V(S){const v=i.get(S);t.deleteTexture(v.__webglTexture);const F=S.source,q=m.get(F);delete q[v.__cacheKey],a.memory.textures--}function Y(S){const v=S.texture,F=i.get(S),q=i.get(v);if(q.__webglTexture!==void 0&&(t.deleteTexture(q.__webglTexture),a.memory.textures--),S.depthTexture&&S.depthTexture.dispose(),S.isWebGLCubeRenderTarget)for(let $=0;$<6;$++)t.deleteFramebuffer(F.__webglFramebuffer[$]),F.__webglDepthbuffer&&t.deleteRenderbuffer(F.__webglDepthbuffer[$]);else{if(t.deleteFramebuffer(F.__webglFramebuffer),F.__webglDepthbuffer&&t.deleteRenderbuffer(F.__webglDepthbuffer),F.__webglMultisampledFramebuffer&&t.deleteFramebuffer(F.__webglMultisampledFramebuffer),F.__webglColorRenderbuffer)for(let $=0;$<F.__webglColorRenderbuffer.length;$++)F.__webglColorRenderbuffer[$]&&t.deleteRenderbuffer(F.__webglColorRenderbuffer[$]);F.__webglDepthRenderbuffer&&t.deleteRenderbuffer(F.__webglDepthRenderbuffer)}if(S.isWebGLMultipleRenderTargets)for(let $=0,fe=v.length;$<fe;$++){const C=i.get(v[$]);C.__webglTexture&&(t.deleteTexture(C.__webglTexture),a.memory.textures--),i.remove(v[$])}i.remove(v),i.remove(S)}let Q=0;function j(){Q=0}function X(){const S=Q;return S>=l&&console.warn("THREE.WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+l),Q+=1,S}function ue(S){const v=[];return v.push(S.wrapS),v.push(S.wrapT),v.push(S.wrapR||0),v.push(S.magFilter),v.push(S.minFilter),v.push(S.anisotropy),v.push(S.internalFormat),v.push(S.format),v.push(S.type),v.push(S.generateMipmaps),v.push(S.premultiplyAlpha),v.push(S.flipY),v.push(S.unpackAlignment),v.push(S.colorSpace),v.join()}function ae(S,v){const F=i.get(S);if(S.isVideoTexture&&ce(S),S.isRenderTargetTexture===!1&&S.version>0&&F.__version!==S.version){const q=S.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Le(F,S,v);return}}n.bindTexture(t.TEXTURE_2D,F.__webglTexture,t.TEXTURE0+v)}function be(S,v){const F=i.get(S);if(S.version>0&&F.__version!==S.version){Le(F,S,v);return}n.bindTexture(t.TEXTURE_2D_ARRAY,F.__webglTexture,t.TEXTURE0+v)}function he(S,v){const F=i.get(S);if(S.version>0&&F.__version!==S.version){Le(F,S,v);return}n.bindTexture(t.TEXTURE_3D,F.__webglTexture,t.TEXTURE0+v)}function K(S,v){const F=i.get(S);if(S.version>0&&F.__version!==S.version){Ce(F,S,v);return}n.bindTexture(t.TEXTURE_CUBE_MAP,F.__webglTexture,t.TEXTURE0+v)}const oe={[ao]:t.REPEAT,[Jt]:t.CLAMP_TO_EDGE,[oo]:t.MIRRORED_REPEAT},_e={[Tt]:t.NEAREST,[Al]:t.NEAREST_MIPMAP_NEAREST,[ua]:t.NEAREST_MIPMAP_LINEAR,[Wt]:t.LINEAR,[jp]:t.LINEAR_MIPMAP_NEAREST,[Nr]:t.LINEAR_MIPMAP_LINEAR};function ve(S,v,F){if(F?(t.texParameteri(S,t.TEXTURE_WRAP_S,oe[v.wrapS]),t.texParameteri(S,t.TEXTURE_WRAP_T,oe[v.wrapT]),(S===t.TEXTURE_3D||S===t.TEXTURE_2D_ARRAY)&&t.texParameteri(S,t.TEXTURE_WRAP_R,oe[v.wrapR]),t.texParameteri(S,t.TEXTURE_MAG_FILTER,_e[v.magFilter]),t.texParameteri(S,t.TEXTURE_MIN_FILTER,_e[v.minFilter])):(t.texParameteri(S,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(S,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),(S===t.TEXTURE_3D||S===t.TEXTURE_2D_ARRAY)&&t.texParameteri(S,t.TEXTURE_WRAP_R,t.CLAMP_TO_EDGE),(v.wrapS!==Jt||v.wrapT!==Jt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),t.texParameteri(S,t.TEXTURE_MAG_FILTER,b(v.magFilter)),t.texParameteri(S,t.TEXTURE_MIN_FILTER,b(v.minFilter)),v.minFilter!==Tt&&v.minFilter!==Wt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),e.has("EXT_texture_filter_anisotropic")===!0){const q=e.get("EXT_texture_filter_anisotropic");if(v.magFilter===Tt||v.minFilter!==ua&&v.minFilter!==Nr||v.type===oi&&e.has("OES_texture_float_linear")===!1||o===!1&&v.type===Fr&&e.has("OES_texture_half_float_linear")===!1)return;(v.anisotropy>1||i.get(v).__currentAnisotropy)&&(t.texParameterf(S,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy)}}function U(S,v){let F=!1;S.__webglInit===void 0&&(S.__webglInit=!0,v.addEventListener("dispose",H));const q=v.source;let $=m.get(q);$===void 0&&($={},m.set(q,$));const fe=ue(v);if(fe!==S.__cacheKey){$[fe]===void 0&&($[fe]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,F=!0),$[fe].usedTimes++;const C=$[S.__cacheKey];C!==void 0&&($[S.__cacheKey].usedTimes--,C.usedTimes===0&&V(v)),S.__cacheKey=fe,S.__webglTexture=$[fe].texture}return F}function Le(S,v,F){let q=t.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(q=t.TEXTURE_2D_ARRAY),v.isData3DTexture&&(q=t.TEXTURE_3D);const $=U(S,v),fe=v.source;n.bindTexture(q,S.__webglTexture,t.TEXTURE0+F);const C=i.get(fe);if(fe.version!==C.__version||$===!0){n.activeTexture(t.TEXTURE0+F),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.NONE);const Z=y(v)&&M(v.image)===!1;let G=E(v.image,Z,!1,u);G=le(v,G);const ge=M(G)||o,Me=s.convert(v.format,v.colorSpace);let Te=s.convert(v.type),ye=I(v.internalFormat,Me,Te,v.colorSpace);ve(q,v,ge);let Se;const Re=v.mipmaps,De=o&&v.isVideoTexture!==!0,et=C.__version===void 0||$===!0,D=x(v,G,ge);if(v.isDepthTexture)ye=t.DEPTH_COMPONENT,o?v.type===oi?ye=t.DEPTH_COMPONENT32F:v.type===ai?ye=t.DEPTH_COMPONENT24:v.type===Ki?ye=t.DEPTH24_STENCIL8:ye=t.DEPTH_COMPONENT16:v.type===oi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),v.format===ci&&ye===t.DEPTH_COMPONENT&&v.type!==Qu&&v.type!==ai&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),v.type=ai,Te=s.convert(v.type)),v.format===nr&&ye===t.DEPTH_COMPONENT&&(ye=t.DEPTH_STENCIL,v.type!==Ki&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),v.type=Ki,Te=s.convert(v.type))),et&&(De?n.texStorage2D(t.TEXTURE_2D,1,ye,G.width,G.height):n.texImage2D(t.TEXTURE_2D,0,ye,G.width,G.height,0,Me,Te,null));else if(v.isDataTexture)if(Re.length>0&&ge){De&&et&&n.texStorage2D(t.TEXTURE_2D,D,ye,Re[0].width,Re[0].height);for(let ee=0,pe=Re.length;ee<pe;ee++)Se=Re[ee],De?n.texSubImage2D(t.TEXTURE_2D,ee,0,0,Se.width,Se.height,Me,Te,Se.data):n.texImage2D(t.TEXTURE_2D,ee,ye,Se.width,Se.height,0,Me,Te,Se.data);v.generateMipmaps=!1}else De?(et&&n.texStorage2D(t.TEXTURE_2D,D,ye,G.width,G.height),n.texSubImage2D(t.TEXTURE_2D,0,0,0,G.width,G.height,Me,Te,G.data)):n.texImage2D(t.TEXTURE_2D,0,ye,G.width,G.height,0,Me,Te,G.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){De&&et&&n.texStorage3D(t.TEXTURE_2D_ARRAY,D,ye,Re[0].width,Re[0].height,G.depth);for(let ee=0,pe=Re.length;ee<pe;ee++)Se=Re[ee],v.format!==Qt?Me!==null?De?n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ee,0,0,0,Se.width,Se.height,G.depth,Me,Se.data,0,0):n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,ee,ye,Se.width,Se.height,G.depth,0,Se.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):De?n.texSubImage3D(t.TEXTURE_2D_ARRAY,ee,0,0,0,Se.width,Se.height,G.depth,Me,Te,Se.data):n.texImage3D(t.TEXTURE_2D_ARRAY,ee,ye,Se.width,Se.height,G.depth,0,Me,Te,Se.data)}else{De&&et&&n.texStorage2D(t.TEXTURE_2D,D,ye,Re[0].width,Re[0].height);for(let ee=0,pe=Re.length;ee<pe;ee++)Se=Re[ee],v.format!==Qt?Me!==null?De?n.compressedTexSubImage2D(t.TEXTURE_2D,ee,0,0,Se.width,Se.height,Me,Se.data):n.compressedTexImage2D(t.TEXTURE_2D,ee,ye,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):De?n.texSubImage2D(t.TEXTURE_2D,ee,0,0,Se.width,Se.height,Me,Te,Se.data):n.texImage2D(t.TEXTURE_2D,ee,ye,Se.width,Se.height,0,Me,Te,Se.data)}else if(v.isDataArrayTexture)De?(et&&n.texStorage3D(t.TEXTURE_2D_ARRAY,D,ye,G.width,G.height,G.depth),n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,G.width,G.height,G.depth,Me,Te,G.data)):n.texImage3D(t.TEXTURE_2D_ARRAY,0,ye,G.width,G.height,G.depth,0,Me,Te,G.data);else if(v.isData3DTexture)De?(et&&n.texStorage3D(t.TEXTURE_3D,D,ye,G.width,G.height,G.depth),n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,G.width,G.height,G.depth,Me,Te,G.data)):n.texImage3D(t.TEXTURE_3D,0,ye,G.width,G.height,G.depth,0,Me,Te,G.data);else if(v.isFramebufferTexture){if(et)if(De)n.texStorage2D(t.TEXTURE_2D,D,ye,G.width,G.height);else{let ee=G.width,pe=G.height;for(let Ee=0;Ee<D;Ee++)n.texImage2D(t.TEXTURE_2D,Ee,ye,ee,pe,0,Me,Te,null),ee>>=1,pe>>=1}}else if(Re.length>0&&ge){De&&et&&n.texStorage2D(t.TEXTURE_2D,D,ye,Re[0].width,Re[0].height);for(let ee=0,pe=Re.length;ee<pe;ee++)Se=Re[ee],De?n.texSubImage2D(t.TEXTURE_2D,ee,0,0,Me,Te,Se):n.texImage2D(t.TEXTURE_2D,ee,ye,Me,Te,Se);v.generateMipmaps=!1}else De?(et&&n.texStorage2D(t.TEXTURE_2D,D,ye,G.width,G.height),n.texSubImage2D(t.TEXTURE_2D,0,0,0,Me,Te,G)):n.texImage2D(t.TEXTURE_2D,0,ye,Me,Te,G);L(v,ge)&&P(q),C.__version=fe.version,v.onUpdate&&v.onUpdate(v)}S.__version=v.version}function Ce(S,v,F){if(v.image.length!==6)return;const q=U(S,v),$=v.source;n.bindTexture(t.TEXTURE_CUBE_MAP,S.__webglTexture,t.TEXTURE0+F);const fe=i.get($);if($.version!==fe.__version||q===!0){n.activeTexture(t.TEXTURE0+F),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.NONE);const C=v.isCompressedTexture||v.image[0].isCompressedTexture,Z=v.image[0]&&v.image[0].isDataTexture,G=[];for(let ee=0;ee<6;ee++)!C&&!Z?G[ee]=E(v.image[ee],!1,!0,c):G[ee]=Z?v.image[ee].image:v.image[ee],G[ee]=le(v,G[ee]);const ge=G[0],Me=M(ge)||o,Te=s.convert(v.format,v.colorSpace),ye=s.convert(v.type),Se=I(v.internalFormat,Te,ye,v.colorSpace),Re=o&&v.isVideoTexture!==!0,De=fe.__version===void 0||q===!0;let et=x(v,ge,Me);ve(t.TEXTURE_CUBE_MAP,v,Me);let D;if(C){Re&&De&&n.texStorage2D(t.TEXTURE_CUBE_MAP,et,Se,ge.width,ge.height);for(let ee=0;ee<6;ee++){D=G[ee].mipmaps;for(let pe=0;pe<D.length;pe++){const Ee=D[pe];v.format!==Qt?Te!==null?Re?n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,pe,0,0,Ee.width,Ee.height,Te,Ee.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,pe,Se,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Re?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,pe,0,0,Ee.width,Ee.height,Te,ye,Ee.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,pe,Se,Ee.width,Ee.height,0,Te,ye,Ee.data)}}}else{D=v.mipmaps,Re&&De&&(D.length>0&&et++,n.texStorage2D(t.TEXTURE_CUBE_MAP,et,Se,G[0].width,G[0].height));for(let ee=0;ee<6;ee++)if(Z){Re?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,G[ee].width,G[ee].height,Te,ye,G[ee].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,Se,G[ee].width,G[ee].height,0,Te,ye,G[ee].data);for(let pe=0;pe<D.length;pe++){const Ae=D[pe].image[ee].image;Re?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,pe+1,0,0,Ae.width,Ae.height,Te,ye,Ae.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,pe+1,Se,Ae.width,Ae.height,0,Te,ye,Ae.data)}}else{Re?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Te,ye,G[ee]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,Se,Te,ye,G[ee]);for(let pe=0;pe<D.length;pe++){const Ee=D[pe];Re?n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,pe+1,0,0,Te,ye,Ee.image[ee]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,pe+1,Se,Te,ye,Ee.image[ee])}}}L(v,Me)&&P(t.TEXTURE_CUBE_MAP),fe.__version=$.version,v.onUpdate&&v.onUpdate(v)}S.__version=v.version}function me(S,v,F,q,$){const fe=s.convert(F.format,F.colorSpace),C=s.convert(F.type),Z=I(F.internalFormat,fe,C,F.colorSpace);i.get(v).__hasExternalTextures||($===t.TEXTURE_3D||$===t.TEXTURE_2D_ARRAY?n.texImage3D($,0,Z,v.width,v.height,v.depth,0,fe,C,null):n.texImage2D($,0,Z,v.width,v.height,0,fe,C,null)),n.bindFramebuffer(t.FRAMEBUFFER,S),se(v)?f.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,q,$,i.get(F).__webglTexture,0,de(v)):($===t.TEXTURE_2D||$>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,q,$,i.get(F).__webglTexture,0),n.bindFramebuffer(t.FRAMEBUFFER,null)}function we(S,v,F){if(t.bindRenderbuffer(t.RENDERBUFFER,S),v.depthBuffer&&!v.stencilBuffer){let q=t.DEPTH_COMPONENT16;if(F||se(v)){const $=v.depthTexture;$&&$.isDepthTexture&&($.type===oi?q=t.DEPTH_COMPONENT32F:$.type===ai&&(q=t.DEPTH_COMPONENT24));const fe=de(v);se(v)?f.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,fe,q,v.width,v.height):t.renderbufferStorageMultisample(t.RENDERBUFFER,fe,q,v.width,v.height)}else t.renderbufferStorage(t.RENDERBUFFER,q,v.width,v.height);t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,S)}else if(v.depthBuffer&&v.stencilBuffer){const q=de(v);F&&se(v)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,q,t.DEPTH24_STENCIL8,v.width,v.height):se(v)?f.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,q,t.DEPTH24_STENCIL8,v.width,v.height):t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_STENCIL,v.width,v.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.RENDERBUFFER,S)}else{const q=v.isWebGLMultipleRenderTargets===!0?v.texture:[v.texture];for(let $=0;$<q.length;$++){const fe=q[$],C=s.convert(fe.format,fe.colorSpace),Z=s.convert(fe.type),G=I(fe.internalFormat,C,Z,fe.colorSpace),ge=de(v);F&&se(v)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,ge,G,v.width,v.height):se(v)?f.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ge,G,v.width,v.height):t.renderbufferStorage(t.RENDERBUFFER,G,v.width,v.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function w(S,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,S),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),ae(v.depthTexture,0);const q=i.get(v.depthTexture).__webglTexture,$=de(v);if(v.depthTexture.format===ci)se(v)?f.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,q,0,$):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,q,0);else if(v.depthTexture.format===nr)se(v)?f.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,q,0,$):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,q,0);else throw new Error("Unknown depthTexture format")}function R(S){const v=i.get(S),F=S.isWebGLCubeRenderTarget===!0;if(S.depthTexture&&!v.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");w(v.__webglFramebuffer,S)}else if(F){v.__webglDepthbuffer=[];for(let q=0;q<6;q++)n.bindFramebuffer(t.FRAMEBUFFER,v.__webglFramebuffer[q]),v.__webglDepthbuffer[q]=t.createRenderbuffer(),we(v.__webglDepthbuffer[q],S,!1)}else n.bindFramebuffer(t.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer=t.createRenderbuffer(),we(v.__webglDepthbuffer,S,!1);n.bindFramebuffer(t.FRAMEBUFFER,null)}function B(S,v,F){const q=i.get(S);v!==void 0&&me(q.__webglFramebuffer,S,S.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D),F!==void 0&&R(S)}function re(S){const v=S.texture,F=i.get(S),q=i.get(v);S.addEventListener("dispose",O),S.isWebGLMultipleRenderTargets!==!0&&(q.__webglTexture===void 0&&(q.__webglTexture=t.createTexture()),q.__version=v.version,a.memory.textures++);const $=S.isWebGLCubeRenderTarget===!0,fe=S.isWebGLMultipleRenderTargets===!0,C=M(S)||o;if($){F.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)F.__webglFramebuffer[Z]=t.createFramebuffer()}else{if(F.__webglFramebuffer=t.createFramebuffer(),fe)if(r.drawBuffers){const Z=S.texture;for(let G=0,ge=Z.length;G<ge;G++){const Me=i.get(Z[G]);Me.__webglTexture===void 0&&(Me.__webglTexture=t.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&S.samples>0&&se(S)===!1){const Z=fe?v:[v];F.__webglMultisampledFramebuffer=t.createFramebuffer(),F.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let G=0;G<Z.length;G++){const ge=Z[G];F.__webglColorRenderbuffer[G]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,F.__webglColorRenderbuffer[G]);const Me=s.convert(ge.format,ge.colorSpace),Te=s.convert(ge.type),ye=I(ge.internalFormat,Me,Te,ge.colorSpace,S.isXRRenderTarget===!0),Se=de(S);t.renderbufferStorageMultisample(t.RENDERBUFFER,Se,ye,S.width,S.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+G,t.RENDERBUFFER,F.__webglColorRenderbuffer[G])}t.bindRenderbuffer(t.RENDERBUFFER,null),S.depthBuffer&&(F.__webglDepthRenderbuffer=t.createRenderbuffer(),we(F.__webglDepthRenderbuffer,S,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if($){n.bindTexture(t.TEXTURE_CUBE_MAP,q.__webglTexture),ve(t.TEXTURE_CUBE_MAP,v,C);for(let Z=0;Z<6;Z++)me(F.__webglFramebuffer[Z],S,v,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+Z);L(v,C)&&P(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(fe){const Z=S.texture;for(let G=0,ge=Z.length;G<ge;G++){const Me=Z[G],Te=i.get(Me);n.bindTexture(t.TEXTURE_2D,Te.__webglTexture),ve(t.TEXTURE_2D,Me,C),me(F.__webglFramebuffer,S,Me,t.COLOR_ATTACHMENT0+G,t.TEXTURE_2D),L(Me,C)&&P(t.TEXTURE_2D)}n.unbindTexture()}else{let Z=t.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(o?Z=S.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),n.bindTexture(Z,q.__webglTexture),ve(Z,v,C),me(F.__webglFramebuffer,S,v,t.COLOR_ATTACHMENT0,Z),L(v,C)&&P(Z),n.unbindTexture()}S.depthBuffer&&R(S)}function J(S){const v=M(S)||o,F=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let q=0,$=F.length;q<$;q++){const fe=F[q];if(L(fe,v)){const C=S.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,Z=i.get(fe).__webglTexture;n.bindTexture(C,Z),P(C),n.unbindTexture()}}}function ne(S){if(o&&S.samples>0&&se(S)===!1){const v=S.isWebGLMultipleRenderTargets?S.texture:[S.texture],F=S.width,q=S.height;let $=t.COLOR_BUFFER_BIT;const fe=[],C=S.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Z=i.get(S),G=S.isWebGLMultipleRenderTargets===!0;if(G)for(let ge=0;ge<v.length;ge++)n.bindFramebuffer(t.FRAMEBUFFER,Z.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ge,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Z.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ge,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Z.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Z.__webglFramebuffer);for(let ge=0;ge<v.length;ge++){fe.push(t.COLOR_ATTACHMENT0+ge),S.depthBuffer&&fe.push(C);const Me=Z.__ignoreDepthValues!==void 0?Z.__ignoreDepthValues:!1;if(Me===!1&&(S.depthBuffer&&($|=t.DEPTH_BUFFER_BIT),S.stencilBuffer&&($|=t.STENCIL_BUFFER_BIT)),G&&t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Z.__webglColorRenderbuffer[ge]),Me===!0&&(t.invalidateFramebuffer(t.READ_FRAMEBUFFER,[C]),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[C])),G){const Te=i.get(v[ge]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Te,0)}t.blitFramebuffer(0,0,F,q,0,0,F,q,$,t.NEAREST),p&&t.invalidateFramebuffer(t.READ_FRAMEBUFFER,fe)}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),G)for(let ge=0;ge<v.length;ge++){n.bindFramebuffer(t.FRAMEBUFFER,Z.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ge,t.RENDERBUFFER,Z.__webglColorRenderbuffer[ge]);const Me=i.get(v[ge]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Z.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ge,t.TEXTURE_2D,Me,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Z.__webglMultisampledFramebuffer)}}function de(S){return Math.min(h,S.samples)}function se(S){const v=i.get(S);return o&&S.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function ce(S){const v=a.render.frame;g.get(S)!==v&&(g.set(S,v),S.update())}function le(S,v){const F=S.colorSpace,q=S.format,$=S.type;return S.isCompressedTexture===!0||S.format===lo||F!==dn&&F!==fi&&(F===Ne?o===!1?e.has("EXT_sRGB")===!0&&q===Qt?(S.format=lo,S.minFilter=Wt,S.generateMipmaps=!1):v=sf.sRGBToLinear(v):(q!==Qt||$!==di)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),v}this.allocateTextureUnit=X,this.resetTextureUnits=j,this.setTexture2D=ae,this.setTexture2DArray=be,this.setTexture3D=he,this.setTextureCube=K,this.rebindTextures=B,this.setupRenderTarget=re,this.updateRenderTargetMipmap=J,this.updateMultisampleRenderTarget=ne,this.setupDepthRenderbuffer=R,this.setupFrameBufferTexture=me,this.useMultisampledRTT=se}function lx(t,e,n){const i=n.isWebGL2;function r(s,a=fi){let o;if(s===di)return t.UNSIGNED_BYTE;if(s===$p)return t.UNSIGNED_SHORT_4_4_4_4;if(s===Zp)return t.UNSIGNED_SHORT_5_5_5_1;if(s===qp)return t.BYTE;if(s===Yp)return t.SHORT;if(s===Qu)return t.UNSIGNED_SHORT;if(s===Kp)return t.INT;if(s===ai)return t.UNSIGNED_INT;if(s===oi)return t.FLOAT;if(s===Fr)return i?t.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===Jp)return t.ALPHA;if(s===Qt)return t.RGBA;if(s===Qp)return t.LUMINANCE;if(s===em)return t.LUMINANCE_ALPHA;if(s===ci)return t.DEPTH_COMPONENT;if(s===nr)return t.DEPTH_STENCIL;if(s===lo)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===tm)return t.RED;if(s===nm)return t.RED_INTEGER;if(s===im)return t.RG;if(s===rm)return t.RG_INTEGER;if(s===sm)return t.RGBA_INTEGER;if(s===fa||s===ha||s===da||s===pa)if(a===Ne)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===fa)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===ha)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===da)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===pa)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===fa)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===ha)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===da)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===pa)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===wl||s===Rl||s===Cl||s===Pl)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===wl)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Rl)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Cl)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Pl)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===am)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Ll||s===Il)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===Ll)return a===Ne?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Il)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Ul||s===Dl||s===Nl||s===Fl||s===Ol||s===Bl||s===kl||s===zl||s===Hl||s===Gl||s===Vl||s===Wl||s===Xl||s===jl)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Ul)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Dl)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Nl)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Fl)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Ol)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Bl)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===kl)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===zl)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Hl)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Gl)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Vl)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Wl)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Xl)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===jl)return a===Ne?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===ma)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===ma)return a===Ne?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;if(s===om||s===ql||s===Yl||s===Kl)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===ma)return o.COMPRESSED_RED_RGTC1_EXT;if(s===ql)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Yl)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Kl)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Ki?i?t.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):t[s]!==void 0?t[s]:null}return{convert:r}}class cx extends Xt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}let _r=class extends xt{constructor(){super(),this.isGroup=!0,this.type="Group"}};const ux={type:"move"};class ka{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _r,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _r,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _r,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const m=n.getJointPose(_,i),d=this._getHandJoint(c,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ux)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new _r;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}class fx extends Ut{constructor(e,n,i,r,s,a,o,l,c,u){if(u=u!==void 0?u:ci,u!==ci&&u!==nr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===ci&&(i=ai),i===void 0&&u===nr&&(i=Ki),super(null,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=o!==void 0?o:Tt,this.minFilter=l!==void 0?l:Tt,this.flipY=!1,this.generateMipmaps=!1}}class hx extends xi{constructor(e,n){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,f=null,p=null,g=null;const _=n.getContextAttributes();let m=null,d=null;const A=[],E=[],M=new Set,y=new Map,L=new Xt;L.layers.enable(1),L.viewport=new ft;const P=new Xt;P.layers.enable(2),P.viewport=new ft;const I=[L,P],x=new cx;x.layers.enable(1),x.layers.enable(2);let b=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let oe=A[K];return oe===void 0&&(oe=new ka,A[K]=oe),oe.getTargetRaySpace()},this.getControllerGrip=function(K){let oe=A[K];return oe===void 0&&(oe=new ka,A[K]=oe),oe.getGripSpace()},this.getHand=function(K){let oe=A[K];return oe===void 0&&(oe=new ka,A[K]=oe),oe.getHandSpace()};function O(K){const oe=E.indexOf(K.inputSource);if(oe===-1)return;const _e=A[oe];_e!==void 0&&(_e.update(K.inputSource,K.frame,c||a),_e.dispatchEvent({type:K.type,data:K.inputSource}))}function N(){r.removeEventListener("select",O),r.removeEventListener("selectstart",O),r.removeEventListener("selectend",O),r.removeEventListener("squeeze",O),r.removeEventListener("squeezestart",O),r.removeEventListener("squeezeend",O),r.removeEventListener("end",N),r.removeEventListener("inputsourceschange",V);for(let K=0;K<A.length;K++){const oe=E[K];oe!==null&&(E[K]=null,A[K].disconnect(oe))}b=null,H=null,e.setRenderTarget(m),p=null,f=null,h=null,r=null,d=null,he.stop(),i.isPresenting=!1,i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(K){if(r=K,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",O),r.addEventListener("selectstart",O),r.addEventListener("selectend",O),r.addEventListener("squeeze",O),r.addEventListener("squeezestart",O),r.addEventListener("squeezeend",O),r.addEventListener("end",N),r.addEventListener("inputsourceschange",V),_.xrCompatible!==!0&&await n.makeXRCompatible(),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const oe={antialias:r.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,oe),r.updateRenderState({baseLayer:p}),d=new pi(p.framebufferWidth,p.framebufferHeight,{format:Qt,type:di,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let oe=null,_e=null,ve=null;_.depth&&(ve=_.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,oe=_.stencil?nr:ci,_e=_.stencil?Ki:ai);const U={colorFormat:n.RGBA8,depthFormat:ve,scaleFactor:s};h=new XRWebGLBinding(r,n),f=h.createProjectionLayer(U),r.updateRenderState({layers:[f]}),d=new pi(f.textureWidth,f.textureHeight,{format:Qt,type:di,depthTexture:new fx(f.textureWidth,f.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,oe),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Le=e.properties.get(d);Le.__ignoreDepthValues=f.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),he.setContext(r),he.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function V(K){for(let oe=0;oe<K.removed.length;oe++){const _e=K.removed[oe],ve=E.indexOf(_e);ve>=0&&(E[ve]=null,A[ve].disconnect(_e))}for(let oe=0;oe<K.added.length;oe++){const _e=K.added[oe];let ve=E.indexOf(_e);if(ve===-1){for(let Le=0;Le<A.length;Le++)if(Le>=E.length){E.push(_e),ve=Le;break}else if(E[Le]===null){E[Le]=_e,ve=Le;break}if(ve===-1)break}const U=A[ve];U&&U.connect(_e)}}const Y=new z,Q=new z;function j(K,oe,_e){Y.setFromMatrixPosition(oe.matrixWorld),Q.setFromMatrixPosition(_e.matrixWorld);const ve=Y.distanceTo(Q),U=oe.projectionMatrix.elements,Le=_e.projectionMatrix.elements,Ce=U[14]/(U[10]-1),me=U[14]/(U[10]+1),we=(U[9]+1)/U[5],w=(U[9]-1)/U[5],R=(U[8]-1)/U[0],B=(Le[8]+1)/Le[0],re=Ce*R,J=Ce*B,ne=ve/(-R+B),de=ne*-R;oe.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(de),K.translateZ(ne),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert();const se=Ce+ne,ce=me+ne,le=re-de,S=J+(ve-de),v=we*me/ce*se,F=w*me/ce*se;K.projectionMatrix.makePerspective(le,S,v,F,se,ce),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}function X(K,oe){oe===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(oe.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(r===null)return;x.near=P.near=L.near=K.near,x.far=P.far=L.far=K.far,(b!==x.near||H!==x.far)&&(r.updateRenderState({depthNear:x.near,depthFar:x.far}),b=x.near,H=x.far);const oe=K.parent,_e=x.cameras;X(x,oe);for(let ve=0;ve<_e.length;ve++)X(_e[ve],oe);_e.length===2?j(x,L,P):x.projectionMatrix.copy(L.projectionMatrix),ue(K,x,oe)};function ue(K,oe,_e){_e===null?K.matrix.copy(oe.matrixWorld):(K.matrix.copy(_e.matrixWorld),K.matrix.invert(),K.matrix.multiply(oe.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0);const ve=K.children;for(let U=0,Le=ve.length;U<Le;U++)ve[U].updateMatrixWorld(!0);K.projectionMatrix.copy(oe.projectionMatrix),K.projectionMatrixInverse.copy(oe.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=co*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(K){l=K,f!==null&&(f.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)},this.getPlanes=function(){return M};let ae=null;function be(K,oe){if(u=oe.getViewerPose(c||a),g=oe,u!==null){const _e=u.views;p!==null&&(e.setRenderTargetFramebuffer(d,p.framebuffer),e.setRenderTarget(d));let ve=!1;_e.length!==x.cameras.length&&(x.cameras.length=0,ve=!0);for(let U=0;U<_e.length;U++){const Le=_e[U];let Ce=null;if(p!==null)Ce=p.getViewport(Le);else{const we=h.getViewSubImage(f,Le);Ce=we.viewport,U===0&&(e.setRenderTargetTextures(d,we.colorTexture,f.ignoreDepthValues?void 0:we.depthStencilTexture),e.setRenderTarget(d))}let me=I[U];me===void 0&&(me=new Xt,me.layers.enable(U),me.viewport=new ft,I[U]=me),me.matrix.fromArray(Le.transform.matrix),me.matrix.decompose(me.position,me.quaternion,me.scale),me.projectionMatrix.fromArray(Le.projectionMatrix),me.projectionMatrixInverse.copy(me.projectionMatrix).invert(),me.viewport.set(Ce.x,Ce.y,Ce.width,Ce.height),U===0&&(x.matrix.copy(me.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ve===!0&&x.cameras.push(me)}}for(let _e=0;_e<A.length;_e++){const ve=E[_e],U=A[_e];ve!==null&&U!==void 0&&U.update(ve,oe,c||a)}if(ae&&ae(K,oe),oe.detectedPlanes){i.dispatchEvent({type:"planesdetected",data:oe.detectedPlanes});let _e=null;for(const ve of M)oe.detectedPlanes.has(ve)||(_e===null&&(_e=[]),_e.push(ve));if(_e!==null)for(const ve of _e)M.delete(ve),y.delete(ve),i.dispatchEvent({type:"planeremoved",data:ve});for(const ve of oe.detectedPlanes)if(!M.has(ve))M.add(ve),y.set(ve,oe.lastChangedTime),i.dispatchEvent({type:"planeadded",data:ve});else{const U=y.get(ve);ve.lastChangedTime>U&&(y.set(ve,ve.lastChangedTime),i.dispatchEvent({type:"planechanged",data:ve}))}}g=null}const he=new mf;he.setAnimationLoop(be),this.setAnimationLoop=function(K){ae=K},this.dispose=function(){}}}function dx(t,e){function n(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,hf(t)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,A,E,M){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),h(m,d)):d.isMeshPhongMaterial?(s(m,d),u(m,d)):d.isMeshStandardMaterial?(s(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,M)):d.isMeshMatcapMaterial?(s(m,d),g(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),_(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,A,E):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,n(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,n(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,n(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Ct&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,n(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Ct&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,n(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,n(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const A=e.get(d).envMap;if(A&&(m.envMap.value=A,m.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap){m.lightMap.value=d.lightMap;const E=t.useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=d.lightMapIntensity*E,n(d.lightMap,m.lightMapTransform)}d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,n(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,A,E){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*A,m.scale.value=E*.5,d.map&&(m.map.value=d.map,n(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,n(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,m.roughnessMapTransform)),e.get(d).envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,A){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Ct&&m.clearcoatNormalScale.value.negate())),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=A.texture,m.transmissionSamplerSize.value.set(A.width,A.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){const A=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(A.matrixWorld),m.nearDistance.value=A.shadow.camera.near,m.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function px(t,e,n,i){let r={},s={},a=[];const o=n.isWebGL2?t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(A,E){const M=E.program;i.uniformBlockBinding(A,M)}function c(A,E){let M=r[A.id];M===void 0&&(g(A),M=u(A),r[A.id]=M,A.addEventListener("dispose",m));const y=E.program;i.updateUBOMapping(A,y);const L=e.render.frame;s[A.id]!==L&&(f(A),s[A.id]=L)}function u(A){const E=h();A.__bindingPointIndex=E;const M=t.createBuffer(),y=A.__size,L=A.usage;return t.bindBuffer(t.UNIFORM_BUFFER,M),t.bufferData(t.UNIFORM_BUFFER,y,L),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,E,M),M}function h(){for(let A=0;A<o;A++)if(a.indexOf(A)===-1)return a.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(A){const E=r[A.id],M=A.uniforms,y=A.__cache;t.bindBuffer(t.UNIFORM_BUFFER,E);for(let L=0,P=M.length;L<P;L++){const I=M[L];if(p(I,L,y)===!0){const x=I.__offset,b=Array.isArray(I.value)?I.value:[I.value];let H=0;for(let O=0;O<b.length;O++){const N=b[O],V=_(N);typeof N=="number"?(I.__data[0]=N,t.bufferSubData(t.UNIFORM_BUFFER,x+H,I.__data)):N.isMatrix3?(I.__data[0]=N.elements[0],I.__data[1]=N.elements[1],I.__data[2]=N.elements[2],I.__data[3]=N.elements[0],I.__data[4]=N.elements[3],I.__data[5]=N.elements[4],I.__data[6]=N.elements[5],I.__data[7]=N.elements[0],I.__data[8]=N.elements[6],I.__data[9]=N.elements[7],I.__data[10]=N.elements[8],I.__data[11]=N.elements[0]):(N.toArray(I.__data,H),H+=V.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,x,I.__data)}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(A,E,M){const y=A.value;if(M[E]===void 0){if(typeof y=="number")M[E]=y;else{const L=Array.isArray(y)?y:[y],P=[];for(let I=0;I<L.length;I++)P.push(L[I].clone());M[E]=P}return!0}else if(typeof y=="number"){if(M[E]!==y)return M[E]=y,!0}else{const L=Array.isArray(M[E])?M[E]:[M[E]],P=Array.isArray(y)?y:[y];for(let I=0;I<L.length;I++){const x=L[I];if(x.equals(P[I])===!1)return x.copy(P[I]),!0}}return!1}function g(A){const E=A.uniforms;let M=0;const y=16;let L=0;for(let P=0,I=E.length;P<I;P++){const x=E[P],b={boundary:0,storage:0},H=Array.isArray(x.value)?x.value:[x.value];for(let O=0,N=H.length;O<N;O++){const V=H[O],Y=_(V);b.boundary+=Y.boundary,b.storage+=Y.storage}if(x.__data=new Float32Array(b.storage/Float32Array.BYTES_PER_ELEMENT),x.__offset=M,P>0){L=M%y;const O=y-L;L!==0&&O-b.boundary<0&&(M+=y-L,x.__offset=M)}M+=b.storage}return L=M%y,L>0&&(M+=y-L),A.__size=M,A.__cache={},this}function _(A){const E={boundary:0,storage:0};return typeof A=="number"?(E.boundary=4,E.storage=4):A.isVector2?(E.boundary=8,E.storage=8):A.isVector3||A.isColor?(E.boundary=16,E.storage=12):A.isVector4?(E.boundary=16,E.storage=16):A.isMatrix3?(E.boundary=48,E.storage=48):A.isMatrix4?(E.boundary=64,E.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),E}function m(A){const E=A.target;E.removeEventListener("dispose",m);const M=a.indexOf(E.__bindingPointIndex);a.splice(M,1),t.deleteBuffer(r[E.id]),delete r[E.id],delete s[E.id]}function d(){for(const A in r)t.deleteBuffer(r[A]);a=[],r={},s={}}return{bind:l,update:c,dispose:d}}function mx(){const t=Cs("canvas");return t.style.display="block",t}class Sf{constructor(e={}){const{canvas:n=mx(),context:i=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let f;i!==null?f=i.getContextAttributes().alpha:f=a;let p=null,g=null;const _=[],m=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputColorSpace=Ne,this.useLegacyLights=!0,this.toneMapping=wn,this.toneMappingExposure=1;const d=this;let A=!1,E=0,M=0,y=null,L=-1,P=null;const I=new ft,x=new ft;let b=null,H=n.width,O=n.height,N=1,V=null,Y=null;const Q=new ft(0,0,H,O),j=new ft(0,0,H,O);let X=!1;const ue=new Bo;let ae=!1,be=!1,he=null;const K=new st,oe=new z,_e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ve(){return y===null?N:1}let U=i;function Le(T,W){for(let te=0;te<T.length;te++){const k=T[te],ie=n.getContext(k,W);if(ie!==null)return ie}return null}try{const T={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${No}`),n.addEventListener("webglcontextlost",Se,!1),n.addEventListener("webglcontextrestored",Re,!1),n.addEventListener("webglcontextcreationerror",De,!1),U===null){const W=["webgl2","webgl","experimental-webgl"];if(d.isWebGL1Renderer===!0&&W.shift(),U=Le(W,T),U===null)throw Le(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}U.getShaderPrecisionFormat===void 0&&(U.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Ce,me,we,w,R,B,re,J,ne,de,se,ce,le,S,v,F,q,$,fe,C,Z,G,ge,Me;function Te(){Ce=new Av(U),me=new Mv(U,Ce,e),Ce.init(me),G=new lx(U,Ce,me),we=new ax(U,Ce,me),w=new Cv(U),R=new j0,B=new ox(U,Ce,we,R,me,G,w),re=new yv(d),J=new Tv(d),ne=new Hm(U,me),ge=new vv(U,Ce,ne,me),de=new wv(U,ne,w,ge),se=new Uv(U,de,ne,w),fe=new Iv(U,me,B),F=new Sv(R),ce=new X0(d,re,J,Ce,me,ge,F),le=new dx(d,R),S=new Y0,v=new ex(Ce,me),$=new _v(d,re,J,we,se,f,l),q=new sx(d,se,me),Me=new px(U,w,me,we),C=new xv(U,Ce,w,me),Z=new Rv(U,Ce,w,me),w.programs=ce.programs,d.capabilities=me,d.extensions=Ce,d.properties=R,d.renderLists=S,d.shadowMap=q,d.state=we,d.info=w}Te();const ye=new hx(d,U);this.xr=ye,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const T=Ce.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Ce.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return N},this.setPixelRatio=function(T){T!==void 0&&(N=T,this.setSize(H,O,!1))},this.getSize=function(T){return T.set(H,O)},this.setSize=function(T,W,te=!0){if(ye.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=T,O=W,n.width=Math.floor(T*N),n.height=Math.floor(W*N),te===!0&&(n.style.width=T+"px",n.style.height=W+"px"),this.setViewport(0,0,T,W)},this.getDrawingBufferSize=function(T){return T.set(H*N,O*N).floor()},this.setDrawingBufferSize=function(T,W,te){H=T,O=W,N=te,n.width=Math.floor(T*te),n.height=Math.floor(W*te),this.setViewport(0,0,T,W)},this.getCurrentViewport=function(T){return T.copy(I)},this.getViewport=function(T){return T.copy(Q)},this.setViewport=function(T,W,te,k){T.isVector4?Q.set(T.x,T.y,T.z,T.w):Q.set(T,W,te,k),we.viewport(I.copy(Q).multiplyScalar(N).floor())},this.getScissor=function(T){return T.copy(j)},this.setScissor=function(T,W,te,k){T.isVector4?j.set(T.x,T.y,T.z,T.w):j.set(T,W,te,k),we.scissor(x.copy(j).multiplyScalar(N).floor())},this.getScissorTest=function(){return X},this.setScissorTest=function(T){we.setScissorTest(X=T)},this.setOpaqueSort=function(T){V=T},this.setTransparentSort=function(T){Y=T},this.getClearColor=function(T){return T.copy($.getClearColor())},this.setClearColor=function(){$.setClearColor.apply($,arguments)},this.getClearAlpha=function(){return $.getClearAlpha()},this.setClearAlpha=function(){$.setClearAlpha.apply($,arguments)},this.clear=function(T=!0,W=!0,te=!0){let k=0;T&&(k|=U.COLOR_BUFFER_BIT),W&&(k|=U.DEPTH_BUFFER_BIT),te&&(k|=U.STENCIL_BUFFER_BIT),U.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",Se,!1),n.removeEventListener("webglcontextrestored",Re,!1),n.removeEventListener("webglcontextcreationerror",De,!1),S.dispose(),v.dispose(),R.dispose(),re.dispose(),J.dispose(),se.dispose(),ge.dispose(),Me.dispose(),ce.dispose(),ye.dispose(),ye.removeEventListener("sessionstart",Ae),ye.removeEventListener("sessionend",$e),he&&(he.dispose(),he=null),Ze.stop()};function Se(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function Re(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const T=w.autoReset,W=q.enabled,te=q.autoUpdate,k=q.needsUpdate,ie=q.type;Te(),w.autoReset=T,q.enabled=W,q.autoUpdate=te,q.needsUpdate=k,q.type=ie}function De(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function et(T){const W=T.target;W.removeEventListener("dispose",et),D(W)}function D(T){ee(T),R.remove(T)}function ee(T){const W=R.get(T).programs;W!==void 0&&(W.forEach(function(te){ce.releaseProgram(te)}),T.isShaderMaterial&&ce.releaseShaderCache(T))}this.renderBufferDirect=function(T,W,te,k,ie,Pe){W===null&&(W=_e);const Ie=ie.isMesh&&ie.matrixWorld.determinant()<0,Ue=Hf(T,W,te,k,ie);we.setMaterial(k,Ie);let ke=te.index,He=1;k.wireframe===!0&&(ke=de.getWireframeAttribute(te),He=2);const Ge=te.drawRange,We=te.attributes.position;let Ke=Ge.start*He,St=(Ge.start+Ge.count)*He;Pe!==null&&(Ke=Math.max(Ke,Pe.start*He),St=Math.min(St,(Pe.start+Pe.count)*He)),ke!==null?(Ke=Math.max(Ke,0),St=Math.min(St,ke.count)):We!=null&&(Ke=Math.max(Ke,0),St=Math.min(St,We.count));const jt=St-Ke;if(jt<0||jt===1/0)return;ge.setup(ie,k,Ue,te,ke);let Yn,nt=C;if(ke!==null&&(Yn=ne.get(ke),nt=Z,nt.setIndex(Yn)),ie.isMesh)k.wireframe===!0?(we.setLineWidth(k.wireframeLinewidth*ve()),nt.setMode(U.LINES)):nt.setMode(U.TRIANGLES);else if(ie.isLine){let je=k.linewidth;je===void 0&&(je=1),we.setLineWidth(je*ve()),ie.isLineSegments?nt.setMode(U.LINES):ie.isLineLoop?nt.setMode(U.LINE_LOOP):nt.setMode(U.LINE_STRIP)}else ie.isPoints?nt.setMode(U.POINTS):ie.isSprite&&nt.setMode(U.TRIANGLES);if(ie.isInstancedMesh)nt.renderInstances(Ke,jt,ie.count);else if(te.isInstancedBufferGeometry){const je=te._maxInstanceCount!==void 0?te._maxInstanceCount:1/0,Ks=Math.min(te.instanceCount,je);nt.renderInstances(Ke,jt,Ks)}else nt.render(Ke,jt)},this.compile=function(T,W){function te(k,ie,Pe){k.transparent===!0&&k.side===An&&k.forceSinglePass===!1?(k.side=Ct,k.needsUpdate=!0,Vr(k,ie,Pe),k.side=qn,k.needsUpdate=!0,Vr(k,ie,Pe),k.side=An):Vr(k,ie,Pe)}g=v.get(T),g.init(),m.push(g),T.traverseVisible(function(k){k.isLight&&k.layers.test(W.layers)&&(g.pushLight(k),k.castShadow&&g.pushShadow(k))}),g.setupLights(d.useLegacyLights),T.traverse(function(k){const ie=k.material;if(ie)if(Array.isArray(ie))for(let Pe=0;Pe<ie.length;Pe++){const Ie=ie[Pe];te(Ie,T,k)}else te(ie,T,k)}),m.pop(),g=null};let pe=null;function Ee(T){pe&&pe(T)}function Ae(){Ze.stop()}function $e(){Ze.start()}const Ze=new mf;Ze.setAnimationLoop(Ee),typeof self<"u"&&Ze.setContext(self),this.setAnimationLoop=function(T){pe=T,ye.setAnimationLoop(T),T===null?Ze.stop():Ze.start()},ye.addEventListener("sessionstart",Ae),ye.addEventListener("sessionend",$e),this.render=function(T,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),ye.enabled===!0&&ye.isPresenting===!0&&(ye.cameraAutoUpdate===!0&&ye.updateCamera(W),W=ye.getCamera()),T.isScene===!0&&T.onBeforeRender(d,T,W,y),g=v.get(T,m.length),g.init(),m.push(g),K.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),ue.setFromProjectionMatrix(K),be=this.localClippingEnabled,ae=F.init(this.clippingPlanes,be),p=S.get(T,_.length),p.init(),_.push(p),dt(T,W,0,d.sortObjects),p.finish(),d.sortObjects===!0&&p.sort(V,Y),ae===!0&&F.beginShadows();const te=g.state.shadowsArray;if(q.render(te,T,W),ae===!0&&F.endShadows(),this.info.autoReset===!0&&this.info.reset(),$.render(p,T),g.setupLights(d.useLegacyLights),W.isArrayCamera){const k=W.cameras;for(let ie=0,Pe=k.length;ie<Pe;ie++){const Ie=k[ie];Un(p,T,Ie,Ie.viewport)}}else Un(p,T,W);y!==null&&(B.updateMultisampleRenderTarget(y),B.updateRenderTargetMipmap(y)),T.isScene===!0&&T.onAfterRender(d,T,W),ge.resetDefaultState(),L=-1,P=null,m.pop(),m.length>0?g=m[m.length-1]:g=null,_.pop(),_.length>0?p=_[_.length-1]:p=null};function dt(T,W,te,k){if(T.visible===!1)return;if(T.layers.test(W.layers)){if(T.isGroup)te=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(W);else if(T.isLight)g.pushLight(T),T.castShadow&&g.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||ue.intersectsSprite(T)){k&&oe.setFromMatrixPosition(T.matrixWorld).applyMatrix4(K);const Ie=se.update(T),Ue=T.material;Ue.visible&&p.push(T,Ie,Ue,te,oe.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||ue.intersectsObject(T))){T.isSkinnedMesh&&T.skeleton.frame!==w.render.frame&&(T.skeleton.update(),T.skeleton.frame=w.render.frame);const Ie=se.update(T),Ue=T.material;if(k&&(Ie.boundingSphere===null&&Ie.computeBoundingSphere(),oe.copy(Ie.boundingSphere.center).applyMatrix4(T.matrixWorld).applyMatrix4(K)),Array.isArray(Ue)){const ke=Ie.groups;for(let He=0,Ge=ke.length;He<Ge;He++){const We=ke[He],Ke=Ue[We.materialIndex];Ke&&Ke.visible&&p.push(T,Ie,Ke,te,oe.z,We)}}else Ue.visible&&p.push(T,Ie,Ue,te,oe.z,null)}}const Pe=T.children;for(let Ie=0,Ue=Pe.length;Ie<Ue;Ie++)dt(Pe[Ie],W,te,k)}function Un(T,W,te,k){const ie=T.opaque,Pe=T.transmissive,Ie=T.transparent;g.setupLightsView(te),ae===!0&&F.setGlobalState(d.clippingPlanes,te),Pe.length>0&&tt(ie,Pe,W,te),k&&we.viewport(I.copy(k)),ie.length>0&&Ht(ie,W,te),Pe.length>0&&Ht(Pe,W,te),Ie.length>0&&Ht(Ie,W,te),we.buffers.depth.setTest(!0),we.buffers.depth.setMask(!0),we.buffers.color.setMask(!0),we.setPolygonOffset(!1)}function tt(T,W,te,k){if(he===null){const Ue=me.isWebGL2;he=new pi(1024,1024,{generateMipmaps:!0,type:Ce.has("EXT_color_buffer_half_float")?Fr:di,minFilter:Nr,samples:Ue&&o===!0?4:0})}const ie=d.getRenderTarget();d.setRenderTarget(he),d.clear();const Pe=d.toneMapping;d.toneMapping=wn,Ht(T,te,k),B.updateMultisampleRenderTarget(he),B.updateRenderTargetMipmap(he);let Ie=!1;for(let Ue=0,ke=W.length;Ue<ke;Ue++){const He=W[Ue],Ge=He.object,We=He.geometry,Ke=He.material,St=He.group;if(Ke.side===An&&Ge.layers.test(k.layers)){const jt=Ke.side;Ke.side=Ct,Ke.needsUpdate=!0,nn(Ge,te,k,We,Ke,St),Ke.side=jt,Ke.needsUpdate=!0,Ie=!0}}Ie===!0&&(B.updateMultisampleRenderTarget(he),B.updateRenderTargetMipmap(he)),d.setRenderTarget(ie),d.toneMapping=Pe}function Ht(T,W,te){const k=W.isScene===!0?W.overrideMaterial:null;for(let ie=0,Pe=T.length;ie<Pe;ie++){const Ie=T[ie],Ue=Ie.object,ke=Ie.geometry,He=k===null?Ie.material:k,Ge=Ie.group;Ue.layers.test(te.layers)&&nn(Ue,W,te,ke,He,Ge)}}function nn(T,W,te,k,ie,Pe){T.onBeforeRender(d,W,te,k,ie,Pe),T.modelViewMatrix.multiplyMatrices(te.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),ie.onBeforeRender(d,W,te,k,T,Pe),ie.transparent===!0&&ie.side===An&&ie.forceSinglePass===!1?(ie.side=Ct,ie.needsUpdate=!0,d.renderBufferDirect(te,W,k,ie,T,Pe),ie.side=qn,ie.needsUpdate=!0,d.renderBufferDirect(te,W,k,ie,T,Pe),ie.side=An):d.renderBufferDirect(te,W,k,ie,T,Pe),T.onAfterRender(d,W,te,k,ie,Pe)}function Vr(T,W,te){W.isScene!==!0&&(W=_e);const k=R.get(T),ie=g.state.lights,Pe=g.state.shadowsArray,Ie=ie.state.version,Ue=ce.getParameters(T,ie.state,Pe,W,te),ke=ce.getProgramCacheKey(Ue);let He=k.programs;k.environment=T.isMeshStandardMaterial?W.environment:null,k.fog=W.fog,k.envMap=(T.isMeshStandardMaterial?J:re).get(T.envMap||k.environment),He===void 0&&(T.addEventListener("dispose",et),He=new Map,k.programs=He);let Ge=He.get(ke);if(Ge!==void 0){if(k.currentProgram===Ge&&k.lightsStateVersion===Ie)return Vo(T,Ue),Ge}else Ue.uniforms=ce.getUniforms(T),T.onBuild(te,Ue,d),T.onBeforeCompile(Ue,d),Ge=ce.acquireProgram(Ue,ke),He.set(ke,Ge),k.uniforms=Ue.uniforms;const We=k.uniforms;(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(We.clippingPlanes=F.uniform),Vo(T,Ue),k.needsLights=Vf(T),k.lightsStateVersion=Ie,k.needsLights&&(We.ambientLightColor.value=ie.state.ambient,We.lightProbe.value=ie.state.probe,We.directionalLights.value=ie.state.directional,We.directionalLightShadows.value=ie.state.directionalShadow,We.spotLights.value=ie.state.spot,We.spotLightShadows.value=ie.state.spotShadow,We.rectAreaLights.value=ie.state.rectArea,We.ltc_1.value=ie.state.rectAreaLTC1,We.ltc_2.value=ie.state.rectAreaLTC2,We.pointLights.value=ie.state.point,We.pointLightShadows.value=ie.state.pointShadow,We.hemisphereLights.value=ie.state.hemi,We.directionalShadowMap.value=ie.state.directionalShadowMap,We.directionalShadowMatrix.value=ie.state.directionalShadowMatrix,We.spotShadowMap.value=ie.state.spotShadowMap,We.spotLightMatrix.value=ie.state.spotLightMatrix,We.spotLightMap.value=ie.state.spotLightMap,We.pointShadowMap.value=ie.state.pointShadowMap,We.pointShadowMatrix.value=ie.state.pointShadowMatrix);const Ke=Ge.getUniforms(),St=Ss.seqWithValue(Ke.seq,We);return k.currentProgram=Ge,k.uniformsList=St,Ge}function Vo(T,W){const te=R.get(T);te.outputColorSpace=W.outputColorSpace,te.instancing=W.instancing,te.skinning=W.skinning,te.morphTargets=W.morphTargets,te.morphNormals=W.morphNormals,te.morphColors=W.morphColors,te.morphTargetsCount=W.morphTargetsCount,te.numClippingPlanes=W.numClippingPlanes,te.numIntersection=W.numClipIntersection,te.vertexAlphas=W.vertexAlphas,te.vertexTangents=W.vertexTangents,te.toneMapping=W.toneMapping}function Hf(T,W,te,k,ie){W.isScene!==!0&&(W=_e),B.resetTextureUnits();const Pe=W.fog,Ie=k.isMeshStandardMaterial?W.environment:null,Ue=y===null?d.outputColorSpace:y.isXRRenderTarget===!0?y.texture.colorSpace:dn,ke=(k.isMeshStandardMaterial?J:re).get(k.envMap||Ie),He=k.vertexColors===!0&&!!te.attributes.color&&te.attributes.color.itemSize===4,Ge=!!k.normalMap&&!!te.attributes.tangent,We=!!te.morphAttributes.position,Ke=!!te.morphAttributes.normal,St=!!te.morphAttributes.color,jt=k.toneMapped?d.toneMapping:wn,Yn=te.morphAttributes.position||te.morphAttributes.normal||te.morphAttributes.color,nt=Yn!==void 0?Yn.length:0,je=R.get(k),Ks=g.state.lights;if(ae===!0&&(be===!0||T!==P)){const Nt=T===P&&k.id===L;F.setState(k,T,Nt)}let ct=!1;k.version===je.__version?(je.needsLights&&je.lightsStateVersion!==Ks.state.version||je.outputColorSpace!==Ue||ie.isInstancedMesh&&je.instancing===!1||!ie.isInstancedMesh&&je.instancing===!0||ie.isSkinnedMesh&&je.skinning===!1||!ie.isSkinnedMesh&&je.skinning===!0||je.envMap!==ke||k.fog===!0&&je.fog!==Pe||je.numClippingPlanes!==void 0&&(je.numClippingPlanes!==F.numPlanes||je.numIntersection!==F.numIntersection)||je.vertexAlphas!==He||je.vertexTangents!==Ge||je.morphTargets!==We||je.morphNormals!==Ke||je.morphColors!==St||je.toneMapping!==jt||me.isWebGL2===!0&&je.morphTargetsCount!==nt)&&(ct=!0):(ct=!0,je.__version=k.version);let Kn=je.currentProgram;ct===!0&&(Kn=Vr(k,W,ie));let Wo=!1,or=!1,$s=!1;const yt=Kn.getUniforms(),$n=je.uniforms;if(we.useProgram(Kn.program)&&(Wo=!0,or=!0,$s=!0),k.id!==L&&(L=k.id,or=!0),Wo||P!==T){if(yt.setValue(U,"projectionMatrix",T.projectionMatrix),me.logarithmicDepthBuffer&&yt.setValue(U,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),P!==T&&(P=T,or=!0,$s=!0),k.isShaderMaterial||k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshStandardMaterial||k.envMap){const Nt=yt.map.cameraPosition;Nt!==void 0&&Nt.setValue(U,oe.setFromMatrixPosition(T.matrixWorld))}(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&yt.setValue(U,"isOrthographic",T.isOrthographicCamera===!0),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial||k.isShadowMaterial||ie.isSkinnedMesh)&&yt.setValue(U,"viewMatrix",T.matrixWorldInverse)}if(ie.isSkinnedMesh){yt.setOptional(U,ie,"bindMatrix"),yt.setOptional(U,ie,"bindMatrixInverse");const Nt=ie.skeleton;Nt&&(me.floatVertexTextures?(Nt.boneTexture===null&&Nt.computeBoneTexture(),yt.setValue(U,"boneTexture",Nt.boneTexture,B),yt.setValue(U,"boneTextureSize",Nt.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const Zs=te.morphAttributes;if((Zs.position!==void 0||Zs.normal!==void 0||Zs.color!==void 0&&me.isWebGL2===!0)&&fe.update(ie,te,Kn),(or||je.receiveShadow!==ie.receiveShadow)&&(je.receiveShadow=ie.receiveShadow,yt.setValue(U,"receiveShadow",ie.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&($n.envMap.value=ke,$n.flipEnvMap.value=ke.isCubeTexture&&ke.isRenderTargetTexture===!1?-1:1),or&&(yt.setValue(U,"toneMappingExposure",d.toneMappingExposure),je.needsLights&&Gf($n,$s),Pe&&k.fog===!0&&le.refreshFogUniforms($n,Pe),le.refreshMaterialUniforms($n,k,N,O,he),Ss.upload(U,je.uniformsList,$n,B)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Ss.upload(U,je.uniformsList,$n,B),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&yt.setValue(U,"center",ie.center),yt.setValue(U,"modelViewMatrix",ie.modelViewMatrix),yt.setValue(U,"normalMatrix",ie.normalMatrix),yt.setValue(U,"modelMatrix",ie.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const Nt=k.uniformsGroups;for(let Js=0,Wf=Nt.length;Js<Wf;Js++)if(me.isWebGL2){const Xo=Nt[Js];Me.update(Xo,Kn),Me.bind(Xo,Kn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Kn}function Gf(T,W){T.ambientLightColor.needsUpdate=W,T.lightProbe.needsUpdate=W,T.directionalLights.needsUpdate=W,T.directionalLightShadows.needsUpdate=W,T.pointLights.needsUpdate=W,T.pointLightShadows.needsUpdate=W,T.spotLights.needsUpdate=W,T.spotLightShadows.needsUpdate=W,T.rectAreaLights.needsUpdate=W,T.hemisphereLights.needsUpdate=W}function Vf(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return y},this.setRenderTargetTextures=function(T,W,te){R.get(T.texture).__webglTexture=W,R.get(T.depthTexture).__webglTexture=te;const k=R.get(T);k.__hasExternalTextures=!0,k.__hasExternalTextures&&(k.__autoAllocateDepthBuffer=te===void 0,k.__autoAllocateDepthBuffer||Ce.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(T,W){const te=R.get(T);te.__webglFramebuffer=W,te.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(T,W=0,te=0){y=T,E=W,M=te;let k=!0,ie=null,Pe=!1,Ie=!1;if(T){const ke=R.get(T);ke.__useDefaultFramebuffer!==void 0?(we.bindFramebuffer(U.FRAMEBUFFER,null),k=!1):ke.__webglFramebuffer===void 0?B.setupRenderTarget(T):ke.__hasExternalTextures&&B.rebindTextures(T,R.get(T.texture).__webglTexture,R.get(T.depthTexture).__webglTexture);const He=T.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&(Ie=!0);const Ge=R.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(ie=Ge[W],Pe=!0):me.isWebGL2&&T.samples>0&&B.useMultisampledRTT(T)===!1?ie=R.get(T).__webglMultisampledFramebuffer:ie=Ge,I.copy(T.viewport),x.copy(T.scissor),b=T.scissorTest}else I.copy(Q).multiplyScalar(N).floor(),x.copy(j).multiplyScalar(N).floor(),b=X;if(we.bindFramebuffer(U.FRAMEBUFFER,ie)&&me.drawBuffers&&k&&we.drawBuffers(T,ie),we.viewport(I),we.scissor(x),we.setScissorTest(b),Pe){const ke=R.get(T.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+W,ke.__webglTexture,te)}else if(Ie){const ke=R.get(T.texture),He=W||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,ke.__webglTexture,te||0,He)}L=-1},this.readRenderTargetPixels=function(T,W,te,k,ie,Pe,Ie){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ue=R.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ie!==void 0&&(Ue=Ue[Ie]),Ue){we.bindFramebuffer(U.FRAMEBUFFER,Ue);try{const ke=T.texture,He=ke.format,Ge=ke.type;if(He!==Qt&&G.convert(He)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const We=Ge===Fr&&(Ce.has("EXT_color_buffer_half_float")||me.isWebGL2&&Ce.has("EXT_color_buffer_float"));if(Ge!==di&&G.convert(Ge)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ge===oi&&(me.isWebGL2||Ce.has("OES_texture_float")||Ce.has("WEBGL_color_buffer_float")))&&!We){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=T.width-k&&te>=0&&te<=T.height-ie&&U.readPixels(W,te,k,ie,G.convert(He),G.convert(Ge),Pe)}finally{const ke=y!==null?R.get(y).__webglFramebuffer:null;we.bindFramebuffer(U.FRAMEBUFFER,ke)}}},this.copyFramebufferToTexture=function(T,W,te=0){const k=Math.pow(2,-te),ie=Math.floor(W.image.width*k),Pe=Math.floor(W.image.height*k);B.setTexture2D(W,0),U.copyTexSubImage2D(U.TEXTURE_2D,te,0,0,T.x,T.y,ie,Pe),we.unbindTexture()},this.copyTextureToTexture=function(T,W,te,k=0){const ie=W.image.width,Pe=W.image.height,Ie=G.convert(te.format),Ue=G.convert(te.type);B.setTexture2D(te,0),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,te.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,te.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,te.unpackAlignment),W.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,k,T.x,T.y,ie,Pe,Ie,Ue,W.image.data):W.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,k,T.x,T.y,W.mipmaps[0].width,W.mipmaps[0].height,Ie,W.mipmaps[0].data):U.texSubImage2D(U.TEXTURE_2D,k,T.x,T.y,Ie,Ue,W.image),k===0&&te.generateMipmaps&&U.generateMipmap(U.TEXTURE_2D),we.unbindTexture()},this.copyTextureToTexture3D=function(T,W,te,k,ie=0){if(d.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Pe=T.max.x-T.min.x+1,Ie=T.max.y-T.min.y+1,Ue=T.max.z-T.min.z+1,ke=G.convert(k.format),He=G.convert(k.type);let Ge;if(k.isData3DTexture)B.setTexture3D(k,0),Ge=U.TEXTURE_3D;else if(k.isDataArrayTexture)B.setTexture2DArray(k,0),Ge=U.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,k.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,k.unpackAlignment);const We=U.getParameter(U.UNPACK_ROW_LENGTH),Ke=U.getParameter(U.UNPACK_IMAGE_HEIGHT),St=U.getParameter(U.UNPACK_SKIP_PIXELS),jt=U.getParameter(U.UNPACK_SKIP_ROWS),Yn=U.getParameter(U.UNPACK_SKIP_IMAGES),nt=te.isCompressedTexture?te.mipmaps[0]:te.image;U.pixelStorei(U.UNPACK_ROW_LENGTH,nt.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,nt.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,T.min.x),U.pixelStorei(U.UNPACK_SKIP_ROWS,T.min.y),U.pixelStorei(U.UNPACK_SKIP_IMAGES,T.min.z),te.isDataTexture||te.isData3DTexture?U.texSubImage3D(Ge,ie,W.x,W.y,W.z,Pe,Ie,Ue,ke,He,nt.data):te.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),U.compressedTexSubImage3D(Ge,ie,W.x,W.y,W.z,Pe,Ie,Ue,ke,nt.data)):U.texSubImage3D(Ge,ie,W.x,W.y,W.z,Pe,Ie,Ue,ke,He,nt),U.pixelStorei(U.UNPACK_ROW_LENGTH,We),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Ke),U.pixelStorei(U.UNPACK_SKIP_PIXELS,St),U.pixelStorei(U.UNPACK_SKIP_ROWS,jt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Yn),ie===0&&k.generateMipmaps&&U.generateMipmap(Ge),we.unbindTexture()},this.initTexture=function(T){T.isCubeTexture?B.setTextureCube(T,0):T.isData3DTexture?B.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?B.setTexture2DArray(T,0):B.setTexture2D(T,0),we.unbindTexture()},this.resetState=function(){E=0,M=0,y=null,we.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(e){console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!e}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Ne?ui:ef}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===ui?Ne:dn}}class gx extends Sf{}gx.prototype.isWebGL1Renderer=!0;class _x extends xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(e){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=e}}class vx extends Ut{constructor(e,n,i,r,s,a,o,l,c){super(e,n,i,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Cr extends Ln{constructor(e=1,n=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],f=[],p=[];let g=0;const _=[],m=i/2;let d=0;A(),a===!1&&(e>0&&E(!0),n>0&&E(!1)),this.setIndex(u),this.setAttribute("position",new Dt(h,3)),this.setAttribute("normal",new Dt(f,3)),this.setAttribute("uv",new Dt(p,2));function A(){const M=new z,y=new z;let L=0;const P=(n-e)/i;for(let I=0;I<=s;I++){const x=[],b=I/s,H=b*(n-e)+e;for(let O=0;O<=r;O++){const N=O/r,V=N*l+o,Y=Math.sin(V),Q=Math.cos(V);y.x=H*Y,y.y=-b*i+m,y.z=H*Q,h.push(y.x,y.y,y.z),M.set(Y,P,Q).normalize(),f.push(M.x,M.y,M.z),p.push(N,1-b),x.push(g++)}_.push(x)}for(let I=0;I<r;I++)for(let x=0;x<s;x++){const b=_[x][I],H=_[x+1][I],O=_[x+1][I+1],N=_[x][I+1];u.push(b,H,N),u.push(H,O,N),L+=6}c.addGroup(d,L,0),d+=L}function E(M){const y=g,L=new Oe,P=new z;let I=0;const x=M===!0?e:n,b=M===!0?1:-1;for(let O=1;O<=r;O++)h.push(0,m*b,0),f.push(0,b,0),p.push(.5,.5),g++;const H=g;for(let O=0;O<=r;O++){const V=O/r*l+o,Y=Math.cos(V),Q=Math.sin(V);P.x=x*Q,P.y=m*b,P.z=x*Y,h.push(P.x,P.y,P.z),f.push(0,b,0),L.x=Y*.5+.5,L.y=Q*.5*b+.5,p.push(L.x,L.y),g++}for(let O=0;O<r;O++){const N=y+O,V=H+O;M===!0?u.push(V,V+1,N):u.push(V+1,V,N),I+=3}c.addGroup(d,I,M===!0?1:2),d+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ps extends Ln{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],h=new z,f=new z,p=[],g=[],_=[],m=[];for(let d=0;d<=i;d++){const A=[],E=d/i;let M=0;d===0&&a===0?M=.5/n:d===i&&l===Math.PI&&(M=-.5/n);for(let y=0;y<=n;y++){const L=y/n;h.x=-e*Math.cos(r+L*s)*Math.sin(a+E*o),h.y=e*Math.cos(a+E*o),h.z=e*Math.sin(r+L*s)*Math.sin(a+E*o),g.push(h.x,h.y,h.z),f.copy(h).normalize(),_.push(f.x,f.y,f.z),m.push(L+M,1-E),A.push(c++)}u.push(A)}for(let d=0;d<i;d++)for(let A=0;A<n;A++){const E=u[d][A+1],M=u[d][A],y=u[d+1][A],L=u[d+1][A+1];(d!==0||a>0)&&p.push(E,M,L),(d!==i-1||l<Math.PI)&&p.push(M,y,L)}this.setIndex(p),this.setAttribute("position",new Dt(g,3)),this.setAttribute("normal",new Dt(_,3)),this.setAttribute("uv",new Dt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ps(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ys extends Gr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ve(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=tf,this.normalScale=new Oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class xx extends ys{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Oe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return _t(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(n){this.ior=(1+.4*n)/(1-.4*n)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ve(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ve(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ve(1,1,1),this.specularColorMap=null,this._sheen=0,this._clearcoat=0,this._iridescence=0,this._transmission=0,this.setValues(e)}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class yf extends xt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Ve(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),n}}const za=new st,Fc=new z,Oc=new z;class Mx{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Oe(512,512),this.map=null,this.mapPass=null,this.matrix=new st,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Bo,this._frameExtents=new Oe(1,1),this._viewportCount=1,this._viewports=[new ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;Fc.setFromMatrixPosition(e.matrixWorld),n.position.copy(Fc),Oc.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Oc),n.updateMatrixWorld(),za.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(za),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(za)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Sx extends Mx{constructor(){super(new gf(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class yx extends yf{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.target=new xt,this.shadow=new Sx}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Ex extends yf{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class Bc{constructor(e=1,n=0,i=0){return this.radius=e,this.phi=n,this.theta=i,this}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(_t(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:No}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=No);const kc={type:"change"},Ha={type:"start"},zc={type:"end"};class bx extends xi{constructor(e,n){super(),this.object=e,this.domElement=n,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new z,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Si.ROTATE,MIDDLE:Si.DOLLY,RIGHT:Si.PAN},this.touches={ONE:yi.ROTATE,TWO:yi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(C){C.addEventListener("keydown",ce),this._domElementKeyEvents=C},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",ce),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(kc),i.update(),s=r.NONE},this.update=function(){const C=new z,Z=new mi().setFromUnitVectors(e.up,new z(0,1,0)),G=Z.clone().invert(),ge=new z,Me=new mi,Te=2*Math.PI;return function(){const Se=i.object.position;C.copy(Se).sub(i.target),C.applyQuaternion(Z),o.setFromVector3(C),i.autoRotate&&s===r.NONE&&x(P()),i.enableDamping?(o.theta+=l.theta*i.dampingFactor,o.phi+=l.phi*i.dampingFactor):(o.theta+=l.theta,o.phi+=l.phi);let Re=i.minAzimuthAngle,De=i.maxAzimuthAngle;return isFinite(Re)&&isFinite(De)&&(Re<-Math.PI?Re+=Te:Re>Math.PI&&(Re-=Te),De<-Math.PI?De+=Te:De>Math.PI&&(De-=Te),Re<=De?o.theta=Math.max(Re,Math.min(De,o.theta)):o.theta=o.theta>(Re+De)/2?Math.max(Re,o.theta):Math.min(De,o.theta)),o.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,o.phi)),o.makeSafe(),o.radius*=c,o.radius=Math.max(i.minDistance,Math.min(i.maxDistance,o.radius)),i.enableDamping===!0?i.target.addScaledVector(u,i.dampingFactor):i.target.add(u),C.setFromSpherical(o),C.applyQuaternion(G),Se.copy(i.target).add(C),i.object.lookAt(i.target),i.enableDamping===!0?(l.theta*=1-i.dampingFactor,l.phi*=1-i.dampingFactor,u.multiplyScalar(1-i.dampingFactor)):(l.set(0,0,0),u.set(0,0,0)),c=1,h||ge.distanceToSquared(i.object.position)>a||8*(1-Me.dot(i.object.quaternion))>a?(i.dispatchEvent(kc),ge.copy(i.object.position),Me.copy(i.object.quaternion),h=!1,!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",v),i.domElement.removeEventListener("pointerdown",B),i.domElement.removeEventListener("pointercancel",J),i.domElement.removeEventListener("wheel",se),i.domElement.removeEventListener("pointermove",re),i.domElement.removeEventListener("pointerup",J),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",ce),i._domElementKeyEvents=null)};const i=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const a=1e-6,o=new Bc,l=new Bc;let c=1;const u=new z;let h=!1;const f=new Oe,p=new Oe,g=new Oe,_=new Oe,m=new Oe,d=new Oe,A=new Oe,E=new Oe,M=new Oe,y=[],L={};function P(){return 2*Math.PI/60/60*i.autoRotateSpeed}function I(){return Math.pow(.95,i.zoomSpeed)}function x(C){l.theta-=C}function b(C){l.phi-=C}const H=function(){const C=new z;return function(G,ge){C.setFromMatrixColumn(ge,0),C.multiplyScalar(-G),u.add(C)}}(),O=function(){const C=new z;return function(G,ge){i.screenSpacePanning===!0?C.setFromMatrixColumn(ge,1):(C.setFromMatrixColumn(ge,0),C.crossVectors(i.object.up,C)),C.multiplyScalar(G),u.add(C)}}(),N=function(){const C=new z;return function(G,ge){const Me=i.domElement;if(i.object.isPerspectiveCamera){const Te=i.object.position;C.copy(Te).sub(i.target);let ye=C.length();ye*=Math.tan(i.object.fov/2*Math.PI/180),H(2*G*ye/Me.clientHeight,i.object.matrix),O(2*ge*ye/Me.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(H(G*(i.object.right-i.object.left)/i.object.zoom/Me.clientWidth,i.object.matrix),O(ge*(i.object.top-i.object.bottom)/i.object.zoom/Me.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function V(C){i.object.isPerspectiveCamera?c/=C:i.object.isOrthographicCamera?(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom*C)),i.object.updateProjectionMatrix(),h=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function Y(C){i.object.isPerspectiveCamera?c*=C:i.object.isOrthographicCamera?(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/C)),i.object.updateProjectionMatrix(),h=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function Q(C){f.set(C.clientX,C.clientY)}function j(C){A.set(C.clientX,C.clientY)}function X(C){_.set(C.clientX,C.clientY)}function ue(C){p.set(C.clientX,C.clientY),g.subVectors(p,f).multiplyScalar(i.rotateSpeed);const Z=i.domElement;x(2*Math.PI*g.x/Z.clientHeight),b(2*Math.PI*g.y/Z.clientHeight),f.copy(p),i.update()}function ae(C){E.set(C.clientX,C.clientY),M.subVectors(E,A),M.y>0?V(I()):M.y<0&&Y(I()),A.copy(E),i.update()}function be(C){m.set(C.clientX,C.clientY),d.subVectors(m,_).multiplyScalar(i.panSpeed),N(d.x,d.y),_.copy(m),i.update()}function he(C){C.deltaY<0?Y(I()):C.deltaY>0&&V(I()),i.update()}function K(C){let Z=!1;switch(C.code){case i.keys.UP:C.ctrlKey||C.metaKey||C.shiftKey?b(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):N(0,i.keyPanSpeed),Z=!0;break;case i.keys.BOTTOM:C.ctrlKey||C.metaKey||C.shiftKey?b(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):N(0,-i.keyPanSpeed),Z=!0;break;case i.keys.LEFT:C.ctrlKey||C.metaKey||C.shiftKey?x(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):N(i.keyPanSpeed,0),Z=!0;break;case i.keys.RIGHT:C.ctrlKey||C.metaKey||C.shiftKey?x(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):N(-i.keyPanSpeed,0),Z=!0;break}Z&&(C.preventDefault(),i.update())}function oe(){if(y.length===1)f.set(y[0].pageX,y[0].pageY);else{const C=.5*(y[0].pageX+y[1].pageX),Z=.5*(y[0].pageY+y[1].pageY);f.set(C,Z)}}function _e(){if(y.length===1)_.set(y[0].pageX,y[0].pageY);else{const C=.5*(y[0].pageX+y[1].pageX),Z=.5*(y[0].pageY+y[1].pageY);_.set(C,Z)}}function ve(){const C=y[0].pageX-y[1].pageX,Z=y[0].pageY-y[1].pageY,G=Math.sqrt(C*C+Z*Z);A.set(0,G)}function U(){i.enableZoom&&ve(),i.enablePan&&_e()}function Le(){i.enableZoom&&ve(),i.enableRotate&&oe()}function Ce(C){if(y.length==1)p.set(C.pageX,C.pageY);else{const G=fe(C),ge=.5*(C.pageX+G.x),Me=.5*(C.pageY+G.y);p.set(ge,Me)}g.subVectors(p,f).multiplyScalar(i.rotateSpeed);const Z=i.domElement;x(2*Math.PI*g.x/Z.clientHeight),b(2*Math.PI*g.y/Z.clientHeight),f.copy(p)}function me(C){if(y.length===1)m.set(C.pageX,C.pageY);else{const Z=fe(C),G=.5*(C.pageX+Z.x),ge=.5*(C.pageY+Z.y);m.set(G,ge)}d.subVectors(m,_).multiplyScalar(i.panSpeed),N(d.x,d.y),_.copy(m)}function we(C){const Z=fe(C),G=C.pageX-Z.x,ge=C.pageY-Z.y,Me=Math.sqrt(G*G+ge*ge);E.set(0,Me),M.set(0,Math.pow(E.y/A.y,i.zoomSpeed)),V(M.y),A.copy(E)}function w(C){i.enableZoom&&we(C),i.enablePan&&me(C)}function R(C){i.enableZoom&&we(C),i.enableRotate&&Ce(C)}function B(C){i.enabled!==!1&&(y.length===0&&(i.domElement.setPointerCapture(C.pointerId),i.domElement.addEventListener("pointermove",re),i.domElement.addEventListener("pointerup",J)),F(C),C.pointerType==="touch"?le(C):ne(C))}function re(C){i.enabled!==!1&&(C.pointerType==="touch"?S(C):de(C))}function J(C){q(C),y.length===0&&(i.domElement.releasePointerCapture(C.pointerId),i.domElement.removeEventListener("pointermove",re),i.domElement.removeEventListener("pointerup",J)),i.dispatchEvent(zc),s=r.NONE}function ne(C){let Z;switch(C.button){case 0:Z=i.mouseButtons.LEFT;break;case 1:Z=i.mouseButtons.MIDDLE;break;case 2:Z=i.mouseButtons.RIGHT;break;default:Z=-1}switch(Z){case Si.DOLLY:if(i.enableZoom===!1)return;j(C),s=r.DOLLY;break;case Si.ROTATE:if(C.ctrlKey||C.metaKey||C.shiftKey){if(i.enablePan===!1)return;X(C),s=r.PAN}else{if(i.enableRotate===!1)return;Q(C),s=r.ROTATE}break;case Si.PAN:if(C.ctrlKey||C.metaKey||C.shiftKey){if(i.enableRotate===!1)return;Q(C),s=r.ROTATE}else{if(i.enablePan===!1)return;X(C),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(Ha)}function de(C){switch(s){case r.ROTATE:if(i.enableRotate===!1)return;ue(C);break;case r.DOLLY:if(i.enableZoom===!1)return;ae(C);break;case r.PAN:if(i.enablePan===!1)return;be(C);break}}function se(C){i.enabled===!1||i.enableZoom===!1||s!==r.NONE||(C.preventDefault(),i.dispatchEvent(Ha),he(C),i.dispatchEvent(zc))}function ce(C){i.enabled===!1||i.enablePan===!1||K(C)}function le(C){switch($(C),y.length){case 1:switch(i.touches.ONE){case yi.ROTATE:if(i.enableRotate===!1)return;oe(),s=r.TOUCH_ROTATE;break;case yi.PAN:if(i.enablePan===!1)return;_e(),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(i.touches.TWO){case yi.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;U(),s=r.TOUCH_DOLLY_PAN;break;case yi.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Le(),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(Ha)}function S(C){switch($(C),s){case r.TOUCH_ROTATE:if(i.enableRotate===!1)return;Ce(C),i.update();break;case r.TOUCH_PAN:if(i.enablePan===!1)return;me(C),i.update();break;case r.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;w(C),i.update();break;case r.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;R(C),i.update();break;default:s=r.NONE}}function v(C){i.enabled!==!1&&C.preventDefault()}function F(C){y.push(C)}function q(C){delete L[C.pointerId];for(let Z=0;Z<y.length;Z++)if(y[Z].pointerId==C.pointerId){y.splice(Z,1);return}}function $(C){let Z=L[C.pointerId];Z===void 0&&(Z=new Oe,L[C.pointerId]=Z),Z.set(C.pageX,C.pageY)}function fe(C){const Z=C.pointerId===y[0].pointerId?y[1]:y[0];return L[Z.pointerId]}i.domElement.addEventListener("contextmenu",v),i.domElement.addEventListener("pointerdown",B),i.domElement.addEventListener("pointercancel",J),i.domElement.addEventListener("wheel",se,{passive:!1}),this.update()}}var Zi=Object.freeze({Linear:Object.freeze({None:function(t){return t},In:function(t){return t},Out:function(t){return t},InOut:function(t){return t}}),Quadratic:Object.freeze({In:function(t){return t*t},Out:function(t){return t*(2-t)},InOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)}}),Cubic:Object.freeze({In:function(t){return t*t*t},Out:function(t){return--t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)}}),Quartic:Object.freeze({In:function(t){return t*t*t*t},Out:function(t){return 1- --t*t*t*t},InOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)}}),Quintic:Object.freeze({In:function(t){return t*t*t*t*t},Out:function(t){return--t*t*t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}}),Sinusoidal:Object.freeze({In:function(t){return 1-Math.sin((1-t)*Math.PI/2)},Out:function(t){return Math.sin(t*Math.PI/2)},InOut:function(t){return .5*(1-Math.sin(Math.PI*(.5-t)))}}),Exponential:Object.freeze({In:function(t){return t===0?0:Math.pow(1024,t-1)},Out:function(t){return t===1?1:1-Math.pow(2,-10*t)},InOut:function(t){return t===0?0:t===1?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(-Math.pow(2,-10*(t-1))+2)}}),Circular:Object.freeze({In:function(t){return 1-Math.sqrt(1-t*t)},Out:function(t){return Math.sqrt(1- --t*t)},InOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}}),Elastic:Object.freeze({In:function(t){return t===0?0:t===1?1:-Math.pow(2,10*(t-1))*Math.sin((t-1.1)*5*Math.PI)},Out:function(t){return t===0?0:t===1?1:Math.pow(2,-10*t)*Math.sin((t-.1)*5*Math.PI)+1},InOut:function(t){return t===0?0:t===1?1:(t*=2,t<1?-.5*Math.pow(2,10*(t-1))*Math.sin((t-1.1)*5*Math.PI):.5*Math.pow(2,-10*(t-1))*Math.sin((t-1.1)*5*Math.PI)+1)}}),Back:Object.freeze({In:function(t){var e=1.70158;return t===1?1:t*t*((e+1)*t-e)},Out:function(t){var e=1.70158;return t===0?0:--t*t*((e+1)*t+e)+1},InOut:function(t){var e=2.5949095;return(t*=2)<1?.5*(t*t*((e+1)*t-e)):.5*((t-=2)*t*((e+1)*t+e)+2)}}),Bounce:Object.freeze({In:function(t){return 1-Zi.Bounce.Out(1-t)},Out:function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},InOut:function(t){return t<.5?Zi.Bounce.In(t*2)*.5:Zi.Bounce.Out(t*2-1)*.5+.5}}),generatePow:function(t){return t===void 0&&(t=4),t=t<Number.EPSILON?Number.EPSILON:t,t=t>1e4?1e4:t,{In:function(e){return Math.pow(e,t)},Out:function(e){return 1-Math.pow(1-e,t)},InOut:function(e){return e<.5?Math.pow(e*2,t)/2:(1-Math.pow(2-e*2,t))/2+.5}}}}),vr=function(){return performance.now()},Tx=function(){function t(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];this._tweens={},this._tweensAddedDuringUpdate={},this.add.apply(this,e)}return t.prototype.getAll=function(){var e=this;return Object.keys(this._tweens).map(function(n){return e._tweens[n]})},t.prototype.removeAll=function(){this._tweens={}},t.prototype.add=function(){for(var e,n=[],i=0;i<arguments.length;i++)n[i]=arguments[i];for(var r=0,s=n;r<s.length;r++){var a=s[r];(e=a._group)===null||e===void 0||e.remove(a),a._group=this,this._tweens[a.getId()]=a,this._tweensAddedDuringUpdate[a.getId()]=a}},t.prototype.remove=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];for(var i=0,r=e;i<r.length;i++){var s=r[i];s._group=void 0,delete this._tweens[s.getId()],delete this._tweensAddedDuringUpdate[s.getId()]}},t.prototype.allStopped=function(){return this.getAll().every(function(e){return!e.isPlaying()})},t.prototype.update=function(e,n){e===void 0&&(e=vr()),n===void 0&&(n=!0);var i=Object.keys(this._tweens);if(i.length!==0)for(;i.length>0;){this._tweensAddedDuringUpdate={};for(var r=0;r<i.length;r++){var s=this._tweens[i[r]],a=!n;s&&s.update(e,a)===!1&&!n&&this.remove(s)}i=Object.keys(this._tweensAddedDuringUpdate)}},t}(),fo={Linear:function(t,e){var n=t.length-1,i=n*e,r=Math.floor(i),s=fo.Utils.Linear;return e<0?s(t[0],t[1],i):e>1?s(t[n],t[n-1],n-i):s(t[r],t[r+1>n?n:r+1],i-r)},Utils:{Linear:function(t,e,n){return(e-t)*n+t}}},Ef=function(){function t(){}return t.nextId=function(){return t._nextId++},t._nextId=0,t}(),ho=new Tx,Ax=function(){function t(e,n){this._isPaused=!1,this._pauseStart=0,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._isDynamic=!1,this._initialRepeat=0,this._repeat=0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=0,this._easingFunction=Zi.Linear.None,this._interpolationFunction=fo.Linear,this._chainedTweens=[],this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._id=Ef.nextId(),this._isChainStopped=!1,this._propertiesAreSetUp=!1,this._goToEnd=!1,this._object=e,typeof n=="object"?(this._group=n,n.add(this)):n===!0&&(this._group=ho,ho.add(this))}return t.prototype.getId=function(){return this._id},t.prototype.isPlaying=function(){return this._isPlaying},t.prototype.isPaused=function(){return this._isPaused},t.prototype.getDuration=function(){return this._duration},t.prototype.to=function(e,n){if(n===void 0&&(n=1e3),this._isPlaying)throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");return this._valuesEnd=e,this._propertiesAreSetUp=!1,this._duration=n<0?0:n,this},t.prototype.duration=function(e){return e===void 0&&(e=1e3),this._duration=e<0?0:e,this},t.prototype.dynamic=function(e){return e===void 0&&(e=!1),this._isDynamic=e,this},t.prototype.start=function(e,n){if(e===void 0&&(e=vr()),n===void 0&&(n=!1),this._isPlaying)return this;if(this._repeat=this._initialRepeat,this._reversed){this._reversed=!1;for(var i in this._valuesStartRepeat)this._swapEndStartRepeatValues(i),this._valuesStart[i]=this._valuesStartRepeat[i]}if(this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=e,this._startTime+=this._delayTime,!this._propertiesAreSetUp||n){if(this._propertiesAreSetUp=!0,!this._isDynamic){var r={};for(var s in this._valuesEnd)r[s]=this._valuesEnd[s];this._valuesEnd=r}this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat,n)}return this},t.prototype.startFromCurrentValues=function(e){return this.start(e,!0)},t.prototype._setupProperties=function(e,n,i,r,s){for(var a in i){var o=e[a],l=Array.isArray(o),c=l?"array":typeof o,u=!l&&Array.isArray(i[a]);if(!(c==="undefined"||c==="function")){if(u){var h=i[a];if(h.length===0)continue;for(var f=[o],p=0,g=h.length;p<g;p+=1){var _=this._handleRelativeValue(o,h[p]);if(isNaN(_)){u=!1,console.warn("Found invalid interpolation list. Skipping.");break}f.push(_)}u&&(i[a]=f)}if((c==="object"||l)&&o&&!u){n[a]=l?[]:{};var m=o;for(var d in m)n[a][d]=m[d];r[a]=l?[]:{};var h=i[a];if(!this._isDynamic){var A={};for(var d in h)A[d]=h[d];i[a]=h=A}this._setupProperties(m,n[a],h,r[a],s)}else(typeof n[a]>"u"||s)&&(n[a]=o),l||(n[a]*=1),u?r[a]=i[a].slice().reverse():r[a]=n[a]||0}}},t.prototype.stop=function(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this},t.prototype.end=function(){return this._goToEnd=!0,this.update(this._startTime+this._duration),this},t.prototype.pause=function(e){return e===void 0&&(e=vr()),this._isPaused||!this._isPlaying?this:(this._isPaused=!0,this._pauseStart=e,this)},t.prototype.resume=function(e){return e===void 0&&(e=vr()),!this._isPaused||!this._isPlaying?this:(this._isPaused=!1,this._startTime+=e-this._pauseStart,this._pauseStart=0,this)},t.prototype.stopChainedTweens=function(){for(var e=0,n=this._chainedTweens.length;e<n;e++)this._chainedTweens[e].stop();return this},t.prototype.group=function(e){return e?(e.add(this),this):(console.warn("tween.group() without args has been removed, use group.add(tween) instead."),this)},t.prototype.remove=function(){var e;return(e=this._group)===null||e===void 0||e.remove(this),this},t.prototype.delay=function(e){return e===void 0&&(e=0),this._delayTime=e,this},t.prototype.repeat=function(e){return e===void 0&&(e=0),this._initialRepeat=e,this._repeat=e,this},t.prototype.repeatDelay=function(e){return this._repeatDelayTime=e,this},t.prototype.yoyo=function(e){return e===void 0&&(e=!1),this._yoyo=e,this},t.prototype.easing=function(e){return e===void 0&&(e=Zi.Linear.None),this._easingFunction=e,this},t.prototype.interpolation=function(e){return e===void 0&&(e=fo.Linear),this._interpolationFunction=e,this},t.prototype.chain=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return this._chainedTweens=e,this},t.prototype.onStart=function(e){return this._onStartCallback=e,this},t.prototype.onEveryStart=function(e){return this._onEveryStartCallback=e,this},t.prototype.onUpdate=function(e){return this._onUpdateCallback=e,this},t.prototype.onRepeat=function(e){return this._onRepeatCallback=e,this},t.prototype.onComplete=function(e){return this._onCompleteCallback=e,this},t.prototype.onStop=function(e){return this._onStopCallback=e,this},t.prototype.update=function(e,n){var i=this,r;if(e===void 0&&(e=vr()),n===void 0&&(n=t.autoStartOnUpdate),this._isPaused)return!0;var s;if(!this._goToEnd&&!this._isPlaying)if(n)this.start(e,!0);else return!1;if(this._goToEnd=!1,e<this._startTime)return!0;this._onStartCallbackFired===!1&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),this._onEveryStartCallbackFired===!1&&(this._onEveryStartCallback&&this._onEveryStartCallback(this._object),this._onEveryStartCallbackFired=!0);var a=e-this._startTime,o=this._duration+((r=this._repeatDelayTime)!==null&&r!==void 0?r:this._delayTime),l=this._duration+this._repeat*o,c=function(){if(i._duration===0||a>l)return 1;var _=Math.trunc(a/o),m=a-_*o,d=Math.min(m/i._duration,1);return d===0&&a===i._duration?1:d},u=c(),h=this._easingFunction(u);if(this._updateProperties(this._object,this._valuesStart,this._valuesEnd,h),this._onUpdateCallback&&this._onUpdateCallback(this._object,u),this._duration===0||a>=this._duration)if(this._repeat>0){var f=Math.min(Math.trunc((a-this._duration)/o)+1,this._repeat);isFinite(this._repeat)&&(this._repeat-=f);for(s in this._valuesStartRepeat)!this._yoyo&&typeof this._valuesEnd[s]=="string"&&(this._valuesStartRepeat[s]=this._valuesStartRepeat[s]+parseFloat(this._valuesEnd[s])),this._yoyo&&this._swapEndStartRepeatValues(s),this._valuesStart[s]=this._valuesStartRepeat[s];return this._yoyo&&(this._reversed=!this._reversed),this._startTime+=o*f,this._onRepeatCallback&&this._onRepeatCallback(this._object),this._onEveryStartCallbackFired=!1,!0}else{this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var p=0,g=this._chainedTweens.length;p<g;p++)this._chainedTweens[p].start(this._startTime+this._duration,!1);return this._isPlaying=!1,!1}return!0},t.prototype._updateProperties=function(e,n,i,r){for(var s in i)if(n[s]!==void 0){var a=n[s]||0,o=i[s],l=Array.isArray(e[s]),c=Array.isArray(o),u=!l&&c;u?e[s]=this._interpolationFunction(o,r):typeof o=="object"&&o?this._updateProperties(e[s],a,o,r):(o=this._handleRelativeValue(a,o),typeof o=="number"&&(e[s]=a+(o-a)*r))}},t.prototype._handleRelativeValue=function(e,n){return typeof n!="string"?n:n.charAt(0)==="+"||n.charAt(0)==="-"?e+parseFloat(n):parseFloat(n)},t.prototype._swapEndStartRepeatValues=function(e){var n=this._valuesStartRepeat[e],i=this._valuesEnd[e];typeof i=="string"?this._valuesStartRepeat[e]=this._valuesStartRepeat[e]+parseFloat(i):this._valuesStartRepeat[e]=this._valuesEnd[e],this._valuesEnd[e]=n},t.autoStartOnUpdate=!1,t}();Ef.nextId;var pn=ho;pn.getAll.bind(pn);var wx=pn.removeAll.bind(pn);pn.add.bind(pn);pn.remove.bind(pn);pn.update.bind(pn);var Wi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Rx(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function bf(t){if(t.__esModule)return t;var e=t.default;if(typeof e=="function"){var n=function i(){return this instanceof i?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};n.prototype=e.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(t).forEach(function(i){var r=Object.getOwnPropertyDescriptor(t,i);Object.defineProperty(n,i,r.get?r:{enumerable:!0,get:function(){return t[i]}})}),n}var Tf={},Vs={};function Cx(t){var e=new Pt(t),n=e.readChunk();if(n.id!="MThd")throw"Bad MIDI file.  Expected 'MHdr', got: '"+n.id+"'";for(var i=Px(n.data),r=[],s=0;!e.eof()&&s<i.numTracks;s++){var a=e.readChunk();if(a.id!="MTrk")throw"Bad MIDI file.  Expected 'MTrk', got: '"+a.id+"'";var o=Lx(a.data);r.push(o)}return{header:i,tracks:r}}function Px(t){var e=new Pt(t),n=e.readUInt16(),i=e.readUInt16(),r={format:n,numTracks:i},s=e.readUInt16();return s&32768?(r.framesPerSecond=256-(s>>8),r.ticksPerFrame=s&255):r.ticksPerBeat=s,r}function Lx(t){for(var e=new Pt(t),n=[];!e.eof();){var i=s();n.push(i)}return n;var r;function s(){var a={};a.deltaTime=e.readVarInt();var o=e.readUInt8();if((o&240)===240)if(o===255){a.meta=!0;var l=e.readUInt8(),c=e.readVarInt();switch(l){case 0:if(a.type="sequenceNumber",c!==2)throw"Expected length for sequenceNumber event is 2, got "+c;return a.number=e.readUInt16(),a;case 1:return a.type="text",a.text=e.readString(c),a;case 2:return a.type="copyrightNotice",a.text=e.readString(c),a;case 3:return a.type="trackName",a.text=e.readString(c),a;case 4:return a.type="instrumentName",a.text=e.readString(c),a;case 5:return a.type="lyrics",a.text=e.readString(c),a;case 6:return a.type="marker",a.text=e.readString(c),a;case 7:return a.type="cuePoint",a.text=e.readString(c),a;case 32:if(a.type="channelPrefix",c!=1)throw"Expected length for channelPrefix event is 1, got "+c;return a.channel=e.readUInt8(),a;case 33:if(a.type="portPrefix",c!=1)throw"Expected length for portPrefix event is 1, got "+c;return a.port=e.readUInt8(),a;case 47:if(a.type="endOfTrack",c!=0)throw"Expected length for endOfTrack event is 0, got "+c;return a;case 81:if(a.type="setTempo",c!=3)throw"Expected length for setTempo event is 3, got "+c;return a.microsecondsPerBeat=e.readUInt24(),a;case 84:if(a.type="smpteOffset",c!=5)throw"Expected length for smpteOffset event is 5, got "+c;var u=e.readUInt8(),h={0:24,32:25,64:29,96:30};return a.frameRate=h[u&96],a.hour=u&31,a.min=e.readUInt8(),a.sec=e.readUInt8(),a.frame=e.readUInt8(),a.subFrame=e.readUInt8(),a;case 88:if(a.type="timeSignature",c!=2&&c!=4)throw"Expected length for timeSignature event is 4 or 2, got "+c;return a.numerator=e.readUInt8(),a.denominator=1<<e.readUInt8(),c===4?(a.metronome=e.readUInt8(),a.thirtyseconds=e.readUInt8()):(a.metronome=36,a.thirtyseconds=8),a;case 89:if(a.type="keySignature",c!=2)throw"Expected length for keySignature event is 2, got "+c;return a.key=e.readInt8(),a.scale=e.readUInt8(),a;case 127:return a.type="sequencerSpecific",a.data=e.readBytes(c),a;default:return a.type="unknownMeta",a.data=e.readBytes(c),a.metatypeByte=l,a}}else if(o==240){a.type="sysEx";var c=e.readVarInt();return a.data=e.readBytes(c),a}else if(o==247){a.type="endSysEx";var c=e.readVarInt();return a.data=e.readBytes(c),a}else throw"Unrecognised MIDI event type byte: "+o;else{var f;if(o&128)f=e.readUInt8(),r=o;else{if(r===null)throw"Running status byte encountered before status byte";f=o,o=r,a.running=!0}var p=o>>4;switch(a.channel=o&15,p){case 8:return a.type="noteOff",a.noteNumber=f,a.velocity=e.readUInt8(),a;case 9:var g=e.readUInt8();return a.type=g===0?"noteOff":"noteOn",a.noteNumber=f,a.velocity=g,g===0&&(a.byte9=!0),a;case 10:return a.type="noteAftertouch",a.noteNumber=f,a.amount=e.readUInt8(),a;case 11:return a.type="controller",a.controllerType=f,a.value=e.readUInt8(),a;case 12:return a.type="programChange",a.programNumber=f,a;case 13:return a.type="channelAftertouch",a.amount=f,a;case 14:return a.type="pitchBend",a.value=f+(e.readUInt8()<<7)-8192,a;default:throw"Unrecognised MIDI event type: "+p}}}}function Pt(t){this.buffer=t,this.bufferLen=this.buffer.length,this.pos=0}Pt.prototype.eof=function(){return this.pos>=this.bufferLen};Pt.prototype.readUInt8=function(){var t=this.buffer[this.pos];return this.pos+=1,t};Pt.prototype.readInt8=function(){var t=this.readUInt8();return t&128?t-256:t};Pt.prototype.readUInt16=function(){var t=this.readUInt8(),e=this.readUInt8();return(t<<8)+e};Pt.prototype.readInt16=function(){var t=this.readUInt16();return t&32768?t-65536:t};Pt.prototype.readUInt24=function(){var t=this.readUInt8(),e=this.readUInt8(),n=this.readUInt8();return(t<<16)+(e<<8)+n};Pt.prototype.readInt24=function(){var t=this.readUInt24();return t&8388608?t-16777216:t};Pt.prototype.readUInt32=function(){var t=this.readUInt8(),e=this.readUInt8(),n=this.readUInt8(),i=this.readUInt8();return(t<<24)+(e<<16)+(n<<8)+i};Pt.prototype.readBytes=function(t){var e=this.buffer.slice(this.pos,this.pos+t);return this.pos+=t,e};Pt.prototype.readString=function(t){var e=this.readBytes(t);return String.fromCharCode.apply(null,e)};Pt.prototype.readVarInt=function(){for(var t=0;!this.eof();){var e=this.readUInt8();if(e&128)t+=e&127,t<<=7;else return t+e}return t};Pt.prototype.readChunk=function(){var t=this.readString(4),e=this.readUInt32(),n=this.readBytes(e);return{id:t,length:e,data:n}};var Ix=Cx;function Ux(t,e){if(typeof t!="object")throw"Invalid MIDI data";e=e||{};var n=t.header||{},i=t.tracks||[],r,s=i.length,a=new lt;for(Dx(a,n,s),r=0;r<s;r++)Nx(a,i[r],e);return a.buffer}function Dx(t,e,n){var i=e.format==null?1:e.format,r=128;e.timeDivision?r=e.timeDivision:e.ticksPerFrame&&e.framesPerSecond?r=-(e.framesPerSecond&255)<<8|e.ticksPerFrame&255:e.ticksPerBeat&&(r=e.ticksPerBeat&32767);var s=new lt;s.writeUInt16(i),s.writeUInt16(n),s.writeUInt16(r),t.writeChunk("MThd",s.buffer)}function Nx(t,e,n){var i=new lt,r,s=e.length,a=null;for(r=0;r<s;r++)(n.running===!1||!n.running&&!e[r].running)&&(a=null),a=Fx(i,e[r],a,n.useByte9ForNoteOff);t.writeChunk("MTrk",i.buffer)}function Fx(t,e,n,i){var r=e.type,s=e.deltaTime,a=e.text||"",o=e.data||[],l=null;switch(t.writeVarInt(s),r){case"sequenceNumber":t.writeUInt8(255),t.writeUInt8(0),t.writeVarInt(2),t.writeUInt16(e.number);break;case"text":t.writeUInt8(255),t.writeUInt8(1),t.writeVarInt(a.length),t.writeString(a);break;case"copyrightNotice":t.writeUInt8(255),t.writeUInt8(2),t.writeVarInt(a.length),t.writeString(a);break;case"trackName":t.writeUInt8(255),t.writeUInt8(3),t.writeVarInt(a.length),t.writeString(a);break;case"instrumentName":t.writeUInt8(255),t.writeUInt8(4),t.writeVarInt(a.length),t.writeString(a);break;case"lyrics":t.writeUInt8(255),t.writeUInt8(5),t.writeVarInt(a.length),t.writeString(a);break;case"marker":t.writeUInt8(255),t.writeUInt8(6),t.writeVarInt(a.length),t.writeString(a);break;case"cuePoint":t.writeUInt8(255),t.writeUInt8(7),t.writeVarInt(a.length),t.writeString(a);break;case"channelPrefix":t.writeUInt8(255),t.writeUInt8(32),t.writeVarInt(1),t.writeUInt8(e.channel);break;case"portPrefix":t.writeUInt8(255),t.writeUInt8(33),t.writeVarInt(1),t.writeUInt8(e.port);break;case"endOfTrack":t.writeUInt8(255),t.writeUInt8(47),t.writeVarInt(0);break;case"setTempo":t.writeUInt8(255),t.writeUInt8(81),t.writeVarInt(3),t.writeUInt24(e.microsecondsPerBeat);break;case"smpteOffset":t.writeUInt8(255),t.writeUInt8(84),t.writeVarInt(5);var c={24:0,25:32,29:64,30:96},u=e.hour&31|c[e.frameRate];t.writeUInt8(u),t.writeUInt8(e.min),t.writeUInt8(e.sec),t.writeUInt8(e.frame),t.writeUInt8(e.subFrame);break;case"timeSignature":t.writeUInt8(255),t.writeUInt8(88),t.writeVarInt(4),t.writeUInt8(e.numerator);var h=Math.floor(Math.log(e.denominator)/Math.LN2)&255;t.writeUInt8(h),t.writeUInt8(e.metronome),t.writeUInt8(e.thirtyseconds||8);break;case"keySignature":t.writeUInt8(255),t.writeUInt8(89),t.writeVarInt(2),t.writeInt8(e.key),t.writeUInt8(e.scale);break;case"sequencerSpecific":t.writeUInt8(255),t.writeUInt8(127),t.writeVarInt(o.length),t.writeBytes(o);break;case"unknownMeta":e.metatypeByte!=null&&(t.writeUInt8(255),t.writeUInt8(e.metatypeByte),t.writeVarInt(o.length),t.writeBytes(o));break;case"sysEx":t.writeUInt8(240),t.writeVarInt(o.length),t.writeBytes(o);break;case"endSysEx":t.writeUInt8(247),t.writeVarInt(o.length),t.writeBytes(o);break;case"noteOff":var f=i!==!1&&e.byte9||i&&e.velocity==0?144:128;l=f|e.channel,l!==n&&t.writeUInt8(l),t.writeUInt8(e.noteNumber),t.writeUInt8(e.velocity);break;case"noteOn":l=144|e.channel,l!==n&&t.writeUInt8(l),t.writeUInt8(e.noteNumber),t.writeUInt8(e.velocity);break;case"noteAftertouch":l=160|e.channel,l!==n&&t.writeUInt8(l),t.writeUInt8(e.noteNumber),t.writeUInt8(e.amount);break;case"controller":l=176|e.channel,l!==n&&t.writeUInt8(l),t.writeUInt8(e.controllerType),t.writeUInt8(e.value);break;case"programChange":l=192|e.channel,l!==n&&t.writeUInt8(l),t.writeUInt8(e.programNumber);break;case"channelAftertouch":l=208|e.channel,l!==n&&t.writeUInt8(l),t.writeUInt8(e.amount);break;case"pitchBend":l=224|e.channel,l!==n&&t.writeUInt8(l);var p=8192+e.value,g=p&127,_=p>>7&127;t.writeUInt8(g),t.writeUInt8(_);break;default:throw"Unrecognized event type: "+r}return l}function lt(){this.buffer=[]}lt.prototype.writeUInt8=function(t){this.buffer.push(t&255)};lt.prototype.writeInt8=lt.prototype.writeUInt8;lt.prototype.writeUInt16=function(t){var e=t>>8&255,n=t&255;this.writeUInt8(e),this.writeUInt8(n)};lt.prototype.writeInt16=lt.prototype.writeUInt16;lt.prototype.writeUInt24=function(t){var e=t>>16&255,n=t>>8&255,i=t&255;this.writeUInt8(e),this.writeUInt8(n),this.writeUInt8(i)};lt.prototype.writeInt24=lt.prototype.writeUInt24;lt.prototype.writeUInt32=function(t){var e=t>>24&255,n=t>>16&255,i=t>>8&255,r=t&255;this.writeUInt8(e),this.writeUInt8(n),this.writeUInt8(i),this.writeUInt8(r)};lt.prototype.writeInt32=lt.prototype.writeUInt32;lt.prototype.writeBytes=function(t){this.buffer=this.buffer.concat(Array.prototype.slice.call(t,0))};lt.prototype.writeString=function(t){var e,n=t.length,i=[];for(e=0;e<n;e++)i.push(t.codePointAt(e));this.writeBytes(i)};lt.prototype.writeVarInt=function(t){if(t<0)throw"Cannot write negative variable-length integer";if(t<=127)this.writeUInt8(t);else{var e=t,n=[];for(n.push(e&127),e>>=7;e;){var i=e&127|128;n.push(i),e>>=7}this.writeBytes(n.reverse())}};lt.prototype.writeChunk=function(t,e){this.writeString(t),this.writeUInt32(e.length),this.writeBytes(e)};var Ox=Ux;Vs.parseMidi=Ix;Vs.writeMidi=Ox;var Ls={},_i={};Object.defineProperty(_i,"__esModule",{value:!0});_i.insert=_i.search=void 0;function Af(t,e,n){n===void 0&&(n="ticks");var i=0,r=t.length,s=r;if(r>0&&t[r-1][n]<=e)return r-1;for(;i<s;){var a=Math.floor(i+(s-i)/2),o=t[a],l=t[a+1];if(o[n]===e){for(var c=a;c<t.length;c++){var u=t[c];u[n]===e&&(a=c)}return a}else{if(o[n]<e&&l[n]>e)return a;o[n]>e?s=a:o[n]<e&&(i=a+1)}}return-1}_i.search=Af;function Bx(t,e,n){if(n===void 0&&(n="ticks"),t.length){var i=Af(t,e[n],n);t.splice(i+1,0,e)}else t.push(e)}_i.insert=Bx;(function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.Header=t.keySignatureKeys=void 0;var e=_i,n=new WeakMap;t.keySignatureKeys=["Cb","Gb","Db","Ab","Eb","Bb","F","C","G","D","A","E","B","F#","C#"];var i=function(){function r(s){var a=this;if(this.tempos=[],this.timeSignatures=[],this.keySignatures=[],this.meta=[],this.name="",n.set(this,480),s){n.set(this,s.header.ticksPerBeat),s.tracks.forEach(function(l){l.forEach(function(c){c.meta&&(c.type==="timeSignature"?a.timeSignatures.push({ticks:c.absoluteTime,timeSignature:[c.numerator,c.denominator]}):c.type==="setTempo"?a.tempos.push({bpm:6e7/c.microsecondsPerBeat,ticks:c.absoluteTime}):c.type==="keySignature"&&a.keySignatures.push({key:t.keySignatureKeys[c.key+7],scale:c.scale===0?"major":"minor",ticks:c.absoluteTime}))})});var o=0;s.tracks[0].forEach(function(l){o+=l.deltaTime,l.meta&&(l.type==="trackName"?a.name=l.text:(l.type==="text"||l.type==="cuePoint"||l.type==="marker"||l.type==="lyrics")&&a.meta.push({text:l.text,ticks:o,type:l.type}))}),this.update()}}return r.prototype.update=function(){var s=this,a=0,o=0;this.tempos.sort(function(l,c){return l.ticks-c.ticks}),this.tempos.forEach(function(l,c){var u=c>0?s.tempos[c-1].bpm:s.tempos[0].bpm,h=l.ticks/s.ppq-o,f=60/u*h;l.time=f+a,a=l.time,o+=h}),this.timeSignatures.sort(function(l,c){return l.ticks-c.ticks}),this.timeSignatures.forEach(function(l,c){var u=c>0?s.timeSignatures[c-1]:s.timeSignatures[0],h=(l.ticks-u.ticks)/s.ppq,f=h/u.timeSignature[0]/(u.timeSignature[1]/4);u.measures=u.measures||0,l.measures=f+u.measures})},r.prototype.ticksToSeconds=function(s){var a=(0,e.search)(this.tempos,s);if(a!==-1){var o=this.tempos[a],l=o.time,c=(s-o.ticks)/this.ppq;return l+60/o.bpm*c}else{var u=s/this.ppq;return 60/120*u}},r.prototype.ticksToMeasures=function(s){var a=(0,e.search)(this.timeSignatures,s);if(a!==-1){var o=this.timeSignatures[a],l=(s-o.ticks)/this.ppq;return o.measures+l/(o.timeSignature[0]/o.timeSignature[1])/4}else return s/this.ppq/4},Object.defineProperty(r.prototype,"ppq",{get:function(){return n.get(this)},enumerable:!1,configurable:!0}),r.prototype.secondsToTicks=function(s){var a=(0,e.search)(this.tempos,s,"time");if(a!==-1){var o=this.tempos[a],l=o.time,c=s-l,u=c/(60/o.bpm);return Math.round(o.ticks+u*this.ppq)}else{var h=s/.5;return Math.round(h*this.ppq)}},r.prototype.toJSON=function(){return{keySignatures:this.keySignatures,meta:this.meta,name:this.name,ppq:this.ppq,tempos:this.tempos.map(function(s){return{bpm:s.bpm,ticks:s.ticks}}),timeSignatures:this.timeSignatures}},r.prototype.fromJSON=function(s){this.name=s.name,this.tempos=s.tempos.map(function(a){return Object.assign({},a)}),this.timeSignatures=s.timeSignatures.map(function(a){return Object.assign({},a)}),this.keySignatures=s.keySignatures.map(function(a){return Object.assign({},a)}),this.meta=s.meta.map(function(a){return Object.assign({},a)}),n.set(this,s.ppq),this.update()},r.prototype.setTempo=function(s){this.tempos=[{bpm:s,ticks:0}],this.update()},r}();t.Header=i})(Ls);var Or={},Ho={};(function(t){Object.defineProperty(t,"__esModule",{value:!0}),t.ControlChange=t.controlChangeIds=t.controlChangeNames=void 0,t.controlChangeNames={1:"modulationWheel",2:"breath",4:"footController",5:"portamentoTime",7:"volume",8:"balance",10:"pan",64:"sustain",65:"portamentoTime",66:"sostenuto",67:"softPedal",68:"legatoFootswitch",84:"portamentoControl"},t.controlChangeIds=Object.keys(t.controlChangeNames).reduce(function(r,s){return r[t.controlChangeNames[s]]=s,r},{});var e=new WeakMap,n=new WeakMap,i=function(){function r(s,a){e.set(this,a),n.set(this,s.controllerType),this.ticks=s.absoluteTime,this.value=s.value}return Object.defineProperty(r.prototype,"number",{get:function(){return n.get(this)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"name",{get:function(){return t.controlChangeNames[this.number]?t.controlChangeNames[this.number]:null},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"time",{get:function(){var s=e.get(this);return s.ticksToSeconds(this.ticks)},set:function(s){var a=e.get(this);this.ticks=a.secondsToTicks(s)},enumerable:!1,configurable:!0}),r.prototype.toJSON=function(){return{number:this.number,ticks:this.ticks,time:this.time,value:this.value}},r}();t.ControlChange=i})(Ho);var Ws={};Object.defineProperty(Ws,"__esModule",{value:!0});Ws.createControlChanges=void 0;var ps=Ho;function kx(){return new Proxy({},{get:function(t,e){if(t[e])return t[e];if(ps.controlChangeIds.hasOwnProperty(e))return t[ps.controlChangeIds[e]]},set:function(t,e,n){return ps.controlChangeIds.hasOwnProperty(e)?t[ps.controlChangeIds[e]]=n:t[e]=n,!0}})}Ws.createControlChanges=kx;var Xs={};Object.defineProperty(Xs,"__esModule",{value:!0});Xs.PitchBend=void 0;var Ga=new WeakMap,zx=function(){function t(e,n){Ga.set(this,n),this.ticks=e.absoluteTime,this.value=e.value}return Object.defineProperty(t.prototype,"time",{get:function(){var e=Ga.get(this);return e.ticksToSeconds(this.ticks)},set:function(e){var n=Ga.get(this);this.ticks=n.secondsToTicks(e)},enumerable:!1,configurable:!0}),t.prototype.toJSON=function(){return{ticks:this.ticks,time:this.time,value:this.value}},t}();Xs.PitchBend=zx;var js={},Xn={};Object.defineProperty(Xn,"__esModule",{value:!0});Xn.DrumKitByPatchID=Xn.InstrumentFamilyByID=Xn.instrumentByPatchID=void 0;Xn.instrumentByPatchID=["acoustic grand piano","bright acoustic piano","electric grand piano","honky-tonk piano","electric piano 1","electric piano 2","harpsichord","clavi","celesta","glockenspiel","music box","vibraphone","marimba","xylophone","tubular bells","dulcimer","drawbar organ","percussive organ","rock organ","church organ","reed organ","accordion","harmonica","tango accordion","acoustic guitar (nylon)","acoustic guitar (steel)","electric guitar (jazz)","electric guitar (clean)","electric guitar (muted)","overdriven guitar","distortion guitar","guitar harmonics","acoustic bass","electric bass (finger)","electric bass (pick)","fretless bass","slap bass 1","slap bass 2","synth bass 1","synth bass 2","violin","viola","cello","contrabass","tremolo strings","pizzicato strings","orchestral harp","timpani","string ensemble 1","string ensemble 2","synthstrings 1","synthstrings 2","choir aahs","voice oohs","synth voice","orchestra hit","trumpet","trombone","tuba","muted trumpet","french horn","brass section","synthbrass 1","synthbrass 2","soprano sax","alto sax","tenor sax","baritone sax","oboe","english horn","bassoon","clarinet","piccolo","flute","recorder","pan flute","blown bottle","shakuhachi","whistle","ocarina","lead 1 (square)","lead 2 (sawtooth)","lead 3 (calliope)","lead 4 (chiff)","lead 5 (charang)","lead 6 (voice)","lead 7 (fifths)","lead 8 (bass + lead)","pad 1 (new age)","pad 2 (warm)","pad 3 (polysynth)","pad 4 (choir)","pad 5 (bowed)","pad 6 (metallic)","pad 7 (halo)","pad 8 (sweep)","fx 1 (rain)","fx 2 (soundtrack)","fx 3 (crystal)","fx 4 (atmosphere)","fx 5 (brightness)","fx 6 (goblins)","fx 7 (echoes)","fx 8 (sci-fi)","sitar","banjo","shamisen","koto","kalimba","bag pipe","fiddle","shanai","tinkle bell","agogo","steel drums","woodblock","taiko drum","melodic tom","synth drum","reverse cymbal","guitar fret noise","breath noise","seashore","bird tweet","telephone ring","helicopter","applause","gunshot"];Xn.InstrumentFamilyByID=["piano","chromatic percussion","organ","guitar","bass","strings","ensemble","brass","reed","pipe","synth lead","synth pad","synth effects","world","percussive","sound effects"];Xn.DrumKitByPatchID={0:"standard kit",8:"room kit",16:"power kit",24:"electronic kit",25:"tr-808 kit",32:"jazz kit",40:"brush kit",48:"orchestra kit",56:"sound fx kit"};Object.defineProperty(js,"__esModule",{value:!0});js.Instrument=void 0;var ms=Xn,Hc=new WeakMap,Hx=function(){function t(e,n){if(this.number=0,Hc.set(this,n),this.number=0,e){var i=e.find(function(r){return r.type==="programChange"});i&&(this.number=i.programNumber)}}return Object.defineProperty(t.prototype,"name",{get:function(){return this.percussion?ms.DrumKitByPatchID[this.number]:ms.instrumentByPatchID[this.number]},set:function(e){var n=ms.instrumentByPatchID.indexOf(e);n!==-1&&(this.number=n)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"family",{get:function(){return this.percussion?"drums":ms.InstrumentFamilyByID[Math.floor(this.number/8)]},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"percussion",{get:function(){var e=Hc.get(this);return e.channel===9},enumerable:!1,configurable:!0}),t.prototype.toJSON=function(){return{family:this.family,number:this.number,name:this.name}},t.prototype.fromJSON=function(e){this.number=e.number},t}();js.Instrument=Hx;var qs={};Object.defineProperty(qs,"__esModule",{value:!0});qs.Note=void 0;function Gx(t){var e=Math.floor(t/12)-1;return wf(t)+e.toString()}function wf(t){var e=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],n=t%12;return e[n]}function Vx(t){var e=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];return e.indexOf(t)}var Wx=function(){var t=/^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i,e={cbb:-2,cb:-1,c:0,"c#":1,cx:2,dbb:0,db:1,d:2,"d#":3,dx:4,ebb:2,eb:3,e:4,"e#":5,ex:6,fbb:3,fb:4,f:5,"f#":6,fx:7,gbb:5,gb:6,g:7,"g#":8,gx:9,abb:7,ab:8,a:9,"a#":10,ax:11,bbb:9,bb:10,b:11,"b#":12,bx:13};return function(n){var i=t.exec(n),r=i[1],s=i[2],a=e[r.toLowerCase()];return a+(parseInt(s,10)+1)*12}}(),ki=new WeakMap,Xx=function(){function t(e,n,i){ki.set(this,i),this.midi=e.midi,this.velocity=e.velocity,this.noteOffVelocity=n.velocity,this.ticks=e.ticks,this.durationTicks=n.ticks-e.ticks}return Object.defineProperty(t.prototype,"name",{get:function(){return Gx(this.midi)},set:function(e){this.midi=Wx(e)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"octave",{get:function(){return Math.floor(this.midi/12)-1},set:function(e){var n=e-this.octave;this.midi+=n*12},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"pitch",{get:function(){return wf(this.midi)},set:function(e){this.midi=12*(this.octave+1)+Vx(e)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"duration",{get:function(){var e=ki.get(this);return e.ticksToSeconds(this.ticks+this.durationTicks)-e.ticksToSeconds(this.ticks)},set:function(e){var n=ki.get(this),i=n.secondsToTicks(this.time+e);this.durationTicks=i-this.ticks},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"time",{get:function(){var e=ki.get(this);return e.ticksToSeconds(this.ticks)},set:function(e){var n=ki.get(this);this.ticks=n.secondsToTicks(e)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"bars",{get:function(){var e=ki.get(this);return e.ticksToMeasures(this.ticks)},enumerable:!1,configurable:!0}),t.prototype.toJSON=function(){return{duration:this.duration,durationTicks:this.durationTicks,midi:this.midi,name:this.name,ticks:this.ticks,time:this.time,velocity:this.velocity}},t}();qs.Note=Xx;Object.defineProperty(Or,"__esModule",{value:!0});Or.Track=void 0;var Va=_i,jx=Ho,qx=Ws,Yx=Xs,Gc=js,Kx=qs,gs=new WeakMap,$x=function(){function t(e,n){var i=this;if(this.name="",this.notes=[],this.controlChanges=(0,qx.createControlChanges)(),this.pitchBends=[],gs.set(this,n),e){var r=e.find(function(f){return f.type==="trackName"});this.name=r?r.text:""}if(this.instrument=new Gc.Instrument(e,this),this.channel=0,e){for(var s=e.filter(function(f){return f.type==="noteOn"}),a=e.filter(function(f){return f.type==="noteOff"}),o=function(){var f=s.shift();l.channel=f.channel;var p=a.findIndex(function(_){return _.noteNumber===f.noteNumber&&_.absoluteTime>=f.absoluteTime});if(p!==-1){var g=a.splice(p,1)[0];l.addNote({durationTicks:g.absoluteTime-f.absoluteTime,midi:f.noteNumber,noteOffVelocity:g.velocity/127,ticks:f.absoluteTime,velocity:f.velocity/127})}},l=this;s.length;)o();var c=e.filter(function(f){return f.type==="controller"});c.forEach(function(f){i.addCC({number:f.controllerType,ticks:f.absoluteTime,value:f.value/127})});var u=e.filter(function(f){return f.type==="pitchBend"});u.forEach(function(f){i.addPitchBend({ticks:f.absoluteTime,value:f.value/Math.pow(2,13)})});var h=e.find(function(f){return f.type==="endOfTrack"});this.endOfTrackTicks=h!==void 0?h.absoluteTime:void 0}}return t.prototype.addNote=function(e){var n=gs.get(this),i=new Kx.Note({midi:0,ticks:0,velocity:1},{ticks:0,velocity:0},n);return Object.assign(i,e),(0,Va.insert)(this.notes,i,"ticks"),this},t.prototype.addCC=function(e){var n=gs.get(this),i=new jx.ControlChange({controllerType:e.number},n);return delete e.number,Object.assign(i,e),Array.isArray(this.controlChanges[i.number])||(this.controlChanges[i.number]=[]),(0,Va.insert)(this.controlChanges[i.number],i,"ticks"),this},t.prototype.addPitchBend=function(e){var n=gs.get(this),i=new Yx.PitchBend({},n);return Object.assign(i,e),(0,Va.insert)(this.pitchBends,i,"ticks"),this},Object.defineProperty(t.prototype,"duration",{get:function(){if(!this.notes.length)return 0;for(var e=this.notes[this.notes.length-1].time+this.notes[this.notes.length-1].duration,n=0;n<this.notes.length-1;n++){var i=this.notes[n].time+this.notes[n].duration;e<i&&(e=i)}return e},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"durationTicks",{get:function(){if(!this.notes.length)return 0;for(var e=this.notes[this.notes.length-1].ticks+this.notes[this.notes.length-1].durationTicks,n=0;n<this.notes.length-1;n++){var i=this.notes[n].ticks+this.notes[n].durationTicks;e<i&&(e=i)}return e},enumerable:!1,configurable:!0}),t.prototype.fromJSON=function(e){var n=this;this.name=e.name,this.channel=e.channel,this.instrument=new Gc.Instrument(void 0,this),this.instrument.fromJSON(e.instrument),e.endOfTrackTicks!==void 0&&(this.endOfTrackTicks=e.endOfTrackTicks);for(var i in e.controlChanges)e.controlChanges[i]&&e.controlChanges[i].forEach(function(r){n.addCC({number:r.number,ticks:r.ticks,value:r.value})});e.notes.forEach(function(r){n.addNote({durationTicks:r.durationTicks,midi:r.midi,ticks:r.ticks,velocity:r.velocity})})},t.prototype.toJSON=function(){for(var e={},n=0;n<127;n++)this.controlChanges.hasOwnProperty(n)&&(e[n]=this.controlChanges[n].map(function(r){return r.toJSON()}));var i={channel:this.channel,controlChanges:e,pitchBends:this.pitchBends.map(function(r){return r.toJSON()}),instrument:this.instrument.toJSON(),name:this.name,notes:this.notes.map(function(r){return r.toJSON()})};return this.endOfTrackTicks!==void 0&&(i.endOfTrackTicks=this.endOfTrackTicks),i},t}();Or.Track=$x;var Ys={};function Zx(t){var e=[];return Rf(t,e),e}function Rf(t,e){for(var n=0;n<t.length;n++){var i=t[n];Array.isArray(i)?Rf(i,e):e.push(i)}}const Jx=Object.freeze(Object.defineProperty({__proto__:null,flatten:Zx},Symbol.toStringTag,{value:"Module"})),Qx=bf(Jx);var Bn=Wi&&Wi.__spreadArray||function(t,e,n){if(n||arguments.length===2)for(var i=0,r=e.length,s;i<r;i++)(s||!(i in e))&&(s||(s=Array.prototype.slice.call(e,0,i)),s[i]=e[i]);return t.concat(s||Array.prototype.slice.call(e))};Object.defineProperty(Ys,"__esModule",{value:!0});Ys.encode=void 0;var eM=Vs,tM=Ls,nM=Qx;function iM(t,e){return[{absoluteTime:t.ticks,channel:e,deltaTime:0,noteNumber:t.midi,type:"noteOn",velocity:Math.floor(t.velocity*127)},{absoluteTime:t.ticks+t.durationTicks,channel:e,deltaTime:0,noteNumber:t.midi,type:"noteOff",velocity:Math.floor(t.noteOffVelocity*127)}]}function rM(t){return(0,nM.flatten)(t.notes.map(function(e){return iM(e,t.channel)}))}function sM(t,e){return{absoluteTime:t.ticks,channel:e,controllerType:t.number,deltaTime:0,type:"controller",value:Math.floor(t.value*127)}}function aM(t){for(var e=[],n=0;n<127;n++)t.controlChanges.hasOwnProperty(n)&&t.controlChanges[n].forEach(function(i){e.push(sM(i,t.channel))});return e}function oM(t,e){return{absoluteTime:t.ticks,channel:e,deltaTime:0,type:"pitchBend",value:t.value}}function lM(t){var e=[];return t.pitchBends.forEach(function(n){e.push(oM(n,t.channel))}),e}function cM(t){return{absoluteTime:0,channel:t.channel,deltaTime:0,programNumber:t.instrument.number,type:"programChange"}}function uM(t){return{absoluteTime:0,deltaTime:0,meta:!0,text:t,type:"trackName"}}function fM(t){return{absoluteTime:t.ticks,deltaTime:0,meta:!0,microsecondsPerBeat:Math.floor(6e7/t.bpm),type:"setTempo"}}function hM(t){return{absoluteTime:t.ticks,deltaTime:0,denominator:t.timeSignature[1],meta:!0,metronome:24,numerator:t.timeSignature[0],thirtyseconds:8,type:"timeSignature"}}function dM(t){var e=tM.keySignatureKeys.indexOf(t.key);return{absoluteTime:t.ticks,deltaTime:0,key:e+7,meta:!0,scale:t.scale==="major"?0:1,type:"keySignature"}}function pM(t){return{absoluteTime:t.ticks,deltaTime:0,meta:!0,text:t.text,type:t.type}}function mM(t){var e={header:{format:1,numTracks:t.tracks.length+1,ticksPerBeat:t.header.ppq},tracks:Bn([Bn(Bn(Bn(Bn([{absoluteTime:0,deltaTime:0,meta:!0,text:t.header.name,type:"trackName"}],t.header.keySignatures.map(function(n){return dM(n)}),!0),t.header.meta.map(function(n){return pM(n)}),!0),t.header.tempos.map(function(n){return fM(n)}),!0),t.header.timeSignatures.map(function(n){return hM(n)}),!0)],t.tracks.map(function(n){return Bn(Bn(Bn([uM(n.name),cM(n)],rM(n),!0),aM(n),!0),lM(n),!0)}),!0)};return e.tracks=e.tracks.map(function(n){n=n.sort(function(r,s){return r.absoluteTime-s.absoluteTime});var i=0;return n.forEach(function(r){r.deltaTime=r.absoluteTime-i,i=r.absoluteTime,delete r.absoluteTime}),n.push({deltaTime:0,meta:!0,type:"endOfTrack"}),n}),new Uint8Array((0,eM.writeMidi)(e))}Ys.encode=mM;(function(t){var e=Wi&&Wi.__awaiter||function(h,f,p,g){function _(m){return m instanceof p?m:new p(function(d){d(m)})}return new(p||(p=Promise))(function(m,d){function A(y){try{M(g.next(y))}catch(L){d(L)}}function E(y){try{M(g.throw(y))}catch(L){d(L)}}function M(y){y.done?m(y.value):_(y.value).then(A,E)}M((g=g.apply(h,f||[])).next())})},n=Wi&&Wi.__generator||function(h,f){var p={label:0,sent:function(){if(m[0]&1)throw m[1];return m[1]},trys:[],ops:[]},g,_,m,d;return d={next:A(0),throw:A(1),return:A(2)},typeof Symbol=="function"&&(d[Symbol.iterator]=function(){return this}),d;function A(M){return function(y){return E([M,y])}}function E(M){if(g)throw new TypeError("Generator is already executing.");for(;p;)try{if(g=1,_&&(m=M[0]&2?_.return:M[0]?_.throw||((m=_.return)&&m.call(_),0):_.next)&&!(m=m.call(_,M[1])).done)return m;switch(_=0,m&&(M=[M[0]&2,m.value]),M[0]){case 0:case 1:m=M;break;case 4:return p.label++,{value:M[1],done:!1};case 5:p.label++,_=M[1],M=[0];continue;case 7:M=p.ops.pop(),p.trys.pop();continue;default:if(m=p.trys,!(m=m.length>0&&m[m.length-1])&&(M[0]===6||M[0]===2)){p=0;continue}if(M[0]===3&&(!m||M[1]>m[0]&&M[1]<m[3])){p.label=M[1];break}if(M[0]===6&&p.label<m[1]){p.label=m[1],m=M;break}if(m&&p.label<m[2]){p.label=m[2],p.ops.push(M);break}m[2]&&p.ops.pop(),p.trys.pop();continue}M=f.call(h,p)}catch(y){M=[6,y],_=0}finally{g=m=0}if(M[0]&5)throw M[1];return{value:M[0]?M[1]:void 0,done:!0}}};Object.defineProperty(t,"__esModule",{value:!0}),t.Header=t.Track=t.Midi=void 0;var i=Vs,r=Ls,s=Or,a=Ys,o=function(){function h(f){var p=this,g=null;if(f){var _=f instanceof ArrayBuffer?new Uint8Array(f):f;g=(0,i.parseMidi)(_),g.tracks.forEach(function(m){var d=0;m.forEach(function(A){d+=A.deltaTime,A.absoluteTime=d})}),g.tracks=u(g.tracks)}this.header=new r.Header(g),this.tracks=[],f&&(this.tracks=g.tracks.map(function(m){return new s.Track(m,p.header)}),g.header.format===1&&this.tracks[0].duration===0&&this.tracks.shift())}return h.fromUrl=function(f){return e(this,void 0,void 0,function(){var p,g;return n(this,function(_){switch(_.label){case 0:return[4,fetch(f)];case 1:return p=_.sent(),p.ok?[4,p.arrayBuffer()]:[3,3];case 2:return g=_.sent(),[2,new h(g)];case 3:throw new Error("Could not load '".concat(f,"'"))}})})},Object.defineProperty(h.prototype,"name",{get:function(){return this.header.name},set:function(f){this.header.name=f},enumerable:!1,configurable:!0}),Object.defineProperty(h.prototype,"duration",{get:function(){var f=this.tracks.map(function(p){return p.duration});return Math.max.apply(Math,f)},enumerable:!1,configurable:!0}),Object.defineProperty(h.prototype,"durationTicks",{get:function(){var f=this.tracks.map(function(p){return p.durationTicks});return Math.max.apply(Math,f)},enumerable:!1,configurable:!0}),h.prototype.addTrack=function(){var f=new s.Track(void 0,this.header);return this.tracks.push(f),f},h.prototype.toArray=function(){return(0,a.encode)(this)},h.prototype.toJSON=function(){return{header:this.header.toJSON(),tracks:this.tracks.map(function(f){return f.toJSON()})}},h.prototype.fromJSON=function(f){var p=this;this.header=new r.Header,this.header.fromJSON(f.header),this.tracks=f.tracks.map(function(g){var _=new s.Track(void 0,p.header);return _.fromJSON(g),_})},h.prototype.clone=function(){var f=new h;return f.fromJSON(this.toJSON()),f},h}();t.Midi=o;var l=Or;Object.defineProperty(t,"Track",{enumerable:!0,get:function(){return l.Track}});var c=Ls;Object.defineProperty(t,"Header",{enumerable:!0,get:function(){return c.Header}});function u(h){for(var f=[],p=0;p<h.length;p++)for(var g=f.length,_=new Map,m=Array(16).fill(0),d=0,A=h[p];d<A.length;d++){var E=A[d],M=g,y=E.channel;if(y!==void 0){E.type==="programChange"&&(m[y]=E.programNumber);var L=m[y],P="".concat(L," ").concat(y);_.has(P)?M=_.get(P):(M=g+_.size,_.set(P,M))}f[M]||f.push([]),f[M].push(E)}return f}})(Tf);var Cf={exports:{}},Pf={exports:{}};function gM(t){return t>64&&t<91?t-65:t>96&&t<123?t-71:t>47&&t<58?t+4:t===43?62:t===47?63:0}function _M(t,e){for(var n=t.replace(/[^A-Za-z0-9\+\/]/g,""),i=n.length,r=e?Math.ceil((i*3+1>>2)/e)*e:i*3+1>>2,s=new Uint8Array(r),a,o,l=0,c=0,u=0;u<i;u++)if(o=u&3,l|=gM(n.charCodeAt(u))<<18-6*o,o===3||i-u===1){for(a=0;a<3&&c<r;a++,c++)s[c]=l>>>(16>>>a&24)&255;l=0}return s}var vM={decode:_M},xM=function(t,e){return new Promise(function(n,i){var r=new XMLHttpRequest;e&&(r.responseType=e),r.open("GET",t),r.onload=function(){r.status===200?n(r.response):i(Error(r.statusText))},r.onerror=function(){i(Error("Network Error"))},r.send()})};(function(t){var e=vM,n=xM;function i(P){return function(I){return typeof I=="string"&&P.test(I)}}function r(P,I){return typeof P=="string"?P+I:typeof P=="function"?P(I):I}function s(P,I,x,b){var H=a(I)?o:l(I)?c:u(I)?h:f(I)?p:g(I)?_:m(I)?d:A(I)?E:M(I)?y:null,O=x||{};return H?H(P,I,O):b?Promise.resolve(b):Promise.reject("Source not valid ("+I+")")}s.fetch=n;function a(P){return P instanceof ArrayBuffer}function o(P,I,x){return new Promise(function(b,H){P.decodeAudioData(I,function(O){b(O)},function(){H("Can't decode audio data ("+I.slice(0,30)+"...)")})})}var l=i(/\.(mp3|wav|ogg)(\?.*)?$/i);function c(P,I,x){var b=r(x.from,I);return s(P,s.fetch(b,"arraybuffer"),x)}function u(P){return P&&typeof P.then=="function"}function h(P,I,x){return I.then(function(b){return s(P,b,x)})}var f=Array.isArray;function p(P,I,x){return Promise.all(I.map(function(b){return s(P,b,x,b)}))}function g(P){return P&&typeof P=="object"}function _(P,I,x){var b={},H=Object.keys(I).map(function(O){if(x.only&&x.only.indexOf(O)===-1)return null;var N=I[O];return s(P,N,x,N).then(function(V){b[O]=V})});return Promise.all(H).then(function(){return b})}var m=i(/\.json(\?.*)?$/i);function d(P,I,x){var b=r(x.from,I);return s(P,s.fetch(b,"text").then(JSON.parse),x)}var A=i(/^data:audio/);function E(P,I,x){var b=I.indexOf(",");return s(P,e.decode(I.slice(b+1)).buffer,x)}var M=i(/\.js(\?.*)?$/i);function y(P,I,x){var b=r(x.from,I);return s(P,s.fetch(b,"text").then(L),x)}function L(P){var I=P.indexOf("MIDI.Soundfont.");if(I<0)throw Error("Invalid MIDI.js Soundfont format");I=P.indexOf("=",I)+2;var x=P.lastIndexOf(",");return JSON.parse(P.slice(I,x)+"}")}t.exports&&(t.exports=s),typeof window<"u"&&(window.loadAudio=s)})(Pf);var MM=Pf.exports,Lf={exports:{}},SM=yM;function yM(t){var e=t.createGain(),n=e._voltage=TM(t),i=zi(n),r=zi(n),s=zi(n);return e._startAmount=zi(r),e._endAmount=zi(s),e._multiplier=zi(i),e._multiplier.connect(e),e._startAmount.connect(e),e._endAmount.connect(e),e.value=i.gain,e.startValue=r.gain,e.endValue=s.gain,e.startValue.value=0,e.endValue.value=0,Object.defineProperties(e,EM),e}var EM={attack:{value:0,writable:!0},decay:{value:0,writable:!0},sustain:{value:1,writable:!0},release:{value:0,writable:!0},getReleaseDuration:{value:function(){return this.release}},start:{value:function(t){var e=this._multiplier.gain,n=this._startAmount.gain,i=this._endAmount.gain;this._voltage.start(t),this._decayFrom=this._decayFrom=t+this.attack,this._startedAt=t;var r=this.sustain;e.cancelScheduledValues(t),n.cancelScheduledValues(t),i.cancelScheduledValues(t),i.setValueAtTime(0,t),this.attack?(e.setValueAtTime(0,t),e.linearRampToValueAtTime(1,t+this.attack),n.setValueAtTime(1,t),n.linearRampToValueAtTime(0,t+this.attack)):(e.setValueAtTime(1,t),n.setValueAtTime(0,t)),this.decay&&e.setTargetAtTime(r,this._decayFrom,Vc(this.decay))}},stop:{value:function(t,e){e&&(t=t-this.release);var n=t+this.release;if(this.release){var i=this._multiplier.gain,r=this._startAmount.gain,s=this._endAmount.gain;i.cancelScheduledValues(t),r.cancelScheduledValues(t),s.cancelScheduledValues(t);var a=Vc(this.release);if(this.attack&&t<this._decayFrom){var o=AM(0,1,this._startedAt,this._decayFrom,t);i.linearRampToValueAtTime(o,t),r.linearRampToValueAtTime(1-o,t),r.setTargetAtTime(0,t,a)}s.setTargetAtTime(1,t,a),i.setTargetAtTime(0,t,a)}return this._voltage.stop(n),n}},onended:{get:function(){return this._voltage.onended},set:function(t){this._voltage.onended=t}}},bM=new Float32Array([1,1]);function TM(t){var e=t.createBufferSource(),n=t.createBuffer(1,2,t.sampleRate);return n.getChannelData(0).set(bM),e.buffer=n,e.loop=!0,e}function zi(t){var e=t.context.createGain();return t.connect(e),e}function Vc(t){return Math.log(t+1)/Math.log(100)}function AM(t,e,n,i,r){var s=e-t,a=i-n,o=r-n,l=o/a,c=t+l*s;return c<=t&&(c=t),c>=e&&(c=e),c}var wM=SM,RM={},CM={gain:1,attack:.01,decay:.1,sustain:.9,release:.3,loop:!1,cents:0,loopStart:0,loopEnd:0};function PM(t,e,n){var i=!1,r=0,s={},a=t.createGain();a.gain.value=1;var o=Object.assign({},CM,n),l={context:t,out:a,opts:o};return e instanceof AudioBuffer?l.buffer=e:l.buffers=e,l.start=function(h,f,p){if(l.buffer&&h!==null)return l.start(null,h,f);var g=h?l.buffers[h]:l.buffer;if(g){if(!i){console.warn("SamplePlayer not connected to any node.");return}}else{console.warn("Buffer "+h+" not found.");return}var _=p||RM;f=Math.max(t.currentTime,f||0),l.emit("start",f,h,_);var m=u(h,g,_);return m.id=c(h,m),m.env.start(f),m.source.start(f),l.emit("started",f,m.id,m),_.duration&&m.stop(f+_.duration),m},l.play=function(h,f,p){return l.start(h,f,p)},l.stop=function(h,f){var p;return f=f||Object.keys(s),f.map(function(g){return p=s[g],p?(p.stop(h),p.id):null})},l.connect=function(h){return i=!0,a.connect(h),l},l.emit=function(h,f,p,g){l.onevent&&l.onevent(h,f,p,g);var _=l["on"+h];_&&_(f,p,g)},l;function c(h,f){return f.id=r++,s[f.id]=f,f.source.onended=function(){var p=t.currentTime;f.source.disconnect(),f.env.disconnect(),f.disconnect(),l.emit("ended",p,f.id,f)},f.id}function u(h,f,p){var g=t.createGain();return g.gain.value=0,g.connect(a),g.env=IM(t,p,o),g.env.connect(g.gain),g.source=t.createBufferSource(),g.source.buffer=f,g.source.connect(g),g.source.loop=p.loop||o.loop,g.source.playbackRate.value=UM(p.cents||o.cents),g.source.loopStart=p.loopStart||o.loopStart,g.source.loopEnd=p.loopEnd||o.loopEnd,g.stop=function(_){var m=_||t.currentTime;l.emit("stop",m,h);var d=g.env.stop(m);g.source.stop(d)},g}}function Wc(t){return typeof t=="number"}var LM=["attack","decay","sustain","release"];function IM(t,e,n){var i=wM(t),r=e.adsr||n.adsr;return LM.forEach(function(s,a){r?i[s]=r[a]:i[s]=e[s]||n[s]}),i.value.value=Wc(e.gain)?e.gain:Wc(n.gain)?n.gain:1,i}function UM(t){return t?Math.pow(2,t/1200):1}var DM=PM,NM=function(t){return t.on=function(e,n){if(arguments.length===1&&typeof e=="function")return t.on("event",e);var i="on"+e,r=t[i];return t[i]=r?FM(r,n):n,t},t};function FM(t,e){return function(n,i,r,s){t(n,i,r,s),e(n,i,r,s)}}var If=/^([a-gA-G])(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)\s*$/;function OM(){return If}var BM=[0,2,4,5,7,9,11];function Uf(t,e,n){if(typeof t!="string")return null;var i=If.exec(t);if(!i||!e&&i[4])return null;var r={letter:i[1].toUpperCase(),acc:i[2].replace(/x/g,"##")};return r.pc=r.letter+r.acc,r.step=(r.letter.charCodeAt(0)+3)%7,r.alt=r.acc[0]==="b"?-r.acc.length:r.acc.length,r.chroma=BM[r.step]+r.alt,i[3]&&(r.oct=+i[3],r.midi=r.chroma+12*(r.oct+1),r.freq=Df(r.midi,n)),e&&(r.tonicOf=i[4]),r}function Df(t,e){return Math.pow(2,(t-69)/12)*(e||440)}var Nf={parse:Uf,regex:OM,midiToFreq:Df},kM=["letter","acc","pc","step","alt","chroma","oct","midi","freq"];kM.forEach(function(t){Nf[t]=function(e){var n=Uf(e);return n&&typeof n[t]<"u"?n[t]:null}});var zM=Nf,HM=zM,GM=function(t){return t!==null&&t!==[]&&t>=0&&t<129},VM=function(t){return GM(t)?+t:HM.midi(t)},WM=function(t){if(t.buffers){var e=t.opts.map,n=typeof e=="function"?e:VM,i=function(s){return s?n(s)||s:null};t.buffers=XM(t.buffers,i);var r=t.start;t.start=function(s,a,o){var l=i(s),c=l%1;return c&&(l=Math.floor(l),o=Object.assign(o||{},{cents:Math.floor(c*100)})),r(l,a,o)}}return t};function XM(t,e){return Object.keys(t).reduce(function(n,i){return n[e(i)]=t[i],n},{})}var jM=Array.isArray,qM=function(t){return t&&typeof t=="object"},YM={},KM=function(t){return t.schedule=function(e,n){var i=t.context.currentTime,r=e<i?i:e;t.emit("schedule",r,n);var s,a,o,l;return n.map(function(c){if(c)jM(c)?(s=c[0],a=c[1]):(s=c.time,a=c);else return null;return qM(a)?(o=a.name||a.key||a.note||a.midi||null,l=a):(o=a,l=YM),t.start(o,r+(s||0),l)})},t};function _s(t){throw new Error('Could not dynamically require "'+t+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Ff={exports:{}};(function(t,e){(function(n){t.exports=n()})(function(){return function n(i,r,s){function a(c,u){if(!r[c]){if(!i[c]){var h=typeof _s=="function"&&_s;if(!u&&h)return h(c,!0);if(o)return o(c,!0);var f=new Error("Cannot find module '"+c+"'");throw f.code="MODULE_NOT_FOUND",f}var p=r[c]={exports:{}};i[c][0].call(p.exports,function(g){var _=i[c][1][g];return a(_||g)},p,p.exports,n,i,r,s)}return r[c].exports}for(var o=typeof _s=="function"&&_s,l=0;l<s.length;l++)a(s[l]);return a}({1:[function(n,i,r){Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(s){function a(o){if(this._event=o,this._data=o.data,this.receivedTime=o.receivedTime,this._data&&this._data.length<2){console.warn("Illegal MIDI message of length",this._data.length);return}switch(this._messageCode=o.data[0]&240,this.channel=o.data[0]&15,this._messageCode){case 128:this.messageType="noteoff",this.key=o.data[1]&127,this.velocity=o.data[2]&127;break;case 144:this.messageType="noteon",this.key=o.data[1]&127,this.velocity=o.data[2]&127;break;case 160:this.messageType="keypressure",this.key=o.data[1]&127,this.pressure=o.data[2]&127;break;case 176:this.messageType="controlchange",this.controllerNumber=o.data[1]&127,this.controllerValue=o.data[2]&127,this.controllerNumber===120&&this.controllerValue===0?this.channelModeMessage="allsoundoff":this.controllerNumber===121?this.channelModeMessage="resetallcontrollers":this.controllerNumber===122?this.controllerValue===0?this.channelModeMessage="localcontroloff":this.channelModeMessage="localcontrolon":this.controllerNumber===123&&this.controllerValue===0?this.channelModeMessage="allnotesoff":this.controllerNumber===124&&this.controllerValue===0?this.channelModeMessage="omnimodeoff":this.controllerNumber===125&&this.controllerValue===0?this.channelModeMessage="omnimodeon":this.controllerNumber===126?this.channelModeMessage="monomodeon":this.controllerNumber===127&&(this.channelModeMessage="polymodeon");break;case 192:this.messageType="programchange",this.program=o.data[1];break;case 208:this.messageType="channelpressure",this.pressure=o.data[1]&127;break;case 224:this.messageType="pitchbendchange";var l=o.data[2]&127,c=o.data[1]&127;this.pitchBend=(l<<8)+c;break}}return new a(s)},i.exports=r.default},{}]},{},[1])(1)})})(Ff);var $M=Ff.exports,ZM=$M,JM=function(t){return t.listenToMidi=function(e,n){var i={},r=n||{},s=r.gain||function(a){return a/127};return e.onmidimessage=function(a){var o=a.messageType?a:ZM(a);if(o.messageType==="noteon"&&o.velocity===0&&(o.messageType="noteoff"),!(r.channel&&o.channel!==r.channel))switch(o.messageType){case"noteon":i[o.key]=t.play(o.key,0,{gain:s(o.velocity)});break;case"noteoff":i[o.key]&&(i[o.key].stop(),delete i[o.key]);break}},t},t};(function(t){var e=DM,n=NM,i=WM,r=KM,s=JM;function a(o,l,c){return s(r(i(n(e(o,l,c)))))}t.exports&&(t.exports=a),typeof window<"u"&&(window.SamplePlayer=a)})(Lf);var QM=Lf.exports;function Xc(t,e){return Array(e+1).join(t)}function Go(t){return typeof t=="number"}function eS(t){return typeof t=="string"}function tS(t){return typeof t<"u"}function Of(t,e){return Math.pow(2,(t-69)/12)*(e||440)}var Bf=/^([a-gA-G])(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)\s*$/;function nS(){return Bf}var iS=[0,2,4,5,7,9,11];function In(t,e,n){if(typeof t!="string")return null;var i=Bf.exec(t);if(!i||!e&&i[4])return null;var r={letter:i[1].toUpperCase(),acc:i[2].replace(/x/g,"##")};r.pc=r.letter+r.acc,r.step=(r.letter.charCodeAt(0)+3)%7,r.alt=r.acc[0]==="b"?-r.acc.length:r.acc.length;var s=iS[r.step]+r.alt;return r.chroma=s<0?12+s:s%12,i[3]&&(r.oct=+i[3],r.midi=s+12*(r.oct+1),r.freq=Of(r.midi,n)),e&&(r.tonicOf=i[4]),r}var rS="CDEFGAB";function sS(t){return Go(t)?t<0?Xc("b",-t):Xc("#",t):""}function aS(t){return Go(t)?""+t:""}function kf(t,e,n){return t===null||typeof t>"u"?null:t.step?kf(t.step,t.alt,t.oct):t<0||t>6?null:rS.charAt(t)+sS(e)+aS(n)}function zf(t){if((Go(t)||eS(t))&&t>=0&&t<128)return+t;var e=In(t);return e&&tS(e.midi)?e.midi:null}function oS(t,e){var n=zf(t);return n===null?null:Of(n,e)}function lS(t){return(In(t)||{}).letter}function cS(t){return(In(t)||{}).acc}function uS(t){return(In(t)||{}).pc}function fS(t){return(In(t)||{}).step}function hS(t){return(In(t)||{}).alt}function dS(t){return(In(t)||{}).chroma}function pS(t){return(In(t)||{}).oct}const mS=Object.freeze(Object.defineProperty({__proto__:null,acc:cS,alt:hS,build:kf,chroma:dS,freq:oS,letter:lS,midi:zf,oct:pS,parse:In,pc:uS,regex:nS,step:fS},Symbol.toStringTag,{value:"Module"})),gS=bf(mS);var Wa,jc;function _S(){if(jc)return Wa;jc=1;var t=gS;function e(r,s){if(console.warn("new Soundfont() is deprected"),console.log("Please use Soundfont.instrument() instead of new Soundfont().instrument()"),!(this instanceof e))return new e(r);this.nameToUrl=s||e.nameToUrl,this.ctx=r,this.instruments={},this.promises=[]}e.prototype.onready=function(r){console.warn("deprecated API"),console.log("Please use Promise.all(Soundfont.instrument(), Soundfont.instrument()).then() instead of new Soundfont().onready()"),Promise.all(this.promises).then(r)},e.prototype.instrument=function(r,s){console.warn("new Soundfont().instrument() is deprecated."),console.log("Please use Soundfont.instrument() instead.");var a=this.ctx;if(r=r||"default",r in this.instruments)return this.instruments[r];var o={name:r,play:i(a,s)};if(this.instruments[r]=o,r!=="default"){var l=e.instrument(a,r,s).then(function(c){return o.play=c.play,o});this.promises.push(l),o.onready=function(c){console.warn("onready is deprecated. Use Soundfont.instrument().then()"),l.then(c)}}else o.onready=function(c){console.warn("onready is deprecated. Use Soundfont.instrument().then()"),c()};return o};function n(r,s,a){return console.warn("Soundfont.loadBuffers is deprecate."),console.log("Use Soundfont.instrument(..) and get buffers properties from the result."),e.instrument(r,s,a).then(function(o){return o.buffers})}e.loadBuffers=n;function i(r,s){return s=s||{},function(a,o,l,c){console.warn("The oscillator player is deprecated."),console.log("Starting with version 0.9.0 you will have to wait until the soundfont is loaded to play sounds.");var u=a>0&&a<129?+a:t.midi(a),h=u?t.midiToFreq(u,440):null;if(h){l=l||.2,c=c||{};var f=c.destination||s.destination||r.destination,p=c.vcoType||s.vcoType||"sine",g=c.gain||s.gain||.4,_=r.createOscillator();_.type=p,_.frequency.value=h;var m=r.createGain();return m.gain.value=g,_.connect(m),m.connect(f),_.start(o),l>0&&_.stop(o+l),_}}}return e.noteToMidi=t.midi,Wa=e,Wa}(function(t){var e=MM,n=QM;function i(o,l,c){if(arguments.length===1)return function(g,_){return i(o,g,_)};var u=c||{},h=u.isSoundfontURL||r,f=u.nameToUrl||s,p=h(l)?l:f(l,u.soundfont,u.format);return e(o,p,{only:u.only||u.notes}).then(function(g){var _=n(o,g,u).connect(u.destination?u.destination:o.destination);return _.url=p,_.name=l,_})}function r(o){return/\.js(\?.*)?$/i.test(o)}function s(o,l,c){return c=c==="ogg"?c:"mp3",l=l==="FluidR3_GM"?l:"MusyngKite","https://gleitz.github.io/midi-js-soundfonts/"+l+"/"+o+"-"+c+".js"}var a=_S();a.instrument=i,a.nameToUrl=s,t.exports&&(t.exports=a),typeof window<"u"&&(window.Soundfont=a)})(Cf);var vS=Cf.exports;const xS=Rx(vS),pr=new z;function Vt(t,e,n,i,r,s){const a=2*Math.PI*r/4,o=Math.max(s-2*r,0),l=Math.PI/4;pr.copy(e),pr[i]=0,pr.normalize();const c=.5*a/(a+o),u=1-pr.angleTo(t)/l;return Math.sign(pr[n])===1?u*c:o/(a+o)+c+c*(1-u)}class MS extends sr{constructor(e=1,n=1,i=1,r=2,s=.1){if(r=r*2+1,s=Math.min(e/2,n/2,i/2,s),super(1,1,1,r,r,r),r===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const o=new z,l=new z,c=new z(e,n,i).divideScalar(2).subScalar(s),u=this.attributes.position.array,h=this.attributes.normal.array,f=this.attributes.uv.array,p=u.length/6,g=new z,_=.5/r;for(let m=0,d=0;m<u.length;m+=3,d+=2)switch(o.fromArray(u,m),l.copy(o),l.x-=Math.sign(l.x)*_,l.y-=Math.sign(l.y)*_,l.z-=Math.sign(l.z)*_,l.normalize(),u[m+0]=c.x*Math.sign(o.x)+l.x*s,u[m+1]=c.y*Math.sign(o.y)+l.y*s,u[m+2]=c.z*Math.sign(o.z)+l.z*s,h[m+0]=l.x,h[m+1]=l.y,h[m+2]=l.z,Math.floor(m/p)){case 0:g.set(1,0,0),f[d+0]=Vt(g,l,"z","y",s,i),f[d+1]=1-Vt(g,l,"y","z",s,n);break;case 1:g.set(-1,0,0),f[d+0]=1-Vt(g,l,"z","y",s,i),f[d+1]=1-Vt(g,l,"y","z",s,n);break;case 2:g.set(0,1,0),f[d+0]=1-Vt(g,l,"x","z",s,e),f[d+1]=Vt(g,l,"z","x",s,i);break;case 3:g.set(0,-1,0),f[d+0]=1-Vt(g,l,"x","z",s,e),f[d+1]=1-Vt(g,l,"z","x",s,i);break;case 4:g.set(0,0,1),f[d+0]=1-Vt(g,l,"x","y",s,e),f[d+1]=1-Vt(g,l,"y","x",s,n);break;case 5:g.set(0,0,-1),f[d+0]=Vt(g,l,"x","y",s,e),f[d+1]=1-Vt(g,l,"y","x",s,n);break}}}const SS=(t,e)=>{const n=t.__vccOpts||t;for(const[i,r]of e)n[i]=r;return n},yS={class:"main-bg"},ES=["disabled"],bS={__name:"music-ball",setup(t){const e=Ko(!0);let n=null,i=null,r=null;const s=Ko(null);let a,o,l,c,u,h,f,p=[],g=[],_=[],m=null;Mu(()=>{const I=s.value.clientHeight||window.innerHeight,x=Math.floor(I*.72);s.value.style.width=`${x}px`,d(x,I),M(),setTimeout(()=>{y()},1e3)}),Su(()=>{var I;m&&cancelAnimationFrame(m),(I=a==null?void 0:a.dispose)==null||I.call(a),clearTimeout(h)});function d(I,x){var X;a&&((X=a.dispose)==null||X.call(a),s.value.innerHTML=""),o=new _x,l=new Xt(45,I/x,.1,1e3),l.position.set(0,6,20),l.lookAt(0,0,0),a=new Sf({antialias:!0,alpha:!0}),a.setSize(I,x),a.toneMapping=Zu,a.toneMappingExposure=1.1,a.outputColorSpace=Ne,s.value.appendChild(a.domElement),c=new bx(l,a.domElement),c.enableDamping=!0,c.dampingFactor=.08,c.minDistance=10,c.maxDistance=80,c.target.set(0,0,0),c.update();const b=new yx(16777215,1);b.position.set(0,20,20),o.add(b),o.add(new Ex(16777215,.5)),o.background=P(),_&&o.remove(_),_=new _r,o.add(_);const H=new Ps(.5,64,64),O=[],N=[new Ve(16737996),new Ve(6737151),new Ve(10092390),new Ve(16777062),new Ve(16750950),new Ve(13395711)];for(let ue=0;ue<H.attributes.position.count;ue++){const ae=N[ue%N.length];O.push(ae.r,ae.g,ae.b)}H.setAttribute("color",new Dt(O,3));const V=new ys({vertexColors:!0,metalness:.2,roughness:.2,transparent:!0,opacity:.95,emissive:16777215,emissiveIntensity:2.5});u=new It(H,V),u.position.set(0,7,0),_.add(u);const Y=new Ps(.52,64,64),Q=new Oo({color:6737151,transparent:!0,opacity:.18,side:Ct}),j=new It(Y,Q);u.add(j)}function A(){const I=n.header.tempos;I.length&&I[0].bpm;let x=5,b=1.5,H=5,O=.7,N={time:-10},V=-1;g.forEach((Y,Q)=>{if(Y.time>N.time+1){N=Y,V++;const j=Math.sin(V*O)*H,X=x-V*b,ue=new MS(1,.4,4,6,.18),ae=new xx({color:15790335,metalness:.7,roughness:.18,transmission:.1,thickness:.2,ior:1.2,envMap:o.environment,envMapIntensity:1.1,clearcoat:.7,clearcoatRoughness:.1,reflectivity:.7,sheen:.5,sheenColor:new Ve(10079487),sheenRoughness:.3}),be=new It(ue,ae),he=.09,K=.82,oe=new ys({color:2236962,metalness:.8,roughness:.3}),_e=new It(new Cr(he,he,K,24),oe);_e.position.set(0,-.2,-1.5),be.add(_e);const ve=_e.clone();ve.position.set(0,-.2,-.5),be.add(ve);const U=.06,Le=4,Ce=new ys({color:2236962,metalness:.7,roughness:.4}),me=new It(new Cr(U,U,Le,16),Ce);me.rotation.x=Math.PI/2,me.position.set(0,-.55,-2.5),be.add(me);const we=new It(new Cr(U,U*5,.6,16),Ce);we.rotation.x=Math.PI/2,we.position.set(0,-.55,-4.5),be.add(we),be.position.set(j,X,0),_.add(be),p.push({note:Y,x:j,y:X})}})}function E(I){const x=p[I];if(!x)return;wx();const b={x:Number(u.position.x),y:Number(u.position.y)},H={x:Number(x.x),y:Number(x.y+.7)},O=6,N=p[I-1],V=N?N.note.time:0,Y=(x.note.time-V)*1e3||400;let Q=0;f=new Ax(b).to(H,Y).easing(Zi.Quadratic.Linear).onUpdate(function(j){Q=(j.y-b.y)/(H.y-b.y),u.position.x=j.x,u.position.y=j.y+Math.sin(Math.PI*Q)*O*(1-Q),_.position.y=Math.max(0,4-u.position.y)}).onComplete(()=>{u.position.x=H.x,u.position.y=H.y,_.position.y=Math.max(0,4-u.position.y),setTimeout(()=>{E(I+1)},0)}).start()}function M(){c&&c.update(),f&&f.update(),a.render(o,l),m=requestAnimationFrame(M)}async function y(I){e.value=!0;let x;x=await(await fetch("/如果声音不记得.mid")).arrayBuffer(),n=new Tf.Midi(x),console.log("MIDI数据:",n),r||(r=new(window.AudioContext||window.webkitAudioContext)),i=await xS.instrument(r,"acoustic_grand_piano"),n.tracks.forEach(H=>g.push(...H.notes));const b=g[0].time;g.forEach(H=>H.time-=b),A(),e.value=!1,M()}async function L(){if(!n||!i||(r.state==="suspended"&&await r.resume(),i.stop&&i.stop(),clearTimeout(h),g.length===0))return;const I=r.currentTime;let x,b=[...g];E(0);function H(){const O=b.shift();if(O)if(O.ticks===x)x=O.ticks,i.play(O.name,I+O.time,{gain:O.velocity,duration:O.duration}),H();else{const N=Math.max(0,I+O.time-r.currentTime);x=O.ticks,h=setTimeout(()=>{i.play(O.name,r.currentTime,{gain:O.velocity,duration:O.duration}),H()},N*1e3)}}H()}function P(){const b=document.createElement("canvas");b.width=b.height=512;const H=b.getContext("2d");H.fillStyle="#222a38",H.fillRect(0,0,512,512),H.strokeStyle="#444",H.lineWidth=2;for(let O=0;O<=512;O+=128)H.beginPath(),H.moveTo(O,0),H.lineTo(O,512),H.stroke();for(let O=0;O<=512;O+=128)H.beginPath(),H.moveTo(0,O),H.lineTo(512,O),H.stroke();return new vx(b)}return(I,x)=>(zu(),Ld("div",yS,[ws("button",{style:{position:"absolute",top:"20px",right:"20px"},disabled:e.value,onClick:L},"播放钢琴音色",8,ES),ws("div",{ref_key:"threeContainer",ref:s,style:{height:"100%",margin:"0 auto"}},null,512)]))}},TS=SS(bS,[["__scopeId","data-v-489bb2c4"]]),AS=Vh({__name:"App",setup(t){return(e,n)=>(zu(),Id(TS))}});mp(AS).mount("#app");
