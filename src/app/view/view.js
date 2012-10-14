//= require "../../namespace"
(function () {
	// represents a View in javascript
	var nextId = 1,
		View = function (id, label, active) {
			this.id = id;
			this.label = label;
			this.active = ko.observable(active);
			this.styleClass = ko.computed(function() {
					return this.active() ? "active" : "inactive";
				}, this);
		};
	
	namespace("theapp.view", {
		View: View
	});	
}());