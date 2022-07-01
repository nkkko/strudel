"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});var t=require("react"),ce=require("react-codemirror6"),k=require("@codemirror/view"),W=require("@codemirror/state"),le=require("@codemirror/lang-javascript"),l=require("@codemirror/highlight"),ie=require("react-hook-inview"),ue=require("@strudel.cycles/eval"),de=require("@strudel.cycles/core/util.mjs"),b=require("@strudel.cycles/tone"),Q=require("@strudel.cycles/core"),C=require("@strudel.cycles/midi");function fe(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var d=fe(t);const ge="#abb2bf",me="#7d8799",pe="#ffffff",be="#21252b",j="rgba(0, 0, 0, 0.5)",he="transparent",O="#353a42",ve="rgba(128, 203, 196, 0.5)",U="#ffcc00",ye=k.EditorView.theme({"&":{color:"#ffffff",backgroundColor:he,fontSize:"15px","z-index":11},".cm-content":{caretColor:U,lineHeight:"22px"},".cm-line":{background:"#2C323699"},"&.cm-focused .cm-cursor":{backgroundColor:U,width:"3px"},"&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":{backgroundColor:ve},".cm-panels":{backgroundColor:be,color:"#ffffff"},".cm-panels.cm-panels-top":{borderBottom:"2px solid black"},".cm-panels.cm-panels-bottom":{borderTop:"2px solid black"},".cm-searchMatch":{backgroundColor:"#72a1ff59",outline:"1px solid #457dff"},".cm-searchMatch.cm-searchMatch-selected":{backgroundColor:"#6199ff2f"},".cm-activeLine":{backgroundColor:j},".cm-selectionMatch":{backgroundColor:"#aafe661a"},"&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket":{backgroundColor:"#bad0f847",outline:"1px solid #515a6b"},".cm-gutters":{background:"transparent",color:"#676e95",border:"none"},".cm-activeLineGutter":{backgroundColor:j},".cm-foldPlaceholder":{backgroundColor:"transparent",border:"none",color:"#ddd"},".cm-tooltip":{border:"none",backgroundColor:O},".cm-tooltip .cm-tooltip-arrow:before":{borderTopColor:"transparent",borderBottomColor:"transparent"},".cm-tooltip .cm-tooltip-arrow:after":{borderTopColor:O,borderBottomColor:O},".cm-tooltip-autocomplete":{"& > ul > li[aria-selected]":{backgroundColor:j,color:ge}}},{dark:!0}),we=l.HighlightStyle.define([{tag:l.tags.keyword,color:"#c792ea"},{tag:l.tags.operator,color:"#89ddff"},{tag:l.tags.special(l.tags.variableName),color:"#eeffff"},{tag:l.tags.typeName,color:"#f07178"},{tag:l.tags.atom,color:"#f78c6c"},{tag:l.tags.number,color:"#ff5370"},{tag:l.tags.definition(l.tags.variableName),color:"#82aaff"},{tag:l.tags.string,color:"#c3e88d"},{tag:l.tags.special(l.tags.string),color:"#f07178"},{tag:l.tags.comment,color:me},{tag:l.tags.variableName,color:"#f07178"},{tag:l.tags.tagName,color:"#ff5370"},{tag:l.tags.bracket,color:"#a2a1a4"},{tag:l.tags.meta,color:"#ffcb6b"},{tag:l.tags.attributeName,color:"#c792ea"},{tag:l.tags.propertyName,color:"#c792ea"},{tag:l.tags.className,color:"#decb6b"},{tag:l.tags.invalid,color:pe}]),Ce=[ye,we],$=W.StateEffect.define(),ke=W.StateField.define({create(){return k.Decoration.none},update(e,o){try{for(let r of o.effects)if(r.is($))if(r.value){const u=k.Decoration.mark({attributes:{style:"background-color: #FFCA2880"}});e=k.Decoration.set([u.range(0,o.newDoc.length)])}else e=k.Decoration.set([]);return e}catch(r){return console.warn("flash error",r),e}},provide:e=>k.EditorView.decorations.from(e)}),J=e=>{e.dispatch({effects:$.of(!0)}),setTimeout(()=>{e.dispatch({effects:$.of(!1)})},200)},P=W.StateEffect.define(),Me=W.StateField.define({create(){return k.Decoration.none},update(e,o){try{for(let r of o.effects)r.is(P)&&(e=k.Decoration.set(r.value.flatMap(u=>(u.context.locations||[]).map(({start:g,end:i})=>{const c=u.context.color||"#FFCA28";let m=o.newDoc.line(g.line).from+g.column,s=o.newDoc.line(i.line).from+i.column;const a=o.newDoc.length;return m>a||s>a?void 0:k.Decoration.mark({attributes:{style:`outline: 1px solid ${c}`}}).range(m,s)})).filter(Boolean),!0));return e}catch{return e}},provide:e=>k.EditorView.decorations.from(e)});function X({value:e,onChange:o,onViewChanged:r,onCursor:u,options:g,editorDidMount:i,theme:c}){return d.default.createElement(d.default.Fragment,null,d.default.createElement(ce.CodeMirror,{onViewChange:r,style:{display:"flex",flexDirection:"column",flex:"1 0 auto"},value:e,onChange:o,extensions:[le.javascript(),c||Ce,Me,ke]}))}function Y(e){const{onEvent:o,onQuery:r,onSchedule:u,ready:g=!0,onDraw:i}=e,[c,m]=t.useState(!1),s=1,a=()=>Math.floor(b.Tone.getTransport().seconds/s),x=(p=a())=>{const N=new Q.TimeSpan(p,p+1),R=r?.(new Q.State(N))||[];u?.(R,p);const F=N.begin.valueOf();b.Tone.getTransport().cancel(F);const w=(p+1)*s-.5,B=Math.max(b.Tone.getTransport().seconds,w)+.1;b.Tone.getTransport().schedule(()=>{x(p+1)},B),R?.filter(h=>h.part.begin.equals(h.whole?.begin)).forEach(h=>{b.Tone.getTransport().schedule(v=>{o(v,h,b.Tone.getContext().currentTime),b.Tone.Draw.schedule(()=>{i?.(v,h)},v)},h.part.begin.valueOf())})};t.useEffect(()=>{g&&x()},[o,u,r,i,g]);const _=async()=>{m(!0),await b.Tone.start(),b.Tone.getTransport().start("+0.1")},S=(p=!1)=>{p?(b.Tone.getTransport().cancel(),b.Tone.getTransport().stop()):b.Tone.getTransport().pause(),m(!1)};return{start:_,stop:S,onEvent:o,started:c,setStarted:m,toggle:()=>c?S():_(),query:x,activeCycle:a}}function Z(e){return t.useEffect(()=>(window.addEventListener("message",e),()=>window.removeEventListener("message",e)),[e]),t.useCallback(o=>window.postMessage(o,"*"),[])}let Ee=()=>Math.floor((1+Math.random())*65536).toString(16).substring(1);const Te=e=>encodeURIComponent(btoa(e));function ee({tune:e,defaultSynth:o,autolink:r=!0,onEvent:u,onDraw:g}){const i=t.useMemo(()=>Ee(),[]),[c,m]=t.useState(e),[s,a]=t.useState(),[x,_]=t.useState(""),[S,D]=t.useState(),[p,N]=t.useState(!1),[R,F]=t.useState(""),[w,B]=t.useState(),h=t.useMemo(()=>c!==s||S,[c,s,S]),v=t.useCallback(f=>_(n=>n+`${n?`

