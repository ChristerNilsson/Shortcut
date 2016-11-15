class Player

	constructor: (keys,x,y,w,h) ->  # sixties
		@keys = keys
		@x = width * x / 60 # pixels
		@y = height * y / 60
		@w = width * w / 60
		@h = height * h / 60
		@history = [3]
		@target = 2
		@count = 0

		@buttons = []
		@buttons.push new Button @,5,10, 20,10, "","3"
		@buttons.push new Button @,35,10, 20,10, "","2"
		@buttons.push new Button @,20,30, 20,10, keys[0],"undo"
		@buttons.push new Button @,0,45, 20,10, keys[1],"+2"
		@buttons.push new Button @,20,45, 20,10, keys[2],"*2"
		@buttons.push new Button @,40,45, 20,10, keys[3],"/2"

	draw : ->
		fill 255
		rect @x,@y, @w-1,@h-1 
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
		if key==@keys[1] 
			@save @top() + 2
		if key==@keys[2]
			@save @top() * 2
		if key==@keys[3] and @top()%2==0
			@save @top() / 2

	save : (value) ->
		@count++
		@history.push value
		if @target==@top()
			d = new Date()
			ms = d.getTime()
			@stopp = ms 

	score : ->
		(@stopp - @start)/1000 + @count * 10	

	top : ->
		@history[@history.length-1]

	finished : ->
		@top() == @target		

	perfect : (level) ->
		@finished() and @count <= level		