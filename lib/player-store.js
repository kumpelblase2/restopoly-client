function PlayerStore() {
    this.players = [];
}

PlayerStore.prototype.addPlayer = function(info) {
    this.deletePlayer(info.id);
    this.players.push(info);
};

PlayerStore.prototype.deletePlayer = function(name) {
    for(var i = this.players.length - 1; i >= 0; i--) {
        if(this.players[i].id == name) {
            this.players.splice(i, 1);
        }
    }
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
