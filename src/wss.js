angular.module('restopoly').factory('wss', ['EVENTS_IP', function(EVENTS_IP) {
    var socket = new SockJS(EVENTS_IP + '/events/ws');
    var stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
    });

    return stompClient;
}]);
