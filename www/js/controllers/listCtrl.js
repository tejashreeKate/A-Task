angular.module('starter')
.controller('ListCtrl', function ($scope, FirebaseData, $firebaseObject) {
  console.log("DashCtrl")
  $scope.tasks = $firebaseObject(FirebaseData.child('data/tasks'));
  console.log($scope.tasks)
  //console.log($firebaseObject(FirebaseData.child('data/tasks/1')))
})
