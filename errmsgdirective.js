angular.module('errormsg').directive('errormsgdir', function() {
    /*jshint multistr: true */
    var templateString = 
	'<div   class="errorblocksetting slide-top" ng-class="{settopposition:errorlist.length}">	<img src="cross.png" class="imgstate" ng-click="removeErrorbar($event)">	There are {{errorlist.length}} errors. <div ng-repeat="message in errorlist">{{$index+1}}. {{message}}</div></div>'
	//'<div   class="errorblocksetting slide-top" ng-class="{settopposition:settop}">	There are 5 errors. <div ng-repeat=\'item in ["1","2","3","4","5"]\'>{{item}} //Hello can you see me sliding </div></div>';
	
	
    return {
	  
      restrict: 'A',
      template: templateString,
      link: function(scope, element, attrs) {
	  scope.removeErrorbar = function(event) {
			//alert('form remove bar in directive')
			event.preventDefault();
			event.stopPropagation();
			scope.errorlist=[];
			scope.userCanceledErrorDisplay=true;
			
	  };
        
      }
    };
  });

  