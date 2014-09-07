var app = angular.module('errormsg', []);

 var ValidSubmit = ['$parse', function ($parse) {
        //return {
            //compile: function compile(tElement, tAttrs, transclude) {
                return {
                    link: function postLink(scope, element, iAttrs, controller) {
						
						scope.errorlist=[];
                        var form = element.controller('form');
                        form.$submitted = false;
                        var fn = $parse(iAttrs.validSubmit);
                        element.on('submit', function(event) {
                            scope.$apply(function() {
                                element.addClass('ng-submitted');
                                form.$submitted = true;
                                if(form.$valid) {
                                    fn(scope, {$event:event});
									scope.errorlist=[];
								}
								
								else {scope.setErrorObject(); }
                            });
                        });
						scope.setErrorObject = function()
						{
							//go through each form element and create error object to be displayed by error display service
							scope.errorlist = [];
							if(form.$submitted && form.firstName.$error.required){
								scope.errorlist.push("First Name: Required, can not be blank"); 
							}
							if(form.$submitted && form.lastName.$error.required){
								scope.errorlist.push("Last Name: Required, can not be blank");
							}
							if(form.$submitted && form.email.$error.required){
								scope.errorlist.push("Email: Required, can not be blank");
							}
							else if(form.$submitted && form.email.$error.email){
								scope.errorlist.push("Email: Invalid email address, please enter valid email address"); 
							}
							
							if(form.$submitted && form.agreedToTerms.$error.required){
								scope.errorlist.push("Agreement To Terms: please check agreed to terms check box");
							}
						}
                        scope.$watch(function() { return form.$valid}, function(isValid) {
							//watch all form elements and update errorlist object and redisplay error message via error services
                            if(form.$submitted == false) return;
                            if(isValid) {
                                element.removeClass('has-error').addClass('has-success');
								scope.errorlist=[];
                            } else {
                                element.removeClass('has-success');
                                element.addClass('has-error');
								scope.setErrorObject();
								
                            }
                        });
                    }
                }
            //}
        //}
    }]
    app.directive('validSubmit', ValidSubmit);
    

app.controller('MainCtrl', function($scope) {
$scope.settop=false;

  $scope.sendForm = function() {
    //alert('form sent');
	//create list of error msg on the form

	if(!$scope.settop)
		$scope.settop=!$scope.settop;
	//you can display success message and go back to main page	
	
  };
  $scope.removebar = function(event) {
    //alert('form sent')
	event.preventDefault();
    event.stopPropagation();
	if($scope.settop)
		$scope.settop=!$scope.settop;
	
  };
  $scope.getClass = function(b) {
    return b.toString();
  }
  //$scope.userCanceledErrorDisplay
   $scope.setFirstnameError = function()
  {
    if($scope.mainForm.$submitted && !$scope.userCanceledErrorDisplay)
	{
			$scope.setErrorObject();
			
	}
	
	
  };
  /* $scope.setLastnameError = function()
  {
    if($scope.mainForm.$submitted && $scope.mainForm.lastName.$error.required && !$scope.userCanceledErrorDisplay){
		$scope.setErrorObject();
	}
		
  };
  $scope.setEmailnameError = function()
  {
    if($scope.mainForm.$submitted && $scope.mainForm.email.$error.required && !$scope.userCanceledErrorDisplay){
		$scope.setErrorObject();
		}
		
		
  };
  $scope.setEmailnameError1 = function()
  {
    if($scope.mainForm.$submitted && $scope.mainForm.email.$error.email && !$scope.userCanceledErrorDisplay)
		$scope.setErrorObject();
		
		
  };
  $scope.setTermnameError1 = function()
  {
    if($scope.mainForm.$submitted && $scope.mainForm.agreedToTerms.$error.required && !$scope.userCanceledErrorDisplay)
		$scope.setErrorObject();
		
  }; */
  /* 
  $scope.setFirstnameError = function(str)
  {
    if($scope.mainForm.$submitted && $scope.mainForm.firstName.$error.required)
		console.log(str);
  } */
  
});


