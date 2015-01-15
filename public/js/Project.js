angular.module('projectBotFire',["firebase"])
    .controller('projectsController',['$scope','$firebase', function ($scope,$firebase) {
        $scope.pro = new Firebase('https://projectbotfire.firebaseio.com/projects');
        $scope.project = {};
        var sync = $firebase($scope.pro);
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
    }])
    .controller('EmployeesController',['$scope','$firebase', function ($scope,$firebase) {
        $scope.emp = new Firebase('https://projectbotfire.firebaseio.com/employees');
        $scope.employe = {};
        var sync = $firebase($scope.emp);
        $scope.employeList = sync.$asArray();
        $scope.delete = function (index){
            sync.$remove($scope.employeList[index].$id).then(function(ref) {
            }, function(error) {
                console.log("Error:", error);
            });
        };

        $scope.edit = function (index){
            $scope.employe = $scope.employeeList[index];
        };

        $scope.save = function (){
            if($scope.employe.$id){
                var data ={
                    name: $scope.employe.name,
                    phone_no: $scope.employe.phone_no,
                    Year_of_exp: $scope.employe.Year_of_exp,
                    Project_Name: $scope.employe.Project_Name
                };

                sync.$update($scope.employe.$id,data).then(function(ref) {
                    $scope.employe = {};
                }, function(error) {
                    console.log("Error:", error);
                });
            }else{
                sync.$push($scope.employe).then(function(ref) {
                    $scope.employe = {};
                }, function(error) {
                    console.log("Error:", error);
                });
            }
        };
    }]);


