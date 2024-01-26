sap.ui.define([
  "eag4u/controller/BaseController",
  "sap/ui/core/mvc/Controller"
], function (BaseController) {
  "use strict";
  
      return BaseController.extend("eag4u.controller.App", {
        onInit: function() {
          console.log("eag4u.controller.App - onInit");      
          this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
        }
      });
    }
  );
  