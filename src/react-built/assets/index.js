import{r as b,R as H}from"../chunks/react.js";import{r as Q,m as X,e as ee,J as te}from"../chunks/botframeworkWebchat.js";import{r as oe,I as re}from"../chunks/botframeworkWebchatCore.js";import"../chunks/botframeworkDirectlinespeechSdk.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();var $={exports:{}},O={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ne=b,se=Symbol.for("react.element"),ie=Symbol.for("react.fragment"),ae=Object.prototype.hasOwnProperty,ce=ne.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,le={key:!0,ref:!0,__self:!0,__source:!0};function V(e,t,o){var r,n={},s=null,d=null;o!==void 0&&(s=""+o),t.key!==void 0&&(s=""+t.key),t.ref!==void 0&&(d=t.ref);for(r in t)ae.call(t,r)&&!le.hasOwnProperty(r)&&(n[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)n[r]===void 0&&(n[r]=t[r]);return{$$typeof:se,type:e,key:s,ref:d,props:n,_owner:ce.current}}O.Fragment=ie;O.jsx=V;O.jsxs=V;$.exports=O;var c=$.exports,K,z=Q;K=z.createRoot,z.hydrateRoot;const B=e=>{let t;const o=new Set,r=(u,v)=>{const l=typeof u=="function"?u(t):u;if(!Object.is(l,t)){const h=t;t=v??(typeof l!="object"||l===null)?l:Object.assign({},t,l),o.forEach(p=>p(t,h))}},n=()=>t,i={setState:r,getState:n,getInitialState:()=>m,subscribe:u=>(o.add(u),()=>o.delete(u))},m=t=e(r,n,i);return i},de=e=>e?B(e):B,ue=e=>e;function ve(e,t=ue){const o=H.useSyncExternalStore(e.subscribe,()=>t(e.getState()),()=>t(e.getInitialState()));return H.useDebugValue(o),o}const W=e=>{const t=de(e),o=r=>ve(t,r);return Object.assign(o,t),o},L=e=>e?W(e):W,J={BASE_URL:"./",DEV:!1,MODE:"production",PROD:!0,SSR:!1},U=new Map,T=e=>{const t=U.get(e);return t?Object.fromEntries(Object.entries(t.stores).map(([o,r])=>[o,r.getState()])):{}},me=(e,t,o)=>{if(e===void 0)return{type:"untracked",connection:t.connect(o)};const r=U.get(o.name);if(r)return{type:"tracked",store:e,...r};const n={connection:t.connect(o),stores:{}};return U.set(o.name,n),{type:"tracked",store:e,...n}},fe=(e,t={})=>(o,r,n)=>{const{enabled:s,anonymousActionType:d,store:i,...m}=t;let u;try{u=(s??(J?"production":void 0)!=="production")&&window.__REDUX_DEVTOOLS_EXTENSION__}catch{}if(!u)return e(o,r,n);const{connection:v,...l}=me(i,u,m);let h=!0;n.setState=(a,y,f)=>{const g=o(a,y);if(!h)return g;const E=f===void 0?{type:d||"anonymous"}:typeof f=="string"?{type:f}:f;return i===void 0?(v==null||v.send(E,r()),g):(v==null||v.send({...E,type:`${i}/${E.type}`},{...T(m.name),[i]:n.getState()}),g)};const p=(...a)=>{const y=h;h=!1,o(...a),h=y},_=e(n.setState,r,n);if(l.type==="untracked"?v==null||v.init(_):(l.stores[l.store]=n,v==null||v.init(Object.fromEntries(Object.entries(l.stores).map(([a,y])=>[a,a===l.store?_:y.getState()])))),n.dispatchFromDevtools&&typeof n.dispatch=="function"){let a=!1;const y=n.dispatch;n.dispatch=(...f)=>{(J?"production":void 0)!=="production"&&f[0].type==="__setState"&&!a&&(console.warn('[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'),a=!0),y(...f)}}return v.subscribe(a=>{var y;switch(a.type){case"ACTION":if(typeof a.payload!="string"){console.error("[zustand devtools middleware] Unsupported action format");return}return D(a.payload,f=>{if(f.type==="__setState"){if(i===void 0){p(f.state);return}Object.keys(f.state).length!==1&&console.error(`
                    [zustand devtools middleware] Unsupported __setState action format.
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `);const g=f.state[i];if(g==null)return;JSON.stringify(n.getState())!==JSON.stringify(g)&&p(g);return}n.dispatchFromDevtools&&typeof n.dispatch=="function"&&n.dispatch(f)});case"DISPATCH":switch(a.payload.type){case"RESET":return p(_),i===void 0?v==null?void 0:v.init(n.getState()):v==null?void 0:v.init(T(m.name));case"COMMIT":if(i===void 0){v==null||v.init(n.getState());return}return v==null?void 0:v.init(T(m.name));case"ROLLBACK":return D(a.state,f=>{if(i===void 0){p(f),v==null||v.init(n.getState());return}p(f[i]),v==null||v.init(T(m.name))});case"JUMP_TO_STATE":case"JUMP_TO_ACTION":return D(a.state,f=>{if(i===void 0){p(f);return}JSON.stringify(n.getState())!==JSON.stringify(f[i])&&p(f[i])});case"IMPORT_STATE":{const{nextLiftedState:f}=a.payload,g=(y=f.computedStates.slice(-1)[0])==null?void 0:y.state;if(!g)return;p(i===void 0?g:g[i]),v==null||v.send(null,f);return}case"PAUSE_RECORDING":return h=!h}return}}),_},N=fe,D=(e,t)=>{let o;try{o=JSON.parse(e)}catch(r){console.error("[zustand devtools middleware] Could not parse the received json",r)}o!==void 0&&t(o)};function ge(e,t){let o;try{o=e()}catch{return}return{getItem:n=>{var s;const d=m=>m===null?null:JSON.parse(m,void 0),i=(s=o.getItem(n))!=null?s:null;return i instanceof Promise?i.then(d):d(i)},setItem:(n,s)=>o.setItem(n,JSON.stringify(s,void 0)),removeItem:n=>o.removeItem(n)}}const P=e=>t=>{try{const o=e(t);return o instanceof Promise?o:{then(r){return P(r)(o)},catch(r){return this}}}catch(o){return{then(r){return this},catch(r){return P(r)(o)}}}},he=(e,t)=>(o,r,n)=>{let s={storage:ge(()=>localStorage),partialize:a=>a,version:0,merge:(a,y)=>({...y,...a}),...t},d=!1;const i=new Set,m=new Set;let u=s.storage;if(!u)return e((...a)=>{console.warn(`[zustand persist middleware] Unable to update item '${s.name}', the given storage is currently unavailable.`),o(...a)},r,n);const v=()=>{const a=s.partialize({...r()});return u.setItem(s.name,{state:a,version:s.version})},l=n.setState;n.setState=(a,y)=>{l(a,y),v()};const h=e((...a)=>{o(...a),v()},r,n);n.getInitialState=()=>h;let p;const _=()=>{var a,y;if(!u)return;d=!1,i.forEach(g=>{var E;return g((E=r())!=null?E:h)});const f=((y=s.onRehydrateStorage)==null?void 0:y.call(s,(a=r())!=null?a:h))||void 0;return P(u.getItem.bind(u))(s.name).then(g=>{if(g)if(typeof g.version=="number"&&g.version!==s.version){if(s.migrate)return[!0,s.migrate(g.state,g.version)];console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return[!1,g.state];return[!1,void 0]}).then(g=>{var E;const[q,Y]=g;if(p=s.merge(Y,(E=r())!=null?E:h),o(p,!0),q)return v()}).then(()=>{f==null||f(p,void 0),p=r(),d=!0,m.forEach(g=>g(p))}).catch(g=>{f==null||f(void 0,g)})};return n.persist={setOptions:a=>{s={...s,...a},a.storage&&(u=a.storage)},clearStorage:()=>{u==null||u.removeItem(s.name)},getOptions:()=>s,rehydrate:()=>_(),hasHydrated:()=>d,onHydrate:a=>(i.add(a),()=>{i.delete(a)}),onFinishHydration:a=>(m.add(a),()=>{m.delete(a)})},s.skipHydration||_(),p||h},R=he,w=L(N(R((e,t)=>({conversation:{id:"",title:"",token:"",store:{}},setConversation:o=>{e({conversation:{id:o.id,title:o.title,store:o.store,token:o.token}})},setConversationStore:o=>e({conversation:{...t().conversation,store:o}}),removeConversation:()=>e({conversation:{id:"",title:"",store:{},token:null}})}),{name:"conversation-storage",getStorage:()=>sessionStorage}))),I=L(e=>({error:null,actionText:null,actionFunction:null,setError:(t,o=null,r=null)=>e({error:t,actionText:o,actionFunction:r}),clearError:()=>e({error:null})})),k=L(N(R(e=>({token:null,codeChallenge:null,setToken:t=>e({token:t}),setCodeChallenge:t=>e({codeChallenge:t})}),{name:"auth-storage",getStorage:()=>localStorage}))),x=L(N(R((e,t)=>({conversationHistory:[],addConversation:o=>{e(r=>({conversationHistory:[...r.conversationHistory,{id:o.id,token:o.token,title:o.title,store:o.store}]}))},updateConversation:(o,r)=>{e(n=>({conversationHistory:n.conversationHistory.map(s=>s.id===o?{...s,store:r}:s)}))},removeConversation:o=>{e(r=>({conversationHistory:r.conversationHistory.filter(n=>n.id!==o)}))}}),{name:"conversation-history-storage",getStorage:()=>localStorage})));function M(){const e=x.getState().conversationHistory,t=w.getState().conversation,o=e.findIndex(r=>r.id===w.getState().conversation.id);if(t.store.activities.length&&!(t.store.activities[0].type==="message"&&t.store.activities[0].text==="/reset")){for(let r=t.store.activities.length-1;r>=0;r--){const n=t.store.activities[r];n.type==="message"&&n.attachments&&n.attachments.some(s=>s.contentType==="application/vnd.microsoft.card.adaptive")&&t.store.activities.splice(r,1)}o!==-1?x.getState().updateConversation(t.id,t.store):x.getState().addConversation({id:t.id,token:t.token,title:t.store.activities[0].text,store:t.store}),x.getState().updateConversation(t.id,t.store)}}const pe=e=>({dispatch:t})=>o=>r=>{var n,s,d,i;switch(r.type){case"WEB_CHAT/SEND_MESSAGE":{const{text:m}=r.payload;if(m.startsWith("/reset-simple")){t({type:"WEB_CHAT/SEND_MESSAGE_BACK",payload:{...r.payload,text:m.trim()}}),M(),w.getState().removeConversation(),e(),console.info("QUIT_COMPLETED");break}if(m.startsWith("/reset")){t({type:"WEB_CHAT/SEND_MESSAGE_BACK",payload:{...r.payload,text:m.trim()}});break}if(m.startsWith("/fr")){M(),w.getState().removeConversation(),e(),console.info("QUIT_COMPLETED");break}return document.body.classList.add("message-sending"),document.body.classList.remove("show-splash"),o(r)}case"DIRECT_LINE/INCOMING_ACTIVITY":{if(((s=(n=r==null?void 0:r.payload)==null?void 0:n.activity)==null?void 0:s.text)==="__SYSTEM_MESSAGE__ QUIT_COMPLETED"){M(),w.getState().removeConversation(),e(),console.info("QUIT_COMPLETED");break}else if(((i=(d=r==null?void 0:r.payload)==null?void 0:d.activity)==null?void 0:i.text)==="__SYSTEM_MESSAGE__ QUIT_SIMPLE_COMPLETED")break;return o(r)}case"DIRECT_LINE/POST_ACTIVITY_FULFILLED":return document.body.classList.remove("message-sending"),o(r);default:return o(r)}},C="https://sibilla-bot-appservice-e5egc6dseagxc2gy.northeurope-01.azurewebsites.net",j={fetchConversationId:async e=>{const t=await fetch("https://europe.webchat.botframework.com/v3/directline/conversations",{method:"POST",headers:{Authorization:`Bearer ${e}`}}),{conversationId:o}=await t.json();return o},newConversations:async e=>(await fetch(C+"/api/new-conversation",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}})).json(),resumeConversations:async(e,t)=>(await fetch(C+"/api/resume-conversation?conversationId="+e,{method:"GET",headers:{Authorization:`Bearer ${t}`}})).json(),saveHistory:async(e,t,o)=>{await fetch(C+"/api/save",{method:"POST",body:JSON.stringify({userId:e,conversationId:t,store:o}),headers:{"Content-Type":"application/json"}})},loadHistory:async e=>(await fetch(C+"/api/load?userId="+e,{method:"GET"})).json(),login:async e=>(await fetch(C+"/api/login",{method:"POST",body:JSON.stringify({jwt:e})})).json(),obtainLoginCode:async(e,t)=>(await fetch(C+"/api/obtain-login-code",{method:"POST",body:JSON.stringify({code:e,code_challenge:t})})).json()};function Z(e){try{const t=oe(e),o=Math.floor(Date.now()/1e3);return!(t.exp<o||t.nbf>o)}catch{return!1}}function ye(e,t){return decodeURIComponent((new RegExp("[?|&]"+e+"=([^&;]+?)(&|#|;|$)").exec(location.search)||[,""])[1].replace(/\+/g,"%20"))||t}function Se(e){const t=X({html:!0}),o=/(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi,r=e.replace(o,n=>`<a href="${n}" class="reference-link" target="_blank" rel="noopener noreferrer">${n}</a>`);return t.render(r)}const we="https://europe.webchat.botframework.com/v3/directline";function be(){const e=I(s=>s.setError),t=k.getState().token,[o,r]=b.useState({directLine:null,key:null,store:null}),n=b.useCallback(async()=>{if(!t){console.info("No auth token found. Restarting login process.");return}const s=w.getState().conversation.store;let d=w.getState().conversation.id,i=w.getState().conversation.token;if(i&&!Z(i)&&(i=null),!i&&!d){let u;try{u=await j.newConversations(t)}catch(h){console.error("Error creating new conversation:",h),e({message:"Errore durante la creazione di una nuova conversazione. Ricarica la pagina e riprova. <br> Se il problema persiste, contatta il team tecnico."});return}u&&(u!=null&&u.error)&&(u.error=="INVALID_TOKEN"||u.error=="MISSING_TOKEN")&&e({message:"Sessione scaduta. Si prega di effettuare nuovamente il login.",actionText:"OK",actionFunction:()=>{localStorage.clear(),sessionStorage.clear(),window.location.reload()}});const v=u.token,l=u.conversationId;i=v,d=l,w.getState().setConversation({id:l,title:"Nuova chat",store:{},token:i})}else if(!i)try{const{token:u}=await j.resumeConversations(d,t);w.getState().setConversation({token:u}),i=u}catch(u){console.error("Error resuming conversation:",u),e({message:"Errore durante il ripristino della conversazione.",actionText:"Ricarica",actionFunction:()=>{sessionStorage.clear(),localStorage.clear(),window.location.reload()}});return}const m=Date.now();r({directLine:ee({domain:we,token:i,conversationId:d}),key:m,store:re({devTools:!0},s,pe(n))})},[t]);return{session:o,initConversation:n}}function Ee(){return c.jsx("div",{children:c.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",className:"size-6",children:c.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"})})})}const _e=({children:e})=>{const t=I(o=>o.setError);return b.useEffect(()=>{const o=(r,n)=>{console.log(r,n),localStorage.clear(),sessionStorage.clear(),t({message:"Si è verificato un errore. Prova a ricaricare la pagina."})};return window.addEventListener("error",o),()=>{window.removeEventListener("error",o)}},[]),e},Ce=()=>{const e=w(t=>t.conversation);return b.useEffect(()=>{var o;if((o=e.store.activities)!=null&&o.length){document.body.classList.remove("show-splash");return}const t=new MutationObserver(()=>{const r=document.querySelector("input.webchat__send-box-text-box__input");if(r){const n=s=>{document.body.classList.contains("show-splash")&&(console.log("KEYDOWN"),document.body.classList.contains("show-splash")&&(document.body.classList.remove("show-splash"),r.removeEventListener("keydown",n)))};return r.addEventListener("keydown",n),()=>{r.removeEventListener("keydown",n),t.disconnect()}}});t.observe(document.body,{childList:!0,subtree:!0})},[]),c.jsx("div",{className:"splash-screen",children:c.jsxs("div",{className:"splash-content container",children:[c.jsx("div",{className:"img-wrapper",children:c.jsx("img",{src:"/img/bg-blue.webp",alt:"Sibilla Logo"})}),c.jsx("h2",{children:"Ciao, sono Sibilla"}),c.jsx("p",{children:"Come posso aiutarti oggi?"})]})})};function ke({className:e}){return c.jsxs("svg",{className:e,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",children:[c.jsx("path",{d:"M2.20164 18.4695L10.1643 4.00506C10.9021 2.66498 13.0979 2.66498 13.8357 4.00506L21.7984 18.4695C22.4443 19.6428 21.4598 21 19.9627 21H4.0373C2.54022 21 1.55571 19.6428 2.20164 18.4695Z",stroke:"#DC3444",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),c.jsx("path",{d:"M12 9V13",stroke:"#DC3444",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),c.jsx("path",{d:"M12 17.0195V17",stroke:"#DC3444",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]})}const xe=()=>{const{error:e,clearError:t}=I();return e?c.jsx("div",{className:"error-overlay",children:c.jsxs("div",{className:"error-content",children:[c.jsx(ke,{className:"error-icon"}),c.jsx("h2",{children:"Errore"}),c.jsx("p",{children:e.message}),e.actionText&&e.actionFunction&&c.jsx("button",{onClick:()=>{e.actionFunction(),t()},children:e.actionText})]})}):null};function Le(){return c.jsx("div",{children:c.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",className:"size-6",children:c.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"})})})}function Ie(){return c.jsx("div",{children:c.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",className:"size-6",children:c.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"})})})}function Te(){const[e,t]=b.useState(!1);function o(){const r=document.querySelector("html"),n=r.getAttribute("data-theme");r.setAttribute("data-theme",n==="dark"?"light":"dark"),t(s=>!s)}return c.jsx("button",{className:"theme-toggle",onClick:o,children:e?c.jsx(Ie,{}):c.jsx(Le,{})})}const F=L(N(R((e,t)=>({user:{id:"",name:""},setUser:o=>{e({user:{id:o.id,name:o.name}})},removeUser:()=>e({user:{id:"",name:""}}),setUserName:o=>e({user:{...t().user,name:o}}),setUserId:o=>e({user:{...t().user,id:o}})}),{name:"user-storage",getStorage:()=>localStorage}))),je=()=>{const e=k(r=>r.token),t=k(r=>r.codeChallenge),o=I(r=>r.setError);b.useEffect(()=>{const r=ye("code",""),n=Z(e);if(!r&&!n)(async()=>{let d;try{d=await j.login(e)}catch(i){console.log("Error checking login:",i),o({message:"Si è verificato un errore durante il login. Si prega di riprovare più tardi."});return}d.success&&d.link!==null?console.log("Login successful"):d.error?(console.error("Error checking login:",d.error),o({message:"Si è verificato un errore durante il login.  Non si è autorizzati a visualizzare questa pagina."})):(k.getState().setCodeChallenge(d.code_challenge),console.log("Login failed, redirecting to login page"),window.location.href=d.link)})();else if(r&&t&&!n){(async()=>{let i;try{i=await j.obtainLoginCode(r,t)}catch(m){console.log("Error obtaining login code:",m),o({message:"Si è verificato un errore durante il login. Si prega di riprovare più tardi."});return}i.access_token?(console.log("Login successful"),k.getState().setToken(i.access_token)):(console.log("Login failed"),o({message:"L'utente non è autorizzato a visualizzare questa pagina."}))})();const d=new URL(window.location.href);console.log("Removing code and state from URL"),window.history.replaceState({},document.title,d.pathname)}else{console.log("Login successful");const s=new URL(window.location.href);window.history.replaceState({},document.title,s.pathname)}},[])},S=[];for(let e=0;e<256;++e)S.push((e+256).toString(16).slice(1));function Oe(e,t=0){return(S[e[t+0]]+S[e[t+1]]+S[e[t+2]]+S[e[t+3]]+"-"+S[e[t+4]]+S[e[t+5]]+"-"+S[e[t+6]]+S[e[t+7]]+"-"+S[e[t+8]]+S[e[t+9]]+"-"+S[e[t+10]]+S[e[t+11]]+S[e[t+12]]+S[e[t+13]]+S[e[t+14]]+S[e[t+15]]).toLowerCase()}let A;const Ne=new Uint8Array(16);function Re(){if(!A){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");A=crypto.getRandomValues.bind(crypto)}return A(Ne)}const De=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),G={randomUUID:De};function Me(e,t,o){if(G.randomUUID&&!t&&!e)return G.randomUUID();e=e||{};const r=e.random||(e.rng||Re)();return r[6]=r[6]&15|64,r[8]=r[8]&63|128,Oe(r)}function Ae(){const{session:e,initConversation:t}=be(),[o,r]=b.useState([]),{setConversation:n,setConversationStore:s}=w(),d=w.getState().conversation,i=F(l=>l.setUser),m=F(l=>l.user);k(l=>l.token),I(l=>l.setError);function u(l){e!=null&&e.store&&e.store.dispatch({type:"WEB_CHAT/SEND_MESSAGE",payload:{text:l}})}function v(){var l;(l=d.store.activities)!=null&&l.length&&(document.body.classList.add("show-splash"),document.body.classList.remove("message-sending"),u("/reset-simple"))}return je(),b.useEffect(()=>{(async()=>{if(!(e!=null&&e.directLine)||!(e!=null&&e.store)||!(e!=null&&e.key))try{await t()}catch(h){console.error("Error initializing session:",h)}e!=null&&e.store&&e.store.subscribe(()=>{s(e.store.getState())})})()},[e,t,s]),b.useEffect(()=>{const l=x.getState().conversationHistory;r(l)},[e,m.id]),b.useEffect(()=>{window.innerWidth>=992?document.body.classList.add("sidebar-open"):document.body.classList.remove("sidebar-open");const l=()=>{window.innerWidth>=768?document.body.classList.add("sidebar-open"):document.body.classList.remove("sidebar-open")};return window.addEventListener("resize",l),()=>{window.removeEventListener("resize",l)}},[]),b.useEffect(()=>{if(!m.id){console.log("Creating new user");const l={id:Me(),name:"Guest"};i(l)}}),c.jsx(_e,{children:c.jsxs("div",{className:"main-container",children:[c.jsx(xe,{}),c.jsxs("div",{className:"webchat-container",children:[c.jsxs("div",{className:"header",children:[c.jsx(Te,{}),c.jsxs("button",{className:"header-btn",onClick:v,children:[c.jsx(Ee,{}),"Nuova chat"]})]}),c.jsx("div",{className:"webchat-content",children:!!e.directLine&&!!e.store&&c.jsxs("div",{className:"container",children:[c.jsx(Ce,{}),c.jsx(te,{className:"chat",directLine:e.directLine,store:e.store,userID:m.id,username:m.name,styleOptions:{rootHeight:"100%",backgroundColor:"var(--webchat-bg)",bubbleTextColor:"var(--webchat-bubble-text-color)"},locale:"it-IT",text:!0,renderMarkdown:l=>Se(l)},e.key)]})})]})]})})}const Ue=console.error;window.console.error=(e,...t)=>{e.includes("Support for defaultProps will be removed")||e.includes("while rendering a different component")||e.includes("while rendering a different component")||Ue(e,...t)};K(document.getElementById("root")).render(c.jsx(Ae,{}));
