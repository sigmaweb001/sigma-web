import{_ as u,a as l}from"./BlogItem.vue.nqD8YhT6.js";import{u as f}from"./asyncData.i3G7JYJo.js";import{q as d}from"./query.DEjPAfH3.js";import{d as y,U as h,V as w,W as C,H as o,b as s,N as r,w as k,f as x}from"./entry.-3932MIp.js";import"./nuxt-img.jEQ_KP4H.js";import"./vue.f36acd1f.wgRbqQJ9.js";import"./Icon.G_6T3XIK.js";import"./index.lSDm5iYo.js";import"./_plugin-vue_export-helper.x3n3nnut.js";import"./nuxt-link.8JwxSQ6L.js";import"./SButton.vue.nCxRjZCe.js";import"./preview.G-7XCzC1.js";const M=y({__name:"ResourceItem",props:{path:{}},async setup(a){let e,m;const p=a,{path:n}=h(p),{data:t}=([e,m]=w(()=>f(`section-resource-item:${n.value}`,()=>d("resources").where({_path:{$eq:n.value}}).findOne())),e=await e,m(),e);return(I,R)=>{const i=u,c=l,_=C("swiper-slide");return o(t)?(s(),r(_,{key:0},{default:k(()=>[o(t).type==="resource"?(s(),r(i,{key:0,item:o(t)},null,8,["item"])):(s(),r(c,{key:1,item:o(t)},null,8,["item"]))]),_:1})):x("",!0)}}});export{M as default};