class PlayerBitmap extends BitmapSequence
  constructor: (@player) ->
    this.initialize(new SpriteSheet(img['object'],
      32,
      24,
      {
        static0: [0,0],
        static1: [1,1],
        static2: [2,2],
        static3: [3,3],
        static4: [4,4]
      }
    ))
    @regX = @spriteSheet.frameWidth/2 | 0 #registration point (for rotations)
    @regY = 3*@spriteSheet.frameHeight/4 | 0
    
    @shadow = new Shadow("#333", 1, 0, 0) #set shadow

    @gotoAndStop("static1")

    @name = "player" #for debugging
    @vX = 0
    @vY = 0
    @x = @player.playerData.x
    @y = @player.playerData.y

#    @advanceFrequency = 5 #skip some animation frames

    @currentFrame = 0


  tick: ->
    pos = window.mapCoordsToStage(@player.playerData.x, @player.playerData.y)
    @x = pos.x
    @y = pos.y
    @gotoAndStop("static" + @player.playerData.color)
