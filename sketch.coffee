players = []

setup = ->
  createCanvas windowWidth, windowHeight
  textAlign CENTER,CENTER
  textSize 30
  players.push new Player "WASD",0,0, 30,60
  players.push new Player "&%('",30,0, 30,60

draw = ->
  for player in players
  	player.draw()

mousePressed = ->
  for player in players
    player.mousePressed()

keyPressed = ->
  for player in players
  	player.keyPressed(key)