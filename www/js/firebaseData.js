angular.module('starter').factory('FirebaseData',function ($q,FirebaseUrl, $firebaseAuth) {

	var myFirebaseRef = new Firebase(FirebaseUrl);

	return {
		authObj: function(){
			return $firebaseAuth(myFirebaseRef);
		},
		ref: function(){
			return myFirebaseRef;
		},
		search: function(name){
			var deferred = $q.defer();
			var userRef = new Firebase(FirebaseUrl+'/users').orderByChild('firstname').equalTo(name);
			userRef.once("value",function (obj){
				if(obj.val()){
					deferred.resolve(obj.exportVal())
				}
				else{
					deferred.reject("No such user found")
				}
			},
			function (error){
				console.log(error);
				deferred.reject(error)
			})
			return deferred.promise;
		}
	}
})