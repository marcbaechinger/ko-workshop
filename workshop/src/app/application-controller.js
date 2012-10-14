(function () {
	
	var ApplicationController = function () {
		var that = this;
		
		this.model = new theapp.ApplicationModel();
		
		this.createCredential = function () {
			var site = prompt("Name of the site"),
				credential;
			if (site) {
				credential = that.model.createCredential(site);
				that.model.selectedCredential(credential);
				$("#edit-form .username").focus();
			}
		};
		
		this.model.selectedCredential.subscribe(function (newValue) {
			if (newValue) {
				$("#edit-form .site").focus();
			}
		});
	};
	
	ApplicationController.prototype.init = function() {
		ko.applyBindings(this.model, document.getElementById("content"));
		return this;
	};
	
	namespace("theapp", {
		ApplicationController: ApplicationController
	});
}());