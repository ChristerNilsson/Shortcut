class Button
	constructor: (parent,x,y,w,h,key,txt) -> # sixties
		@parent = parent

		p = parent
		@x = p.x + p.w * x / 60 # pixels
		@y = p.y + p.h * y / 60 
		@w = p.w * w / 60
		@h = p.h * h / 60
		@key = key
		@txt = txt

	draw : ->
		fill 255
		rect @x, @y, @w-1, @h-1
		fill 0
		textSize @h/2
		text @txt, @x+@w/2, @y+@h/2

	mousePressed : ->
		if @x <= mouseX <= @x+@w and @y <= mouseY <= @y+@h 
			@parent.process @key

	keyPressed : (key) ->
		if @key == key
			@parent.process @key