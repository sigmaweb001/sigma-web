import{r}from"./slot.ZQ_cGC0i.js";import{d as o,b as e,c as s,f as l,O as a,n}from"./entry.lmAwhj46.js";const i={key:0,class:"text-lg font-bold tracking-wider uppercase text-primary"},p={key:1,class:"mt-3 max-w-2xl text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight dark:text-white"},d={key:2,class:"max-w-2xl py-2 text-start text-lg prose prose-trueGray dark:prose-invert lg:text-xl xl:text-xl"},f=o({__name:"SectionTitle",props:{left:{type:Boolean}},setup(c){return(t,m)=>(e(),s("div",{class:n(["",`container flex w-full flex-col my-10 ${t.left?"":"items-center justify-center text-center"}`])},[t.$slots.subtitle?(e(),s("div",i,[r(t.$slots,"subtitle",{unwrap:"p"})])):l("",!0),t.$slots.title?(e(),s("h2",p,[r(t.$slots,"title",{unwrap:"p"})])):l("",!0),t.$slots.default?(e(),s("div",d,[a(t.$slots,"default")])):l("",!0)],2))}});export{f as _};