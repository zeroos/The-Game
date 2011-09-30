class BulletBitmap extends BitmapSequence
  constructor: (@bullet) ->
    this.initialize(new SpriteSheet(img['bullet'],
      3,
      3,
      {
        static: [0,0]
      }
    ))
    @regX = @spriteSheet.frameWidth/2 | 0 #registration point (for rotations)
    @regY = @spriteSheet.frameHeight/2 | 0
    
    @name = "bullet" #for debugging
    @x = @bullet.x
    @y = @bullet.y

#    @advanceFrequency = 5 #skip some animation frames

    @currentFrame = 0
  tick: ->
    pos = window.mapCoordsToStage(@bullet.bulletData.x, @bullet.bulletData.y)
    @x = pos.x
    @y = pos.y
