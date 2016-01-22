Messages = new Mongo.Collection('messages');


Messages.allow({
  insert: function (userId, party) {
    return userId && party.owner === userId;
  }
});

if (Meteor.isClient) {
	Meteor.subscribe("messages");
	Meteor.subscribe("directory");

	angular.module('simplemessenger',[
		'angular-meteor', 
		'accounts.ui',
		'ui.router'
		]);

  	Accounts.ui.config({
    	passwordSignupFields: "USERNAME_AND_EMAIL"
  	});

  	angular.module('simplemessenger').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
	    $locationProvider.html5Mode(true);

	    $stateProvider
	      .state('landing', {
	        url: '/landing',
	        templateUrl: 'landing.html'
	      })
	      .state('simplemessenger', {
	        url: '/simplemessenger',
	        templateUrl: 'simplemessenger.html'
	      })
	      .state('users', {
	        url: '/users',
	        templateUrl: 'users.html'
	      });

	    $urlRouterProvider.otherwise("/landing");
	});  	

  	angular.module('simplemessenger').controller('MessengerCtrl', ['$scope', '$meteor',
    	function ($scope, $meteor) {
 
      		$scope.messages = $meteor.collection(Messages);

      		$scope.addMessage = function (newMessage) {
        		$scope.messages.push( 
        			{text: newMessage, 
        				createdAt: new Date(), 
        				username: Meteor.user().username, 
        				email: Meteor.user().emails[0].address
        			});
      		};
      		$scope.gotoBottom = function (){
    			var objDiv = document.getElementById("cardcontainer");
       			objDiv.scrollTop = objDiv.scrollHeight;      			
      		}
    }]);

	angular.module('simplemessenger').filter('displayName', function () {
	  return function (message) {
	    if (!message) {
	      return '';
	    } 
	    if (message.username) {
	      return message.username;
	    }
	    else {
	      return message.email;
	    }
	  }
	});
}