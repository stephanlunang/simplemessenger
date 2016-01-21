Messages = new Mongo.Collection('messages');

if (Meteor.isClient) {
	angular.module('simplemessenger',['angular-meteor', 'accounts.ui']);

  	Accounts.ui.config({
    	passwordSignupFields: "USERNAME_AND_EMAIL"
  	});

  	angular.module('simplemessenger').controller('MessengerCtrl', ['$scope', '$meteor',
    	function ($scope, $meteor) {
 
      		$scope.messages = $meteor.collection(Messages);

      		$scope.addMessage = function (newMessage) {
        		$scope.messages.push( 
        			{text: newMessage, 
        				createdAt: new Date(), 
        				username: Meteor.user().username 
        			});
      		};
      		$scope.gotoBottom = function (){
    			var objDiv = document.getElementById("cardcontainer");
       			objDiv.scrollTop = objDiv.scrollHeight;      			
      		}
    }]);
}