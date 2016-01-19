angular.module('restopoly').factory('BrokerService', ['$http', '$rootScope', '$q', function($http, $rootScope, $q) {
    var emptyTransformer = [function (data) { return data; }];

    return {
        getOwner: function(field) {
            return $http({
                method: 'GET',
                url: field.broker + '/owner'
            }).then(function(response) { return response.data; }).catch(function(e) {
                return {};
            });
        },
        buy: function(field, player) {
            return $http({
                method: 'POST',
                url: field.broker + '/owner',
                data: {
                    id: player.id,
                    name: player.name,
                    uri: player.uri
                }
            });
        }
    };
}]);
