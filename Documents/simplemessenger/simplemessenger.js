Messages = new Mongo.Collection('messages');

if (Meteor.isClient) {
	angular.module('simplemessenger',['angular-meteor']);
 
  	angular.module('simplemessenger').controller('MessengerCtrl', ['$scope', '$meteor',
    	function ($scope, $meteor) {
 
      		$scope.messages = $meteor.collection(Messages);

      		$scope.addMessage = function (newMessage) {
        		$scope.messages.push( {
          		text: newMessage,
          		createdAt: new Date() 
          	}
        );
      };
    }]);
}