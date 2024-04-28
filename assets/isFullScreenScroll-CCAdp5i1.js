import{d as S,r as i,s as y,l as b,a as C,x as T,y as W,i as w,v as M,o as H}from"./index-DWrySzmr.js";const V=S("apiStore",()=>{const d=async(n,r)=>{const l=new URL("https://api.binance.com/api/v3/depth");return l.searchParams.append("symbol",n),r&&l.searchParams.append("limit",r.toString()),await(await fetch(l)).json()},o=i(null),e=i(!1),s=i(void 0),c=i(0),u=()=>{var n;clearTimeout(s.value),(n=o.value)==null||n.close()},m=()=>{c.value=0,e.value=!1,u()},t=()=>{c.value=0,e.value=!1},a=(n,r)=>{const l=()=>{a(n,r)};e.value=!0,u();const v=`wss://stream.binance.com/ws/${n.toLowerCase()}@depth@1000ms`;o.value=new WebSocket(v),o.value.addEventListener("message",p=>{clearTimeout(s.value),s.value=setTimeout(()=>{l()},5e3),r(p)}),o.value.addEventListener("error",p=>{c.value++,c.value<3?l():m()}),o.value.addEventListener("open",t)};return{startDepthWebSocketConnection:a,getDepthSnapshot:d,establishWebSocketConnection:e}}),A=(d,o,e)=>{const s=t=>t.map(([a,n])=>{const r=parseFloat(a),l=parseFloat(n);return{price:r,quantity:l,total:r*l}}),c=t=>t.filter(({quantity:a})=>a),u=t=>{const{selectedTableElementsCount:a}=y(B());return a.value<t.length&&(t.length=a.value),t};return{depthWebSocketMessageHandler:({data:t})=>{const{U:a,u:n,a:r,b:l}=JSON.parse(t);if(a<=e.value||n<=e.value)return;const v=c(s(r)),p=c(s(l));d.value=u([...v,...d.value]),o.value=u([...p,...o.value]),e.value=n},fromTupleArrayToObjArray:s}},B=S("orderBookStore",()=>{const d=i([{title:"100",value:100},{title:"500",value:500},{title:"1000",value:1e3}]),o=i(+d.value[0].value),e=i([{title:"Price",key:"price",align:"start"},{title:"Quantity",key:"quantity",align:"end"}]),s={title:"Total",key:"total",align:"end"},{mobileBr:c}=b(),u=matchMedia(`(max-width: ${c})`),m=()=>{u.matches?e.value.includes(s)&&e.value.splice(e.value.indexOf(s),1):e.value.push(s)};m(),u.addEventListener("change",m);const t=i([]),a=i([]),{getDepthSnapshot:n,startDepthWebSocketConnection:r}=V(),l=i(null),{depthWebSocketMessageHandler:v,fromTupleArrayToObjArray:p}=A(a,t,l);return{tableElementsCountList:d,selectedTableElementsCount:o,bidOrderList:t,askOrderList:a,tableHeaders:e,getOrderBookSnapshot:async h=>{const{asks:f,bids:k,lastUpdateId:g}=await n(h,o.value);l.value=g,a.value=p(f),t.value=p(k),r(h,v)}}}),O=C({__name:"MySelect",props:T({items:{},deadLock:{type:Boolean,default:!1}},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup(d){const o=W(d,"modelValue");return(e,s)=>{const c=M("VSelect");return H(),w(c,{modelValue:o.value,"onUpdate:modelValue":s[0]||(s[0]=u=>o.value=u),items:e.items,variant:"solo-filled",disabled:e.deadLock},null,8,["modelValue","items","disabled"])}}}),{thresholdHeight:L}=b(),U=()=>window.innerHeight>L;export{O as _,V as a,U as i,B as u};
