sap.ui.define([
    "eag4u/controller/BaseController",
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, Controller) {
        "use strict";

        return BaseController.extend("eag4u.controller.View1", {
            onInit: function () {
                this.oComponent = this.getOwnerComponent();

                // Globales Model aus der Component holen
                this.oDaten = this.oComponent.getModel("oDaten");
                this.getView().setModel(this.oDaten, "oDaten");
                //  Model in die View holen
                this.getView().setModel(this.oDaten, "oDaten");

                this.read_RAP();
            },

            // -------------------------------------------------------------------------
            // ABAP RAP Tests
            // -------------------------------------------------------------------------
            read_RAP: function() {
                console.log("eag4u.controller.View1 - read_RAP");
                const that = this;
                // Verbindung einstellen
                const RAPmodel = this.getOwnerComponent().getModel("RAPmodel");
                RAPmodel.read("/ZFK_C_PERSON",
                {
                    filters: [],
                    success: function(oData, response) {
                            that.getView().getModel("oDaten").setProperty("/read_RAP", oData.results);
                        }
                });
            },
            // --------------------------------------------
            save_RAP: function(){
                console.log("eag4u.controller.View1 - save_RAP");
                var that = this;
                // Verbindung einstellen
                const RAPmodel = this.getOwnerComponent().getModel("RAPmodel");
                // RAP Behavier
                const sSave = "/ZFK_C_PERSON";
                // Übergabe Daten zusammenstellen
                const oEntry = {
                    "Id": "8",
                    "Vorname": "Sabine",
                    "Nachname": "Schulz"
                };
                // Service starten mit Übergabe
                RAPmodel.create(sSave, oEntry,
                    {
                        success: function(oData, response) {
                            // Neu Lesen der Daten
                            that.read_RAP();
                        },
                        error: function(oError) {
                            console.log(oError);
                        }
                    });
            },


            onXxxx: function () {
                const RAPmodel = this.getOwnerComponent().getModel("RAPmodel");
                var oUrlParams = {
                    "Id": "13",
                    "Vorname": "Sabine",
                    "Nachname": "Schulz"
                };
                RAPmodel.callFunction("/startEinzug", {
                    method: "POST",
                    urlParameters: oUrlParams,
                    success: function (data) {
                        console.log(data);
                    },
                    error: function (oError) {
                        console.log(oError);
                    }
                });
            },



            startEinzug: function () {
                console.log("eag4u.controller.View1 - startEinzug");
                var that = this;
                // Übergabe Daten zusammenstellen
                const oEntry = {
                    "Id": 5,
                    "Vorname": "Fabi",
                    "Nachname": "TestUser"
                };
                const RAPmodel = this.getOwnerComponent().getModel("RAPmodel");
 
                RAPmodel.callFunction("/startEinzug", {
                    method: "POST",
                    headers: new Headers({
                        "Content-Type": "application/json",
                    }),
                    urlParameters: oEntry,
                    success: function (oData) {
                        console.log(oData);
                    },
                    error: function (oError) {
                        console.log(oError);
                    }
                }) 
            },


            // --------------------------------------------
            testAction_RAP: function () {
                console.log("eag4u.controller.View1 - testAction_RAP");
                var consumption = "/ZFK_C_PERSON";
                var action = "/startEinzug";
                var sUrl = this.getOwnerComponent().getModel().sServiceUrl + consumption + action;

                const oEntry = {
                    "Id": "5"
                };
                var payload = JSON.stringify(oEntry);
    
                jQuery.ajax({
                    type: "POST",
                    contentType: "application/json",
                    url: sUrl,
                    payload: payload,
                    dataType: "json",
                    async: false,
                    crossDomain: true,
                    success: function (data) {
                        console.log(data);
                    },
                    error: function (oError) {
                        console.log(oError);
                    }
                });
            },
            
            
            
            
            // -------------------------------------------------------------------------
            // SEGW Service
            // -------------------------------------------------------------------------
            read_SEGWModel: function() {
                const that = this;
                // Verbindung einstellen
                const SEGWModel = this.getOwnerComponent().getModel("SEGWModel");
                //var oFilter = new Filter("Asesor", "EQ", asesor);
                SEGWModel.read("/PersonSet",
                {
                    filters: [],
                    success: function(oData, response) {
                            console.log(oData, response);
                        }
                });
            },

            // -------------------------------------------------------------------------
            // REST Tests
            // -------------------------------------------------------------------------
            RESTtest: async function(){
                let url = "https://s41.energy4u.org/ZFK_RESTAPP/test";
                let username = 'A910493';
                let password = '18u12f66UF!';
                let authString = `${username}:${password}`;
                let test = 'Basic ' + btoa(authString);
    
                let response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic " + btoa(username + ":" + password),
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
                        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
                    },
                    beforeSend: function (xhr) {
                        xhr.withCredentials = true;
                    },

                }).then(() => {
                    let data = response.json();
                    console.log(data);
                })
                    .catch((e) => {
                        console.log(e);
                    });

                
            },

            AJAX_Test: function(){
                let url = "https://s41.energy4u.org/ZFK_RESTAPP/test?ID=2";
                let username = 'A910493';
                let password = '18u12f66UF!';

                $.ajax({
                    url: url,
                    type: 'GET',
                    headers: {
                        "Authorization": "Basic " + btoa(username + ":" + password),
                        "Access-Control-Allow-Origin" : "*",
                        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
                        "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
                      },
                    beforeSend: function(xhr){
                        xhr.withCredentials = true;
                     },
                    // data: dataString,
                    datatype: 'json',
                    success: function (data) 
                        {
                            console.log(data);
                        },
                    error: function (jqXHR, textStatus, errorThrown) { 
                        console.log(jqXHR, textStatus, errorThrown);
                    }
                });
            },






        // -------------------------------------------------------------------------
        // -------------------------------------------------------------------------
        // Klicks
        // -------------------------------------------------------------------------
        // -------------------------------------------------------------------------

        // --------------------------------------------------------
		// Beim Klick auf die Zeile in der Mitarbeiterliste
		// --------------------------------------------------------
		onItemSelected: function(oEvent){
			console.log("eag4u.controller.View1 - onItemSelected");
			var that = this;				
			var oTable = this.getView().byId("idView1Table");
			var index = oTable.getSelectedItem();
			// durch den Index den Pfad zu den Daten holen
			this.sPath = index.getBindingContextPath();
            
			// Daten aus dem Hauptmodel holen
			var model = this.getView().getModel("oDaten");
			var data  = model.getProperty(this.sPath);	

			// Auswahl weder aufheben um die gleiche Zeile zweimal klicken zu können
			oTable.removeSelections(); 

			// Fragment öffnen
			this.openFragmentChange(data);				
		},
        // --------------------------------------------------------
		// Beim Klick auf den NEU Knopf
		// --------------------------------------------------------
		onPressNeu: function()
		{		
			console.log("eag4u.controller.View1 - onPressNeu");
			var that = this;
			if (this._Change !== undefined) {
				this._Change.destroy();
			}
			this._Change = sap.ui.xmlfragment("eag4u.view.Change", this);
			this.getView().addDependent(this._Change);
			this._Change.open();
			// Model setzen - nur für das Overlay
			this.oOneData = new sap.ui.model.json.JSONModel();
			this.getView().setModel(this.oOneData, "oOneData");
			this.oOneData.setSizeLimit(1000);
			// Daten setzen
				var data = 
					{
					"Id" : "Neu",
					"Vorname" : "",
					"Nachname" : ""				
					};
			// Daten in das Anzeigemodel schreiben
			this.oOneData.setData(data);
			this.oOneData.refresh();	
		},






        // -------------------------------------------------------------------------
        // -------------------------------------------------------------------------
        // Funktionen
        // -------------------------------------------------------------------------
        // -------------------------------------------------------------------------

        // --------------------------------------------------------
		// Das Fragment öffnen
		// --------------------------------------------------------        
        openFragmentChange: function(data)
		{		
			console.log("eag4u.controller.View1 - openFragmentChange");
			var that = this;
			if (this._Change !== undefined) {
				this._Change.destroy();
			}
			this._Change = sap.ui.xmlfragment("eag4u.view.Change", this);
			this.getView().addDependent(this._Change);
			this._Change.open();

			// temporäres Model setzen - nur für das Overlay
			this.oOneData = new sap.ui.model.json.JSONModel();
			this.getView().setModel(this.oOneData, "oOneData");
			this.oOneData.setSizeLimit(1000);

			// Daten in das Anzeigemodel schreiben
			this.oOneData.setData(data);
			this.oOneData.refresh();	
		},

        // --------------------------------------------------------
		// Wenn Löschen gedrückt wurde
		// --------------------------------------------------------
		onDelete: function() {
			console.log("eag4u.controller.View1 - onDelete");
			var that = this;
            var TYP="delete";
			// Daten holen
			var OneData = this.oOneData.getData();
            var sendInfo = {
                Id: OneData.Id,
                Vorname: OneData.Vorname,
                Nachname: OneData.Nachname					
                };				
			this.startService(TYP,sendInfo);			
		},

        // --------------------------------------------------------
		// Wenn Sichern gedrückt wurde
		// --------------------------------------------------------
		onSave: function() {
			console.log("eag4u.controller.View1 - onSave");
            var TYP="save";
			// Daten holen
			var OneData = this.oOneData.getData();
            var sendInfo = {
                Id: OneData.Id,
                Vorname: OneData.Vorname,
                Nachname: OneData.Nachname					
                };				
			this.startService(TYP,sendInfo);			
		},

        // --------------------------------------------------------
		// Wenn Abbrechen gedrückt wurde
		// --------------------------------------------------------
		onCancel: function() {
			console.log("eag4u.controller.View1 - onCancel");
			this._Change.close();			
		},

        

        // --------------------------------------------------------
		// eigentlichen Service starten (create, delete, update)
		// --------------------------------------------------------
        startService: function(TYP,sendInfo){
            console.log("eag4u.controller.View1 - startService");
            var that = this;
            // Model holen
            const RAPmodel = this.getOwnerComponent().getModel("RAPmodel");
            // RAP ConsumtionView
            const sService = "/ZFK_C_PERSON";

            // ---------- SAVE ----------
            if (TYP === "save")
            {
                if (sendInfo.Id === "Neu")
                { TYP = "create" } 
                else 
                { TYP = "update" }
            }
            
            // ---------- CREATE ----------
            if (TYP === "create")
            {
            // Service starten mit Übergabe
            RAPmodel.create(sService, sendInfo,
                {
                    success: function(oData, response) {
                        console.log(oData);
                        // Fragment schließen
                        that.onCancel();
                        // Neu Lesen der Daten
                        that.read_RAP();
                    },
                    error: function(oError) {
                        console.log(oError);
                    }
                });
            }
            // ---------- UPDATE ----------
            if (TYP === "update")
            {
            // Service starten mit Übergabe

            // muss noich mit Update umgearbeitet werden


            RAPmodel.create(sService, sendInfo,
                {
                    success: function(oData, response) {
                        console.log(oData);
                        // Fragment schließen
                        that.onCancel();
                        // Neu Lesen der Daten
                        that.read_RAP();
                    },
                    error: function(oError) {
                        console.log(oError);
                    }
                });
            }
            
            // ---------- DELETE ----------
            if (TYP === "delete")
            {            
            // Service starten mit Übergabe
            RAPmodel.delete(sService, sendInfo,
                {
                    success: function(oData) {
                        console.log(oData);
                        // Neu Lesen der Daten
                        that.read_RAP();
                    },
                    error: function(oError) {
                        console.log(oError);
                    }
                });
            }
        },



        machnix: function(){}
    });
});
