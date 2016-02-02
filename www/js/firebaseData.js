angular.module('starter').factory('FirebaseData',function (FirebaseUrl, $firebaseAuth) {

	var myFirebaseRef = new Firebase(FirebaseUrl);

	return {
		authObj: function(){
			return $firebaseAuth(myFirebaseRef);
		},
		ref: function(){
			return myFirebaseRef;
		}
	}
})