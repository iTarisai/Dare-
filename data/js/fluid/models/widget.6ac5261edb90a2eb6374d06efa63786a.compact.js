if(!fluid.models){fluid.models={}}(function(){fluid.models.Widget=fluid.Model.extend({attrBlackList:["id","pageId","box","imgData"],initialize:function(a,b){this.on("change:tlwh",function(){this.clearBox()});this.collection.projectModel.on("change:pageWH",function(){if(!this.collection){return}this.clearBox()},this);this.on("change",function(){if(!this.collection){return}this.getPage().clearImgData()},this)},clearBox:function(){var a=this.getChildren();this.set({box:null},{silent:true});a.forEach(function(b,d,c){b.clearBox()})},calculateBox:function(g){var e=[],d=this.get("tlwh"),f=this.get("ca");if(!d&&this.get("st")==="b"){d=[0,0,"a","a"]}function a(n){var o=this.get("segments"),m=0;if(o){var k=this.get("sp"),q=k?k[n-1]:0,l=k?k[n==2?3:2]:0;for(var r=0,p=o.length;r<p;r++){var s=fluid.main.project.widgets.get(o[r].id);var j;if(!s){s=fluid.main.project.widgets.get(o[r].widget)}if(!s){return m}j=s.toJSON();if(!j){return m}m+=j.tlwh?j.tlwh[n]:j.wh[n-2]}m+=q+l}else{return g[n]}return m}var b=d[2]==null?0:d[2];if(b&&typeof(b)==="number"){e[2]=b}else{if(b&&b.indexOf("%")!==-1){e[2]=(parseFloat(b)/100)*g[2]}else{if(b=="a"){e[2]=a.call(this,2)}else{e[2]=g[2]}}}var i=d[3]==null?0:d[3];if(i&&typeof(i)==="number"){e[3]=i}else{if(i&&i.indexOf("%")!==-1){e[3]=(parseFloat(i)/100)*g[3]}else{if(i=="a"){e[3]=a.call(this,3)}else{e[3]=g[3]}}}var h=d[0]==null?0:d[0];if(!f||f[0]=="t"){if(typeof(h)==="number"){e[1]=h+g[1]}else{if(h.indexOf("%")!==-1){e[1]=((parseFloat(h)/100)*g[3])+g[1]}else{e[1]=parseInt(h,10)+g[1]}}}else{if(f[0]=="c"){if(typeof(h)==="number"){e[1]=h+g[1]+g[3]/2-e[3]/2}else{if(h.indexOf("%")!==-1){e[1]=((parseFloat(h)/100)*g[3])+g[1]+g[3]/2-e[3]/2}else{e[1]=parseInt(h,10)+g[1]+g[3]/2-e[3]/2}}}else{if(f[0]=="b"){if(typeof(h)==="number"){e[1]=g[1]+g[3]-h-e[3]}else{if(h.indexOf("%")!==-1){e[1]=g[1]+g[3]-((parseFloat(h)/100)*g[3])-e[3]}else{e[1]=g[1]+g[3]-parseInt(h,10)}}}}}var c=d[1]==null?0:d[1];if(!f||f[1]=="l"){if(typeof(c)==="number"||c.indexOf("%")===-1){e[0]=c+g[0]}else{if(c.indexOf("%")!==-1){e[0]=((parseFloat(c)/100)*g[2])+g[0]}else{e[0]=parseInt(c,10)+g[0]}}}else{if(f[1]=="c"){if(typeof(c)==="number"){e[0]=c+g[0]+g[2]/2-e[2]/2}else{if(c.indexOf("%")!==-1){e[0]=((parseFloat(c)/100)*g[2])+g[0]+g[2]/2-e[2]/2}else{e[0]=parseInt(c,10)+g[0]+g[2]/2}}}else{if(f[1]=="r"){if(typeof(c)==="number"){e[0]=g[0]+g[2]-c-e[2]}else{if(c.indexOf("%")!==-1){e[0]=g[0]+g[2]-((parseFloat(c)/100)*g[2])-e[2]}else{e[0]=g[0]+g[0]-parseInt(c,10)}}}}}e[0]=~~e[0];e[1]=~~e[1];e[2]=~~e[2];e[3]=~~e[3];this.set({box:e});return e},getBox:function(){var d,e,c,a,b,f;a=this.get("box");if(a){return a}if(!this.get("of")){b=this.get("st");e=this.getPage();if(b&&(b==="f"||b==="fb")){f=this.getProject().get("pageWH");if(e.get("orientation")==="Landscape"){f=[f[1],f[0]]}d=[0,0,f[0],f[1]]}else{d=[0,0,e.get("width"),e.get("height")]}}else{c=this.getParent();d=c.getBox()}a=this.calculateBox(d);return a},getRoot:function(){if(this.get("of")&&this.getParent()){return this.getParent().getRoot()}else{return this}},getSegmentRoot:function(){if(this.get("segmentRoot")){return this.collection.get(this.get("segmentRoot"))}else{return this.getRoot()}},getDependents:function(){var a=this.collection.where({lockTo:this.id,of:this.id});return a},getOfs:function(){var a=new fluid.Widgets();a.add(this.collection.where({of:this.id}));return a},getLockTos:function(){var a=this.getRoot();var b=this.collection.where({lockTo:a.id});return b},getChildren:function(){var a=this.collection.where({of:this.id});return a},getParent:function(){return this.collection.get(this.get("of"))},getPage:function(){var a=this.getProject().pages.get(this.get("pageId"));if(this.get("pageId")&&a.get("widgets").indexOf(this.id)!==-1){return a}else{a=false;this.getProject().pages.every(function(d,c,b){if(d.get("widgets").indexOf(this.id)!==-1){a=d;this.set({pageId:d.id},{silent:true});return false}return true},this);return a}},getProject:function(){return this.collection.projectModel},containsText:function(){var a=false;if(this.get("tc")){a=true}else{if(this.attributes.ad&&this.attributes.ad.length){this.attributes.ad.forEach(function(b){if(b&&b[0]){var d=b[0];var c=widgets.summary[d];if(c&&c.tc){a=true}}})}}return a},getSubTextElements:function(){var b=[],a=this.getOfs();a.forEach(function(c){b=b.concat(c.getSubTextElements())});if(this.get("tc")){b.push(this)}return b},getGroup:function(){var b=this.getProject().wdgGroups;var a=this.id;var c=b.find(function(d){if(d.get("widgets").indexOf(a)!==-1){return true}else{return false}});return c},getAllFromGroup:function(){var c=this.getGroup();var b=[];if(c){var a=c.get("widgets");b=fluid.main.project.widgets.filter(function(d){if(a.indexOf(d.id)!==-1){return true}return false})}return b}});fluid.Widgets=fluid.Collection.extend({model:fluid.models.Widget,initialize:function(b,a){if(a&&a.projectModel){this.projectModel=a.projectModel}},getIds:function(){return this.map(function(a){return a.id})},getElements:function(){return $("#"+this.getIds().join(", #"))},getRootsCollection:function(){var a=new fluid.Widgets();this.each(function(c,b,d){a.add(c.getRoot())});return a},getLockTos:function(){var c=this.getRoots();var a=new fluid.Widgets();var b;c.each(function(d){b=fluid.main.project.widgets.where({lockTo:d.get("lockTo")});a.add(b)});return a},getShapeWidgets:function(){var b=new fluid.Widgets(),c,a;this.models.forEach(function(d){if(!d.get("tc")&&d.get("upload")!=="y"){b.add(d);if(d.get("seg")||d.get("segment")){c=d.getOfs();if(c.length){a=c.getShapeWidgets();if(a.length){b.add(a.models)}}}}});return b},getTextWidgets:function(){var a=new fluid.Widgets();this.each(function(b){if(b.get("tc")!=undefined&&b.get("ts")!=undefined){a.add(b)}else{a.add(b.getSubTextElements())}});return a},getUploadWidgets:function(){var a=new fluid.Widgets();this.each(function(b){if(b.get("upload")==="y"){a.add(b)}});return a},getRoots:function(h,e){if(!e){e={}}if(!h){return this.getRootsCollection()}if(h.jquery){h=$.map(h,function(i){return i.id});e.returnEls=true}var g=[],d,b,c,f,a;for(var f=0;f<h.length;f++){d=fluid.main.project.widgets.get(h[f]);b=d.getRoot();if(b){g.push(d.getRoot().id)}else{c=d.collection.where({lockTo:d.get("lockTo")});c=_.reject(c,function(i){return !i.getParent()});for(f=0;a=c.length,f<a;f++){g.push(c[f].id)}}}if(e&&e.returnEls){g=$("#"+g.join(", #"))}return g},containsText:function(c){if(!c){return false}if(c.jQuery){c=$.map(c,function(){return this.id})}var a;for(var b=0;b<c.length;b++){a=this.get(c[b],{returnModel:true}).containsText();if(a){return true}}return false}})})();