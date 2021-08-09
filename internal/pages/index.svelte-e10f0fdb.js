import{S as e,i as t,s as n,e as a,c as s,b as o,f as r,J as i,I as l,d as c,D as u,a as p,K as d,E as m,F as f,G as $,x as h,u as g,L as y,M as w,N as b,O as k,P as j,Q as E,R as v,T as O,U as P,V as x,W as I,k as T,j as A,n as q,m as L,o as N,v as C,w as S,X as R,H as F,Y as B,r as U,t as W,g as D}from"../chunks/vendor-e943fc4f.js";function J(e){let t,n,u;return{c(){t=a("input"),this.h()},l(e){t=s(e,"INPUT",{type:!0,accept:!0}),this.h()},h(){o(t,"type","file"),o(t,"accept",".geojson,.gpx")},m(a,s){r(a,t,s),n||(u=i(t,"change",e[1]),n=!0)},p:l,i:l,o:l,d(e){e&&c(t),n=!1,u()}}}function V(e,t,n){let{files:a}=t;return e.$$set=e=>{"files"in e&&n(0,a=e.files)},[a,function(){a=this.files,n(0,a)}]}class Q extends e{constructor(e){super(),t(this,e,V,J,n,{files:0})}}function G(e){let t,n,l,y;const w=e[5].default,b=u(w,e,e[4],null);return{c(){t=a("button"),b&&b.c(),this.h()},l(e){t=s(e,"BUTTON",{class:!0});var n=p(t);b&&b.l(n),n.forEach(c),this.h()},h(){o(t,"class","button"),d(t,"clicked",e[1]),d(t,"disabled",e[0])},m(a,s){r(a,t,s),b&&b.m(t,null),n=!0,l||(y=i(t,"click",e[2]),l=!0)},p(e,[a]){b&&b.p&&(!n||16&a)&&m(b,w,e,e[4],n?$(w,e[4],a,null):f(e[4]),null),2&a&&d(t,"clicked",e[1]),1&a&&d(t,"disabled",e[0])},i(e){n||(h(b,e),n=!0)},o(e){g(b,e),n=!1},d(e){e&&c(t),b&&b.d(e),l=!1,y()}}}function H(e,t,n){let{$$slots:a={},$$scope:s}=t,{name:o}=t,{disabled:r=!1}=t;const i=y();let l;return e.$$set=e=>{"name"in e&&n(3,o=e.name),"disabled"in e&&n(0,r=e.disabled),"$$scope"in e&&n(4,s=e.$$scope)},[r,l,e=>{if(n(1,l=!0),setTimeout((()=>n(1,l=!1)),100),!r)return i("click",o)},o,s,a]}class M extends e{constructor(e){super(),t(this,e,H,G,n,{name:3,disabled:0})}}var X=(e,t)=>{const n=t+".geojson";let a=JSON.stringify(e),s="data:application/json;charset=utf-8,"+encodeURIComponent(a),o=document.createElement("a");o.setAttribute("href",s),o.setAttribute("download",n),o.setAttribute("download",n),o.click(),o.remove()},K=e=>new Promise(((t,n)=>{const a=e.name.split(".").pop();if(!e||"geojson"!==a&&"gpx"!==a)return n(new Error("Format not supported. Please provide a .geojson or .gpx."));{const s=new FileReader;s.addEventListener("load",(()=>{const e=s.result;return e?t("geojson"===a?JSON.parse(e):w((new DOMParser).parseFromString(e,"text/xml"))):n(new Error("Could not read the provided file."))})),s.readAsText(e)}})),Y=(e,t)=>{let n;if("FeatureCollection"===e.type)n=e.features[0];else{if("Feature"!==e.type)throw new Error("No Feature found in GeoJson");n=e}return b(n,t,{units:"kilometers"})},_=async(e,t,n)=>{let a=await K(e),s=Y(a,2);console.log(s);let o=k(s,{highQuality:!0,mutate:!1,tolerance:.05});console.log(o);let r="";o.geometry.coordinates[0].map((e=>{r+=e[1]+" "+e[0]+" "})),r=r.trimEnd();let i="";t.map((e=>i+=`way["${Object.keys(e)[0]}"="${e[Object.keys(e)[0]]}"](poly:"${r}");`));const l=`[out:json][timeout:150];(${i});(._;>;);out meta;`,c=await(async e=>{const t=await fetch("https://overpass-api.de/api/interpreter?data="+encodeURIComponent(e),{mode:"cors",headers:{"Content-Type":"application/json"}});return await t.json()})(l);console.log(c);let u=j(c);console.log(u),X(u,n)};var z=[{name:"Supermarket and convenience store",query:[{shop:"convenience"},{shop:"supermarket"}]},{name:"Bicycle shop",query:[{shop:"bicycle"}]},{name:"Playground",query:[{leisure:"playground"}]},{name:"Bakery",query:[{shop:"bakery"}]},{name:"Café and restaurant",query:[{amenity:"cafe"},{amenity:"restaurant"}]},{name:"Benches",query:[{amenity:"bench"}]}];class Z{constructor(e="https://query.wikidata.org/sparql"){this.endpoint=e}query(e,t=!0){const n=this.endpoint+"?query="+encodeURIComponent(e);return fetch(n,{headers:{Accept:"application/sparql-results+json"}}).then((e=>e.json())).then((e=>t?this.simplify(e):e))}simplify(e){return e.results.bindings.map((e=>(Object.keys(e).forEach((function(t,n){e[t]=e[t].value})),e)))}}var ee=e=>E(e.map((e=>{const t=e.location.replace("Point(","").replace(")","").split(" ").map(Number);return delete e.location,v(t,e)}))),te=async e=>{const t=new Z,n=await K(e),a=Y(n,1),s=O(a),o=ee(await t.query(((e,t)=>{const n=["fr","nl","en"],a=n.reduce(((e,t)=>{const n=`?${t}Article`;return e[n]=`OPTIONAL {\n      ${n} schema:about ?place.\n      ${n} schema:isPartOf <https://${t}.wikipedia.org/>.\n    }`,e}),{});return`\n  SELECT ?place ?location ?placeLabel ?instanceLabel ?image ${Object.keys(a).join(" ")} ?prefArticle WHERE {\n    SERVICE wikibase:box {\n      ?place wdt:P625 ?location .\n      bd:serviceParam wikibase:cornerWest "Point(${e[0]} ${e[1]})"^^geo:wktLiteral .\n        bd:serviceParam wikibase:cornerEast "Point(${t[0]} ${t[1]})"^^geo:wktLiteral .\n      }\n    OPTIONAL { ?place wdt:P31 ?instance }\n    FILTER NOT EXISTS {?instance wdt:P279 wd:Q34442.}\n    OPTIONAL { ?place wdt:P18 ?image. }\n    ${Object.values(a).join("\n")}\n    BIND(COALESCE(${Object.keys(a).join(", ")}, "") AS ?prefArticle)\n    FILTER (?prefArticle != "")\n    SERVICE wikibase:label { bd:serviceParam wikibase:language "${n.join(",")}". }\n  }`})([s[0],s[1]],[s[2],s[3]])));return P(o,a)};function ne(e,t,n){const a=e.slice();return a[6]=t[n],a[8]=n,a}function ae(e){let t,n,a,s=z,o=[];for(let r=0;r<s.length;r+=1)o[r]=oe(ne(e,s,r));const i=e=>g(o[e],1,1,(()=>{o[e]=null}));return n=new M({props:{name:"wikidata",$$slots:{default:[re]},$$scope:{ctx:e}}}),n.$on("click",e[4]),{c(){for(let e=0;e<o.length;e+=1)o[e].c();t=T(),A(n.$$.fragment)},l(e){for(let t=0;t<o.length;t+=1)o[t].l(e);t=q(e),L(n.$$.fragment,e)},m(e,s){for(let t=0;t<o.length;t+=1)o[t].m(e,s);r(e,t,s),N(n,e,s),a=!0},p(e,a){if(1&a){let n;for(s=z,n=0;n<s.length;n+=1){const r=ne(e,s,n);o[n]?(o[n].p(r,a),h(o[n],1)):(o[n]=oe(r),o[n].c(),h(o[n],1),o[n].m(t.parentNode,t))}for(U(),n=s.length;n<o.length;n+=1)i(n);S()}const r={};512&a&&(r.$$scope={dirty:a,ctx:e}),n.$set(r)},i(e){if(!a){for(let e=0;e<s.length;e+=1)h(o[e]);h(n.$$.fragment,e),a=!0}},o(e){o=o.filter(Boolean);for(let t=0;t<o.length;t+=1)g(o[t]);g(n.$$.fragment,e),a=!1},d(e){R(o,e),e&&c(t),C(n,e)}}}function se(e){let t,n=e[6].name+"";return{c(){t=W(n)},l(e){t=D(e,n)},m(e,n){r(e,t,n)},p:l,d(e){e&&c(t)}}}function oe(e){let t,n;return t=new M({props:{name:e[6].name,$$slots:{default:[se]},$$scope:{ctx:e}}}),t.$on("click",(function(){return e[3](e[6])})),{c(){A(t.$$.fragment)},l(e){L(t.$$.fragment,e)},m(e,a){N(t,e,a),n=!0},p(n,a){e=n;const s={};512&a&&(s.$$scope={dirty:a,ctx:e}),t.$set(s)},i(e){n||(h(t.$$.fragment,e),n=!0)},o(e){g(t.$$.fragment,e),n=!1},d(e){C(t,e)}}}function re(e){let t;return{c(){t=W("Wikidata")},l(e){t=D(e,"Wikidata")},m(e,n){r(e,t,n)},d(e){e&&c(t)}}}function ie(e){let t,n,i,l,u;function d(t){e[2](t)}let m={};void 0!==e[0]&&(m.files=e[0]),n=new Q({props:m}),x.push((()=>I(n,"files",d)));let f=e[0]&&e[0][0]&&ae(e);return{c(){t=a("div"),A(n.$$.fragment),l=T(),f&&f.c(),this.h()},l(e){t=s(e,"DIV",{class:!0});var a=p(t);L(n.$$.fragment,a),l=q(a),f&&f.l(a),a.forEach(c),this.h()},h(){o(t,"class","container svelte-a5c4d2")},m(e,a){r(e,t,a),N(n,t,null),F(t,l),f&&f.m(t,null),u=!0},p(e,[a]){const s={};!i&&1&a&&(i=!0,s.files=e[0],B((()=>i=!1))),n.$set(s),e[0]&&e[0][0]?f?(f.p(e,a),1&a&&h(f,1)):(f=ae(e),f.c(),h(f,1),f.m(t,null)):f&&(U(),g(f,1,1,(()=>{f=null})),S())},i(e){u||(h(n.$$.fragment,e),h(f),u=!0)},o(e){g(n.$$.fragment,e),g(f),u=!1},d(e){e&&c(t),C(n),f&&f.d()}}}function le(e,t,n){let a;const s=e=>{const t=e.split(".");return t.pop(),t.join(".")};return[a,s,function(e){a=e,n(0,a)},e=>_(a[0],e.query,a[0].name+" --- "+e.name),async()=>X(await te(a[0]),`${s(a[0].name)}---wikidata`)]}class ce extends e{constructor(e){super(),t(this,e,le,ie,n,{})}}export{ce as default};
