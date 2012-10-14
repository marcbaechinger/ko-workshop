(function () {
	
	var ApplicationController = function () {
		var that = this;
		
		this.model = new theapp.ApplicationModel();
		
		this.createCredential = function () {
			var site = prompt("Name of the site");
			if (site) {
				that.model.createCredential(site);
			}
		};
	};
	
	ApplicationController.prototype.init = function() {
		ko.applyBindings(this.model, document.getElementById("content"));
		return this;
	};
	
	namespace("theapp", {
		ApplicationController: ApplicationController
	});
}());