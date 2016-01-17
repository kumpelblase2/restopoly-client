var app = angular.module('restopoly');

app.factory('wss', ['socketFactory', function(socketFactory) {
    return socketFactory();
}]);
