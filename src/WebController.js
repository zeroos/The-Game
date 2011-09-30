var BULLET, PLAYER, imageLoader, img, init;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
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
  var body, canvas, ctx, livesCounter, newCanvas, objects, objectsData, offscreen, player, rebuildStage, stage, syncObjects;
  body = document.body;
  canvas = document.createElement('canvas');
  livesCounter = document.getElementById('livesCounter');
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
  livesCounter.innerHTML = "Connecting...";
  body.appendChild(canvas);
  body.appendChild(livesCounter);
  now.ready(function() {
    now.sync = function(data) {
      objectsData = data;
      return syncObjects();
    };
    now.setLives = function(lives) {
      return livesCounter.innerHTML = lives;
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