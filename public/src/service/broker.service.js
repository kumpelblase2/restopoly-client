angular.module('restopoly').factory('BrokerService', ['$http', '$rootScope', '$q', function($http, $rootScope, $q) {
    var emptyTransformer = [function (data) { return data; }];

    return {
        getOwner: function(field) {
            return $http({
                method: 'GET',
                url: $rootScope.ips.broker + field.broker
            }).then(function(response) { return response.data; });
        },
        buy: function(field, player) {
            return $http({
                method: 'PUT',
                url: $rootScope.ips.broker + field.broker,
                data: player
            });
        }
    };
}]);
