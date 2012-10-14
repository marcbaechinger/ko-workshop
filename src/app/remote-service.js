//= require "../namespace"
(function () {
	
	var RemoteService = function () {
		return this;
	};
	
	RemoteService.prototype.getCredentials = function (query, callback) {
		setTimeout(function() {
			callback([
				{
					id: 1,
					site: ko.observable("Facebook"),
					username: ko.observable("marcbaechinger"),
					password: ko.observable("secret"),
				},
				{
					id: 2,
					site: ko.observable("Dropbox"),
					username: ko.observable("marcbaechinger"),
					password: ko.observable("verysecret"),
				},
				{
					id: 3,
					site: ko.observable("Github"),
					username: ko.observable("marcbaechinger"),
					password: ko.observable("notverysecret"),
				},
			]);
		}, 2000);
	};
	
	namespace("theapp", {
		service: new RemoteService()
	});
}());