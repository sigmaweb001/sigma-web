import{_,a as u}from"./BlogItem.vue.9JtO13xb.js";import{u as l}from"./asyncData.xuKJA3Lm.js";import{q as f}from"./query._iEI2LAz.js";import{d,V as y,W as h,H as o,b as r,c as k,N as a,f as C}from"./entry.6ORokzRa.js";import"./Icon.jp0njYRb.js";import"./index.lSDm5iYo.js";import"./_plugin-vue_export-helper.x3n3nnut.js";import"./nuxt-link.6i7OTBxV.js";import"./SButton.vue.m0i4LFbP.js";import"./index.06UhkRXg.js";import"./nuxt-img.l-xU6KNz.js";import"./vue.f36acd1f.T8dhTByd.js";import"./preview.l-SCh06k.js";const w={key:0},H=d({__name:"ResourceItem",props:{path:{}},async setup(n){let e,s;const c=n,{path:m}=y(c),{data:t}=([e,s]=h(()=>l(`section-resource-item:${m.value}`,()=>f("resources").where({_path:{$eq:m.value}}).findOne())),e=await e,s(),e);return(B,I)=>{const i=_,p=u;return o(t)?(r(),k("swiper-slide",w,[o(t).type==="resource"?(r(),a(i,{key:0,item:o(t)},null,8,["item"])):(r(),a(p,{key:1,item:o(t)},null,8,["item"]))])):C("",!0)}}});export{H as default};