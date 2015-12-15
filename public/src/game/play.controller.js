angular.module('restopoly').controller('GamePlayController', ['$scope', 'GameService', '$rootScope', '$stateParams', '$state', function($scope, GameService, $rootScope, $stateParams, $state) {
    $scope.gameid = $stateParams.id;
    $scope.game = {};

    $scope.refresh = function() {
        GameService.getGame($scope.gameid).then(function(game) {
            $scope.game = game.data;
            if($scope.game.started) {
                $state.go('game', { id: $scope.gameid });
            }
        });
    };

    $scope.refresh();
}]);
