import{_ as $}from"./ContentRendererMarkdown.vue.XDbrb_4W.js";import b from"./ContentRenderer.K-QiXWYY.js";import{_ as C}from"./nuxt-link.h5VkpOs1.js";import{d as q,q as B,C as L,D as c,a3 as D,b as s,c as l,e,g as p,w as _,H as o,F as N,Y as R,G as A,t as u,K as F}from"./entry.BsiClImA.js";import{u as m}from"./asyncData.H2y3Fk5r.js";import{w as d}from"./path.wzibaITk.js";import{q as f}from"./query.5qNUt8e0.js";import"./index.1dSrIji7.js";import"./preview._sL6yskM.js";const P={class:"relative mb-10"},S={class:"absolute bottom-0 left-1/2 flex translate-x--1/2"},V={class:"min-h-65px min-w-300px flex flex-col cursor-pointer items-center justify-center rounded-t-40px bg-gray-400 group-[.router-link-active]:bg-white"},j={class:"line-clamp-1 text-20px/22px font-700 group-[.router-link-active]:text-primary"},E={class:"line-clamp-1 font-500 group-[.router-link-active]:text-secondary"},U=q({__name:"pricing",async setup(G){let t,a;const x=B(),r=L(()=>x.params.slug),{data:i}=([t,a]=c(()=>m(`${d("pricing")}_${r.value}`,()=>f("pricing").findOne())),t=await t,a(),t),{data:g}=([t,a]=c(()=>m(`${d("pricings")}_${r.value}`,()=>f("pricing").where({_dir:{$eq:"pricing"}}).find())),t=await t,a(),t),h=D();return(v,H)=>{const w=$,y=b,k=C;return s(),l("main",null,[e("div",P,[p(y,{value:o(i)},{default:_(()=>[p(w,{value:o(i)},null,8,["value"])]),_:1},8,["value"]),e("div",S,[(s(!0),l(N,null,R(o(g),n=>(s(),A(k,{key:n._path,to:o(h)(n._path),class:"group min-h-68px min-w-300px flex items-end rounded-t-40px text-white","exact-active-class":"bg-primary"},{default:_(()=>[e("div",V,[e("div",j,u(n.title),1),e("div",E,u(n.description),1)])]),_:2},1032,["to"]))),128))])]),F(v.$slots,"default")])}}});export{U as default};