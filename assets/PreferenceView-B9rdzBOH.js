import{d as S,o,c as l,a as d,t as m,b as H,_ as v,s as n,u as f,e as w,f as h,w as b,g as c,h as k,F as C,r as R,T,i as x,j as B,k as $,l as E,m as F,n as P,p as z,q as D}from"./index-BnFgIKUW.js";import{_ as I,i as M}from"./isFullScreenScroll-iAWsIsrA.js";const N={class:"log"},U={class:"log__change"},j={class:"log__symbol"},q={class:"log__symbol"},A={class:"log__date"},G=S({__name:"SymbolChangeLog",props:{log:{}},setup(y){const s=t=>{const e=new Date(t);var i=e.getDate().toString().padStart(2,"0"),a=(e.getMonth()+1).toString().padStart(2,"0"),g=e.getFullYear(),u=e.getHours().toString().padStart(2,"0"),_=e.getMinutes().toString().padStart(2,"0"),r=e.getSeconds().toString().padStart(2,"0");return`${i}.${a}.${g} ${u}:${_}:${r}`};return(t,e)=>(o(),l("div",N,[d("span",U,[d("span",j,m(t.log.from),1),H(" -> "),d("span",q,m(t.log.to),1)]),d("span",A,m(s(t.log.date)),1)]))}}),W=v(G,[["__scopeId","data-v-5c2826b6"]]),Y={key:1,class:"log-list__empty"},J=S({__name:"SymbolChangeLogList",setup(y){const{logList:s}=n(f()),{logListRef:t}=n(w());return(e,i)=>(o(),l("div",{ref_key:"logListRef",ref:t,class:"log-list"},[h(x,{name:"switch",mode:"out-in"},{default:b(()=>[c(s).length?(o(),k(T,{key:0,name:"group",tag:"div",class:"log-list__el",appear:""},{default:b(()=>[(o(!0),l(C,null,R(c(s),a=>(o(),k(W,{key:a.date,log:a},null,8,["log"]))),128))]),_:1})):(o(),l("div",Y,"Логов нет"))]),_:1})],512))}}),K=v(J,[["__scopeId","data-v-36a9320a"]]),O={class:"preference"},Q=S({__name:"PreferenceView",setup(y){const{selectedSymbolValue:s,symbolList:t}=n(f()),{scrollLogListToLastElement:e}=f(),{establishWebSocketConnection:i}=n(B()),{headerRef:a}=n(w()),{appBodyPaddingBottom:g}=$(),{logListHeight:u}=n($()),_=E(null),r=()=>{let p="auto";M()&&(p=`${window.innerHeight-a.value.clientHeight-_.value.$el.clientHeight-g}px`,D(()=>e())),u.value=p};return F(()=>{r(),window.addEventListener("resize",r),e()}),P(()=>{window.removeEventListener("resize",r)}),(p,L)=>(o(),l("div",O,[h(I,{ref_key:"selectRef",ref:_,modelValue:c(s),"onUpdate:modelValue":L[0]||(L[0]=V=>z(s)?s.value=V:null),class:"preference__select",items:c(t),"dead-lock":c(i)},null,8,["modelValue","items","dead-lock"]),h(K,{class:"preference__list"})]))}}),ee=v(Q,[["__scopeId","data-v-be0b5875"]]);export{ee as default};
