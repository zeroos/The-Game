var Player, PlayerData;
Player = (function() {
  function Player(playerData) {
    this.playerData = playerData;
    this.moveToRandomPlace();
    this.color = 1;
  }
  Player.prototype.setObjectData = function(playerData) {
    this.playerData = playerData;
  };
  Player.prototype.goingUp = function(isGoingUp) {
    this.isGoingUp = isGoingUp;
  };
  Player.prototype.goingDown = function(isGoingDown) {
    this.isGoingDown = isGoingDown;
  };
  Player.prototype.goingLeft = function(isGoingLeft) {
    this.isGoingLeft = isGoingLeft;
  };
  Player.prototype.goingRight = function(isGoingRight) {
    this.isGoingRight = isGoingRight;
  };
  Player.prototype.moveToRandomPlace = function() {
    this.playerData.x = Math.floor(Math.random() * ((typeof global !== "undefined" && global !== null ? global.mapWidth : void 0) - 100)) + 50;
    return this.playerData.y = Math.floor(Math.random() * ((typeof global !== "undefined" && global !== null ? global.mapHeight : void 0) - 100)) + 50;
  };
  Player.prototype.tick = function() {
    if (this.isGoingUp && !this.isGoingDown) {
      this.playerData.vY = -3;
    } else if (this.isGoingDown && !this.isGoingUp) {
      this.playerData.vY = 3;
    } else {
      this.playerData.vY = 0;
    }
    if (this.isGoingLeft && !this.isGoingRight) {
      this.playerData.vX = -3;
    } else if (this.isGoingRight && !this.isGoingLeft) {
      this.playerData.vX = 3;
    } else {
      this.playerData.vX = 0;
    }
    this.playerData.x += this.playerData.vX;
    return this.playerData.y += this.playerData.vY;
  };
  return Player;
})();
PlayerData = (function() {
  function PlayerData(vX, vY, x, y) {
    this.vX = vX != null ? vX : 0;
    this.vY = vY != null ? vY : 0;
    this.x = x != null ? x : 50;
    this.y = y != null ? y : 50;
    this.type = 1;
    this.r = 6;
    this.lives = 10;
  }
  return PlayerData;
})();
if (typeof exports !== "undefined" && exports !== null) {
  exports.Player = Player;
  exports.PlayerData = PlayerData;
}