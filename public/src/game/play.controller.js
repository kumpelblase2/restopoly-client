angular.module('restopoly').controller('GamePlayController', ['$scope', 'GameService', '$rootScope', '$stateParams', '$state', 'wss', function($scope, GameService, $rootScope, $stateParams, $state, wss) {
    $scope.gameid = $stateParams.id;
    $scope.game = {};

    wss.on('turn', function() {
        console.log('My Turn!');
    });

    $scope.refresh();
}]);
