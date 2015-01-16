angular.module('projectBotFire',["firebase"])
    .controller('projectsController',['$scope','$firebase', function ($scope,$firebase) {
        console.log('projectsController');
        $scope.ref = new Firebase('https://projectbotfire.firebaseio.com');
        $scope.project = {};
        var sync = $firebase($scope.ref.child("projects"));
        $scope.projectList = sync.$asArray();

        $scope.delete = function (index){
            sync.$remove($scope.projectList[index].$id).then(function(ref) {
            }, function(error) {
                console.log("Error:", error);
            });
        };

        $scope.edit = function (index){
            console.log($scope.projectList[index]);
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
                sync.$set($scope.project.name,$scope.project).then(function(ref) {
                    $scope.project = {};
                }, function(error) {
                    console.log("Error:", error);
                });
            }
        };
    }])
    .controller('EmployeesController',['$scope','$firebase', function ($scope,$firebase) {
        console.log('EmployeesController');

        $scope.ref = new Firebase('https://projectbotfire.firebaseio.com');
        $scope.employe = {};
        $scope.employeList = [];
        var syncEmp = $firebase($scope.ref.child("employees"));
        $scope.employeList = syncEmp.$asArray();

        console.log('$scope.employeList',$scope.employeList);

      /*  $scope.employeList.$loaded().then(function() {
            console.log("list has " + $scope.employeList.length + " item(s)");
            $scope.employeList.forEach(function(emp){
                if(emp.project_Name  =='p1')
                console.log(emp.name);
            });
        });*/


        $scope.ref.child('employees').once('value', function(employeesSnap) {
            console.log(employeesSnap);
            employeesSnap.forEach(function(val){
                //console.log(val.child('name'));
                if(val.child('name').val()=='Dummy')
                //console.log(val.val());
            });
/*            $scope.ref.child('projects').once('value', function(projectsSnap) {
                console.log('2222',projectsSnap.val());
                // extend function: https://gist.github.com/katowulf/6598238
               // console.log( extend({}, employeesSnap.val(), projectsSnap.val()) );
            });*/
        });


        $scope.delete = function (index){
            console.log($scope.employeList[index]);
            syncEmp.$remove($scope.employeList[index].$id).then(function(ref) {
            }, function(error) {
                console.log("Error:", error);
            });
        };

        $scope.edit = function (index){
            console.log($scope.employeList[index]);
           $scope.employe = $scope.employeList[index];
        };

        $scope.save = function (){
            console.log('$scope.employe',$scope.employe.$id);
           if($scope.employe.$id){
                var data ={
                    name: $scope.employe.name,
                    phone_no: $scope.employe.phone_no,
                    Year_of_exp: $scope.employe.Year_of_exp,
                    project_Name: $scope.employe.project_Name
                };

               syncEmp.$update($scope.employe.$id,data).then(function(ref) {
                    $scope.employe = {};
                }, function(error) {
                    console.log("Error:", error);
                });
            }else{
               syncEmp.$set($scope.employe.name, $scope.employe).then(function(ref) {
                    ref.key();
                    $scope.employe = {};// foo
                }, function(error) {
                    console.log("Error:", error);
                });
            }
        };
    }]);


