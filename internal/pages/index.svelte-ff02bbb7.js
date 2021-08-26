import{S as e,i as a,s as t,e as n,c as i,b as r,f as s,J as o,I as l,d as c,D as m,a as d,K as u,E as p,F as h,G as f,x as y,u as $,L as Q,M as g,N as v,O as b,P as w,Q as E,R as k,t as x,k as A,j as S,g as C,n as j,m as B,H as P,T as W,o as T,v as F,w as I,U as M,V as N,W as O,r as L}from"../chunks/vendor-c4e9d243.js";function D(e){let a,t,m;return{c(){a=n("input"),this.h()},l(e){a=i(e,"INPUT",{type:!0,accept:!0}),this.h()},h(){r(a,"type","file"),r(a,"accept",".geojson,.gpx")},m(n,i){s(n,a,i),t||(m=o(a,"change",e[1]),t=!0)},p:l,i:l,o:l,d(e){e&&c(a),t=!1,m()}}}function H(e,a,t){let{files:n}=a;return e.$$set=e=>{"files"in e&&t(0,n=e.files)},[n,function(){n=this.files,t(0,n)}]}class R extends e{constructor(e){super(),a(this,e,H,D,t,{files:0})}}function q(e){let a,t,l,Q;const g=e[5].default,v=m(g,e,e[4],null);return{c(){a=n("button"),v&&v.c(),this.h()},l(e){a=i(e,"BUTTON",{class:!0});var t=d(a);v&&v.l(t),t.forEach(c),this.h()},h(){r(a,"class","button"),u(a,"clicked",e[1]),u(a,"disabled",e[0])},m(n,i){s(n,a,i),v&&v.m(a,null),t=!0,l||(Q=o(a,"click",e[2]),l=!0)},p(e,[n]){v&&v.p&&(!t||16&n)&&p(v,g,e,e[4],t?f(g,e[4],n,null):h(e[4]),null),2&n&&u(a,"clicked",e[1]),1&n&&u(a,"disabled",e[0])},i(e){t||(y(v,e),t=!0)},o(e){$(v,e),t=!1},d(e){e&&c(a),v&&v.d(e),l=!1,Q()}}}function U(e,a,t){let{$$slots:n={},$$scope:i}=a,{name:r}=a,{disabled:s=!1}=a;const o=Q();let l;return e.$$set=e=>{"name"in e&&t(3,r=e.name),"disabled"in e&&t(0,s=e.disabled),"$$scope"in e&&t(4,i=e.$$scope)},[s,l,e=>{if(t(1,l=!0),setTimeout((()=>t(1,l=!1)),100),!s)return o("click",r)},r,i,n]}class V extends e{constructor(e){super(),a(this,e,U,q,t,{name:3,disabled:0})}}var J=[{name:"Supermarket and convenience store",query:[{shop:"convenience"},{shop:"supermarket"}]},{name:"Bicycle shop",query:[{shop:"bicycle"}]},{name:"Playground",query:[{leisure:"playground"}]},{name:"Bakery",query:[{shop:"bakery"}]},{name:"Café and restaurant",query:[{amenity:"cafe"},{amenity:"restaurant"}]},{name:"Benches",query:[{amenity:"bench"}]}],G=async(e,a,t,n=1)=>{let i=((e,a)=>{let t;if("FeatureCollection"===e.type)t=e.features[0];else{if("Feature"!==e.type)throw new Error("No Feature found in GeoJson");t=e}return v(t,a,{units:"kilometers"})})(await(e=>new Promise(((a,t)=>{const n=e.name.split(".").pop();if(!e||"geojson"!==n&&"gpx"!==n)return t(new Error("Format not supported. Please provide a .geojson or .gpx."));{const i=new FileReader;i.addEventListener("load",(()=>{const e=i.result;return e?a("geojson"===n?JSON.parse(e):g((new DOMParser).parseFromString(e,"text/xml"))):t(new Error("Could not read the provided file."))})),i.readAsText(e)}})))(e),n);console.log(i);let r=b(i,{highQuality:!0,mutate:!1,tolerance:.05});console.log(r);let s="";r.geometry.coordinates[0].map((e=>{s+=e[1]+" "+e[0]+" "})),s=s.trimEnd();let o="";a.map((e=>o+=`nwr["${Object.keys(e)[0]}"="${e[Object.keys(e)[0]]}"](poly:"${s}");`));const l=`[out:json][timeout:150];(${o});(._;>;);out center;`,c=await(async e=>{const a=await fetch("https://overpass-api.de/api/interpreter?data="+encodeURIComponent(e),{mode:"cors",headers:{"Content-Type":"application/json"}});if(!a.ok){const e=`An error has occured: ${a.status}`;throw new Error(e)}return await a.json()})(l);console.log(c);let m=w(c);console.log(m),((e,a)=>{const t=a+".geojson";let n=JSON.stringify(e),i="data:application/json;charset=utf-8,"+encodeURIComponent(n),r=document.createElement("a");r.setAttribute("href",i),r.setAttribute("download",t),r.setAttribute("download",t),r.click(),r.remove()})(m,t)};var _={architecture:{name:"Architecture & buildings",types:[{name:"Building",id:"Q41176"},{name:"Bridge",id:"Q12280"},{name:"Architectural structure",id:"Q811979"},{name:"Windmill",id:"Q38720"},{name:"City hall",id:"Q543654"},{name:"Belfry",id:"Q815448"},{name:"Cathedral",id:"Q2977"},{name:"Manor house",id:"Q879050"},{name:"War memorial",id:"Q575759"},{name:"Roman city",id:"Q2202509"}]},art:{name:"Art & Culture",types:[{name:"Museum",id:"Q33506"},{name:"Art museum",id:"Q207694"},{name:"Statue",id:"Q179700"},{name:"Archive",id:"Q166118"},{name:"Military museum",id:"Q2772772"},{name:"Heritage library",id:"Q2208411"},{name:"Theatre",id:"Q24354"},{name:"Sculpture",id:"Q860861"}]},bio:{name:"Bio & Permaculture",types:[]},food:{name:"Food & Drinks",types:[{name:"Abbey",id:"Q160742"},{name:"Brewery",id:"Q131734"}]},history:{name:"History",types:[{name:"Château",id:"Q751876"},{name:"Battle",id:"Q178561"},{name:"Commonwealth War Graves Commission maintained cemetery",id:"Q14750991"},{name:"Castle",id:"Q23413"},{name:"Abbey",id:"Q160742"},{name:"Monastery",id:"Q44613"},{name:"Fort",id:"Q1785071"},{name:"Statue",id:"Q179700"},{name:"Archive",id:"Q166118"},{name:"Siege",id:"Q188055"},{name:"Belfry",id:"Q815448"},{name:"Heritage library",id:"Q2208411"},{name:"Cathedral",id:"Q2977"},{name:"Sculpture",id:"Q860861"},{name:"Manor house",id:"Q879050"},{name:"War memorial",id:"Q575759"},{name:"Tumulus",id:"Q34023"},{name:"Enclave",id:"Q171441"},{name:"Roman city",id:"Q2202509"}]},miscellaneous:{name:"Hidden miscellaneous places ",types:[{name:"Tourist attraction",id:"Q570116"}]},nature:{name:"Wildlife & Nature",types:[{name:"Natural landscape",id:"Q1286517"},{name:"Forest",id:"Q4421"},{name:"Park",id:"Q22698"},{name:"Hill",id:"Q54050"},{name:"Mountain",id:"Q8502"}]},photography:{name:"Photography",types:[{name:"Windmill",id:"Q38720"},{name:"Tourist attraction",id:"Q570116"}]},religious:{name:"Religious buildings",types:[{name:"Parish church",id:"Q317557"},{name:"Chapel",id:"Q108325"},{name:"Church building",id:"Q16970"},{name:"Abbey",id:"Q160742"},{name:"Monastery",id:"Q44613"},{name:"Cathedral",id:"Q2977"}]},science:{name:"Science",types:[{name:"Federal scientific Institute",id:"Q2288140"}]},sports:{name:"Sports",types:[{name:"Association football venue",id:"Q1154710"},{name:"Stadium",id:"Q483110"}]},water:{name:"Seaside & water",types:[{name:"River",id:"Q4022"},{name:"Canal",id:"Q12284"},{name:"Main stream",id:"Q573344"},{name:"Stream",id:"Q47521"},{name:"Watermill",id:"Q185187"},{name:"Fountain",id:"Q483453"},{name:"Port settlement",id:"Q2264924"},{name:"Seaport",id:"Q15310171"}]}};function K(e,a,t){const n=e.slice();return n[16]=a[t],n[18]=t,n}function z(e){let a,t,l,m,u,p,h,f,Q,g,v,b,w,E,k,N,O,D,H=J,R=[];for(let n=0;n<H.length;n+=1)R[n]=Y(K(e,H,n));const q=e=>$(R[e],1,1,(()=>{R[e]=null}));return k=new V({props:{name:"wikidata",$$slots:{default:[Z]},$$scope:{ctx:e}}}),k.$on("click",e[5]),{c(){a=n("h2"),t=x("Overpass"),l=A();for(let e=0;e<R.length;e+=1)R[e].c();m=A(),u=n("h2"),p=x("Wikidata"),h=A(),f=n("label"),Q=n("input"),g=A(),v=n("div"),b=n("small"),w=x("Enter each language code and separate them by a comma (,)."),E=A(),S(k.$$.fragment),this.h()},l(e){a=i(e,"H2",{});var n=d(a);t=C(n,"Overpass"),n.forEach(c),l=j(e);for(let a=0;a<R.length;a+=1)R[a].l(e);m=j(e),u=i(e,"H2",{});var r=d(u);p=C(r,"Wikidata"),r.forEach(c),h=j(e),f=i(e,"LABEL",{});var s=d(f);Q=i(s,"INPUT",{type:!0}),g=j(s),v=i(s,"DIV",{});var o=d(v);b=i(o,"SMALL",{});var y=d(b);w=C(y,"Enter each language code and separate them by a comma (,)."),y.forEach(c),o.forEach(c),s.forEach(c),E=j(e),B(k.$$.fragment,e),this.h()},h(){r(Q,"type","text")},m(n,i){s(n,a,i),P(a,t),s(n,l,i);for(let e=0;e<R.length;e+=1)R[e].m(n,i);s(n,m,i),s(n,u,i),P(u,p),s(n,h,i),s(n,f,i),P(f,Q),W(Q,e[1]),P(f,g),P(f,v),P(v,b),P(b,w),s(n,E,i),T(k,n,i),N=!0,O||(D=o(Q,"input",e[9]),O=!0)},p(e,a){if(29&a){let t;for(H=J,t=0;t<H.length;t+=1){const n=K(e,H,t);R[t]?(R[t].p(n,a),y(R[t],1)):(R[t]=Y(n),R[t].c(),y(R[t],1),R[t].m(m.parentNode,m))}for(L(),t=H.length;t<R.length;t+=1)q(t);I()}2&a&&Q.value!==e[1]&&W(Q,e[1]);const t={};524288&a&&(t.$$scope={dirty:a,ctx:e}),k.$set(t)},i(e){if(!N){for(let e=0;e<H.length;e+=1)y(R[e]);y(k.$$.fragment,e),N=!0}},o(e){R=R.filter(Boolean);for(let a=0;a<R.length;a+=1)$(R[a]);$(k.$$.fragment,e),N=!1},d(e){e&&c(a),e&&c(l),M(R,e),e&&c(m),e&&c(u),e&&c(h),e&&c(f),e&&c(E),F(k,e),O=!1,D()}}}function X(e){let a,t=e[16].name+"";return{c(){a=x(t)},l(e){a=C(e,t)},m(e,t){s(e,a,t)},p:l,d(e){e&&c(a)}}}function Y(e){let a,t;return a=new V({props:{name:e[16].name,$$slots:{default:[X]},$$scope:{ctx:e}}}),a.$on("click",(function(){return e[8](e[16])})),{c(){S(a.$$.fragment)},l(e){B(a.$$.fragment,e)},m(e,n){T(a,e,n),t=!0},p(t,n){e=t;const i={};524288&n&&(i.$$scope={dirty:n,ctx:e}),a.$set(i)},i(e){t||(y(a.$$.fragment,e),t=!0)},o(e){$(a.$$.fragment,e),t=!1},d(e){F(a,e)}}}function Z(e){let a;return{c(){a=x("Wikidata")},l(e){a=C(e,"Wikidata")},m(e,t){s(e,a,t)},d(e){e&&c(a)}}}function ee(e){let a,t,l,m,u,p,h,f,Q,g,v,b,w,M,D,H,q,U;function V(a){e[6](a)}let J={};void 0!==e[2]&&(J.files=e[2]),l=new R({props:J}),E.push((()=>k(l,"files",V)));let G=e[2]&&e[2][0]&&z(e);return{c(){a=n("div"),t=n("div"),S(l.$$.fragment),u=A(),p=n("div"),h=n("label"),f=x("Within "),Q=n("input"),g=x(" meters"),v=A(),b=n("div"),w=n("small"),M=x("Only values between 1 and 50000 are allowed"),D=A(),G&&G.c(),this.h()},l(e){a=i(e,"DIV",{class:!0});var n=d(a);t=i(n,"DIV",{});var r=d(t);B(l.$$.fragment,r),r.forEach(c),u=j(n),p=i(n,"DIV",{class:!0});var s=d(p);h=i(s,"LABEL",{});var o=d(h);f=C(o,"Within "),Q=i(o,"INPUT",{type:!0,max:!0}),g=C(o," meters"),o.forEach(c),v=j(s),b=i(s,"DIV",{});var m=d(b);w=i(m,"SMALL",{});var y=d(w);M=C(y,"Only values between 1 and 50000 are allowed"),y.forEach(c),m.forEach(c),s.forEach(c),D=j(n),G&&G.l(n),n.forEach(c),this.h()},h(){r(Q,"type","number"),r(Q,"max",ae),r(p,"class","raduis"),r(a,"class","container svelte-a5c4d2")},m(n,i){s(n,a,i),P(a,t),T(l,t,null),P(a,u),P(a,p),P(p,h),P(h,f),P(h,Q),W(Q,e[0]),P(h,g),P(p,v),P(p,b),P(b,w),P(w,M),P(a,D),G&&G.m(a,null),H=!0,q||(U=o(Q,"input",e[7]),q=!0)},p(e,[t]){const n={};!m&&4&t&&(m=!0,n.files=e[2],N((()=>m=!1))),l.$set(n),1&t&&O(Q.value)!==e[0]&&W(Q,e[0]),e[2]&&e[2][0]?G?(G.p(e,t),4&t&&y(G,1)):(G=z(e),G.c(),y(G,1),G.m(a,null)):G&&(L(),$(G,1,1,(()=>{G=null})),I())},i(e){H||(y(l.$$.fragment,e),y(G),H=!0)},o(e){$(l.$$.fragment,e),$(G),H=!1},d(e){e&&c(a),F(l),G&&G.d(),q=!1,U()}}}const ae=5e4;function te(e,a,t){var n=this&&this.__awaiter||function(e,a,t,n){return new(t||(t=Promise))((function(i,r){function s(e){try{l(n.next(e))}catch(a){r(a)}}function o(e){try{l(n.throw(e))}catch(a){r(a)}}function l(e){var a;e.done?i(e.value):(a=e.value,a instanceof t?a:new t((function(e){e(a)}))).then(s,o)}l((n=n.apply(e,a||[])).next())}))};let i,r,s=1e3,o="fr, nl, en";(()=>{const e=new Set;for(const a in _)for(const t of _[a].types)e.add(t.id)})();const l=e=>{const a=e.split(".");return a.pop(),a.join(".")};return e.$$.update=()=>{1&e.$$.dirty&&(s<1?t(0,s=1):s>ae&&t(0,s=ae),t(3,r=s/1e3)),2&e.$$.dirty&&o&&o.split(/[ ,]+/)},[s,o,i,r,l,()=>n(void 0,void 0,void 0,(function*(){})),function(e){i=e,t(2,i)},function(){s=O(this.value),t(0,s)},e=>G(i[0],e.query,`${l(i[0].name)}---${s}m---${e.name}`,r),function(){o=this.value,t(1,o)}]}class ne extends e{constructor(e){super(),a(this,e,te,ee,t,{})}}export{ne as default};