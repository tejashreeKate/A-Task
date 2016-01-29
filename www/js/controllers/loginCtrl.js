angular.module('starter')
.controller('LoginCtrl',function ($scope, $state, $ionicHistory, $rootScope){
	console.log("Login controller");

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
			username:"",
			email:"",
			password:"",
			confirmPassword:""
		}
	}

	$scope.registerUser = function (user,form){
		if(form.$valid){
			if($scope.user.password === $scope.user.confirmPassword){
				var newUser = new Parse.User();
				newUser.set("firstname",user.firstname)
				newUser.set("lastname",user.lastname)
				newUser.set("username",user.username)
				newUser.set("email",user.email)
				newUser.set("password",user.password)

				newUser.signUp(null,{
					success:function(user){
						$state.go('login')
						$scope.isError = false;
					},
					error:function(user,error){
						alert("Error: " + error.code + " " + error.message);
					}
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
			Parse.User.logIn(user.username, user.password, {
				success:function(user){
					$scope.isError = false;
					$scope.errorMsg = '';
					$rootScope.currentUser = user;
					$scope.emptyUser();
					$state.go('home');
				},
				error:function(user,error){
					$scope.errorMsg = 'Either your user name or password is incorrect';
					$scope.$apply();
				}
			})
		}
		else{
			$scope.isError = true;
		}
	}
})


