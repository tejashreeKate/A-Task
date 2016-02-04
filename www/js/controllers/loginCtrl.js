angular.module('starter')
.controller('LoginCtrl',function ($scope, $state, $ionicHistory, $rootScope, FirebaseData, $location){
	console.log("Login controller");
	var firebaseRef = FirebaseData.ref();
	$scope.authObj = FirebaseData.authObj();
	$scope.user = {};
	$scope.isError = false;

    $scope.$on('$ionicView.beforeEnter', function() {
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
        $scope.emptyUser();
    });


	$scope.go = function(url){
		$state.go(url);
	}

	$scope.emptyUser = function(){
		$scope.user = {
			firstname:"",
			lastname:"",
			email:"",
			password:"",
			confirmPassword:""
		}
	}

	$scope.registerUser = function (user,form){
		if(form.$valid){
			if($scope.user.password === $scope.user.confirmPassword){
				console.log("inside if")
				$scope.authObj.$createUser({
					email:user.email,
					password:user.password
				})
				.then(function (userData,user){
					console.log("User with "+userData.uid+"created")
					firebaseRef.child("users").child(userData.uid).set({
						firstname:$scope.user.firstname,
						lastname:$scope.user.lastname,
						email:$scope.user.email,
						password:$scope.user.password
				    });
					$scope.emptyUser();
					alert("You have signed up successfully")
					$state.go('login')
					$scope.isError = false;
				})
				.catch(function (error,user){
					$scope.emptyUser();
					alert(error)
				})
			}
			else{
				$scope.errorRegister = 'Both the passwords are not matching'
			}
		}
		else{
			$scope.registerInputError = true;

		}
	}

	$scope.logIn = function(user,form){
		if(form.$valid){
			$scope.authObj.$authWithPassword({
			  email: user.email,
			  password: user.password
			})
			.then(function(authData) {
				console.log("Logged in as:", authData.uid);
			  	$scope.isError = false;
				$scope.errorMsg = '';
				$rootScope.currentUser = {
					email:user.email,
					password:user.password,
					id:authData.uid
				};
				$scope.emptyUser();
				$location.path('/home/summary');
		
			})
			.catch(function(error) {
			  	console.error("Authentication failed:", error);
			 	$scope.errorMsg = 'Either your user name or password is incorrect';
				$scope.$apply();
			});
		}
		else{
			$scope.isError = true;
		}
	}
})


