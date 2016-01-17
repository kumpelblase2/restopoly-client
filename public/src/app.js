var app = angular.module('restopoly', ['ui.bootstrap', 'ui.router', 'ngCookies', 'btford.socket-io']);
app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        if(input.length > start)
            return input.slice(start);

        return input;
    }
});
