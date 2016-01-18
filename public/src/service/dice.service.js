angular.module('restopoly').factory('DiceService', ['$http', '$rootScope', '$q', function($http, $rootScope, $q) {
    var emptyTransformer = [function (data) { return data; }];

    return {
        roll: function() {
            var self = this;
            return $q.all([this.rollDice(), this.rollDice()]);
        },
        rollDice: function() {
            return $http({
                method: 'GET',
                url: $rootScope.components.dice
            }).then(function(response) { return response.data.number; });
        }
    };
}]);
