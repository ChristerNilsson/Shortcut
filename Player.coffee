class Player


	constructor: (keys,x,y,@w,@h) ->  # sixties
		@M = 120
		@N = 60
		@keys = keys
		@x = width * x / @M # centrum pixels
		@y = height * y / @N # centrum pixels
		@history = [3]
		@target = 2
		@count = 0

		@buttons = []              # x   y   w   h (relativt centrum)
		@buttons.push new Button @,-5,-10, 7.5, 15, "","3"
		@buttons.push new Button @, -5,10, 7.5, 15, "","2"
		@buttons.push new Button @, -5, 0, 7.5, 15, keys[0],"undo"
		@buttons.push new Button @,15, -10, 7.5, 15, keys[1],"/2"
		@buttons.push new Button @,  15, 0, 7.5, 15, keys[2],"+2"
		@buttons.push new Button @, 15, 10, 7.5, 15, keys[3],"*2"

	draw : ->
		if @keys == "WASD"
			fill 255,0,0,127
		else
			fill 255,255,0,127

		rect 0,0, height * @h / @N , width * @w / @M 
		@buttons[0].txt = @top().toString()
		@buttons[1].txt = @target.toString()
		for button in @buttons
			button.draw()

	mousePressed : ->
		for button in @buttons 
			button.mousePressed()

	keyPressed : (key) ->
		for button in @buttons
			button.keyPressed key

	process : (key) ->
		if key==@keys[0] and @history.length>1
			@history.pop()
		if key==@keys[1] and @top()%2==0
			@save @top() / 2
		if key==@keys[2] 
			@save @top() + 2
		if key==@keys[3]
			@save @top() * 2

	save : (value) ->
		@count++
		@history.push value
		if @target==@top()
			d = new Date()
			ms = d.getTime()
			@stopp = ms 

	score : -> (@stopp - @start)/1000 + @count * 10	

	top : -> @history[@history.length-1]

	finished : -> @top() == @target		

	perfect : (level) -> @finished() and @count <= level

	result : ->
		console.log("player.result #{@history}")
		fill 0
		textSize 40
		for number,i in @history
			if @keys=="WASD" # left
				x0 = 150-width/2
			else
				x0 = 150
			x = int i / 16
			y = i % 16
			text number,x0+x*100,-height*0.4 + y*40