angular.module('presentation', [])
    .controller('presentationController', function($scope, $http){
        $scope.services = [];
        $scope.servicemodules = [];

        $scope.findServices = function () {
            $http.get("http://app.silvn.com:8080/api/services").success(function (data) {
                $scope.services = data;
            })
        };

        $scope.findServiceModules = function () {
            $http.get("http://app.silvn.com:8080/api/servicemodules").success(function (data) {
                $scope.servicemodules = data;
            })
        };

    });
