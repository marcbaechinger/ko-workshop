//= require "../namespace, remote-service, application-model, view/view-controller"
(function () {
	
	var ApplicationController = function (views) {
		var that = this,
			secretKey,
			getSecret = function () {
				if (typeof secretKey === "undefined") {
					secretKey = prompt("Enter master pass phrase");
					$("#key").show();
				}
				return secretKey;
			};
		this.passwordField = $("#password-field");
		this.model = new theapp.ApplicationModel();
		this.model.load();
		this.model.selectedCredential.subscribe(function (newValue) {
			if (!newValue) return;
			var pwd = newValue.password(),
				placeholder;
			that.passwordField.val("");
			if (pwd) {
				placeholder = JSON.parse(pwd).iv;
			} else {
				placeholder =  "enter password";
			}
			that.passwordField.attr("placeholder", placeholder);
		});
		
		this.view = new theapp.view.ViewController(views);
        
		this.selectView = function (view) {
			that.view.selectView(view);
		};
		this.selectCredential = function (credential) {
			that.model.selectedCredential(credential);
			$("#edit-form .site").focus();
		};
		this.clearCredentialSelection = function () {
			that.model.selectedCredential(null);
		};
		this.createCredential = function () {
			var site = prompt("Name of the site");
			if (site) {
				that.model.createCredential(site);
				$("#edit-form .username").focus();
			}
		};
		this.removeCredential = function (credential) {
			that.model.removeCredential(credential);
			if (that.model.selectedCredential() === credential) {
				that.model.selectedCredential(null);
			}
		};
		this.save = function () {
			that.model.save();
		};
		this.changePassword = function () {
			var pwd = that.passwordField.val();
			try {
				// encrypt with secret
				pwd = sjcl.encrypt(getSecret(), pwd);
				// update ui
				that.passwordField.val("");
				that.passwordField.attr("placeholder", JSON.parse(pwd).iv);
				// update model
				that.model.selectedCredential().password(pwd);
			} catch (e) {
				alert("encrypting failed: " + e.message);
				that.removeSecret();
			}
		};
		this.removeSecret = function () {
			secretKey = undefined;
			$("#key").hide();
		};
		this.showCleartextPassword = function () {
			if (!that.timeout) {				
				try {			
					var pwd = sjcl.decrypt(getSecret(), that.model.selectedCredential().password());
					var display = $("#ct-pwd");
					display.html(pwd);
					that.timeout = window.setTimeout(function () {
						display.html("show cleartext");
						delete that.timeout;
					}, 5000);
				} catch (e) {
					alert("decrypting failed: " + e.message);
					that.removeSecret();
				}
			}
		};
	};
	
	ApplicationController.prototype.init = function() {
		ko.applyBindings(this.model, document.getElementById("content"));
		this.view.init();
		return this;
	};
	
	namespace("theapp", {
		ApplicationController: ApplicationController
	});
}());