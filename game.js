var BULLET, Bullet, BulletBitmap, BulletData, GridMap, PLAYER, Player, PlayerBitmap, PlayerData, imageLoader, img, init;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
PLAYER = 1;
BULLET = 2;
imageLoader = function() {};
img = [];
imageLoader.imageLoaded = function(name) {
  img[name].loaded = true;
  imageLoader.imagesLoaded += 1;
  if (imageLoader.imagesLoaded === imageLoader.imagesToLoad) {
    return imageLoader.onload();
  }
};
imageLoader.onload = function() {};
imageLoader.imagesToLoad = 0;
imageLoader.imagesLoaded = 0;
imageLoader.load = function(name, file) {
  imageLoader.imagesToLoad += 1;
  img[name] = new Image();
  img[name].loaded = false;
  img[name].src = './img/' + file;
  return img[name].onload = function() {
    return imageLoader.imageLoaded(name);
  };
};
init = function() {
  var body, canvas, ctx, newCanvas, objects, objectsData, offscreen, player, rebuildStage, stage, syncObjects;
  body = document.body;
  canvas = document.createElement('canvas');
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
  ctx = canvas.getContext('2d');
  offscreen = document.getElementById('offscreen');
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  window.map = new GridMap(10, 20, 32, 32);
  newCanvas = window.map.getCanvas();
  offscreen.appendChild(newCanvas);
  ctx.drawImage(newCanvas, 0, 0);
  stage = new Stage(canvas);
  objects = [];
  objectsData = [];
  player = {};
  stage.mouseEventsEnabled = true;
  stage.onPress = __bind(function(mouseEvent) {
    var pos;
    pos = window.stageCoordsToMap(mouseEvent.stageX, mouseEvent.stageY);
    return now.click(pos);
  }, this);
  document.onkeydown = __bind(function(event) {
    if (event.keyCode === 38) {
      console.log('up');
      if (!player.goingUp) {
        console.log('not');
        now.goingUp(true);
        return player.goingUp = true;
      }
    } else if (event.keyCode === 40) {
      if (!player.goingDown) {
        now.goingDown(true);
        return player.goingDown = true;
      }
    } else if (event.keyCode === 37) {
      if (!player.goingLeft) {
        now.goingLeft(true);
        return player.goingLeft = true;
      }
    } else if (event.keyCode === 39) {
      if (!player.goingRight) {
        now.goingRight(true);
        return player.goingRight = true;
      }
    }
  }, this);
  document.onkeyup = __bind(function(event) {
    if (event.keyCode === 38) {
      if (player.goingUp) {
        now.goingUp(false);
        return player.goingUp = false;
      }
    } else if (event.keyCode === 40) {
      if (player.goingDown) {
        now.goingDown(false);
        return player.goingDown = false;
      }
    } else if (event.keyCode === 37) {
      if (player.goingLeft) {
        now.goingLeft(false);
        return player.goingLeft = false;
      }
    } else if (event.keyCode === 39) {
      if (player.goingRight) {
        now.goingRight(false);
        return player.goingRight = false;
      }
    }
  }, this);
  stage.addChild(new Bitmap(newCanvas));
  Ticker.addListener(window);
  Ticker.setInterval(10);
  window.tick = function() {
    var o, _i, _len;
    for (_i = 0, _len = objects.length; _i < _len; _i++) {
      o = objects[_i];
      o.tick();
    }
    return stage.update();
  };
  body.appendChild(canvas);
  now.ready(function() {
    now.sync = function(data) {
      console.log("sync data");
      objectsData = data;
      return syncObjects();
    };
    return now.join("Player");
  });
  syncObjects = function() {
    var o, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = objectsData.length; _i < _len; _i++) {
      o = objectsData[_i];
      _results.push(objects[_i] != null ? objects[_i].setObjectData(o) : o.type === 1 ? (console.log("player found"), objects[_i] = new Player(o), stage.addChild(new PlayerBitmap(objects[_i]))) : o.type === 2 ? (console.log("bullet found"), objects[_i] = new Bullet(o), stage.addChild(new BulletBitmap(objects[_i]))) : void 0);
    }
    return _results;
  };
  rebuildStage = function() {
    var o, _i, _len, _results;
    console.log("rebuild");
    _results = [];
    for (_i = 0, _len = objects.length; _i < _len; _i++) {
      o = objects[_i];
      _results.push(stage.addChild(new PlayerBitmap(element)));
    }
    return _results;
  };
  return rebuildStage();
};
imageLoader.load('object', 'object.png');
imageLoader.load('monsterARun', 'monsterARun.png');
imageLoader.load('bullet', 'bullet.png');
imageLoader.load('grass', 'grass1.png');
imageLoader.onload = function() {
  return init();
};
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
Player = (function() {
  function Player(playerData) {
    this.playerData = playerData;
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
  }
  return PlayerData;
})();
if (typeof exports !== "undefined" && exports !== null) {
  exports.Player = Player;
  exports.PlayerData = PlayerData;
}
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