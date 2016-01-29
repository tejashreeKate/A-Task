angular.module('starter')
.controller('MainCtrl',function ($scope, $ionicHistory, $state){
	$scope.goBack = function(){
		$ionicHistory.goBack();
	}

	$scope.goTo = function(url){
		$state.go(url);
	}
})