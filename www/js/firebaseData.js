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
			var res = [];
			userRef.on("value",function (dataSnapshot){
				if(dataSnapshot){
					dataSnapshot.forEach(function (child){
						res.push(child.exportVal())
						//deferred.resolve(child.exportVal())
					})
					deferred.resolve(res)
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