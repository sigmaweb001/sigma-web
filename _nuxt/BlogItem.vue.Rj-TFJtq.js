import{_ as b}from"./nuxt-img.pjkeRzaL.js";import k from"./Icon.Louxv7th.js";import{_ as v}from"./nuxt-link.65mLmRdh.js";import{_ as C}from"./SButton.vue.AdDX_hvh.js";import{d as y,V as w,b as o,c as n,e as s,H as t,N as $,g as r,w as u,t as i,f as g,s as z,C as N,n as I}from"./entry.EzqPzMeJ.js";const B={class:"group flex flex-col gap-2 bg-gray-100/75 dark:bg-gray-900/75"},j={class:"relative aspect-16/9 of-hidden block rounded-md hover:scale-105 transition-all duration-300"},R={key:1,class:"flex-center size-full inset-0 absolute"},S={class:"px-3 mt-2"},V={class:"flex justify-between"},A={class:"line-clamp-2 transition-[background_size] cursor-default bg-[length:0px_10px] from-primary-300 to-primary-200 bg-gradient-to-r bg-left-bottom bg-no-repeat duration-500 hover:bg-[length:100%_10px] hover:bg-[length:100%_3px] dark:from-primary-600 dark:to-primary-700"},L=["download","href"],M={key:0},Y=y({__name:"ResourceItemImp",props:{item:{}},setup(d){const m=d,{item:e}=w(m);return(h,a)=>{var _;const l=b,f=k,c=v,p=C;return o(),n("div",B,[s("div",j,[(_=t(e))!=null&&_.thumbnail?(o(),$(l,{key:0,src:t(e).thumbnail,class:"absolute size-full inset-0 object-cover"},null,8,["src"])):(o(),n("div",R,[r(f,{name:t(e).icon??"i-ri:image-fill",class:"w-50% h-50% text-primary/75"},null,8,["name"])]))]),s("div",S,[s("div",V,[r(c,{to:t(e).media,external:"",target:"_blank",class:"flex-1 mt-2 dark:text-white text-lg font-semibold leading-snug tracking-tight"},{default:u(()=>[s("span",A,i(t(e).title),1)]),_:1},8,["to"]),r(p,{class:"flex-shrink-0",variant:"outline",size:"icon"},{default:u(()=>[s("a",{class:"i-ri:download-line text-14px",download:t(e).media,href:`${t(e).media}`},null,8,L)]),_:1})]),t(e).description?(o(),n("p",M,i(t(e).description),1)):g("",!0)])])}}}),O={class:"group bg-gray-100/75 dark:bg-gray-900/75"},D={class:"overflow-hidden relative aspect-16/9 block rounded-md transition-all duration-300 hover:scale-105 dark:bg-gray-800"},E={key:1,class:"flex-center size-full inset-0 absolute"},H={class:"p-2"},q={class:"transition-[background-size] cursor-default bg-[length:0px_10px] from-primary-300 to-primary-200 bg-gradient-to-r bg-left-bottom bg-no-repeat duration-500 hover:bg-[length:100%_10px] hover:bg-[length:100%_3px] dark:from-primary-600 dark:to-primary-700"},F={class:"mb-2 mt-3 flex items-center text-gray-500 space-x-3 dark:text-gray-400"},G={key:0,class:"flex items-center gap-3"},J={class:"relative h-32px w-32px flex-shrink-0"},K={class:"truncate text-sm"},P={key:0,class:"text-xs my-0"},Z=y({__name:"BlogItem",props:{item:{}},setup(d){const m=d,{item:e}=w(m),h=z(),a=N(()=>h.authors.find(l=>l.slug===e.value.author));return(l,f)=>{var x;const c=b,p=k,_=v;return o(),n("div",O,[s("div",D,[(x=t(e))!=null&&x.thumbnail?(o(),$(c,{key:0,src:t(e).thumbnail,class:"absolute size-full inset-0 object-cover"},null,8,["src"])):(o(),n("div",E,[r(p,{name:t(e).icon??"i-ri:image-fill",class:"w-50% h-50% text-primary/75"},null,8,["name"])]))]),s("div",null,[s("div",H,[r(_,{class:I(["text-lg font-semibold leading-snug tracking-tight dark:text-white",{}]),to:t(e)._path},{default:u(()=>[s("span",q,i(t(e).title),1)]),_:1},8,["to"]),s("div",F,[t(a)?(o(),n("div",G,[s("div",J,[r(c,{class:"absolute inset-0 h-full w-full rounded-full object-cover",src:t(a).avatar,alt:t(a).slug},null,8,["src","alt"])]),s("div",null,[s("span",K,i(t(a).name),1),t(a).title?(o(),n("p",P,i(t(a).title),1)):g("",!0)])])):g("",!0)])])])])}}});export{Y as _,Z as a};