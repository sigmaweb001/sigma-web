import{c as ct,_ as gt,a as dt}from"./AppFooter.vue.oMyELD_U.js";import _t from"./Icon._mjqqVoI.js";import{_ as tt}from"./nuxt-link.ETsZpiLe.js";import{d as et,V as pt,C as k,b as g,N as S,w as $,Q as bt,R as mt,H as b,m as O,W as V,s as vt,c as y,g as F,e as d,F as A,a5 as I,t as R,z as j,f as E}from"./entry.7XWDIvWt.js";import{_ as yt,a as xt}from"./BlogItem.vue.3HvCnkXO.js";import{u as Mt}from"./vue.f36acd1f.paRXKlzz.js";import{u as G}from"./asyncData.lBZ6jSXt.js";import{q as U}from"./query.2Gk5E2Q2.js";import"./nuxt-img.XwCR1Ypd.js";import"./index.HgkIv32I.js";import"./SButton.vue.S6zrHS6q.js";import"./index.lSDm5iYo.js";import"./_plugin-vue_export-helper.x3n3nnut.js";import"./preview.z2lkKx-g.js";const At=Math.sqrt(1.05*.05)-.05,kt=/^(?:[0-9a-f]{3}){1,2}$/i,W={black:"#000000",white:"#ffffff",threshold:At};function St(t,r=2){return(new Array(r).join("0")+t).slice(-r)}function N(t){if(t.slice(0,1)==="#"&&(t=t.slice(1)),!kt.test(t))throw new Error(`Invalid HEX color: "${t}"`);return t.length===3&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]),[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]}function wt(t){if(!t)throw new Error("Invalid color value");return Array.isArray(t)?t:typeof t=="string"?N(t):[t.r,t.g,t.b]}function Rt(t){let r,e;const a=[];for(r=0;r<t.length;r++)e=t[r]/255,a[r]=e<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4);return .2126*a[0]+.7152*a[1]+.0722*a[2]}function Ht(t,r,e){const a=r===!0?W:Object.assign({},W,r);return Rt(t)>a.threshold?e?N(a.black):a.black:e?N(a.white):a.white}function Tt(t,r=!1){return t=wt(t),r?Ht(t,r):"#"+t.map(e=>St((255-e).toString(16))).join("")}function H(t){"@babel/helpers - typeof";return H=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(r){return typeof r}:function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},H(t)}var Ct=/^\s+/,Ft=/\s+$/;function s(t,r){if(t=t||"",r=r||{},t instanceof s)return t;if(!(this instanceof s))return new s(t,r);var e=It(t);this._originalInput=t,this._r=e.r,this._g=e.g,this._b=e.b,this._a=e.a,this._roundA=Math.round(100*this._a)/100,this._format=r.format||e.format,this._gradientType=r.gradientType,this._r<1&&(this._r=Math.round(this._r)),this._g<1&&(this._g=Math.round(this._g)),this._b<1&&(this._b=Math.round(this._b)),this._ok=e.ok}s.prototype={isDark:function(){return this.getBrightness()<128},isLight:function(){return!this.isDark()},isValid:function(){return this._ok},getOriginalInput:function(){return this._originalInput},getFormat:function(){return this._format},getAlpha:function(){return this._a},getBrightness:function(){var r=this.toRgb();return(r.r*299+r.g*587+r.b*114)/1e3},getLuminance:function(){var r=this.toRgb(),e,a,i,n,f,o;return e=r.r/255,a=r.g/255,i=r.b/255,e<=.03928?n=e/12.92:n=Math.pow((e+.055)/1.055,2.4),a<=.03928?f=a/12.92:f=Math.pow((a+.055)/1.055,2.4),i<=.03928?o=i/12.92:o=Math.pow((i+.055)/1.055,2.4),.2126*n+.7152*f+.0722*o},setAlpha:function(r){return this._a=rt(r),this._roundA=Math.round(100*this._a)/100,this},toHsv:function(){var r=Q(this._r,this._g,this._b);return{h:r.h*360,s:r.s,v:r.v,a:this._a}},toHsvString:function(){var r=Q(this._r,this._g,this._b),e=Math.round(r.h*360),a=Math.round(r.s*100),i=Math.round(r.v*100);return this._a==1?"hsv("+e+", "+a+"%, "+i+"%)":"hsva("+e+", "+a+"%, "+i+"%, "+this._roundA+")"},toHsl:function(){var r=X(this._r,this._g,this._b);return{h:r.h*360,s:r.s,l:r.l,a:this._a}},toHslString:function(){var r=X(this._r,this._g,this._b),e=Math.round(r.h*360),a=Math.round(r.s*100),i=Math.round(r.l*100);return this._a==1?"hsl("+e+", "+a+"%, "+i+"%)":"hsla("+e+", "+a+"%, "+i+"%, "+this._roundA+")"},toHex:function(r){return Z(this._r,this._g,this._b,r)},toHexString:function(r){return"#"+this.toHex(r)},toHex8:function(r){return Bt(this._r,this._g,this._b,this._a,r)},toHex8String:function(r){return"#"+this.toHex8(r)},toRgb:function(){return{r:Math.round(this._r),g:Math.round(this._g),b:Math.round(this._b),a:this._a}},toRgbString:function(){return this._a==1?"rgb("+Math.round(this._r)+", "+Math.round(this._g)+", "+Math.round(this._b)+")":"rgba("+Math.round(this._r)+", "+Math.round(this._g)+", "+Math.round(this._b)+", "+this._roundA+")"},toPercentageRgb:function(){return{r:Math.round(h(this._r,255)*100)+"%",g:Math.round(h(this._g,255)*100)+"%",b:Math.round(h(this._b,255)*100)+"%",a:this._a}},toPercentageRgbString:function(){return this._a==1?"rgb("+Math.round(h(this._r,255)*100)+"%, "+Math.round(h(this._g,255)*100)+"%, "+Math.round(h(this._b,255)*100)+"%)":"rgba("+Math.round(h(this._r,255)*100)+"%, "+Math.round(h(this._g,255)*100)+"%, "+Math.round(h(this._b,255)*100)+"%, "+this._roundA+")"},toName:function(){return this._a===0?"transparent":this._a<1?!1:Xt[Z(this._r,this._g,this._b,!0)]||!1},toFilter:function(r){var e="#"+J(this._r,this._g,this._b,this._a),a=e,i=this._gradientType?"GradientType = 1, ":"";if(r){var n=s(r);a="#"+J(n._r,n._g,n._b,n._a)}return"progid:DXImageTransform.Microsoft.gradient("+i+"startColorstr="+e+",endColorstr="+a+")"},toString:function(r){var e=!!r;r=r||this._format;var a=!1,i=this._a<1&&this._a>=0,n=!e&&i&&(r==="hex"||r==="hex6"||r==="hex3"||r==="hex4"||r==="hex8"||r==="name");return n?r==="name"&&this._a===0?this.toName():this.toRgbString():(r==="rgb"&&(a=this.toRgbString()),r==="prgb"&&(a=this.toPercentageRgbString()),(r==="hex"||r==="hex6")&&(a=this.toHexString()),r==="hex3"&&(a=this.toHexString(!0)),r==="hex4"&&(a=this.toHex8String(!0)),r==="hex8"&&(a=this.toHex8String()),r==="name"&&(a=this.toName()),r==="hsl"&&(a=this.toHslString()),r==="hsv"&&(a=this.toHsvString()),a||this.toHexString())},clone:function(){return s(this.toString())},_applyModification:function(r,e){var a=r.apply(null,[this].concat([].slice.call(e)));return this._r=a._r,this._g=a._g,this._b=a._b,this.setAlpha(a._a),this},lighten:function(){return this._applyModification(zt,arguments)},brighten:function(){return this._applyModification(Dt,arguments)},darken:function(){return this._applyModification(Ot,arguments)},desaturate:function(){return this._applyModification(Lt,arguments)},saturate:function(){return this._applyModification(Pt,arguments)},greyscale:function(){return this._applyModification(qt,arguments)},spin:function(){return this._applyModification(Vt,arguments)},_applyCombination:function(r,e){return r.apply(null,[this].concat([].slice.call(e)))},analogous:function(){return this._applyCombination(Ut,arguments)},complement:function(){return this._applyCombination(jt,arguments)},monochromatic:function(){return this._applyCombination(Wt,arguments)},splitcomplement:function(){return this._applyCombination(Gt,arguments)},triad:function(){return this._applyCombination(K,[3])},tetrad:function(){return this._applyCombination(K,[4])}};s.fromRatio=function(t,r){if(H(t)=="object"){var e={};for(var a in t)t.hasOwnProperty(a)&&(a==="a"?e[a]=t[a]:e[a]=w(t[a]));t=e}return s(t,r)};function It(t){var r={r:0,g:0,b:0},e=1,a=null,i=null,n=null,f=!1,o=!1;return typeof t=="string"&&(t=Kt(t)),H(t)=="object"&&(x(t.r)&&x(t.g)&&x(t.b)?(r=Et(t.r,t.g,t.b),f=!0,o=String(t.r).substr(-1)==="%"?"prgb":"rgb"):x(t.h)&&x(t.s)&&x(t.v)?(a=w(t.s),i=w(t.v),r=Nt(t.h,a,i),f=!0,o="hsv"):x(t.h)&&x(t.s)&&x(t.l)&&(a=w(t.s),n=w(t.l),r=$t(t.h,a,n),f=!0,o="hsl"),t.hasOwnProperty("a")&&(e=t.a)),e=rt(e),{ok:f,format:t.format||o,r:Math.min(255,Math.max(r.r,0)),g:Math.min(255,Math.max(r.g,0)),b:Math.min(255,Math.max(r.b,0)),a:e}}function Et(t,r,e){return{r:h(t,255)*255,g:h(r,255)*255,b:h(e,255)*255}}function X(t,r,e){t=h(t,255),r=h(r,255),e=h(e,255);var a=Math.max(t,r,e),i=Math.min(t,r,e),n,f,o=(a+i)/2;if(a==i)n=f=0;else{var u=a-i;switch(f=o>.5?u/(2-a-i):u/(a+i),a){case t:n=(r-e)/u+(r<e?6:0);break;case r:n=(e-t)/u+2;break;case e:n=(t-r)/u+4;break}n/=6}return{h:n,s:f,l:o}}function $t(t,r,e){var a,i,n;t=h(t,360),r=h(r,100),e=h(e,100);function f(l,M,c){return c<0&&(c+=1),c>1&&(c-=1),c<1/6?l+(M-l)*6*c:c<1/2?M:c<2/3?l+(M-l)*(2/3-c)*6:l}if(r===0)a=i=n=e;else{var o=e<.5?e*(1+r):e+r-e*r,u=2*e-o;a=f(u,o,t+1/3),i=f(u,o,t),n=f(u,o,t-1/3)}return{r:a*255,g:i*255,b:n*255}}function Q(t,r,e){t=h(t,255),r=h(r,255),e=h(e,255);var a=Math.max(t,r,e),i=Math.min(t,r,e),n,f,o=a,u=a-i;if(f=a===0?0:u/a,a==i)n=0;else{switch(a){case t:n=(r-e)/u+(r<e?6:0);break;case r:n=(e-t)/u+2;break;case e:n=(t-r)/u+4;break}n/=6}return{h:n,s:f,v:o}}function Nt(t,r,e){t=h(t,360)*6,r=h(r,100),e=h(e,100);var a=Math.floor(t),i=t-a,n=e*(1-r),f=e*(1-i*r),o=e*(1-(1-i)*r),u=a%6,l=[e,f,n,n,o,e][u],M=[o,e,e,f,n,n][u],c=[n,n,o,e,e,f][u];return{r:l*255,g:M*255,b:c*255}}function Z(t,r,e,a){var i=[v(Math.round(t).toString(16)),v(Math.round(r).toString(16)),v(Math.round(e).toString(16))];return a&&i[0].charAt(0)==i[0].charAt(1)&&i[1].charAt(0)==i[1].charAt(1)&&i[2].charAt(0)==i[2].charAt(1)?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0):i.join("")}function Bt(t,r,e,a,i){var n=[v(Math.round(t).toString(16)),v(Math.round(r).toString(16)),v(Math.round(e).toString(16)),v(at(a))];return i&&n[0].charAt(0)==n[0].charAt(1)&&n[1].charAt(0)==n[1].charAt(1)&&n[2].charAt(0)==n[2].charAt(1)&&n[3].charAt(0)==n[3].charAt(1)?n[0].charAt(0)+n[1].charAt(0)+n[2].charAt(0)+n[3].charAt(0):n.join("")}function J(t,r,e,a){var i=[v(at(a)),v(Math.round(t).toString(16)),v(Math.round(r).toString(16)),v(Math.round(e).toString(16))];return i.join("")}s.equals=function(t,r){return!t||!r?!1:s(t).toRgbString()==s(r).toRgbString()};s.random=function(){return s.fromRatio({r:Math.random(),g:Math.random(),b:Math.random()})};function Lt(t,r){r=r===0?0:r||10;var e=s(t).toHsl();return e.s-=r/100,e.s=T(e.s),s(e)}function Pt(t,r){r=r===0?0:r||10;var e=s(t).toHsl();return e.s+=r/100,e.s=T(e.s),s(e)}function qt(t){return s(t).desaturate(100)}function zt(t,r){r=r===0?0:r||10;var e=s(t).toHsl();return e.l+=r/100,e.l=T(e.l),s(e)}function Dt(t,r){r=r===0?0:r||10;var e=s(t).toRgb();return e.r=Math.max(0,Math.min(255,e.r-Math.round(255*-(r/100)))),e.g=Math.max(0,Math.min(255,e.g-Math.round(255*-(r/100)))),e.b=Math.max(0,Math.min(255,e.b-Math.round(255*-(r/100)))),s(e)}function Ot(t,r){r=r===0?0:r||10;var e=s(t).toHsl();return e.l-=r/100,e.l=T(e.l),s(e)}function Vt(t,r){var e=s(t).toHsl(),a=(e.h+r)%360;return e.h=a<0?360+a:a,s(e)}function jt(t){var r=s(t).toHsl();return r.h=(r.h+180)%360,s(r)}function K(t,r){if(isNaN(r)||r<=0)throw new Error("Argument to polyad must be a positive number");for(var e=s(t).toHsl(),a=[s(t)],i=360/r,n=1;n<r;n++)a.push(s({h:(e.h+n*i)%360,s:e.s,l:e.l}));return a}function Gt(t){var r=s(t).toHsl(),e=r.h;return[s(t),s({h:(e+72)%360,s:r.s,l:r.l}),s({h:(e+216)%360,s:r.s,l:r.l})]}function Ut(t,r,e){r=r||6,e=e||30;var a=s(t).toHsl(),i=360/e,n=[s(t)];for(a.h=(a.h-(i*r>>1)+720)%360;--r;)a.h=(a.h+i)%360,n.push(s(a));return n}function Wt(t,r){r=r||6;for(var e=s(t).toHsv(),a=e.h,i=e.s,n=e.v,f=[],o=1/r;r--;)f.push(s({h:a,s:i,v:n})),n=(n+o)%1;return f}s.mix=function(t,r,e){e=e===0?0:e||50;var a=s(t).toRgb(),i=s(r).toRgb(),n=e/100,f={r:(i.r-a.r)*n+a.r,g:(i.g-a.g)*n+a.g,b:(i.b-a.b)*n+a.b,a:(i.a-a.a)*n+a.a};return s(f)};s.readability=function(t,r){var e=s(t),a=s(r);return(Math.max(e.getLuminance(),a.getLuminance())+.05)/(Math.min(e.getLuminance(),a.getLuminance())+.05)};s.isReadable=function(t,r,e){var a=s.readability(t,r),i,n;switch(n=!1,i=Yt(e),i.level+i.size){case"AAsmall":case"AAAlarge":n=a>=4.5;break;case"AAlarge":n=a>=3;break;case"AAAsmall":n=a>=7;break}return n};s.mostReadable=function(t,r,e){var a=null,i=0,n,f,o,u;e=e||{},f=e.includeFallbackColors,o=e.level,u=e.size;for(var l=0;l<r.length;l++)n=s.readability(t,r[l]),n>i&&(i=n,a=s(r[l]));return s.isReadable(t,a,{level:o,size:u})||!f?a:(e.includeFallbackColors=!1,s.mostReadable(t,["#fff","#000"],e))};var B=s.names={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",burntsienna:"ea7e5d",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"663399",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"},Xt=s.hexNames=Qt(B);function Qt(t){var r={};for(var e in t)t.hasOwnProperty(e)&&(r[t[e]]=e);return r}function rt(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function h(t,r){Zt(t)&&(t="100%");var e=Jt(t);return t=Math.min(r,Math.max(0,parseFloat(t))),e&&(t=parseInt(t*r,10)/100),Math.abs(t-r)<1e-6?1:t%r/parseFloat(r)}function T(t){return Math.min(1,Math.max(0,t))}function p(t){return parseInt(t,16)}function Zt(t){return typeof t=="string"&&t.indexOf(".")!=-1&&parseFloat(t)===1}function Jt(t){return typeof t=="string"&&t.indexOf("%")!=-1}function v(t){return t.length==1?"0"+t:""+t}function w(t){return t<=1&&(t=t*100+"%"),t}function at(t){return Math.round(parseFloat(t)*255).toString(16)}function Y(t){return p(t)/255}var m=function(){var t="[-\\+]?\\d+%?",r="[-\\+]?\\d*\\.\\d+%?",e="(?:"+r+")|(?:"+t+")",a="[\\s|\\(]+("+e+")[,|\\s]+("+e+")[,|\\s]+("+e+")\\s*\\)?",i="[\\s|\\(]+("+e+")[,|\\s]+("+e+")[,|\\s]+("+e+")[,|\\s]+("+e+")\\s*\\)?";return{CSS_UNIT:new RegExp(e),rgb:new RegExp("rgb"+a),rgba:new RegExp("rgba"+i),hsl:new RegExp("hsl"+a),hsla:new RegExp("hsla"+i),hsv:new RegExp("hsv"+a),hsva:new RegExp("hsva"+i),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/}}();function x(t){return!!m.CSS_UNIT.exec(t)}function Kt(t){t=t.replace(Ct,"").replace(Ft,"").toLowerCase();var r=!1;if(B[t])t=B[t],r=!0;else if(t=="transparent")return{r:0,g:0,b:0,a:0,format:"name"};var e;return(e=m.rgb.exec(t))?{r:e[1],g:e[2],b:e[3]}:(e=m.rgba.exec(t))?{r:e[1],g:e[2],b:e[3],a:e[4]}:(e=m.hsl.exec(t))?{h:e[1],s:e[2],l:e[3]}:(e=m.hsla.exec(t))?{h:e[1],s:e[2],l:e[3],a:e[4]}:(e=m.hsv.exec(t))?{h:e[1],s:e[2],v:e[3]}:(e=m.hsva.exec(t))?{h:e[1],s:e[2],v:e[3],a:e[4]}:(e=m.hex8.exec(t))?{r:p(e[1]),g:p(e[2]),b:p(e[3]),a:Y(e[4]),format:r?"name":"hex8"}:(e=m.hex6.exec(t))?{r:p(e[1]),g:p(e[2]),b:p(e[3]),format:r?"name":"hex"}:(e=m.hex4.exec(t))?{r:p(e[1]+""+e[1]),g:p(e[2]+""+e[2]),b:p(e[3]+""+e[3]),a:Y(e[4]+""+e[4]),format:r?"name":"hex8"}:(e=m.hex3.exec(t))?{r:p(e[1]+""+e[1]),g:p(e[2]+""+e[2]),b:p(e[3]+""+e[3]),format:r?"name":"hex"}:!1}function Yt(t){var r,e;return t=t||{level:"AA",size:"small"},r=(t.level||"AA").toUpperCase(),e=(t.size||"small").toLowerCase(),r!=="AA"&&r!=="AAA"&&(r="AA"),e!=="small"&&e!=="large"&&(e="small"),{level:r,size:e}}const te=et({__name:"TagItem",props:{color:{},to:{}},setup(t){const r=t,{color:e}=pt(r),a=k(()=>s(e.value).toHsl()),i=k(()=>Tt(e.value,{black:"#000000",white:"#ffffff",threshold:.38}));return(n,f)=>{const o=tt;return g(),S(o,{"exact-active-class":"[--opacity:1]",to:n.to,style:mt({"--color":`hsl(${b(a).h} ${b(a).s*100}% ${b(a).l*100}% / var(--opacity, 1))`,"--textColor":b(i),"--opacity":.5}),class:"inline-block bg-[var(--color)] rounded rounded-full font-medium tracking-wider uppercase text-12px px-2 py-1"},{default:$(()=>[bt(n.$slots,"default")]),_:3},8,["to","style"])}}}),ee={class:"flex container"},re={class:"mt-120px w-1/4 flex-shrink-0 py-5 pr-10 sticky top-[calc(var(--header-height))]"},ae=d("h3",{class:"text-lg font-600"}," Categories ",-1),ne={class:"grid mx--2 mt-4 gap-2"},ie={class:"flex items-center gap-2"},se=d("div",{class:"i-ri:arrow-right-line"},null,-1),oe=d("hr",{class:"my-5 h-px border-0 bg-gray-200 dark:bg-gray-700"},null,-1),fe=d("h3",{class:"text-lg font-600"}," Tags ",-1),he={key:0,class:"mt-4 flex flex-wrap gap-2"},ue={class:"flex-1"},le={class:"py-10 text-center text-4xl font-bold dark:text-white"},ce={key:0},ge={class:"grid mt-5 gap-6 px-6 lg:grid-cols-2 lg:gap-4 xl:grid-cols-3 xl:gap-6"},de={key:0,class:"col-span-3 flex-center flex-col py-10"},_e=d("div",{class:"i-ri:box-1-line text-30px"},null,-1),pe=d("h2",{class:"mt-4 text-center text-2xl font-bold dark:text-white"}," No data ",-1),be=[_e,pe],Ie=et({__name:"resources",async setup(t){let r,e;Mt({titleTemplate:"%s · Sigma Streaming",meta:[{name:"twitter:card",content:"summary_large_image"}]});const{params:a}=O(),i=k(()=>a.slug.join("/")),{data:n}=([r,e]=V(()=>G("resources-list-dir",()=>U("resources").where({$or:[{_dir:{$eq:"resources"}},{_dir:{$eq:""}}]}).find())),r=await r,e(),r),f=k(()=>{var C;return(C=n.value)==null?void 0:C.find(L=>L._path==="/"+i.value)}),o=ct(()=>O().query.tag),u=k(()=>a.slug.length===1?o.value?{tags:{$contains:[o.value]}}:{$and:[{_dir:{$ne:"resources"}},{_dir:{$ne:""}}]}:{_dir:{$eq:a.slug[a.slug.length-1]}}),{data:l}=([r,e]=V(()=>G("resources-list-content",()=>U("resources").where(u.value).find(),{watch:[o]})),r=await r,e(),r),M=vt(),c=k(()=>M.tags);return(C,L)=>{var P,q,z,D;const nt=gt,it=_t,st=tt,ot=te,ft=yt,ht=xt,ut=dt;return g(),y(A,null,[F(nt),d("div",ee,[d("div",re,[ae,d("div",ne,[(g(!0),y(A,null,I(b(n),_=>(g(),S(st,{key:_.to,"exact-active-class":"text-primary font-bold",to:_._path,class:"flex cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2 hover:bg-primary/10 hover:text-primary"},{default:$(()=>[d("div",ie,[F(it,{name:_.icon,class:"size-5"},null,8,["name"]),d("div",null,R(_.title),1)]),se]),_:2},1032,["to"]))),128))]),oe,(P=b(c))!=null&&P.length?(g(),y(A,{key:0},[fe,(q=b(c))!=null&&q.length?(g(),y("div",he,[(g(!0),y(A,null,I(b(c),(_,lt)=>(g(),S(ot,{color:_.color,key:lt,to:`/resources?tag=${_.slug}`},{default:$(()=>[j(R(_.name),1)]),_:2},1032,["color","to"]))),128))])):E("",!0)],64)):E("",!0)]),d("div",ue,[d("h1",le,[j(R((z=b(f))==null?void 0:z.title)+" ",1),b(o)?(g(),y("span",ce,"("+R(b(o))+")",1)):E("",!0)]),d("div",ge,[(D=b(l))!=null&&D.length?(g(!0),y(A,{key:1},I(b(l),_=>(g(),y(A,{key:_._path},[_.type==="resource"?(g(),S(ft,{key:0,item:_},null,8,["item"])):(g(),S(ht,{key:1,item:_},null,8,["item"]))],64))),128)):(g(),y("div",de,be))])])]),F(ut)],64)}}});export{Ie as default};