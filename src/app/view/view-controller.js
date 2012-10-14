//= require "../../namespace, view-model"
(function () {
	
	var ViewController = function (views) {
		var that = this;
		this.model = new theapp.view.ViewModel(views);
		
		this.selectView = function (view) {
			that.model.selectView(view);
			$(".page").hide();
			$("#" + view.id).show();
		};
	};
	ViewController.prototype.init = function() {
		ko.applyBindings(this.model, document.getElementById("navbar"));
		return this;
	};
	
	
	namespace("theapp.view", {
		ViewController: ViewController
	});
}());