import{c as d,a as m,b as p,d as _,R as h}from"./vendor.1f0fb295.js";const y=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}};y();const v="modulepreload",i={},g="./",L=function(o,s){return!s||s.length===0?o():Promise.all(s.map(t=>{if(t=`${g}${t}`,t in i)return;i[t]=!0;const e=t.endsWith(".css"),r=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${r}`))return;const n=document.createElement("link");if(n.rel=e?"stylesheet":v,e||(n.as="script",n.crossOrigin=""),n.href=t,document.head.appendChild(n),e)return new Promise((u,f)=>{n.addEventListener("load",u),n.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${t}`)))})})).then(()=>o())};var a=(c,o)=>{const s=c.__vccOpts||c;for(const[t,e]of o)s[t]=e;return s};const x={};function E(c,o){return" 3333 "}var O=a(x,[["render",E]]);const P={};function $(c,o){return" 11 "}var b=a(P,[["render",$]]);const k=[{path:"/login",component:()=>L(()=>import("./main.f3321f20.js"),["assets/main.f3321f20.js","assets/main.4795d2ae.css","assets/vendor.1f0fb295.js"]),meta:{title:"\u767B\u5F55"}},{path:"/workspace",component:b,meta:{title:"\u5DE5\u4F5C\u7A7A\u95F4"}},{path:"/",component:O,children:[]}],w=d({routes:k,history:m()});const l=p({render(){return _(h,null,null)}});l.use(w);l.mount("#app");export{a as _};
