function PlayerStore() {
    this.players = [];
}

PlayerStore.prototype.addPlayer = function(info) {
    this.players.push(info);
};

PlayerStore.prototype.deletePlayer = function(name) {
    // TODO
};

PlayerStore.prototype.getBySocketId = function(id) {
    for(var i = 0; i < this.players.length; i++) {
        if(this.players[i].socket.id === id) {
            return this.players[i];
        }
    }

    return null;
}

PlayerStore.prototype.getPlayer = function(id) {
    for(var i = 0; i < this.players.length; i++) {
        if(this.players[i].id === id) {
            return this.players[i];
        }
    }

    return null;
}

module.exports = PlayerStore;
