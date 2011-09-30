static = require("node-static")

file = new(static.Server)('.')

httpServer = require('http').createServer(
  (req,response) ->
    req.addListener('end', () ->
      file.serve(req, response)
    )
)

httpServer.listen(8080)


nowjs = require('now')
everyone = nowjs.initialize(httpServer)
player_module = require('./objects/Player.js')
bullet_module = require('./objects/Bullet.js')

objects = []
objectsData = []
players = []
bullets = []

everyone.now.join = (nick) ->
  if !nick? or typeof this.now.sync != "function"
    return
  console.log "Player " + nick + " (" + this.user.clientId + ") joined"
  playerData = new player_module.PlayerData
  player = new player_module.Player(playerData)
  players[this.user.clientId] = player
  objects.push(player)
  objectsData.push(playerData)
#  this.now.addPlayer(playerData)
  this.now.sync(objectsData)

everyone.now.goingUp = (state) ->
  console.log "player going up"
  players[this.user.clientId].goingUp(state)
everyone.now.goingDown = (state) ->
  console.log "player going down"
  players[this.user.clientId].goingDown(state)
everyone.now.goingLeft = (state) ->
  console.log "player going left"
  players[this.user.clientId].goingLeft(state)
everyone.now.goingRight = (state) ->
  console.log "player going right"
  players[this.user.clientId].goingRight(state)

everyone.now.click = (pos) ->
  v = 2
  player = players[this.user.clientId].playerData

  dy = (pos.y - player.y)
  dx = (pos.x - player.x)
  c2 = dy*dy+dx*dx #hypotenuse
  #f = c2/(v*v)
  #f = Math.log(Math.sqrt(c2))/55
  f = Math.sqrt(c2)/(v*v)

  bVy = dy/f
  bVx = dx/f

  bulletData = new bullet_module.BulletData(bVx, bVy, player.x+3*bVx, player.y+3*bVy)
  bullet = new bullet_module.Bullet(bulletData)
  objects.push(bullet)
  objectsData.push(bulletData)
  this.now.sync(objectsData)
  bullets.push(bullet)

tick = () ->
  for o in objects
    o.tick()
  `for(p_i in players){`
  p = players[p_i]
  if p.playerData.x-p.playerData.r < 0 or p.playerData.x+p.playerData.r > 200
    p.playerData.x += -p.playerData.vX
    p.playerData.vX = 0
  if p.playerData.y-p.playerData.r < 0 or p.playerData.y+p.playerData.r > 400
    p.playerData.y += -p.playerData.vY
    p.playerData.vY = 0
  console.log players
  console.log p_i
  for bullet in bullets
    if bullet.hasCollidedWithPlayer(p)
      p.playerData.x = -4000
      p.playerData.y = -4000
  `}`

  #console.log objects
sync = () ->
  everyone.now.sync?(objectsData)

setInterval(tick, 20)
setInterval(sync, 100)
