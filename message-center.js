/*jshint strict:false */
'use strict';

// Create a new angular module.
var MessageCenterModule = angular.module('MessageCenterModule', []);

// Define a service to inject.
MessageCenterModule.
  service('messageCenterService', 
    function ($timeout, $compile, $templateCache, $rootScope, $injector, $sce) {
      return {
        mcMessages: this.mcMessages || [],
		
        
        add: function (errorlist) {
           //service = this;
           var scope = $rootScope.$new();
		   scope.mcMessages=this.mcMessages;
		   //var templateElement = $compile('<div   class="errorblocksetting slide-top" ng-class="{settopposition:mcMessages.length}"><img src="cross.png" style = "float:right" ng-click="removeErrorbar($event)">	There are {{mcMessages.length}} //errors. <div ng-repeat="message in mcMessages">{{$index+1}} {{message.fieldname}}: {{message.message}}  </div></div>')(scope);
		   var templateElement = $compile('<div mcMessagesdir>  </div>')(scope);
		   
		   
		   angular.element(document.getElementsByTagName('body')).append(templateElement);
		   templateElement.addClass("slide-top");
		   //templateElement.addClass(args.type);
		   this.mcMessages = errorlist;
		   scope.mcMessages=this.mcMessages;
		   
		   //return this.mcMessages;
		   //initialize DOM element and add it to body tag
		   
			
		   
		   
        },
        remove: function () {
          this.mcMessage =[];
		  
        },
        
		update: function (errorlist) {
          this.mcMessages = errorlist;
        }
		
        
       
      };
    }
  );
  
  
  

  
  
MessageCenterModule.
  directive('mcMessagesdir', function () {
    /*jshint multistr: true */
    var templateString = '<div   class="errorblocksetting " ng-class="{settopposition:mcMessages.length}">	There are {{mcMessages.length}} errors. <div ng-repeat="message in mcMessages">{{$index}} {{message.fieldname}}: {{message.message}}:  </div></div>';
    return {
      restrict: 'A',
      template: templateString,
      link: function(scope, element, attrs) {
		console.log(scope);
      scope.removebar = function(event) {
    //alert('form sent')
		event.preventDefault();
		event.stopPropagation();
		if(scope.mcMessages)
			scope.mcMessages=[];
		
	  }; 
        
		
      }
    };
  });
