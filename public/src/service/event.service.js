angular.module('restopoly').factory('EventService', ['$http', '$rootScope', '$q', function($http, $rootScope, $q) {
    var emptyTransformer = [function (data) { return data; }];

    return {
        addSubscription: function(eventKind) {
            return $http({
                method: 'POST',
                url: $rootScope.components.event
            });
        }
    };
}]);
