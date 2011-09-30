var bullet_module, bullets, everyone, file, httpServer, nowjs, objects, objectsData, player_module, players, static, tick;
static = require("node-static");
file = new static.Server('..');
httpServer = require('http').createServer(function(req, response) {
  return req.addListener('end', function() {
    return file.serve(req, response);
  });
});
httpServer.listen(49770);
nowjs = require('now');
everyone = nowjs.initialize(httpServer);
player_module = require('./objects/Player.js');
bullet_module = require('./objects/Bullet.js');
objects = [];
objectsData = [];
players = [];
bullets = [];
everyone.now.join = function() {
  var player, playerData;
  console.log("Player " + this.user.clientId + " joined");
  playerData = new player_module.PlayerData;
  player = new player_module.Player(playerData);
  players[this.user.clientId] = player;
  objects.push(player);
  objectsData.push(playerData);
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
  var bullet, o, p, _base, _i, _j, _len, _len2;
  for (_i = 0, _len = objects.length; _i < _len; _i++) {
    o = objects[_i];
    o.tick();
  }
  for(p_i in players){;
  p = players[p_i];
  if (p.playerData.x - p.playerData.r < 0 || p.playerData.x + p.playerData.r > 200) {
    p.playerData.x += -p.playerData.vX;
    p.playerData.vX = 0;
  }
  if (p.playerData.y - p.playerData.r < 0 || p.playerData.y + p.playerData.r > 400) {
    p.playerData.y += -p.playerData.vY;
    p.playerData.vY = 0;
  }
  for (_j = 0, _len2 = bullets.length; _j < _len2; _j++) {
    bullet = bullets[_j];
    if (bullet.hasCollidedWithPlayer(p)) {
      delete players[p_i];
      p.playerData.x = -4000;
      p.playerData.y = -4000;
    }
  }
  };
  return typeof (_base = everyone.now).sync === "function" ? _base.sync(objectsData) : void 0;
};
setInterval(tick, 10);