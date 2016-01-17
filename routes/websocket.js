var router = require('express').Router();

module.exports = function(app) {
    router.post('/:player/player/turn', function(req, res) {
        var playerId = req.params.player;
        var player = app.PlayerStore.getPlayer(playerId);
        if(player) {
            player.socket.emit('turn');
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    });
    router.post('/:player/player/event', function(req, res) {
        var playerId = req.params.player;
        var player = app.PlayerStore.getPlayer(playerId);
        if(player) {
            player.socket.send('event', req.body);
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    });
    router.get('/:player/player', function() {
        var playerId = req.params.player;
        var player = app.PlayerStore.getPlayer(playerId);
        if(player) {
            res.send({
                id: player.id,
                name: player.name,
                ready: player.ready,
                uri: player.uri
            });
        } else {
            res.status(404).end();
        }
    });

    return router;
};
