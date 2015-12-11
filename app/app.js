angular.module('presentation', [])
    .controller('presentationController', function($scope, $http){
        $scope.services = [];

        $scope.findServices = function () {
            $http.get("http://app.silvn.com:8080/api/services").success(function (data) {
                $scope.services = data;
            })
        };

    });
