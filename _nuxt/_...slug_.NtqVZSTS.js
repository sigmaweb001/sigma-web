import l from"./ContentDoc.bvCabGcj.js";import{d as p,q as u,A as n,B as _,C as f,b as d,D as g}from"./entry.2yBlpt47.js";import{u as k}from"./asyncData.1BE2qgmC.js";import{q as y}from"./query.9XHLu1Rf.js";import{s as h}from"./index.rHpsdH-m.js";import"./vue.f36acd1f.Aag029lj.js";import"./ContentRenderer.r24moT2T.js";import"./ContentRendererMarkdown.vue.C5TAN5Nm.js";import"./index.1dSrIji7.js";import"./preview.sIIsn55H.js";import"./ContentQuery.4mTj3_ul.js";const j=p({__name:"[...slug]",async setup(C){let t,s;const a=u(),e=n(()=>`/legal/${a.params.slug}`),{data:r}=([t,s]=_(()=>k(`legal-content-item${e.value}`,()=>y("legal").where({_path:{$eq:e.value}}).findOne(),{watch:[e]})),t=await t,s(),t),c=n(()=>{var o;return(o=r.value)==null?void 0:o.body.toc.links}),m=f();return h(c,m,{direction:"ltr"}),(o,q)=>{const i=l;return d(),g(i)}}});export{j as default};