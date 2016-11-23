# This command compiles all files in the background:
# coffee -b -o . -cw .
# Sublime: Ctrl+Shift+p Install Package Better CoffeeScript

g = 0
ids = {}

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
			@players[0].color = color 127
		else if @players[0].score() < @players[1].score() or @players[1].stopp == 0  
			@players[0].color = color 0,255,0
		else
			@players[0].color = color 255,0,0

		if @players[1].stopp == 0
			@players[1].color = color 127
		else if @players[1].score() < @players[0].score() or @players[0].stopp == 0  
			@players[1].color = color 0,255,0
		else
			@players[1].color = color 255,0,0

		for player in @players
			player.result()

		@solve_result()	

	solve_result : ->
		fill 0
		H = 40
		textSize H
		solution = solve @players[0].history[1], @players[0].target
		solution.unshift ""

		for number,i in solution
			x0 = 0
			n = (height-H)*0.9 / H
			x = int i / n
			y = int i % n
			text number,x0+x*100,-(height-H)*0.9*0.5 + y*H		

	createProblem : ->
		n = int Math.pow 2, 4+@level/3 # nodes
		a = int random 1,n/2
		lst = [a]
		tree = [a]
		lst2 = []
		save = (item) ->
			if Math.floor(item) == item and item <= n
				if item not in tree
					lst2.push item
					tree.push item
		for j in [1..@level]
			lst2 = []
			for item in lst
				save item+2 
				save item*2
				save item/2
			lst = lst2
		i = int random 0,lst.length
		b = lst[i]

		d = new Date()
		ms = int d.getTime()
		for player in @players
			player.history = [a]
			player.target = b
			player.count = 0
			player.start = ms 
			player.stopp = 0
			player.level = @level

setup = ->
	createCanvas windowWidth, windowHeight
	frameRate 15
	textAlign CENTER,CENTER
	rectMode CENTER
	g = new Game()
	g.createProblem()		

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
	for touch in touches
		if touch.id not of ids 
			ids[touch.id] = touch
			for player in g.players
				player.touchStarted(touch.x,touch.y)
	if touch.length == 0
		ids = {}
	g.display.touchStarted(touch.x,touch.y)

mousePressed = ->
	for player in g.players
		player.mousePressed()
	g.display.mousePressed()
	draw()

keyPressed = ->
	for player in g.players
		player.keyPressed key
	if key == ' ' 
		autolevel()
		g.createProblem()

autolevel = ->
	finished = 0
	perfect = 0
	for player in g.players
		if player.finished()
			finished++
		if player.perfect g.level
			perfect++	
	if perfect > 0
		g.level++
	else 
		g.level--
	if g.level == 0
		g.level = 1
	console.log("autolevel #{g.level}")		
