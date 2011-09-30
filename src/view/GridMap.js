var GridMap;
GridMap = (function() {
  function GridMap(width, height, orgTileWidth, orgTileHeight, canvas) {
    var x, y, _ref, _ref2;
    this.width = width;
    this.height = height;
    this.orgTileWidth = orgTileWidth;
    this.orgTileHeight = orgTileHeight;
    this.canvas = canvas != null ? canvas : null;
    if (this.canvas === null) {
      this.canvas = document.createElement('canvas');
    }
    this.tileWidth = this.orgTileWidth * 2;
    this.tileHeight = this.orgTileHeight;
    this.canvas.width = (this.width + this.height) * this.tileWidth / 2;
    this.canvas.height = (this.width + this.height) * this.tileHeight / 2;
    this.ctx = this.canvas.getContext('2d');
    this.pointsPerTile = 20;
    for (x = 0, _ref = this.width - 1; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
      for (y = 0, _ref2 = this.height - 1; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
        this.drawTile(x, y);
      }
    }
  }
  GridMap.prototype.drawTile = function(tileX, tileY) {
    var x, y;
    x = (this.height * this.tileWidth) / 2 - this.tileWidth / 2 + tileX * this.tileWidth / 2 - tileY * this.tileWidth / 2;
    y = tileY * this.tileHeight / 2 + tileX * this.tileHeight / 2;
    this.ctx.beginPath();
    this.ctx.moveTo(x + this.tileWidth / 2, y);
    this.ctx.lineTo(x + this.tileWidth, y + this.tileHeight / 2);
    this.ctx.lineTo(x + this.tileWidth / 2, y + this.tileHeight);
    this.ctx.lineTo(x, y + this.tileHeight / 2);
    this.ctx.closePath();
    this.ctx.drawImage(img['grass'], x, y);
    this.ctx.strokeStyle = "rgba(0,0,0,0.2)";
    this.ctx.stroke();
    return this.ctx.font = "7px sans-serif";
  };
  GridMap.prototype.getCanvas = function() {
    return this.canvas;
  };
  return GridMap;
})();
window.mapCoordsToStage = function(sx, sy) {
  var map, x, y;
  map = window.map;
  sx /= map.pointsPerTile;
  sy /= map.pointsPerTile;
  x = 0.5 * map.tileWidth * (map.height + sx - sy);
  y = 0.5 * map.tileHeight * (sx + sy);
  return {
    x: x,
    y: y
  };
};
window.stageCoordsToMap = function(sx, sy) {
  var x, y;
  x = sx / map.tileWidth + sy / map.tileHeight - map.height / 2;
  y = -sx / map.tileWidth + sy / map.tileHeight + map.height / 2;
  x *= map.pointsPerTile;
  y *= map.pointsPerTile;
  return {
    x: x,
    y: y
  };
};