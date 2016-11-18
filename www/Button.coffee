class Button
	constructor: (@parent,@y,@x,@w,@h,@key,@txt) -> # sixties
		@w0=99
		@h0=99

	draw : ->
		g.push()
		g.translate width*@x/60, height*@y/60

		@x0 = g.x
		@y0 = g.y

		@w0 = g.s*width*(@w)/60-2
		@h0 = g.s*height*(@h)/60-2

		fill 255
		rect 0, 0, height*(@h)/60-2,  width*(@w)/60-2

		fill 0
		textSize @h0/3
		text @txt, 0,0 
		g.pop()

	mousePressed : ->
		if @x0-@w0/2 <= mouseX <= @x0+@w0/2 and @y0-@h0/2 <= mouseY <= @y0+@h0/2 
			@parent.process @key
		false

	touchStarted : ->
		touch = touches[touches.length-1]
			#if touches[0].id == touch.id
		if @x0-@w0/2 <= touch.x <= @x0+@w0/2 and @y0-@h0/2 <= touch.y <= @y0+@h0/2 
			@parent.process @key
		false

	keyPressed : (key) ->
		if @key == key
			@parent.process @key