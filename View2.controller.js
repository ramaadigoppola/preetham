sap.ui.define([
	"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast"
], function(Controller,MessageToast) {
	"use strict";
var oRouter;
var obj;
	return Controller.extend("Testapplication.controller.View2", {
		
		onInit:function(){	
			 oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			 oRouter.getRoute("View2").attachPatternMatched(this._onObjectMatched, this);
		},
			
		_onObjectMatched:function(route){
			var oView = this.getView();
			var dataPage1 = route.getParameters().arguments.data;
			obj = JSON.parse(dataPage1);
//remove the commented code once gateway service works start			
			/*var mockDataModel = new sap.ui.model.json.JSONModel("MockData/MockData.json");
			this.getView().setModel(mockDataModel);
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
//remove the commented code once gateway service works end			
			
			/*
			 * code of binding the odata service to get the data 
			 */
			 var oView = this.getView();
			var oModel = this.getOwnerComponent().getModel("dryOutputModel");
			var dryOutputJsonModel = new sap.ui.model.json.JSONModel();
			var oFilter = new sap.ui.model.Filter("Machine", "EQ", "'"+obj.Machine+"'");
			oModel.read("/et_dry_mach_out_Set",{
			filters:[oFilter],
			urlParameters:{"$expand": "MachOutItemNav,MachOutReturnNav"},
			 success : function (data) {
				 dryOutputJsonModel.setData(data.results[0].MachOutItemNav);
					oView.setModel(dryOutputJsonModel);
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
	var oModelData = this.getView().getModel().getData().results;
	var modelLength = oModelData.length;
	$.each(oModelData,function(i,element){
		if(i === modelLength-1){
		/* var oModel = this.getView().getModel();
		oModel.update(/serviceUrl,inputParameter(anytrhing as backend required will get from oModelData),true,success function, failure function)*/
		//the below two lines logic must be write in success function based on received data.
		element.OutputWeight = "NET 930KG"; 
		element.weightVisible = false;
		}
	});
this.getView().getModel().refresh(true);	
},
onclick: function(){
	var that = this;
	var oModelData = this.getView().getModel().getData().results;
	var modelLength = oModelData.length;
	var modelResults = oModelData[modelLength-1];
	if(modelResults.weightVisible === true){
		MessageToast.show("Please get the Output Weight before Saving");
		return;
	} 
	
	
	var inputData = {};
	var d = {};
	d.Machine = modelResults.Machine;
	d.MachOutReturnNav = [];
	d.MachOutItemNav = [];
	var data = {};
	data.Machine = modelResults.Machine;
	data.UnloadPt = "D01-20";
	data.Trolley = "20";
	d.MachOutItemNav.push(data);
	inputData.d = d;
		  
	
	//add all the required fields same as input.Machine
	var oModel = this.getOwnerComponent().getModel("dryOutputModel");
	//Using Update Model to post the data to backend url is same as excel sheet
		oModel.update("/et_dry_mach_out_Set",inputData,null,success,failure);
		function success(data){
			oModelData.push(data); // data must extend based on output in data
			if(!that.fragment){
		that.fragment = sap.ui.xmlfragment("Testapplication.fragments.Dfragment",that);
	}
	that.fragment.open();
		}
		
		function failure(data){
			MessageToast.show(data);
		}
},
	
	onOkPress:function(){
		var oView = this.getView();
oView.byId("b1").setEnabled(true);
this.fragment.close();	
		
	}
	});
});
