var pres = angular.module('presentation', [])
    .controller('presentationController', function($scope, $http){
        $scope.services = [];
        $scope.service = [];
        $scope.servicemodules = [];

        $scope.putservice =[
            {"id":1,"serviceName":"Network","modules":[{"id":1,"category":"Network","size":null,"provider":"LibVirt",
            "config":"<network>\n\n\t<name>network-{{UUID}}</name>\n\t<bridge />\n\t<forward mode=\"nat\" />\n\t\n\t<ip address=\"192.168.122.1\" netmask=\"255.255.255.0\">\n\t\t<dhcp>\n\t\t\t<range start=\"192.168.122.2\" end=\"192.168.122.254\" />\n\t\t</dhcp>\n\t</ip>\n\t\n\t<ip family=\"ipv6\" address=\"2001:db8:ca2:2::1\" prefix=\"64\" >\n\t\t<dhcp>\n\t\t\t<range start=\"2001:db8:ca2:2:1::10\" end=\"2001:db8:ca2:2:1::ff\" />\n\t\t</dhcp>\n\t</ip>\n\t\n</network>",
            "name":"Network Example"}]}
        ];

        $scope.findServices = function () {
            $http.get("http://app.silvn.com:8080/api/services").success(function (data) {
                $scope.service = data;
            })
        };

        $scope.findService = function () {
            $http.get("http://app.silvn.com:8080/api/services/1").success(function (data) {
                $scope.services = data;
            })
        };

        $scope.updateService = function(service) {
          Service.update({ id:$routeParams.serviceId }, service);
        };

        $scope.findServiceModules = function () {
            $http.get("http://app.silvn.com:8080/api/servicemodules").success(function (data) {
                $scope.servicemodules = data;
            })
        };

    });



pres.factory('ServiceModule', ['$resource', function($resource) {
    return $resource('http://app.silvn.com:8080/api/servicemodules/:id', null,
        {
            'update': { method:'PUT' }
        });
}]);
pres.factory('Service', ['$resource', function($resource) {
    return $resource('http://app.silvn.com:8080/api/services/:id', {id: '@id'},
        {
            'update': { method:'PUT' }
        });
}]);
