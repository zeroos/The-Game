var Bullet, BulletData;
Bullet = (function() {
  function Bullet(bulletData) {
    this.bulletData = bulletData;
  }
  Bullet.prototype.setObjectData = function(bulletData) {
    this.bulletData = bulletData;
  };
  Bullet.prototype.tick = function() {
    this.bulletData.x += this.bulletData.vX;
    return this.bulletData.y += this.bulletData.vY;
  };
  Bullet.prototype.hasCollidedWithPlayer = function(player) {
    var dx, dy, r;
    dx = player.playerData.x - this.bulletData.x;
    dy = player.playerData.y - this.bulletData.y;
    r = player.playerData.r - this.bulletData.r;
    if (dx * dx + dy * dy < r * r) {
      console.log("collided");
      return true;
    }
    return false;
  };
  return Bullet;
})();
BulletData = (function() {
  function BulletData(vX, vY, x, y) {
    this.vX = vX;
    this.vY = vY;
    this.x = x;
    this.y = y;
    this.type = 2;
    this.w = 3;
    this.h = 3;
    this.r = 1;
  }
  return BulletData;
})();
if (typeof exports !== "undefined" && exports !== null) {
  exports.Bullet = Bullet;
  exports.BulletData = BulletData;
}