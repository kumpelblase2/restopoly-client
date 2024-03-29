module.exports = function(playerStore, io) {
    io.on('connection', function(socket) {
        socket.on('register', function(data) {
            data.socket = socket;
            data.uri = socket.request.headers.host;
            console.log(data);
            playerStore.addPlayer(data);
        });
    });
};
