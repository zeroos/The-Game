var BulletBitmap;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
BulletBitmap = (function() {
  __extends(BulletBitmap, BitmapSequence);
  function BulletBitmap(bullet) {
    this.bullet = bullet;
    this.initialize(new SpriteSheet(img['bullet'], 3, 3, {
      static: [0, 0]
    }));
    this.regX = this.spriteSheet.frameWidth / 2 | 0;
    this.regY = this.spriteSheet.frameHeight / 2 | 0;
    this.name = "bullet";
    this.x = this.bullet.x;
    this.y = this.bullet.y;
    this.currentFrame = 0;
  }
  BulletBitmap.prototype.tick = function() {
    var pos;
    pos = window.mapCoordsToStage(this.bullet.bulletData.x, this.bullet.bulletData.y);
    this.x = pos.x;
    return this.y = pos.y;
  };
  return BulletBitmap;
})();