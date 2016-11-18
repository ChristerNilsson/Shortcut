function Button(parent,x,y,w,h,key,txt) {  // sixties
  this.parent = parent
  var p = parent
  this.x = p.x + p.w * x / 60 // pixels
  this.y = p.y + p.h * y / 60 
  this.w = p.w * w / 60
  this.h = p.h * h / 60
  this.key = key
  this.txt = txt
  
  this.draw = function () {
    fill(255)
    rect(this.x,this.y,this.w-1,this.h-1)
    fill(0)
    text(this.txt,this.x+this.w/2,this.y+this.h/2)
  }
  
  this.mousePressed = function() {
    if (mouseX >= this.x && mouseX <= this.x+this.w && mouseY >= this.y && mouseY <= this.y+this.h) {
      this.parent.process(this.key)
    }
  }

  this.keyPressed = function(key) {
    if (this.key == key) this.parent.process(this.key)
  }
}