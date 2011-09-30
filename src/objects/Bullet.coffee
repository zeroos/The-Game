class Bullet
  constructor: (@bulletData) ->
  setObjectData: (@bulletData) ->
  tick: ->
    @bulletData.x += @bulletData.vX
    @bulletData.y += @bulletData.vY
  hasCollidedWithPlayer: (player) ->
    dx = player.playerData.x - @bulletData.x
    dy = player.playerData.y - @bulletData.y
    r = player.playerData.r - @bulletData.r

    if dx*dx+dy*dy < r*r
      console.log "collided"
      return true
    return false


class BulletData
  constructor: (@vX, @vY, @x, @y) ->
    @type = 2
    @w = 3
    @h = 3
    @r = 1

if exports?
  exports.Bullet = Bullet
  exports.BulletData = BulletData
