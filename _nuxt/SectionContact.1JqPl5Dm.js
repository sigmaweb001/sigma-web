import{I as G,_ as K}from"./Icon.L0BExV8q.js";import{_ as Q}from"./SButton.vue.S3fGZo2l.js";import{_ as W}from"./nuxt-link.X36hukFS.js";import{d as T,r as A,b as v,c as k,e as s,g as e,w as t,I as o,a8 as Y,a2 as ee,a9 as te,X as ae,aa as se,A as D,t as n,j as i,f as P,L as _,F as oe,J as le,S as ne,p as ce,i as re}from"./entry.tLcJ_JAy.js";import{t as ie,o as de,s as h,p as ue,Z as j,N as fe,u as me,g as pe,a as _e,b as he,F as f,e as xe,_ as ge,i as be,d as ye,f as ve,h as ke,c as we,j as $e}from"./examples.mobile.json.6MpABjk5.js";import{r as F}from"./slot.DBj9_sob.js";import{_ as Se}from"./_plugin-vue_export-helper.x3n3nnut.js";import"./index.0wqzsba0.js";import"./index.rROq2MS7.js";import"./index.HX-bN_um.js";import"./node.uMQX-T_c.js";const Ce={class:"flex flex-col gap-2.5"},Ie={class:"flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-neutral-100"},Ne=T({__name:"SCheckbox",props:{checked:{type:Boolean}},emits:["update:checked"],setup(w,{emit:c}){const $=A(!1),d=c;return(q,x)=>(v(),k("div",Ce,[s("label",Ie,[e(o(te),{checked:o($),"onUpdate:checked":[x[0]||(x[0]=g=>ee($)?$.value=g:null),x[1]||(x[1]=g=>d("update:checked",g))],class:"peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground'"},{default:t(()=>[e(o(Y),{class:"bg-primary h-full w-full rounded flex items-center justify-center"},{default:t(()=>[e(o(G),{icon:"radix-icons:check",class:"h-3.5 w-3.5 text-grass11"})]),_:1})]),_:1},8,["checked"])])]))}}),Me=""+globalThis.__publicAssetsURL("image_78.png"),M=w=>(ce("data-v-6df5276d"),w=w(),re(),w),Re={key:0,class:"m-auto flex flex-col items-center justify-center gap-3 pb-20 pt-20 container"},Ve={class:"flex items-center gap-2"},Fe={class:"text-center text-2xl font-semibold"},Le=M(()=>s("img",{src:Me,alt:"logo",class:"mr-8px h-263px w-263px"},null,-1)),qe={class:"text-base font-500"},De={key:1,class:"flex justify-items-center pb-20 pt-10 container"},Pe={class:"hidden max-w-xl w-full rounded-sm bg-primary/20 px-8 py-10",lg:"block"},je={key:0,class:"text-center text-4xl text-gray-800 font-bold leading-snug tracking-tight",lg:"text-4xl leading-tight",xl:"text-4xl leading-tight",dark:"text-black"},Te={key:1,class:"text-base text-gray-500 dark:text-gray-300"},Ae={class:"flex flex-col gap-1 pt-2"},Ee={class:"relative min-h-370px w-full flex items-center justify-center"},Oe={class:"w-full"},Be={class:"text-center text-2xl font-semibold"},Ue=M(()=>s("span",{class:"text-red-500"},"*",-1)),Ze={class:"w-full"},He=M(()=>s("span",{class:"text-red-500"},"*",-1)),Je={class:"w-full"},Xe=M(()=>s("span",{class:"text-red-500"},"*",-1)),ze={class:"w-full"},Ge=M(()=>s("span",{class:"text-red-500"},"*",-1)),Ke={class:"w-full"},Qe={class:"flex items-center gap-2"},We={class:"w-full"},Ye={class:"w-full"},et={class:"w-full"},tt=T({__name:"SectionContact",setup(w){const{t:c}=ae(),$=ie(de({title:h(),name:h({required_error:c("contact.required")}).min(1,{message:c("contact.required")}).max(50,{message:c("contact.max-50-characters")}),email:h({required_error:c("contact.required")}).email(),countryCode:h(),company:h().max(50,{message:c("contact.max-50-characters")}).optional(),note:h().max(300,{message:c("contact.max-300-characters")}).optional(),phone:h({required_error:c("contact.required")}).superRefine((a,p)=>{const b=ue(a||"",d.values.countryCode||"VN");if(!/^\d+$/.test(a))return p.addIssue({code:j.custom,message:c("contact.invalid-phone-number"),fatal:!0}),fe;(!b||!b.isValid())&&p.addIssue({code:j.custom,message:c("contact.invalid-phone-number-for-the-selected-country")})})})),d=me({validationSchema:$,initialValues:{countryCode:"VN",title:"Mr.",productRequests:[],note:"",company:""}}),{recaptchaLoaded:q,executeRecaptcha:x}=se(),g=A(!1);async function E(){return await q(),await x("contact_us")}const L=d.handleSubmit(async a=>{console.log("Form submitted!",a),await $fetch("https://dev-streaming.gviet.vn:8783/auth-service/v1/contact-us",{method:"POST",body:{...d.values},headers:{Recaptcha:await E()}}),g.value=!0}),O=[{value:"Mr.",label:"Mr."},{value:"Mrs.",label:"Mrs."},{value:"Miss",label:"Miss"},{value:"Ms.",label:"Ms."},{value:"Prof.",label:"Prof."}],B=[{id:"Dynamic Ads Insert (DAI)",label:"Dynamic Ads Insert (DAI)"},{id:"Linear Right Management (LRM)",label:"Linear Right Management (LRM)"},{id:"Media Video On Demand (Media VOD)",label:"Media Video On Demand (Media VOD)"},{id:"Media Live",label:"Media Live"},{id:"Interactive",label:"Interactive"},{id:"Livestream",label:"Livestream"},{id:"Playout (Fast Channel)",label:"Playout (Fast Channel)"}],U=pe().map(a=>{function p(C){try{return new Intl.DisplayNames(["en"],{type:"region"}).of(C)}catch(I){return console.error("Error retrieving country name:",I),null}}function b(C){const r=C.toUpperCase().split("").map(R=>R.charCodeAt()+127397).join("-");return String.fromCodePoint(...r.split("-"))}const S=`${b(a)} ${p(a)}`;return{value:a,label:S}}),Z=D(()=>_e(d.values.countryCode||"VN")),H=D(()=>{var a;return(a=he(d.values.countryCode||"VN",xe))==null?void 0:a.formatNational().slice(1)});return(a,p)=>{const b=K,S=Q,C=W,I=ne,r=ge,R=be,m=ye,y=ve,u=ke,V=we,J=Ne,X=$e;return o(g)?(v(),k("div",Re,[s("div",Ve,[e(b,{name:"i-carbon:checkmark-filled",class:"h-10 w-10 flex-center flex-shrink-0 rounded-full bg-primary/20 p-2 text-primary"}),s("h2",Fe,n(a.$t("contact.success")),1)]),Le,s("div",qe,n(a.$t("contact.thanks")),1),e(C,{to:"/"},{default:t(()=>[e(S,{class:"flex-shrink-0",variant:"gradient"},{default:t(()=>[i(n(a.$t("contact.go-to-home")),1)]),_:1})]),_:1})])):(v(),k("div",De,[s("div",Pe,[a.$slots.title?(v(),k("h1",je,[F(a.$slots,"title",{unwrap:"p"},void 0,!0)])):P("",!0),a.$slots.subtitle?(v(),k("p",Te,[F(a.$slots,"subtitle",{unwrap:"p"},void 0,!0)])):P("",!0),s("div",Ae,[F(a.$slots,"default",{unwrap:"ul"},void 0,!0)]),s("div",Ee,[e(I,{class:"absolute inset-0 h-full w-full object-scale-down"},{default:t(()=>[F(a.$slots,"image",{unwrap:"p"},void 0,!0)]),_:3})])]),s("div",Oe,[s("h2",Be,n(a.$t("contact.form_title")),1),s("form",{class:"custom-form w-full py-10 pl-20 space-y-2 xl:space-y-6",onSubmit:p[0]||(p[0]=(...l)=>o(L)&&o(L)(...l))},[e(o(f),{name:"title"},{default:t(({componentField:l})=>[e(u,{class:"flex flex-col gap-2 xl:flex-row"},{default:t(()=>[e(r,null,{default:t(()=>[i(n(a.$t("contact.title"))+" ",1),Ue]),_:1}),s("div",Ze,[e(m,null,{default:t(()=>[e(R,_(l,{options:O,"default-value":o(d).values.title}),null,16,["default-value"])]),_:2},1024),e(y)])]),_:2},1024)]),_:1}),e(o(f),{name:"name"},{default:t(({componentField:l})=>[e(u,{class:"flex flex-col gap-2 xl:flex-row"},{default:t(()=>[e(r,null,{default:t(()=>[i(n(a.$t("contact.name"))+" ",1),He]),_:1}),s("div",Je,[e(m,null,{default:t(()=>[e(V,_({type:"text",placeholder:""},l),null,16)]),_:2},1024),e(y)])]),_:2},1024)]),_:1}),e(o(f),{name:"email"},{default:t(({componentField:l})=>[e(u,{class:"flex flex-col gap-2 xl:flex-row"},{default:t(()=>[e(r,null,{default:t(()=>[i("Email "),Xe]),_:1}),s("div",ze,[e(m,null,{default:t(()=>[e(V,_({type:"text",placeholder:""},l),null,16)]),_:2},1024),e(y)])]),_:2},1024)]),_:1}),e(o(f),{name:"phone"},{default:t(({componentField:l})=>[e(u,{class:"flex flex-col gap-2 xl:flex-row"},{default:t(()=>[e(r,null,{default:t(()=>[i(n(a.$t("cart.phone_number"))+" ",1),Ge]),_:1}),s("div",Ke,[s("div",Qe,[e(o(f),{name:"countryCode"},{default:t(({componentField:N})=>[e(u,null,{default:t(()=>[e(m,null,{default:t(()=>[e(R,_(N,{"default-value":o(d).values.countryCode,options:o(U),class:"w-150px!"}),null,16,["default-value","options"])]),_:2},1024)]),_:2},1024)]),_:2},1024),e(m,null,{default:t(()=>[e(V,_({type:"text",placeholder:`(+ ${o(Z)}) ${o(H)}`},l),null,16,["placeholder"])]),_:2},1024)]),e(y)])]),_:2},1024)]),_:1}),e(o(f),{name:"company"},{default:t(({componentField:l})=>[e(u,{class:"flex flex-col gap-2 xl:flex-row"},{default:t(()=>[e(r,null,{default:t(()=>[i(n(a.$t("cart.company")),1)]),_:1}),s("div",We,[e(m,null,{default:t(()=>[e(V,_({type:"text",placeholder:""},l),null,16)]),_:2},1024),e(y)])]),_:2},1024)]),_:1}),e(o(f),{name:"items1"},{default:t(()=>[e(u,{class:"flex flex-col gap-2 xl:flex-row"},{default:t(()=>[e(r,null,{default:t(()=>[i(n(a.$t("contact.product_request")),1)]),_:1}),s("div",Ye,[(v(),k(oe,null,le(B,l=>e(o(f),{key:l.id,type:"checkbox",value:l.id,"unchecked-value":!1,name:"productRequests"},{default:t(({value:N,handleChange:z})=>[e(u,{class:"flex items-center space-x-3 space-y-1"},{default:t(()=>[e(m,null,{default:t(()=>[e(J,{checked:N==null?void 0:N.includes(l.id),"onUpdate:checked":z},null,8,["checked","onUpdate:checked"])]),_:2},1024),e(r,{class:"text-sm! font-normal!"},{default:t(()=>[i(n(l.label),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["value"])),64))])]),_:1})]),_:1}),e(o(f),{name:"note"},{default:t(({componentField:l})=>[e(u,{class:"flex flex-col gap-2 xl:flex-row"},{default:t(()=>[e(r,null,{default:t(()=>[i(n(a.$t("contact.additional-information")),1)]),_:1}),s("div",et,[e(m,null,{default:t(()=>[e(X,_({placeholder:""},l),null,16)]),_:2},1024),e(y)])]),_:2},1024)]),_:1}),e(S,{class:"float-right flex-shrink-0",variant:"gradient",type:"submit",onClick:o(L)},{default:t(()=>[i(n(a.$t("contact.submit")),1)]),_:1},8,["onClick"])],32)])]))}}}),mt=Se(tt,[["__scopeId","data-v-6df5276d"]]);export{mt as default};