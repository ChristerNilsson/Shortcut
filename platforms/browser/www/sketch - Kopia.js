players = []

function setup() {
  createCanvas(600,600)
  textAlign(CENTER,CENTER)
  textSize(30)
  players.push(new Player("WASD",0,0,30,60))
  players.push(new Player("&%('",30,0,30,60))
}

function draw() {
  for (player of players) player.draw()
}

function mousePressed() {
  for (player of players) player.mousePressed()
}

function keyPressed() {
  for (player of players) player.keyPressed(key)
}
