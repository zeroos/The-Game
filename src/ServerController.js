var bullet_module, bullets, everyone, file, httpServer, nowjs, objects, objectsData, player_module, players, static, sync, tick;
static = require("node-static");
file = new static.Server('.');
httpServer = require('http').createServer(function(req, response) {
  return req.addListener('end', function() {
    return file.serve(req, response);
  });
});
httpServer.listen(8080);
nowjs = require('now');
everyone = nowjs.initialize(httpServer);
player_module = require('./objects/Player.js');
bullet_module = require('./objects/Bullet.js');
global.mapWidth = 200;
global.mapHeight = 400;
objects = [];
objectsData = [];
players = {};
bullets = [];
nowjs.on("disconnect", function() {
  players[this.user.clientId].playerData.x = -4000;
  return players[this.user.clientId].playerData.y = -4000;
});
everyone.now.join = function(nick) {
  var player, playerData;
  if (!(nick != null) || typeof this.now.sync !== "function") {
    return;
  }
  console.log("Player " + nick + " (" + this.user.clientId + ") joined");
  playerData = new player_module.PlayerData;
  playerData.color = Math.floor(Math.random() * 4);
  player = new player_module.Player(playerData);
  players[this.user.clientId] = player;
  player.now = this.now;
  objects.push(player);
  objectsData.push(playerData);
  this.now.setLives(playerData.lives);
  return this.now.sync(objectsData);
};
everyone.now.goingUp = function(state) {
  console.log("player going up");
  return players[this.user.clientId].goingUp(state);
};
everyone.now.goingDown = function(state) {
  console.log("player going down");
  return players[this.user.clientId].goingDown(state);
};
everyone.now.goingLeft = function(state) {
  console.log("player going left");
  return players[this.user.clientId].goingLeft(state);
};
everyone.now.goingRight = function(state) {
  console.log("player going right");
  return players[this.user.clientId].goingRight(state);
};
everyone.now.click = function(pos) {
  var bVx, bVy, bullet, bulletData, c2, dx, dy, f, player, v;
  v = 2;
  player = players[this.user.clientId].playerData;
  dy = pos.y - player.y;
  dx = pos.x - player.x;
  c2 = dy * dy + dx * dx;
  f = Math.sqrt(c2) / (v * v);
  bVy = dy / f;
  bVx = dx / f;
  bulletData = new bullet_module.BulletData(bVx, bVy, player.x + 3 * bVx, player.y + 3 * bVy);
  bullet = new bullet_module.Bullet(bulletData);
  objects.push(bullet);
  objectsData.push(bulletData);
  this.now.sync(objectsData);
  return bullets.push(bullet);
};
tick = function() {
  var bullet, id, o, p, _i, _len, _results;
  for (_i = 0, _len = objects.length; _i < _len; _i++) {
    o = objects[_i];
    o.tick();
  }
  _results = [];
  for (id in players) {
    p = players[id];
    if (p.playerData.x - p.playerData.r < 0 || p.playerData.x + p.playerData.r > global.mapWidth) {
      p.playerData.x += -p.playerData.vX;
      p.playerData.vX = 0;
    }
    if (p.playerData.y - p.playerData.r < 0 || p.playerData.y + p.playerData.r > global.mapHeight) {
      p.playerData.y += -p.playerData.vY;
      p.playerData.vY = 0;
    }
    _results.push((function() {
      var _j, _len2, _results2;
      _results2 = [];
      for (_j = 0, _len2 = bullets.length; _j < _len2; _j++) {
        bullet = bullets[_j];
        _results2.push(bullet.hasCollidedWithPlayer(p) ? p.playerData.lives > 0 ? (p.playerData.lives -= 1, p.moveToRandomPlace(), p.now.setLives(p.playerData.lives)) : (p.playerData.x = -4000, p.playerData.y = -4000, p.now.setLives("GAME OVER")) : void 0);
      }
      return _results2;
    })());
  }
  return _results;
};
sync = function() {
  var _base;
  return typeof (_base = everyone.now).sync === "function" ? _base.sync(objectsData) : void 0;
};
setInterval(tick, 20);
setInterval(sync, 80);