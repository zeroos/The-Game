PLAYER = 1
BULLET = 2

imageLoader = () ->

img = []

imageLoader.imageLoaded = (name) ->
  img[name].loaded = true
  imageLoader.imagesLoaded += 1
  if imageLoader.imagesLoaded is imageLoader.imagesToLoad
    imageLoader.onload()


imageLoader.onload = () ->

imageLoader.imagesToLoad = 0
imageLoader.imagesLoaded = 0

imageLoader.load = (name, file) ->
  imageLoader.imagesToLoad += 1
  img[name] = new Image()
  img[name].loaded = false
  img[name].src = './img/' + file
  img[name].onload = () ->
    imageLoader.imageLoaded(name)



init = ->
  body = document.body
  canvas = document.createElement('canvas')
  #canvas.setAttribute('width', '100%')
  #canvas.setAttribute('height', '100%')
  canvas.width = document.documentElement.clientWidth
  canvas.height = document.documentElement.clientHeight
  ctx = canvas.getContext('2d')
  offscreen = document.getElementById('offscreen')

  ctx.fillStyle = "#111"
  ctx.fillRect(0,0,canvas.width,canvas.height)
  window.map = new GridMap(10,20,32,32)

  newCanvas = window.map.getCanvas()
  offscreen.appendChild(newCanvas)
  ctx.drawImage(newCanvas, 0, 0)

  stage = new Stage(canvas)
  objects = []
  objectsData = []

  player = null
#  player = new Player
#  playerBmp = new PlayerBitmap(player)

#  objects.push(player)

  #setup player mouse control
  stage.mouseEventsEnabled = true
  stage.onPress = (mouseEvent) =>
    pos = window.stageCoordsToMap(mouseEvent.stageX, mouseEvent.stageY)
    now.click pos

#    bullet = new Bullet(player.x, player.y, bVx, bVy)
#    stage.addChild(new BulletBitmap(bullet))
#    objects.push(bullet)
    


  #setup player keyboard control
  document.onkeydown = (event) =>
    if event.keyCode == 38 #up
      now.goingUp(true)
    else if event.keyCode == 40 #down
      now.goingDown(true)
    else if event.keyCode == 37 #left
      now.goingLeft(true)
    else if event.keyCode == 39 #right
      now.goingRight(true)

  document.onkeyup = (event) =>
    if event.keyCode == 38 #up
      now.goingUp(false)
    else if event.keyCode == 40 #down
      now.goingDown(false)
    else if event.keyCode == 37 #left
      now.goingLeft(false)
    else if event.keyCode == 39 #right
      now.goingRight(false)
  

  stage.addChild(new Bitmap(newCanvas))
  #stage.addChild(playerBmp)

  Ticker.addListener(window)
  Ticker.setInterval(10)




  window.tick = () ->
    for o in objects
      o.tick()

    stage.update()
    
  body.appendChild(canvas)

  now.ready(() ->
    now.sync = (data) ->
      console.log "sync data"
      objectsData = data
      syncObjects()
    now.join()
  )

  syncObjects = () ->
    for o in objectsData
      if objects[_i]?
        objects[_i].setObjectData(o)
      else
        if o.type == 1
          console.log "player found"
          objects[_i] = new Player(o)
          stage.addChild(new PlayerBitmap(objects[_i]))
        else if o.type == 2
          console.log "bullet found"
          objects[_i] = new Bullet(o)
          stage.addChild(new BulletBitmap(objects[_i]))

  
  rebuildStage = () ->
    console.log "rebuild"
    for o in objects
      stage.addChild(new PlayerBitmap(element))

  rebuildStage()
  


imageLoader.load('object', 'object.png')
imageLoader.load('monsterARun', 'monsterARun.png')
imageLoader.load('bullet', 'bullet.png')
imageLoader.load('grass', 'grass1.png')
imageLoader.onload = () ->
  init()

