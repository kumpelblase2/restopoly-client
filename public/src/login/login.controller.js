angular.module('restopoly').controller('LoginController', ['$scope', '$rootScope', '$state', '$cookies', 'wss', function($scope, $rootScope, $state, $cookies, wss) {
    $scope.name = "";
    if($cookies.getObject('user')) {
        wss.emit('register', { id: $cookies.getObject('user').id });
        $rootScope.user = $cookies.getObject('user');
        $rootScope.ips = $cookies.getObject('ips');
        $state.go('gameselect');
    }

    $scope.login = function() {
        $rootScope.user = {
            name: $scope.name,
            id: $scope.name.toLowerCase().replace(' ', '_')
        };

        $rootScope.ips = {
            game: $scope.games_ip,
            events: $scope.events_ip,
            board: $scope.boards_ip,
            dice: $scope.dice_ip,
            broker: $scope.broker_ip,
            bank: $scope.bank_ip,
            my: $scope.my_ip
        }

        $cookies.putObject('user', $rootScope.user);
        $cookies.putObject('ips', $rootScope.ips);
        wss.emit('register', { id: $rootScope.user.id });
        $state.go('gameselect');
    };
}]);
