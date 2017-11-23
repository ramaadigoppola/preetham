sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	var that;
	var oRouter;
	var oBundle;
	return Controller.extend("Testapplication.controller.View1", {
		

			onInit:function()
		{
			that=this;
			//get the router from the configuration
			 //oBundle = that.getOwnerComponent().getModel().getResourceBundle();
			 oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			 //oRouter.getRoute("View1").attachPatternMatched(this._onObjectMatched, this);
		},
		

		chScanQRCode:function()	{
			
			/*
			 * while Scanning we will get the below "aBinQRData" fields data from bar scanner
			 * 
			 */	
			var aBinQRData = {};
			aBinQRData.Machine = "D01";
			/*aBinQRData.UnloadPt = "D01-20";
			aBinQRData.InProd = "900000000003";
			aBinQRData.InProdDis = "Wholes";
			aBinQRData.InSize = "B";
			aBinQRData.InBatch = "17100906B";
			aBinQRData.InLot = "171116IV10";
			aBinQRData.InWeight = "50.000";
			aBinQRData.Order = "9000000131";
			aBinQRData.OutProd = "900000000013";
			aBinQRData.OutProdDis = "Dried Wholes";
			aBinQRData.OutSize = "B";
			aBinQRData.OutBatch = "17111610B";
			aBinQRData.OutWeight = "0.000";
			aBinQRData.NetWeight = "0.000";
			aBinQRData.Completed = "X";
		aBinQRData.TrolleyInfo = "C-68";
		aBinQRData.Tare = "A2";
		aBinQRData.InputWeight = "567KG";
		aBinQRData.Whole = "1710241V32";*/
		
		oRouter.navTo("View2",{data:JSON.stringify(aBinQRData)}); // send the exact required data to view2, i hope machine name is fine
		//calling the service from component.js
		
		//var oModel = this.getOwnerComponent().getModel("dryOutputModel");
		
		
		//Using Update Model to post the data to backend
	/*	
		oModel.update("/et_dry_mach_out_Set(Machine = '"+aBinQRData.Machine+ "')",aBinQRData,null,success,failure);
			function success(data){
				//oRouter.navTo("View2",{data:JSON.stringify(data)}); if function gets success	
			}
			
			function error(data){
				new sap.m.MessageToast.show(data);
			}*/
			//that.getOwnerComponent().MCInputMachineQRData=aBinQRData;//QR Code Scan For MTNT
			
		}	
		
		
		

	});
});