angular.module('starter').factory('FirebaseData',function (FirebaseUrl, $firebaseObject) {

	var myFirebaseRef = new Firebase(FirebaseUrl);

	return myFirebaseRef;
})