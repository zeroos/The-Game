fs = require 'fs'
{spawn} = require 'child_process'
{exec} = require 'child_process'
util = require 'util'

srcDir = './src'
srcDirs = ['./src', './src/view']
srcFiles = [
    './src/WebController.coffee',
    './src/view/GridMap.coffee',
    './src/view/PlayerBitmap.coffee',
    './src/view/BulletBitmap.coffee',
    './src/objects/Player.coffee',
    './src/objects/Bullet.coffee',
]
libDir = './lib'
buildJs = './game.js'

task 'build', 'Build a single Javascript file from prod files', ->
    util.log "Building #{buildJs}"

    fileStr = ""
    for file in srcFiles then do (file) ->
        fileStr += " " + file
#    exec "coffee -b -j #{buildJs} --compile #{srcDir}/*/*.coffee #{srcDir}/*.coffee ", (err, stdout, stderr) -> console.log stdout #not proud of this solution, but at least it works
    util.log fileStr

    exec "coffee -b -j #{buildJs} --compile" + fileStr, (err, stdout, stderr) -> console.log stdout

task 'watch', 'Watch source files and build changes', ->
    util.log "Watching for changes in #{srcDir}"
    for file in srcFiles then do (file) ->
        fs.watchFile file, (curr, prev) ->
            if +curr.mtime isnt +prev.mtime
                util.log "change"
                invoke 'build'
#    spawn 'coffee', ['-o', './lib', '-c', './src'], customFds: [0..2]
