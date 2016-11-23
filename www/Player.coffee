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
		@level = 0

		@buttons = []              # x   y   w   h (relativt centrum)
		@buttons.push new Button @,-5,-10, 7.5, 15, "","3"
		@buttons.push new Button @, -5,10, 7.5, 15, "","2"
		@buttons.push new Button @, -5, 0, 7.5, 15, keys[0],"undo"
		@buttons.push new Button @,15, -10, 7.5, 15, keys[1],"/2"
		@buttons.push new Button @,  15, 0, 7.5, 15, keys[2],"+2"
		@buttons.push new Button @, 15, 10, 7.5, 15, keys[3],"*2"

	draw : ->
		if @keys == "WASD"
			if @target==@top()
				fill 0,255,0
			else
				fill 255,255,0
		else
			if @target==@top()
				fill 0,255,0
			else
				fill 255,0,0

		rect 0,0, height * @h / @N , width * @w / @M 
		@buttons[0].txt = @top().toString()
		@buttons[1].txt = @target.toString()
		for button in @buttons
			button.draw()
		textSize 80
		fill 127
		text @level - @history.length + 1, 0,-height/3

	mousePressed : ->
		for button in @buttons 
			button.mousePressed()

	touchStarted : ->
		for button in @buttons 
			button.touchStarted()

	keyPressed : (key) ->
		for button in @buttons
			button.keyPressed key

	process : (key) ->
		if @target==@top()
			return
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
			@stopp = int ms 

	score : -> ((@stopp - @start)/1000 + @count * 10).toFixed(3)

	top : -> @history[@history.length-1]

	finished : -> @top() == @target		

	perfect : (level) -> @finished() and @count <= level

	result :() ->
		if @stopp == 0
			return
		fill @color
		H = 40
		textSize H
		for number,i in @history
			if @keys=="WASD" # left
				x0 = 100-width/2
			else
				x0 = 100
			n = (height-H)*0.9 / H
			x = int i / n
			y = int i % n
			text number,x0+x*100,-(height-H)*0.9*0.5 + y*H