`:""}${f}`),[]),L=t.useMemo(()=>{if(s&&!s.includes("strudel disable-highlighting"))return(f,n)=>g?.(f,n,s)},[s,g]),z=t.useMemo(()=>s&&s.includes("strudel hide-header"),[s]),y=Y({onDraw:L,onEvent:t.useCallback((f,n,E)=>{try{u?.(f,n,E),n.context.logs?.length&&n.context.logs.forEach(v);const{onTrigger:q,velocity:ne}=n.context;if(q)q(f,n,E,1);else if(o){const se=de.getPlayableNoteValue(n);o.triggerAttackRelease(se,n.duration.valueOf(),f,ne)}else if(!u)throw new Error("no defaultSynth nor onEvent passed to useRepl + event has no onTrigger. nothing happens")}catch(q){console.warn(q),q.message="unplayable event: "+q?.message,v(q.message)}},[u,v,o]),onQuery:t.useCallback(f=>{try{return w?.query(f)||[]}catch(n){return console.warn(n),n.message="query error: "+n.message,D(n),[]}},[w]),onSchedule:t.useCallback((f,n)=>oe(f,n),[]),ready:!!w&&!!s}),M=Z(({data:{from:f,type:n}})=>{n==="start"&&f!==i&&(y.setStarted(!1),a(void 0))}),A=t.useCallback(async(f=c,n=!1)=>{if(s&&!h){D(void 0),!n&&y.start();return}try{N(!0);const E=await ue.evaluate(f);!n&&y.start(),M({type:"start",from:i}),B(()=>E.pattern),r&&(window.location.hash="#"+encodeURIComponent(btoa(c))),F(Te(c)),D(void 0),a(f),N(!1)}catch(E){E.message="evaluation error: "+E.message,console.warn(E),D(E)}},[s,h,c,y,r,i,M]),oe=(f,n)=>{f.length},ae=()=>{y.started?y.stop():A()},K=()=>{y.stop(!0),a(void 0)},re=()=>{A(c,!0)};return t.useEffect(()=>()=>K(),[]),{hideHeader:z,pending:p,code:c,setCode:m,pattern:w,error:S,cycle:y,setPattern:B,dirty:h,log:x,togglePlay:ae,stop:K,setActiveCode:a,activateCode:A,evaluateOnly:re,activeCode:s,pushLog:v,hash:R}}function V(...e){return e.filter(Boolean).join(" ")}let H=[],G;function te({view:e,pattern:o,active:r}){t.useEffect(()=>{if(e)if(o&&r){let g=function(){try{const i=b.Tone.getTransport().seconds,m=[Math.max(G||i,i-1/10),i+1/60];G=i+1/60,H=H.filter(a=>a.whole.end>i);const s=o.queryArc(...m).filter(a=>a.hasOnset());H=H.concat(s),e.dispatch({effects:P.of(H)})}catch{e.dispatch({effects:P.of([])})}u=requestAnimationFrame(g)},u=requestAnimationFrame(g);return()=>{cancelAnimationFrame(u)}}else H=[],e.dispatch({effects:P.of([])})},[o,r,e])}const xe="_container_10e1g_1",_e="_header_10e1g_5",Se="_buttons_10e1g_9",De="_button_10e1g_9",Ne="_buttonDisabled_10e1g_17",qe="_error_10e1g_21",Re="_body_10e1g_25";var T={container:xe,header:_e,buttons:Se,button:De,buttonDisabled:Ne,error:qe,body:Re};function I({type:e}){return d.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"sc-h-5 sc-w-5",viewBox:"0 0 20 20",fill:"currentColor"},{refresh:d.default.createElement("path",{fillRule:"evenodd",d:"M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z",clipRule:"evenodd"}),play:d.default.createElement("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z",clipRule:"evenodd"}),pause:d.default.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z",clipRule:"evenodd"}),stop:d.default.createElement("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z",clipRule:"evenodd"})}[e])}function Be({tune:e,defaultSynth:o,hideOutsideView:r=!1,theme:u,init:g,onEvent:i,enableKeyboard:c}){const{code:m,setCode:s,pattern:a,activeCode:x,activateCode:_,evaluateOnly:S,error:D,cycle:p,dirty:N,togglePlay:R,stop:F}=ee({tune:e,defaultSynth:o,autolink:!1,onEvent:i});t.useEffect(()=>{g&&S()},[e,g]);const[w,B]=t.useState(),[h,v]=ie.useInView({threshold:.01}),L=t.useRef(),z=t.useMemo(()=>((v||!r)&&(L.current=!0),v||L.current),[v,r]);return te({view:w,pattern:a,active:p.started&&!x?.includes("strudel disable-highlighting")}),t.useLayoutEffect(()=>{if(c){const y=async M=>{(M.ctrlKey||M.altKey)&&(M.code==="Enter"?(M.preventDefault(),console.log("flash.."),J(w),await _()):M.code==="Period"&&(p.stop(),M.preventDefault()))};return window.addEventListener("keydown",y,!0),()=>window.removeEventListener("keydown",y,!0)}},[c,a,m,_,p,w]),d.default.createElement("div",{className:T.container,ref:h},d.default.createElement("div",{className:T.header},d.default.createElement("div",{className:T.buttons},d.default.createElement("button",{className:V(T.button,p.started?"sc-animate-pulse":""),onClick:()=>R()},d.default.createElement(I,{type:p.started?"pause":"play"})),d.default.createElement("button",{className:V(N?T.button:T.buttonDisabled),onClick:()=>_()},d.default.createElement(I,{type:"refresh"})),d.default.createElement("button",{className:V(T.button),onClick:()=>F(!0)},d.default.createElement(I,{type:"stop"}))),D&&d.default.createElement("div",{className:T.error},D.message)),d.default.createElement("div",{className:T.body},z&&d.default.createElement(X,{theme:u,value:m,onChange:s,onViewChanged:B})))}function He(e){const{ready:o,connected:r,disconnected:u}=e,[g,i]=t.useState(!0),[c,m]=t.useState(C.WebMidi?.outputs||[]);return t.useEffect(()=>{C.enableWebMidi().then(()=>{C.WebMidi.addListener("connected",a=>{m([...C.WebMidi.outputs]),r?.(C.WebMidi,a)}),C.WebMidi.addListener("disconnected",a=>{m([...C.WebMidi.outputs]),u?.(C.WebMidi,a)}),o?.(C.WebMidi),i(!1)}).catch(a=>{if(a){console.error(a),console.warn("Web Midi could not be enabled..");return}})},[o,r,u,c]),{loading:g,outputs:c,outputByName:a=>C.WebMidi.getOutputByName(a)}}exports.CodeMirror=X;exports.MiniRepl=Be;exports.cx=V;exports.flash=J;exports.useCycle=Y;exports.useHighlighting=te;exports.usePostMessage=Z;exports.useRepl=ee;exports.useWebMidi=He;