var pres = angular.module('presentation', [])
    .controller('presentationController', function($scope, $http){

      //Services
        $scope.services = [];
        $scope.service = [];
        $scope.deleteservice = [];


        $scope.putservice =
            {"id":1,"serviceName":"Updated Compute",
            "modules":[{"id":1,"category":"Compute",
            "size":"M","provider":"LibVirt","config":"config","name":"Compute"}]};
        $scope.postservice =
            {"serviceName":"New Compute",
            "modules":[{"id":1,"category":"Compute",
            "size":"M","provider":"LibVirt","config":"config","name":"Compute"}]};
            $scope.deleteservice =
                {"id":4,"serviceName":"New Compute",
                "modules":[{"id":1,"category":"Compute",
                "size":"M","provider":"LibVirt","config":"config","name":"Compute"}]};

        $scope.orderservice =   {"id":2,"serviceName":"Network","modules":[{"id":2,"category":"Network",
        "size":null,"provider":"LibVirt","config":"<network>\n\t<name>network-{{UUID}}</name>\n\t</network>\n",
        "name":"Network"}]};

        $scope.findServices = function () {
            $http.get("http://localhost:8080/api/services").success(function (data) {
                $scope.services = data;
            })
        };

        $scope.findService = function () {
            $http.get("http://localhost:8080/api/services/1").success(function (data) {
                $scope.service = data;
            })
        };

        $scope.updateService = function() {
            $http.put("http://localhost:8080/api/services/1", $scope.putservice).success(function() {
                }).error(function() {
                  console.log("error");
                  });
        };

        $scope.createService = function() {
            $http.post("http://localhost:8080/api/services/new", $scope.postservice).success(function() {
                }).error(function() {
                  console.log("error");
                  });
        };

        $scope.deleteService = function() {
            $http.delete("http://localhost:8080/api/services/4", 4).success(function() {
                }).error(function() {
                  console.log("error");
                  });
        };

        $scope.orderService = function() {
            $http.post("http://localhost:8080/api/services/2", $scope.orderservice).success(function() {
                }).error(function() {
                  console.log("error");
                  });
        };



        //OrderedServices
        $scope.orderedservices = [];
        $scope.orderedservice = [];
        $scope.findOrderedServices = function () {
            $http.get("http://localhost:8080/api/orderedservices").success(function (data) {
                $scope.orderedservices = data;
            })
        };

        $scope.findOrderedService = function () {
            $http.get("http://localhost:8080/api/orderedservices/1").success(function (data) {
                $scope.orderedservice = data;
            })
        };

        $scope.cancelOrderedService = function () {
            $http.delete("http://localhost:8080/api/orderedservices/1" ,1).success(function (data) {

            })
        };

        //ServiceModule
        $scope.servicemodules = [];
        $scope.categories;
        $scope.sizes;
        $scope.providers;
        $scope.findServiceModules = function () {
            $http.get("http://localhost:8080/api/servicemodules").success(function (data) {
                $scope.servicemodules = data;
            })
        };

        $scope.findCategories = function () {
            $http.get("http://localhost:8080/api/servicemodules/categories").success(function (data) {
                $scope.categories = data;
            })
        };

        $scope.findSizes = function () {
            $http.get("http://localhost:8080/api/servicemodules/sizes").success(function (data) {
                $scope.sizes = data;
            })
        };

        $scope.findProviders = function () {
            $http.get("http://localhost:8080/api/servicemodules/providers").success(function (data) {
                $scope.providers = data;
            })
        };

    });



    pres.factory('ServiceModule', ['$resource', function($resource) {
        return $resource('http://localhost:8080/api/servicemodules/:id', null,
            {
                'update': { method:'PUT' }
            });
    }]);
    pres.factory('Service', ['$resource', function($resource) {
        return $resource('http://localhost:8080/api/services/:id', {id: '@id'},
            {
                'update': { method:'PUT' }
            });
    }]);
