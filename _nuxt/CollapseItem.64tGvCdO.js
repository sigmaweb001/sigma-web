import{_ as h}from"./Icon.5c6pRSfx.js";import{Q as b,Z as w,J as v,X as S}from"./index.e71SEy22.js";import{d as r,b as l,N as c,w as t,H as a,J as i,O as _,g as n,e as $}from"./entry.ZG-WnY4g.js";import{r as u}from"./slot.n8yjzes9.js";import{r as g}from"./index.06UhkRXg.js";import"./index.lSDm5iYo.js";import"./_plugin-vue_export-helper.x3n3nnut.js";import"./node.uMQX-T_c.js";const y=r({__name:"SAccordionTrigger",props:{asChild:{type:Boolean},as:{},class:{}},setup(s){const o=s;return(e,p)=>{const d=h;return l(),c(a(w),{class:"flex",as:"div"},{default:t(()=>[n(a(b),i(o,{class:"flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180"}),{default:t(()=>[_(e.$slots,"default"),n(d,{name:"ri:arrow-down-s-line",class:"h-4 w-4 shrink-0 transition-transform duration-200"})]),_:3},16)]),_:3})}}}),C={class:"pb-4 pt-0"},B=r({__name:"SAccordionContent",props:{asChild:{type:Boolean},as:{}},setup(s){const o=s;return(e,p)=>(l(),c(a(v),i(o,{class:"overflow-hidden text-sm transition-all data-[state=closed]:accordion-up data-[state=open]:accordion-down"}),{default:t(()=>[$("div",C,[_(e.$slots,"default")])]),_:3},16))}}),x=r({__name:"SAccordionItem",props:{disabled:{type:Boolean},value:{},asChild:{type:Boolean},as:{}},setup(s){const o=s;return(e,p)=>(l(),c(a(S),i(o,{class:"border-b border-b-gray-200 dark:border-b-trueGray-700"}),{default:t(()=>[_(e.$slots,"default")]),_:3},16))}}),X=r({__name:"CollapseItem",setup(s){const o=g();return(e,p)=>{const d=y,m=B,f=x;return l(),c(f,{value:a(o)},{default:t(()=>[n(d,null,{default:t(()=>[u(e.$slots,"title",{unwrap:"p"})]),_:3}),n(m,null,{default:t(()=>[u(e.$slots,"subtitle",{unwrap:"p"})]),_:3})]),_:3},8,["value"])}}});export{X as default};