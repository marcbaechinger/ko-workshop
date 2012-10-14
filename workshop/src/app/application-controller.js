(function () {
	
	var ApplicationController = function () {
		var that = this,
			secretKey,
			getSecret = function () {
				if (typeof secretKey === "undefined") {
					secretKey = prompt("Enter master pass phrase");
				}
				return secretKey;
			};
		this.passwordField = $("#password-field");
		
		this.model = new theapp.ApplicationModel();
		this.model.load();
		
		this.createCredential = function () {
			var site = prompt("Name of the site"),
				credential;
			if (site) {
				credential = that.model.createCredential(site);
				that.model.selectedCredential(credential);
				$("#edit-form .username").focus();
			}
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
		this.showCleartextPassword = function () {
			var pwd;
			if (!that.cleartextTimeout) {
				pwd = sjcl.decrypt(getSecret(), that.model.selectedCredential().password());
				$("#ct-pwd").html(pwd);
				that.cleartextTimeout = window.setTimeout(function () {
					$("#ct-pwd").html("show cleartext");
					delete that.cleartextTimeout;
				}, 5000);
			}
		};
		this.model.selectedCredential.subscribe(function (newValue) {
			var pwdEncryptionData, 
				placeholder;
			if (newValue) {
				$("#edit-form .site").focus();
				
				that.passwordField.val("");
				pwdEncryptionData = newValue.password();
				
				placeholder = pwdEncryptionData ? JSON.parse(pwdEncryptionData).iv : "enter password";
				that.passwordField.attr("placeholder", placeholder);
			}
		});
		
		$(document).bind("keyup", function (ev) {
			if (ev.ctrlKey && ev.which === 83) {
				that.model.save();
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