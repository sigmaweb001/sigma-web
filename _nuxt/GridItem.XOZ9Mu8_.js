import{_ as n}from"./ListItem.vue.J-7QPQNU.js";import{r as i}from"./slot.xfM5__MR.js";import{d as l,b as t,c as r,B as p,Y as m,w as s,W as o,n as d,X as c}from"./entry.C0mgx__r.js";import"./index.YUmDdg6W.js";import"./Icon.0ImcKJOM.js";import"./index.lSDm5iYo.js";import"./_plugin-vue_export-helper.x3n3nnut.js";import"./node.uMQX-T_c.js";const S=l({__name:"GridItem",props:{span:{},icon:{},center:{type:Boolean},padding:{}},setup(f){return(e,u)=>{const a=n;return t(),r("div",{class:d(["col-span-[var(--span)] p-[var(--padding)] [&>img]:w-full",[e.center?"flex flex-col justify-center":""]]),style:c({"--span":e.span??1,"--padding":e.padding?e.padding+"px":"0px"})},[e.$slots.title||e.$slots.subtitle?(t(),p(a,{key:0,icon:e.icon},m({title:s(()=>[o(e.$slots,"title")]),subtitle:s(()=>[o(e.$slots,"subtitle")]),_:2},[e.$slots.image?{name:"image",fn:s(()=>[o(e.$slots,"image")]),key:"0"}:void 0]),1032,["icon"])):i(e.$slots,"default",{key:1,unwrap:"p"})],6)}}});export{S as default};