sap.ui.define([
	"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast"
], function(Controller,MessageToast) {
	"use strict";
var oRouter;
var obj;
	return Controller.extend("Testapplication.controller.View2", {
		
		onInit:function(){
				
			//get the router from the configuration
			 //oBundle = that.getOwnerComponent().getModel().getResourceBundle();
			 oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			 oRouter.getRoute("View2").attachPatternMatched(this._onObjectMatched, this);
		},
			
		_onObjectMatched:function(route){
			
			
			var oView = this.getView();
			var dataPage1 = route.getParameters().arguments.data;
			obj = JSON.parse(dataPage1);
			/*var oModel = new sap.ui.model.json.JSONModel("MockData/MockData.json");
			this.getView().setModel(oModel);
			setTimeout(function(){
				var oModelData = oView.getModel().getData().value;
				var modelLength = oModelData.length;
			$.each(oModelData,function(i,element){
		if(i === modelLength-1){
		element.Whole = obj.Whole; 
		element.TrolleyInfo = obj.TrolleyInfo;
		element.Tare = obj.Tare;
		element.InputWeight = obj.InputWeight;
		}
	});
	oView.getModel().refresh(true);
	
				
			}, 0);*/
			
			
			
			/*
			 * code of binding the odata service to get the data 
			 */
			
			
			 var oView = this.getView();
			var oModel = this.getOwnerComponent().getModel("dryOutputModel");
			var localModel = new sap.ui.model.json.JSONModel();
			var oFilter = new Filter("Machine", "EQ", obj.Machine);
			oModel.read("/et_dry_mach_out_Set",{
			filters:[oFilter],
			urlParameters:{"$expand": "MachOutItemNav,MachOutReturnNav"},
			 success : function (data) {
					localModel.setData(data);
					oView.setModel(localModel);
                }.bind(this),

                error: function (oError) {

                    jQuery.sap.log.info("Odata Error occured");

                }.bind(this)
                });
			 

	},
		
		OnAddPress:function(){
this.getView().byId("gridId").setVisible(true);
this.getView().byId("b1").setEnabled(false);
this.getView().getModel().refresh(true);
},

getWeightPress:function(){
	var that = this;
	var oView = this.getView();
	var oModelData = this.getView().getModel().getData().value;
	var modelLength = oModelData.length;
	$.each(oModelData,function(i,element){
		if(i === modelLength-1){
		/* var oModel = this.getView().getModel();
		oModel.update(/serviceUrl,inputParameter(anytrhing as backend required will get from oModelData),true,success function, failure function)*/
		//the below two lines logic must be write in success function based on received data.
		element.OutputWeight = "NET 930KG"; 
		element.weightVisible = false;
		}
		
		// for(var i = 0; i < modelLength.length; i++) {
		
  //   var obj = oModelData[i];
  //   element.OutputWeight = oModelData[i].OutputWeight; 
		//  element.weightVisible = false;
  //   //console.log(obj.SoId);
  //}
	});
this.getView().getModel().refresh(true);	
},

/*onScanPress:function(){
	var that = this;
	var oView = this.getView();
	var oModelData = this.getView().getModel().getData().value;
	var modelLength = oModelData.length;
	$.each(oModelData,function(i,element){
		if(i===modelLength-1){
		element.Tare = "239 KG"; 
		element.scanVisible = false;
		
		}
	});
	this.getView().getModel().refresh(true);	
},
*/

onclick: function(){
	var that = this;
	var oModelData = this.getView().getModel().getData().value;
	var modelLength = oModelData.length;
	if(oModelData[modelLength-1].weightVisible === true){
		MessageToast.show("Please get the Output Weight before Saving");
		return;
	} 
	
	if(!this.fragment){
		this.fragment = sap.ui.xmlfragment("Testapplication.fragments.Dfragment",this);
	}
	this.fragment.open();
	
	//var oModel = this.getOwnerComponent().getModel("dryOutputModel");
	
	
	//Using Update Model to post the data to backend
/*	
	oModel.update("/et_dry_mach_out_Set(Machine = '"+obj.Machine+ "')",inputData,null,success,failure);
		function success(data){
			if(!that.fragment){
		that.fragment = sap.ui.xmlfragment("Testapplication.fragments.Dfragment",that);
	}
	that.fragment.open();
		}
		
		function error(data){
			new sap.m.MessageToast.show(data);
		}*/
},
	
	onOkPress:function(){
		 //debugger;
		var oView = this.getView();
		//comment line start
		var oModelData = this.getView().getModel().getData().value;
	var obj = {
		"leftText": "A2",
      "TrolleyInfo": "D-06",
      "InputWeight": "Net 870 kg",
      "Tare": "230KG",
      "OutputWeight": "",
      "weightVisible":true
      
	};
	oModelData.push(obj);
	//comment line end
	
oView.byId("b1").setEnabled(true);
this.fragment.close();	
		
	}
	

	//logic same as getWeightPress function
	

		
		

	});
});