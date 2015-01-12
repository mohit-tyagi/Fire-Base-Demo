angular.module('projectBotFire',["firebase"])
    .controller('projectController',['$scope','$firebase', function ($scope,$firebase) {
        $scope.myDataRef = new Firebase('https://projectbotfire.firebaseio.com/');
        $scope.project = {};
        var sync = $firebase($scope.myDataRef);
        $scope.projectList = sync.$asArray();
        $scope.delete = function (index){
            sync.$remove($scope.projectList[index].$id).then(function(ref) {
            }, function(error) {
                console.log("Error:", error);
            });
        };

        $scope.edit = function (index){
            $scope.project = $scope.projectList[index];
        };

        $scope.save = function (){
            if($scope.project.$id){
                var data ={
                    name: $scope.project.name,
                    clientName: $scope.project.clientName,
                    noOfusers: $scope.project.noOfusers,
                    status: $scope.project.status
                };

                sync.$update($scope.project.$id,data).then(function(ref) {
                    $scope.project = {};
                }, function(error) {
                    console.log("Error:", error);
                });
            }else{
                sync.$push($scope.project).then(function(ref) {
                    $scope.project = {};
                }, function(error) {
                    console.log("Error:", error);
                });
            }
        };
    }]);


