# This command compiles all files in the background:
# coffee -b -o . -cw .
# Sublime: Ctrl+Shift+p Install Package Better CoffeeScript

g = 0

class Game
	constructor : (@x=0, @y=0, @a=0, @s=1, @stack=[]) ->
		@players = []
		@level = 1
		w = width
		h = height   
		@mode = 0                                                     
		@players.push new Player "WASD",30,30, 60,60
		@players.push new Player "&%('",90,30, 60,60
		@display = new Button @, 0, 0, 15, 10, "",""

		@createProblem()		
	push : ->
		@stack.push [@x,@y,@a,@s]
		push()
	pop : ->
		[@x,@y,@a,@s] = @stack.pop()
		pop()
	rotate : (d) ->
		rotate radians d
		@a += d
	scale : (ds) ->
		scale ds
		@s *= ds
	translate : (dx,dy) ->
		v = radians @a
		@x += @s * dx * cos(v) - @s * dy * sin(v)
		@y += @s * dy * cos(v) + @s * dx * sin(v)
		translate dx,dy
	dump : (txt) ->
		console.log [txt, @x,@y]

	process : ->
		console.log("process")		
		@mode = 1 - @mode
		if @mode == 0
			autolevel()
			@createProblem()
		else
			for player in @players
				player.history.unshift player.score()

	result : ->
		fill 127
		rect 0,0,width,height

		if @players[0].stopp == 0
			@players[0].color = color(127)
		else if @players[0].score() < @players[1].score() or @players[1].stopp == 0  
			@players[0].color = color(0,255,0)
		else
			@players[0].color = color(255,0,0)

		if @players[1].stopp == 0
			@players[1].color = color(127)
		else if @players[1].score() < @players[0].score() or @players[0].stopp == 0  
			@players[1].color = color(0,255,0)
		else
			@players[1].color = color(255,0,0)

		for player in @players
			player.result()

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
		ms = int d.getTime()
		for player in @players
			player.history = [lst[lst.length-1]]
			player.target = target
			player.count = 0
			player.start = ms 
			player.stopp = 0

setup = ->
	createCanvas windowWidth, windowHeight
	textAlign CENTER,CENTER
	rectMode CENTER
	g = new Game()

draw = ->
	g.push()
	g.translate width/2, height/2	

	for player,i in g.players
		g.push()
		if i==0
			g.translate -width/4, 0
			g.rotate 90
		if i==1
			g.translate width/4, 0
			g.rotate -90
		player.draw()
		g.pop()
  if g.mode==1
  	g.result()

	g.display.draw()	
	g.pop()

touchStarted = ->
	for player in g.players
		player.touchStarted()
	g.display.touchStarted()

mousePressed = ->
	for player in g.players
		player.mousePressed()
	g.display.mousePressed()

keyPressed = ->
	for player in g.players
		player.keyPressed(key)
	if key==' ' 
		autolevel()
		g.createProblem()

autolevel = ->
	finished = 0
	perfect = 0
	for player in g.players
		if player.finished()
			finished++
		if player.perfect(g.level)
			perfect++	
#	if finished == 0 
#		return
	if perfect > 0
		g.level++
	else 
		g.level--
	if g.level == 0
		g.level = 1