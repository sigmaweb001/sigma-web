import{_ as u,a as l}from"./BlogItem.vue.3HvCnkXO.js";import{u as f}from"./asyncData.lBZ6jSXt.js";import{q as d}from"./query.2Gk5E2Q2.js";import{d as y,V as h,W as w,X as C,H as o,b as s,N as r,w as k,f as x}from"./entry.7XWDIvWt.js";import"./nuxt-img.XwCR1Ypd.js";import"./vue.f36acd1f.paRXKlzz.js";import"./Icon._mjqqVoI.js";import"./index.lSDm5iYo.js";import"./_plugin-vue_export-helper.x3n3nnut.js";import"./nuxt-link.ETsZpiLe.js";import"./SButton.vue.S6zrHS6q.js";import"./preview.z2lkKx-g.js";const M=y({__name:"ResourceItem",props:{path:{}},async setup(a){let e,m;const p=a,{path:n}=h(p),{data:t}=([e,m]=w(()=>f(`section-resource-item:${n.value}`,()=>d("resources").where({_path:{$eq:n.value}}).findOne())),e=await e,m(),e);return(I,R)=>{const i=u,c=l,_=C("swiper-slide");return o(t)?(s(),r(_,{key:0},{default:k(()=>[o(t).type==="resource"?(s(),r(i,{key:0,item:o(t)},null,8,["item"])):(s(),r(c,{key:1,item:o(t)},null,8,["item"]))]),_:1})):x("",!0)}}});export{M as default};