import{m as N,t as $,a as _,b as S,n as F,i as T,c as W,d as I,e as B,f as J}from"./index.4CWXFDyB.js";import{an as U,r as p,af as y,ai as j,D as A,ao as D,ae as K,d as z,o as k}from"./entry.7UFg5FRN.js";function te(e={}){const{inheritAttrs:t=!0}=e,n=U(),s=z({setup(o,{slots:r}){return()=>{n.value=r.default}}}),f=z({inheritAttrs:t,setup(o,{attrs:r,slots:c}){return()=>{var v;n.value;const d=(v=n.value)==null?void 0:v.call(n,{...q(r),$slots:c});return t&&(d==null?void 0:d.length)===1?d[0]:d}}});return N({define:s,reuse:f},[s,f])}function q(e){const t={};for(const n in e)t[I(n)]=e[n];return t}function g(e){var t;const n=S(e);return(t=n==null?void 0:n.$el)!=null?t:n}const M=B?window:void 0,G=B?window.document:void 0;function V(...e){let t,n,s,f;if(typeof e[0]=="string"||Array.isArray(e[0])?([n,s,f]=e,t=M):[t,n,s,f]=e,!t)return F;Array.isArray(n)||(n=[n]),Array.isArray(s)||(s=[s]);const o=[],r=()=>{o.forEach(a=>a()),o.length=0},c=(a,i,u,l)=>(a.addEventListener(i,u,l),()=>a.removeEventListener(i,u,l)),v=y(()=>[g(t),S(f)],([a,i])=>{if(r(),!a)return;const u=T(i)?{...i}:i;o.push(...n.flatMap(l=>s.map(m=>c(a,l,m,u))))},{immediate:!0,flush:"post"}),d=()=>{v(),r()};return _(d),d}function H(){const e=p(!1),t=D();return t&&k(()=>{e.value=!0},t),e}function L(e){const t=H();return A(()=>(t.value,!!e()))}function P(e){return JSON.parse(JSON.stringify(e))}function Q(e,t,n={}){const{window:s=M,...f}=n;let o;const r=L(()=>s&&"MutationObserver"in s),c=()=>{o&&(o.disconnect(),o=void 0)},v=A(()=>{const u=S(e),l=(Array.isArray(u)?u:[u]).map(g).filter(W);return new Set(l)}),d=y(()=>v.value,u=>{c(),r.value&&s&&u.size&&(o=new MutationObserver(t),u.forEach(l=>o.observe(l,f)))},{immediate:!0,flush:"post"}),a=()=>o==null?void 0:o.takeRecords(),i=()=>{c(),d()};return _(i),{isSupported:r,stop:i,takeRecords:a}}function X(e,t,n={}){const{window:s=M,...f}=n;let o;const r=L(()=>s&&"ResizeObserver"in s),c=()=>{o&&(o.disconnect(),o=void 0)},v=A(()=>Array.isArray(e)?e.map(i=>g(i)):[g(e)]),d=y(v,i=>{if(c(),r.value&&s){o=new ResizeObserver(t);for(const u of i)u&&o.observe(u,f)}},{immediate:!0,flush:"post"}),a=()=>{c(),d()};return _(a),{isSupported:r,stop:a}}function ne(e,t={}){const{reset:n=!0,windowResize:s=!0,windowScroll:f=!0,immediate:o=!0}=t,r=p(0),c=p(0),v=p(0),d=p(0),a=p(0),i=p(0),u=p(0),l=p(0);function m(){const b=g(e);if(!b){n&&(r.value=0,c.value=0,v.value=0,d.value=0,a.value=0,i.value=0,u.value=0,l.value=0);return}const h=b.getBoundingClientRect();r.value=h.height,c.value=h.bottom,v.value=h.left,d.value=h.right,a.value=h.top,i.value=h.width,u.value=h.x,l.value=h.y}return X(e,m),y(()=>g(e),b=>!b&&m()),Q(e,m,{attributeFilter:["style","class"]}),f&&V("scroll",m,{capture:!0,passive:!0}),s&&V("resize",m,{passive:!0}),$(()=>{o&&m()}),{height:r,bottom:c,left:v,right:d,top:a,width:i,x:u,y:l,update:m}}let Y=0;function se(e,t={}){const n=p(!1),{document:s=G,immediate:f=!0,manual:o=!1,id:r=`vueuse_styletag_${++Y}`}=t,c=p(e);let v=()=>{};const d=()=>{if(!s)return;const i=s.getElementById(r)||s.createElement("style");i.isConnected||(i.id=r,t.media&&(i.media=t.media),s.head.appendChild(i)),!n.value&&(v=y(c,u=>{i.textContent=u},{immediate:!0}),n.value=!0)},a=()=>{!s||!n.value||(v(),s.head.removeChild(s.getElementById(r)),n.value=!1)};return f&&!o&&$(d),o||_(a),{id:r,css:c,unload:a,load:d,isLoaded:j(n)}}function oe(e,t,n,s={}){var f,o,r;const{clone:c=!1,passive:v=!1,eventName:d,deep:a=!1,defaultValue:i,shouldEmit:u}=s,l=D(),m=n||(l==null?void 0:l.emit)||((f=l==null?void 0:l.$emit)==null?void 0:f.bind(l))||((r=(o=l==null?void 0:l.proxy)==null?void 0:o.$emit)==null?void 0:r.bind(l==null?void 0:l.proxy));let b=d;t||(t="modelValue"),b=b||`update:${t.toString()}`;const h=w=>c?typeof c=="function"?c(w):P(w):w,R=()=>J(e[t])?h(e[t]):i,x=w=>{u?u(w)&&m(b,w):m(b,w)};if(v){const w=R(),C=p(w);let O=!1;return y(()=>e[t],E=>{O||(O=!0,C.value=h(E),K(()=>O=!1))}),y(C,E=>{!O&&(E!==e[t]||a)&&x(E)},{deep:a}),C}else return A({get(){return R()},set(w){x(w)}})}export{ne as a,se as b,te as c,oe as u};