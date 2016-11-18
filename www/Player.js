// Generated by CoffeeScript 1.11.1
var Player;

Player = (function() {
  function Player(keys, x, y, w, h) {
    this.w = w;
    this.h = h;
    this.M = 120;
    this.N = 60;
    this.keys = keys;
    this.x = width * x / this.M;
    this.y = height * y / this.N;
    this.history = [3];
    this.target = 2;
    this.count = 0;
    this.buttons = [];
    this.buttons.push(new Button(this, -5, -10, 7.5, 15, "", "3"));
    this.buttons.push(new Button(this, -5, 10, 7.5, 15, "", "2"));
    this.buttons.push(new Button(this, -5, 0, 7.5, 15, keys[0], "undo"));
    this.buttons.push(new Button(this, 15, -10, 7.5, 15, keys[1], "/2"));
    this.buttons.push(new Button(this, 15, 0, 7.5, 15, keys[2], "+2"));
    this.buttons.push(new Button(this, 15, 10, 7.5, 15, keys[3], "*2"));
  }

  Player.prototype.draw = function() {
    var button, j, len, ref, results;
    if (this.keys === "WASD") {
      if (this.target === this.top()) {
        fill(0, 255, 0);
      } else {
        fill(255, 255, 0);
      }
    } else {
      if (this.target === this.top()) {
        fill(0, 255, 0);
      } else {
        fill(255, 0, 0);
      }
    }
    rect(0, 0, height * this.h / this.N, width * this.w / this.M);
    this.buttons[0].txt = this.top().toString();
    this.buttons[1].txt = this.target.toString();
    ref = this.buttons;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      button = ref[j];
      results.push(button.draw());
    }
    return results;
  };

  Player.prototype.mousePressed = function() {
    var button, j, len, ref, results;
    ref = this.buttons;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      button = ref[j];
      results.push(button.mousePressed());
    }
    return results;
  };

  Player.prototype.touchStarted = function() {
    var button, j, len, ref, results;
    ref = this.buttons;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      button = ref[j];
      results.push(button.touchStarted());
    }
    return results;
  };

  Player.prototype.keyPressed = function(key) {
    var button, j, len, ref, results;
    ref = this.buttons;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      button = ref[j];
      results.push(button.keyPressed(key));
    }
    return results;
  };

  Player.prototype.process = function(key) {
    if (this.target === this.top()) {
      return;
    }
    if (key === this.keys[0] && this.history.length > 1) {
      this.history.pop();
    }
    if (key === this.keys[1] && this.top() % 2 === 0) {
      this.save(this.top() / 2);
    }
    if (key === this.keys[2]) {
      this.save(this.top() + 2);
    }
    if (key === this.keys[3]) {
      return this.save(this.top() * 2);
    }
  };

  Player.prototype.save = function(value) {
    var d, ms;
    this.count++;
    this.history.push(value);
    if (this.target === this.top()) {
      d = new Date();
      ms = d.getTime();
      return this.stopp = int(ms);
    }
  };

  Player.prototype.score = function() {
    return ((this.stopp - this.start) / 1000 + this.count * 10).toFixed(3);
  };

  Player.prototype.top = function() {
    return this.history[this.history.length - 1];
  };

  Player.prototype.finished = function() {
    return this.top() === this.target;
  };

  Player.prototype.perfect = function(level) {
    return this.finished() && this.count <= level;
  };

  Player.prototype.result = function() {
    var H, i, j, len, n, number, ref, results, x, x0, y;
    if (this.stopp === 0) {
      return;
    }
    fill(this.color);
    H = 40;
    textSize(H);
    ref = this.history;
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      number = ref[i];
      if (this.keys === "WASD") {
        x0 = 100 - width / 2;
      } else {
        x0 = 100;
      }
      n = (height - H) * 0.9 / H;
      x = int(i / n);
      y = int(i % n);
      results.push(text(number, x0 + x * 100, -(height - H) * 0.9 * 0.5 + y * H));
    }
    return results;
  };

  return Player;

})();