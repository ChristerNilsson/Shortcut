# This command compiles all files in the background:
# coffee -b -o . -cw .
# Sublime: Ctrl+Shift+p Install Package Better CoffeeScript

game = 0

class Game
	constructor : ->
		@players = []
		@level = 1
		@players.push new Player "WASD",0,0, 30,60
		@players.push new Player "&%('",30,0, 30,60
		@createProblem()

	createProblem : ->
		target = a = 1 + int(random(20))
		lst = [a]
		while lst.length-1 < @level
			b = 0
			switch int(random(3))
				when 0
					b = a - 2
				when 1
					b = a * 2
				when 2
					b = a / 2 if a%2==0
			if b > 0 and b not in lst
				a = b
				lst.push(b)

		d = new Date()
		ms = d.getTime()
		for player in @players
			player.history = [lst[lst.length-1]]
			player.target = target
			player.count = 0
			player.start = ms 

setup = ->
	createCanvas windowWidth, windowHeight
	console.log("a")
	game = new Game()
	textAlign CENTER,CENTER

draw = ->
	for player in game.players
		player.draw()

mousePressed = ->
	for player in game.players
		player.mousePressed()

keyPressed = ->
	finished = 0
	perfect = 0
	for player in game.players
		if player.finished()
			finished++
		if player.perfect(game.level)
			perfect++	
		player.keyPressed(key)
	if key==' ' && finished > 0
		if perfect > 0
			game.level++
		else 
			game.level--
		if game.level == 0
			game.level = 1
		s=""
		for player in game.players
			s = s + player.score() + "  "	
		alert s
		game.createProblem()