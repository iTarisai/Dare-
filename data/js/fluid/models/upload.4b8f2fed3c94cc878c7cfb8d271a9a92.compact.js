var dbStorage=require("../../class-dbStorage");if(!fluid.models){fluid.models={}}(function(){fluid.models.Upload=fluid.Model.extend({attrBlackList:["imgData"],initialize:function(a,b){this.on("change",function(){var c=_.keys(this.changedAttributes());if(c.indexOf("imgData")!==-1){dbStorage.set("uploads",{id:this.id,data:this.get("imgData")})}},this);this.projects=new fluid.Projects(null)},parse:function(b,a){return b}});fluid.Uploads=fluid.Collection.extend({model:fluid.models.Upload,_type:"upload",initialize:function(b,a){this.on("all",this.onChange,this)},afterInit:function(b,a){if(a&&a.saveAfterInit){this.save()}},onChange:function(){if(!this.debouncedSave){this.debouncedSave=_.debounce(this.save,300)}this.debouncedSave.apply(this)},save:function(){dbStorage.set("uploadHeaders",{id:fluid.main.account.id,data:this.toJSON()})}})})();