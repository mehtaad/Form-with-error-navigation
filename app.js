var app = angular.module('errormsg', ['ui.bootstrap']);

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
							if(form.$submitted && form.dt.$error.required && !form.dt.$error.date){
								scope.errorlist.push("date: Required, can not be blank");
							}
							else if(form.$submitted && form.dt.$error.date){
								scope.errorlist.push("date: Invalid date address, please enter valid date address"); 
							}
							else if(scope.dt>=scope.minDate && scope.dt<scope.maxDate){
								//its a valid date so now check for valid date entry via keyboard input
								
								var isValidDate=true;
								var str = form.dt.$viewValue;
								if(str.length <=10){ //its a keyboard entry								
									var matches = str.match(/(\d{1,2})[- \/](\d{1,2})[- \/](\d{4})/);
									if (!matches) {
									isValidDate=false
									}
									else{
										// convert pieces to numbers
										// make a date object out of it
										var month = parseInt(matches[1], 10);
										var day = parseInt(matches[2], 10);
										var year = parseInt(matches[3], 10);
										var date = new Date(year, month - 1, day);
										if (!date || !date.getTime()) {
											isValidDate=false
										}
										else {
											// make sure we didn't have any illegal 
											// month or day values that the date constructor
											// coerced into valid values
											if (date.getMonth() + 1 != month ||
												date.getFullYear() != year ||
												date.getDate() != day) {
													{isValidDate=false}
												}
										}
									}
									
								}
								if(!isValidDate){
									  form.dt.$valid=false;  form.dt.$error.date=true;
									  scope.errorlist.push("date: Invalid date address, please enter valid date address"); 
								}
								else
								 scope.errorlist.push("date: Its Valid Date"); 
							}
							else {
								form.dt.$valid=false;  form.dt.$error.date=true;	
								scope.errorlist.push("date: Invalid date address, please enter valid date address"); 
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
  
  $scope.today = function() {
    $scope.dt = null;
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
	$scope.maxDate = new Date(); 
	$scope.maxDate.setYear($scope.minDate.getYear()+1901);
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yyyy',
    startingDay: 1
  };

  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['MM/dd/yyyy','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
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


