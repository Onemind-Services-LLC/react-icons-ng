if(!self.define){let e,n={};const c=(c,s)=>(c=new URL(c+".js",s).href,n[c]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=n,document.head.appendChild(e)}else e=c,importScripts(c),n()})).then((()=>{let e=n[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(s,a)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(n[i])return;let t={};const r=e=>c(e,i),o={module:{uri:i},exports:t,require:r};n[i]=Promise.all(s.map((e=>o[e]||r(e)))).then((e=>(a(...e),t)))}}define(["./workbox-c5ed321c"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/react-icons-ng/_next/static/chunks/12.3fe4254cbb368888.js",revision:"3fe4254cbb368888"},{url:"/react-icons-ng/_next/static/chunks/174.41c463aa5c864aab.js",revision:"41c463aa5c864aab"},{url:"/react-icons-ng/_next/static/chunks/206.63e91c6f7ae4f952.js",revision:"63e91c6f7ae4f952"},{url:"/react-icons-ng/_next/static/chunks/249.4fa72dcf3471c2b1.js",revision:"4fa72dcf3471c2b1"},{url:"/react-icons-ng/_next/static/chunks/268-644b3806a08b927d.js",revision:"644b3806a08b927d"},{url:"/react-icons-ng/_next/static/chunks/275.36a51f55392a8b92.js",revision:"36a51f55392a8b92"},{url:"/react-icons-ng/_next/static/chunks/281.ef334ab58548e0cc.js",revision:"ef334ab58548e0cc"},{url:"/react-icons-ng/_next/static/chunks/300.30a1e195d0c5031b.js",revision:"30a1e195d0c5031b"},{url:"/react-icons-ng/_next/static/chunks/35.f1415bf628836f7d.js",revision:"f1415bf628836f7d"},{url:"/react-icons-ng/_next/static/chunks/370.b50d272d1bb0d6ea.js",revision:"b50d272d1bb0d6ea"},{url:"/react-icons-ng/_next/static/chunks/374.1dee20a893612543.js",revision:"1dee20a893612543"},{url:"/react-icons-ng/_next/static/chunks/391.38d6db77e155bc8b.js",revision:"38d6db77e155bc8b"},{url:"/react-icons-ng/_next/static/chunks/412.c7d66859ebd964fb.js",revision:"c7d66859ebd964fb"},{url:"/react-icons-ng/_next/static/chunks/432.9e205d337eb614fc.js",revision:"9e205d337eb614fc"},{url:"/react-icons-ng/_next/static/chunks/472.38f406a81083d9de.js",revision:"38f406a81083d9de"},{url:"/react-icons-ng/_next/static/chunks/605.2e76472e54adb546.js",revision:"2e76472e54adb546"},{url:"/react-icons-ng/_next/static/chunks/62.317af438d8199b62.js",revision:"317af438d8199b62"},{url:"/react-icons-ng/_next/static/chunks/622-e17b12b6e30c3e09.js",revision:"e17b12b6e30c3e09"},{url:"/react-icons-ng/_next/static/chunks/637.07fe0c09a119d9e0.js",revision:"07fe0c09a119d9e0"},{url:"/react-icons-ng/_next/static/chunks/693.5f10af7ad54fc5d3.js",revision:"5f10af7ad54fc5d3"},{url:"/react-icons-ng/_next/static/chunks/713.6a64cdcaff32c13f.js",revision:"6a64cdcaff32c13f"},{url:"/react-icons-ng/_next/static/chunks/736-8c5101b973a5c040.js",revision:"8c5101b973a5c040"},{url:"/react-icons-ng/_next/static/chunks/741.cb110aecc221b86c.js",revision:"cb110aecc221b86c"},{url:"/react-icons-ng/_next/static/chunks/791.851da18e074831ee.js",revision:"851da18e074831ee"},{url:"/react-icons-ng/_next/static/chunks/82.ca295a327080c8a2.js",revision:"ca295a327080c8a2"},{url:"/react-icons-ng/_next/static/chunks/850.2e2b37b02c506205.js",revision:"2e2b37b02c506205"},{url:"/react-icons-ng/_next/static/chunks/942.02145957601c2d93.js",revision:"02145957601c2d93"},{url:"/react-icons-ng/_next/static/chunks/973.5dd59a2b13dd5509.js",revision:"5dd59a2b13dd5509"},{url:"/react-icons-ng/_next/static/chunks/989.8d82a7785f31ca9f.js",revision:"8d82a7785f31ca9f"},{url:"/react-icons-ng/_next/static/chunks/framework-a42f82fbe29cccf0.js",revision:"a42f82fbe29cccf0"},{url:"/react-icons-ng/_next/static/chunks/main-b598c888f8d9717d.js",revision:"b598c888f8d9717d"},{url:"/react-icons-ng/_next/static/chunks/pages/_app-03b0070e8e51efb3.js",revision:"03b0070e8e51efb3"},{url:"/react-icons-ng/_next/static/chunks/pages/_error-ab557634fd13a70c.js",revision:"ab557634fd13a70c"},{url:"/react-icons-ng/_next/static/chunks/pages/icons-98ac151dea5fa532.js",revision:"98ac151dea5fa532"},{url:"/react-icons-ng/_next/static/chunks/pages/index-888d493155896b23.js",revision:"888d493155896b23"},{url:"/react-icons-ng/_next/static/chunks/pages/search-aaa86c5f4dc0803b.js",revision:"aaa86c5f4dc0803b"},{url:"/react-icons-ng/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/react-icons-ng/_next/static/chunks/webpack-50f6de96ef2b2529.js",revision:"50f6de96ef2b2529"},{url:"/react-icons-ng/_next/static/css/85ab309e24e7dbb1.css",revision:"85ab309e24e7dbb1"},{url:"/react-icons-ng/_next/static/f9zMTnTBcfEtQtqds-SpH/_buildManifest.js",revision:"d19f93cd18a4ffb9a403ee044d463fd5"},{url:"/react-icons-ng/_next/static/f9zMTnTBcfEtQtqds-SpH/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/react-icons-ng/brand-icon.svg",revision:"33455d33822cd86a7b2e7c12be2688f6"},{url:"/react-icons-ng/favicon.ico",revision:"217bba9d985038b5db0f675aadef1058"},{url:"/react-icons-ng/favicon.png",revision:"217bba9d985038b5db0f675aadef1058"},{url:"/react-icons-ng/icons/icon-128x128.png",revision:"61141052122e82b0e4c106b6478053f7"},{url:"/react-icons-ng/icons/icon-144x144.png",revision:"d7041f383ef13f304ce0c8222c768687"},{url:"/react-icons-ng/icons/icon-152x152.png",revision:"e892614a0964881052f52449818355d2"},{url:"/react-icons-ng/icons/icon-192x192.png",revision:"09b80496ac709b0fceef80e2c89a5558"},{url:"/react-icons-ng/icons/icon-384x384.png",revision:"065ce43c918fae1157d9fa6757bc7685"},{url:"/react-icons-ng/icons/icon-512x512.png",revision:"c4642057e4afcfa6776064b99ae43a13"},{url:"/react-icons-ng/icons/icon-72x72.png",revision:"5fedad82387f7b30c250134c5a394688"},{url:"/react-icons-ng/icons/icon-96x96.png",revision:"2c3ea4bbe99ae01388b3dcd30b5d053d"},{url:"/react-icons-ng/manifest.json",revision:"a242361bca9b8ec7ebbba06b424bd861"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/react-icons-ng",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:n,event:c,state:s})=>n&&"opaqueredirect"===n.type?new Response(n.body,{status:200,statusText:"OK",headers:n.headers}):n}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const n=e.pathname;return!n.startsWith("/api/auth/")&&!!n.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
