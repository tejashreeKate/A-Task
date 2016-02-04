angular.module('starter')
.controller('ContactsCtrl',function ($scope, $rootScope, FirebaseData){
	console.log("contacts")
	$scope.search = {};
	$scope.showPopover = false;
	$scope.searchResult = [];

	$scope.searchUser = function(name,$event){
		$scope.searchResult = [];
		FirebaseData.search(name).then(function (data){
			console.log(data)
			$scope.showPopover = true;
			data.forEach(function (obj){
				$scope.searchResult.push(obj);	
			})
		})
	}
})