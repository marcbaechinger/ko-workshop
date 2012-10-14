//= require "../namespace"
(function () {
	
	var Credentials = function (id, site, username, password) {
			return {
				id: id,
				site: ko.observable(site),
				username: ko.observable(username),
				password: ko.observable(password)
			};
		};

	var ApplicationModel = function () {
		this.credentials = ko.observableArray([
			new Credentials(1, "Facebook", "marcbaechinger", "secret"),
			new Credentials(1, "Twitter", "marc", "verysecret")
		]);
	};
	
	namespace("theapp", {
		ApplicationModel: ApplicationModel
	});
}());
