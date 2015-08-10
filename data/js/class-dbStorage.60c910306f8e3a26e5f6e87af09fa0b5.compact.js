var dbStorage={dbAvailable:null,db:null,readyListeners:[],versionNumber:45,onReady:function(a){if(dbStorage.db||dbStorage.dbAvailable===false){a()}else{dbStorage.readyListeners.push(a)}},init:function(){if(location.origin==="file://"||location.origin==="null"){dbStorage.dbAvailable=false;return}var a;if(window.indexedDB){a=window.indexedDB.open("fluidDB",dbStorage.versionNumber)}else{a=window.shimIndexedDB.open("fluidDB",dbStorage.versionNumber)}a.onupgradeneeded=function(c){dbStorage.dbAvailable=true;if(!this.result.objectStoreNames.contains("rastPages")){var b=this.result.createObjectStore("rastPages",{keyPath:"id"});b.createIndex("by_id","id",{unique:true});b.createIndex("by_data","data");b.createIndex("by_project","project")}if(!this.result.objectStoreNames.contains("uploads")){b=this.result.createObjectStore("uploads",{keyPath:"id"});b.createIndex("by_id","id",{unique:true});b.createIndex("by_data","data")}if(!this.result.objectStoreNames.contains("projects")){b=this.result.createObjectStore("projects",{keyPath:"id"});b.createIndex("by_id","id",{unique:true});b.createIndex("by_data","data")}if(!this.result.objectStoreNames.contains("uiIcons")){b=this.result.createObjectStore("uiIcons",{keyPath:"id"});b.createIndex("by_id","id",{unique:true});b.createIndex("by_data","data")}if(!this.result.objectStoreNames.contains("uploadThumbs")){b=this.result.createObjectStore("uploadThumbs",{keyPath:"id"});b.createIndex("by_id","id",{unique:true});b.createIndex("by_data","data")}if(!this.result.objectStoreNames.contains("uploadHeaders")){b=this.result.createObjectStore("uploadHeaders",{keyPath:"id"});b.createIndex("by_id","id",{unique:true});b.createIndex("by_data","data")}if(!this.result.objectStoreNames.contains("wdgDefinitions")){b=this.result.createObjectStore("wdgDefinitions",{keyPath:"id"});b.createIndex("by_id","id",{unique:true});b.createIndex("by_data","data")}if(!this.result.objectStoreNames.contains("accounts")){b=this.result.createObjectStore("accounts",{keyPath:"id"});b.createIndex("by_id","id",{unique:true});b.createIndex("by_data","data")}if(c.oldVersion!==0){dbStorage.clearStores=true}};a.onsuccess=function(b){dbStorage.dbAvailable=true;dbStorage.db=this.result;if(localStorage.getItem("account.loginStarted")==="true"&&localStorage.getItem("account.loginEnded")===null){dbStorage.clearStores=true}if(dbStorage.clearStores){var c;for(var d=0;d<dbStorage.db.objectStoreNames.length;d++){c=dbStorage.getObjectStore(dbStorage.db.objectStoreNames[d],"readwrite");c.clear()}dbStorage.db.close();localStorage.clear();localStorage.setItem("indexedDBreloaded",true);setTimeout(function(){window.location.reload()},3000);return}for(var d=0;d<dbStorage.readyListeners.length;d++){dbStorage.readyListeners[d]()}localStorage.setItem("indexedDBreloaded",false)};a.onerror=function(b){dbStorage.dbAvailable=false;if(!localStorage.getItem("clearedIndexedDb")){setTimeout(function(){window.indexedDB.deleteDatabase("fluidDB");localStorage.clear();localStorage.setItem("clearedIndexedDb",true);window.location.reload()},2000)}else{localStorage.removeItem("clearedIndexedDb")}if(b.target.error.name&&localStorage.getItem("indexedDBreloaded")==="false"){setTimeout(function(){dbStorage.clear();localStorage.clear();localStorage.setItem("indexedDBreloaded",true);window.location.reload()},5000)}};a.onblocked=function(b){dbStorage.dbAvailable=false};setTimeout(function(){if(!dbStorage.db){fluid.main.fire("dbStorage.failed")}},20000)},getObjectStore:function(a,c){var b=dbStorage.db.transaction(a,c);return b.objectStore(a)},clear:function(){window.indexedDB.deleteDatabase("fluidDB")},set:function(c,e,f){if(e.length===undefined){e=[e]}if(e.length===0||dbStorage.dbAvailable===false){console.log("not saved: ",e.length,dbStorage.dbAvailable);if(f){f()}return}var b=dbStorage.getObjectStore(c,"readwrite");for(var d=0;d<e.length;d++){var a=b.put(e[d]);a.onsuccess=function(){if(d===e.length&&f){f({success:true})}};a.onerror=function(){if(d===e.length&&f){f({success:false})}}}},remove:function(b,d,e){if(d.length===undefined){d=[d]}if(d.length===0||dbStorage.dbAvailable===false){if(e){e()}return}var a=dbStorage.getObjectStore(b,"readwrite");for(var c=0;c<d.length;c++){a["delete"](d[c]).onsuccess=function(f,h,g){if(f===h.length-1&&g){g()}}.bind(this,c,d,e)}},list:function(a,e){var c=dbStorage.db.transaction(a);var d=c.objectStore(a);var b=[];d.openCursor().onsuccess=function(f){var g=f.target.result;if(g){b.push(g.key);g["continue"]()}else{if(e){e(b)}}}},get:function(a,e,h){var d={failed:[],fetched:[],resultsArr:[],resultsObj:{}};if(e.length===undefined||typeof(e)==="string"){e=[e]}if(e.length===0||dbStorage.dbAvailable===false){if(h){h(d)}return}var c=dbStorage.db.transaction(a);var g=c.objectStore(a);var f;for(var b=0;b<e.length;b++){f=g.get(e[b]);f.onsuccess=function(i,j){if(this.result){d.fetched.push(i);d.resultsObj[i]=this.result}else{d.failed.push(i);d.resultsObj[i]=null}d.resultsArr.push(d.resultsObj[i]);if(h&&d.resultsArr.length===e.length){h(d)}}.bind(f,e[b])}}};module.exports=dbStorage;