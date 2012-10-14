//= require "../../namespace, view"
(function () {
	
	var ViewModel = function (views) {
		var that = this;
		this.showOverlay = ko.observable(false);
		
		this.views = ko.observableArray(views);
		this.selectedView = ko.observable(views[0]);
		
	    this.selectView = function (view) {
			that.selectedView().active(false);
			view.active(true);
			that.selectedView(view);
		};
	};
	
	namespace("theapp.view", {
		ViewModel: ViewModel
	});
}());
