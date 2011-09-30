class GridMap
  constructor: (@width, @height, @orgTileWidth, @orgTileHeight, @canvas = null) ->
    if @canvas == null
      @canvas = document.createElement('canvas')

    @tileWidth = @orgTileWidth*2
    @tileHeight = @orgTileHeight
    @canvas.width = (@width+@height)*@tileWidth/2
    @canvas.height = (@width+@height)*@tileHeight/2
    @ctx = @canvas.getContext('2d')

    @pointsPerTile = 20
 
    for x in [0..@width-1]
      for y in [0..@height-1]
        @drawTile(x,y)

  drawTile: (tileX, tileY) ->
    x = (@height*@tileWidth)/2-@tileWidth/2+tileX*@tileWidth/2-tileY*@tileWidth/2
    y = tileY*@tileHeight/2+tileX*@tileHeight/2



    @ctx.beginPath()
    @ctx.moveTo(x+@tileWidth/2, y)
    @ctx.lineTo(x+@tileWidth, y+@tileHeight/2)
    @ctx.lineTo(x+@tileWidth/2, y+@tileHeight)
    @ctx.lineTo(x, y+@tileHeight/2)
    @ctx.closePath()


    @ctx.drawImage(img['grass'], x, y)
    @ctx.strokeStyle = "rgba(0,0,0,0.2)"
    @ctx.stroke()

    @ctx.font = "7px sans-serif"
#    @ctx.fillText("(#{tileX}, #{tileY})",x+@tileWidth/4,y+@tileHeight/2)
  getCanvas: () ->
    return @canvas


window.mapCoordsToStage = (sx, sy) -> #source_x, source_y
  map = window.map
  sx /= map.pointsPerTile
  sy /= map.pointsPerTile
  x = 0.5 * map.tileWidth * (map.height + sx - sy)
  y = 0.5 * map.tileHeight * (sx + sy)
  return {x: x, y: y}
window.stageCoordsToMap = (sx, sy) ->
  x = sx/map.tileWidth + sy/map.tileHeight - map.height/2
  y = -sx/map.tileWidth + sy/map.tileHeight + map.height/2
  #x *= Math.sqrt(0.25*map.tileHeight*map.tileHeight + 0.25*map.tileWidth*map.tileWidth)
  #y *= Math.sqrt(0.25*map.tileHeight*map.tileHeight + 0.25*map.tileWidth*map.tileWidth)
  x *= map.pointsPerTile
  y *= map.pointsPerTile
  return {x: x, y: y}
