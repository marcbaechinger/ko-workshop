(function () {
	
	var ApplicationController = function () {
		var that = this;
		
		this.model = new theapp.ApplicationModel();
	};
	
	ApplicationController.prototype.init = function() {
		ko.applyBindings(this.model, document.getElementById("content"));
		return this;
	};
	
	namespace("theapp", {
		ApplicationController: ApplicationController
	});
}());