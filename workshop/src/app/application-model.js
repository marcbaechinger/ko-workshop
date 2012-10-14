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
		var that = this,
			nextId = 1;
			
		this.selectedCredential = ko.observable();
		this.credentials = ko.observableArray([
			new Credentials(1, "Facebook", "marcbaechinger", "secret"),
			new Credentials(1, "Twitter", "marc", "verysecret")
		]);
		
		this.createCredential = function (site) {
			var credentials = new Credentials(nextId++, site);
			this.credentials.push(credentials);
			return credentials;
		};
		
		this.removeCredential = function (credential) {
			that.credentials.remove(credential);
		};
	};
	
	namespace("theapp", {
		ApplicationModel: ApplicationModel
	});
}());
