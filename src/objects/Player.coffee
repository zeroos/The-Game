class Player
  constructor: (@playerData) ->
    @moveToRandomPlace()
    @color = 1

  setObjectData: (@playerData) ->

  goingUp: (@isGoingUp) ->
  goingDown: (@isGoingDown) ->
  goingLeft: (@isGoingLeft) ->
  goingRight: (@isGoingRight) ->

  moveToRandomPlace: () ->
    @playerData.x = Math.floor(Math.random() * (global?.mapWidth-100))+50
    @playerData.y = Math.floor(Math.random() * (global?.mapHeight-100))+50


  tick: ->
    if @isGoingUp and not @isGoingDown
      @playerData.vY = -3
    else if @isGoingDown and not @isGoingUp
      @playerData.vY = 3
    else
      @playerData.vY = 0

    if @isGoingLeft and not @isGoingRight
      @playerData.vX = -3
    else if @isGoingRight and not @isGoingLeft
      @playerData.vX = 3
    else
      @playerData.vX = 0

    @playerData.x += @playerData.vX
    @playerData.y += @playerData.vY

class PlayerData
  constructor: (@vX = 0, @vY = 0, @x = 50, @y = 50) ->
    @type=1
    @r=6
    @lives = 10


if exports?
  exports.Player = Player
  exports.PlayerData = PlayerData
