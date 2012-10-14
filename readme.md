# ko workshop walktrough

## Starting point

<b>git tag:</b> workshop-start

### technology stack

* application boilder plate based on HTML5 boilerplate
* modernizer: cross-device and browser applications readiness
* bootstrap: framework with css grid and css UI tool kit
* jquery: DOM and browser facade; utilities
* knockout.js: knockout library

### base application files

* index.html: contains the application markup
* app.js: starts the applicaiton controller
* app.css: application specific styles
* src/*.js: application javascripts 

### Application markup

* Navigation bar on top
* a form element in the bootstrap grid
 	* A header 
	* a button bar with a button
	* a list 

### Application javascript

* src/app/application-model.js: an observable model representing our application (view model)
* src/app/application-controller.js: the controller

## Observables and observable arrays

* explain the ApplicationModel shortly
	* <code>ko.observable()</code>
	* <code>ko.observableArray()</code>
* explain the ApplicationController shortly
	* <code>ko.applyBindings(model, contextElement)</code>


# Exercises: Secure password manager

## Exercise 1: observable and observableArray: create, add, delete

==> git tag: workshop-start

### array template
* Display all credentials in the #credential-list by using ko DOM templating
* display the <code>site</code> and <code>username</code> for each item in the list

### create a new credential and add to collection
* add createCredential(sitename) function to the ApplicationModel
* add createCredential() function to the ApplicationController
	* get sitename from user wth prompt()
	* delegate creation to the model
* create bindings to new button in the markup

### remove a existing credential from the list
* add removeCredential(credential) function to the model
	* it simply removes the credential object passd as param from the observableArray
* add a binding to the delete button
	* note that the binding is within a foreach template
	* that's why the current data item of an array is passed to a function binded within the template (cool feature!!)

==> git tag: exercise-1-end

## Exercise 2: select item in list and display in edit form

==> git tag: exercise-2-start

* add markup for edit form  => git tag: exercise-2-start
* add an observable 'selectedCredential' to the application model
* add bindings to the list item to set the selected credential
* subscribe to the selection change to set focus on appropriate form field (.site)
* automatically select a new item on creation and set focus to appropriate form field (.username) 
=> git tag: exersice-2-end

==> git tag: exercise-2-end

## Exercise 3: filter list entries

==> git tag: exercise-3-start

* add text field to list form (below button-bar and above the list) => git tag: exercise-3-start
* add a filter ko.observable() with an empty string
* add a filteredCredentials as a ko.computed
     * the implementation creates a filtered array of credentials and returns it
* change binding foreach of the list to the filteredCredentials  
* add value binding to the text field to set the filter query to the model 
=> git tag: exercise-3-end

==> git tag: exercise-3-end

## Exercise 4a: initalize model from and save to local storage

==> git tag: exercise-4-start

* add markup of save button to button bar => git tag: exercise-4-start
* add save function to the ApplicationModel
* add load function to the ApplicationModel
* remove sample data from ApplicationModel
* add binding to save button to trigger save function on model
* call load function of model after creation (in ApplicationContoller constructor)
* add style binding to form element to show it only when a list item is selected
* add keyup handler to perform save on ctrl-s

==> git tag: exercise-4-end

## Exercise 4b: initalize model from and save to remote service
 tbd

## Exercise 5: encrypt/decrypt passwords with sjcl 

==> git tag: exercise-5-start

### step 1: encrypt password when entered
* markup: add markup for 'cleartext password' button below #password-field
* markup: remove binding to cleartext password of #password-field
* add private function getSecret() to ApplicationController
 	* check for available value in private var secretKey
	* if no secretKey: ask for master key with prompt("")
		* set secretKey
	* return secretKey
* at the bottom of index.html add: &lt;script src="js/sjcl.js"&gt;&lt;/script&gt;

* add changePassword member function to ApplicationController
	
    * get value of #password-field
    * encrypt password with sjcl.encrypt(secretKey, pwd)
	* empty password field
	* set value of #password-field@placeholder to JSON.parse(pwd).iv
	* set result of encryption to the password prop of model.selectedCredential()
	* do everyting above in a try-catch block
* add binding to #password-field to call changePassword() on change

=> git tag: exercise-5-step-1

### step 2: show clear text password
* delete all items without encrypted passwords to avoid problems
* show encrypted password in placeholder attr of #password-field when selection changes (we already subscribed to this.model.selectedCredential; extend logic)
* delete all list items without encrypted passwords to avoid problems
* add member function showCleartextPassword to the ApplicationController
	* get pwdEncryptData from model.selectedCredential.password()
	* get secretKey from getSecret()
	* decrypt password with sjcl.decrypt(secretKey, pwdEncryptData) 
	* update the text of #ct-pwd
* add click binding to #ct-pwd to call showCleartextPassword()

=> git tag: exercise-5-step-2

### step 3: improvements
* change impl of function showCleartextPassword to erase display of cleartext password after 5 sec.
* display an icon when the secretKey is stored in memory
	* add an observable to the model: this.secret = ko.observable();
	* change getSecret to read and store the secret key in the observable
	* add binding to #key to display when a model.secret is not null: data-bind="style: {display: secret() ? 'block' : 'none'}"
* add removeSecret function to the ApplicationController
	* unset the secret in the model
* add binding to #key to call removeSecret() on click

=> git tag: exercise-5-end

## Bugfixes
* clear secret when encryption fails

## optional steps (not implemented yet)

* externalize and inject load/save functions of the model
* when storing credentials, also store current selection and filter to resume UI when restarted
* make sure that master password is never changed or migrate all encrypted parts when changing the master password