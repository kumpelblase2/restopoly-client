angular.module('restopoly').config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/login");
    //
    // Now set up the states
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'src/login/login.html',
        controller: 'LoginController'
    }).state('gameselect', {
        url: '/game/select',
        templateUrl: 'src/game/select.html',
        controller: 'GameSelectController'
    }).state('gamelobby', {
        url: '/game/:id/lobby',
        templateUrl: 'src/game/lobby.html',
        controller: 'GameLobbyController'
    });/*.state('gamecreate', {
        url: '/game/create',
        templateUrl: 'src/game/create.html',
        controller: 'GameCreateController'
    }).state('game', {
        url: '/game/play/:gameid',
        templateUrl: 'src/game/play.html',
        controller: 'GamePlayController'
    });*/
});
