var PlayerBitmap;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
PlayerBitmap = (function() {
  __extends(PlayerBitmap, BitmapSequence);
  function PlayerBitmap(player) {
    this.player = player;
    this.initialize(new SpriteSheet(img['object'], 32, 24, {
      static: [0, 0]
    }));
    this.regX = this.spriteSheet.frameWidth / 2 | 0;
    this.regY = 3 * this.spriteSheet.frameHeight / 4 | 0;
    this.shadow = new Shadow("#333", 1, 0, 0);
    this.name = "player";
    this.vX = 0;
    this.vY = 0;
    this.x = this.player.playerData.x;
    this.y = this.player.playerData.y;
    this.currentFrame = 0;
  }
  PlayerBitmap.prototype.tick = function() {
    var pos;
    pos = window.mapCoordsToStage(this.player.playerData.x, this.player.playerData.y);
    this.x = pos.x;
    return this.y = pos.y;
  };
  return PlayerBitmap;
})();