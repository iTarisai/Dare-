if(!fluid.models){fluid.models={}}fluid.models.Link=fluid.Model.extend({idAttribute:"linkCanvId",initialize:function(a,b){},parse:function(b,a){return b}});fluid.Links=fluid.Collection.extend({model:fluid.models.Link,linkProps:["linkCanvId","linkDest","linkOrigin","linkType","transType","triggerType"],initialize:function(b,a){},toJSON:function(c){var a={};for(var d=0,b=this.linkProps.length;d<b;d++){a[this.linkProps[d]]=[]}this.forEach(function(f){for(var g=0,e=this.linkProps.length;g<e;g++){a[this.linkProps[g]].push(f.attributes[this.linkProps[g]])}},this);return a},deserialize:function(k){var d=(typeof k==="string")?JSON.parse(k):k;var h=[],f,g,c,b,e,a;for(c=0,a=d.linkCanvId.length;c<a;c++){f={};for(b=0,e=this.linkProps.length;b<e;b++){f[this.linkProps[b]]=d[this.linkProps[b]][c]}h.push(f)}this.set(h,{merge:true})}});