function Player(keys,x,y,w,h) {  // sixties
  this.keys = keys
  this.x = width * x / 60 // pixels
  this.y = height * y / 60
  this.w = width * w / 60
  this.h = height * h / 60
  this.history = [3]
  this.target = 2
  
  this.buttons = []
  this.buttons.push(new Button(this,5,10,20,10,"","3"))
  this.buttons.push(new Button(this,35,10,20,10,"","2"))
  this.buttons.push(new Button(this,20,30,20,10,keys[0],"undo"))
  this.buttons.push(new Button(this,0,45,20,10,keys[1],"+2"))
  this.buttons.push(new Button(this,20,45,20,10,keys[2],"*2"))
  this.buttons.push(new Button(this,40,45,20,10,keys[3],"/2"))
  
  this.draw = function () {
    fill(255)
    rect(this.x,this.y,this.w-1,this.h-1)
    this.buttons[0].txt = this.top().toString()
    this.buttons[1].txt = this.target.toString()
    for (button of this.buttons) button.draw()
  }
  
  this.createProblem = function () {
    this.history= [3]
    this.target = 2
  }
  
  this.mousePressed = function() {
    for (button of this.buttons) button.mousePressed()
  }
  
  this.keyPressed = function(key) {
    for (button of this.buttons) button.keyPressed(key)
  }
  
  this.process = function(key) {
    if (key==keys[0] && this.history.length>1) this.history.pop()
    if (key==keys[1]) this.save(this.top() + 2)
    if (key==keys[2]) this.save(this.top() * 2)
    if (key==keys[3] && this.top()%2==0) this.save(this.top() / 2)
  }
  
  this.save = function(value) {
    this.history.push(value)
  }
  
  this.top = function() {
    return this.history[this.history.length-1]
  }
}