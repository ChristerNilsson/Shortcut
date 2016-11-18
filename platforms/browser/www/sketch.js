// Generated by CoffeeScript 1.11.1
var Game, autolevel, draw, g, keyPressed, mousePressed, setup, touchStarted,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

g = 0;

Game = (function() {
  function Game(x1, y1, a1, s, stack) {
    var h, w;
    this.x = x1 != null ? x1 : 0;
    this.y = y1 != null ? y1 : 0;
    this.a = a1 != null ? a1 : 0;
    this.s = s != null ? s : 1;
    this.stack = stack != null ? stack : [];
    this.players = [];
    this.level = 1;
    w = width;
    h = height;
    this.mode = 0;
    this.players.push(new Player("WASD", 30, 30, 60, 60));
    this.players.push(new Player("&%('", 90, 30, 60, 60));
    this.display = new Button(this, 0, 0, 15, 10, "", "");
    this.createProblem();
  }

  Game.prototype.push = function() {
    this.stack.push([this.x, this.y, this.a, this.s]);
    return push();
  };

  Game.prototype.pop = function() {
    var ref;
    ref = this.stack.pop(), this.x = ref[0], this.y = ref[1], this.a = ref[2], this.s = ref[3];
    return pop();
  };

  Game.prototype.rotate = function(d) {
    rotate(radians(d));
    return this.a += d;
  };

  Game.prototype.scale = function(ds) {
    scale(ds);
    return this.s *= ds;
  };

  Game.prototype.translate = function(dx, dy) {
    var v;
    v = radians(this.a);
    this.x += this.s * dx * cos(v) - this.s * dy * sin(v);
    this.y += this.s * dy * cos(v) + this.s * dx * sin(v);
    return translate(dx, dy);
  };

  Game.prototype.dump = function(txt) {
    return console.log([txt, this.x, this.y]);
  };

  Game.prototype.process = function() {
    var j, len, player, ref, results;
    console.log("process");
    this.mode = 1 - this.mode;
    if (this.mode === 0) {
      autolevel();
      return this.createProblem();
    } else {
      ref = this.players;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        player = ref[j];
        results.push(player.history.unshift(player.score()));
      }
      return results;
    }
  };

  Game.prototype.result = function() {
    var j, len, player, ref;
    fill(127);
    rect(0, 0, width, height);
    if (this.players[0].stopp === 0) {
      this.players[0].color = color(127);
    } else if (this.players[0].score() < this.players[1].score() || this.players[1].stopp === 0) {
      this.players[0].color = color(0, 255, 0);
    } else {
      this.players[0].color = color(255, 0, 0);
    }
    if (this.players[1].stopp === 0) {
      this.players[1].color = color(127);
    } else if (this.players[1].score() < this.players[0].score() || this.players[0].stopp === 0) {
      this.players[1].color = color(0, 255, 0);
    } else {
      this.players[1].color = color(255, 0, 0);
    }
    ref = this.players;
    for (j = 0, len = ref.length; j < len; j++) {
      player = ref[j];
      player.result();
    }
    return this.solve_result();
  };

  Game.prototype.solve_result = function() {
    var H, i, j, len, n, number, results, solution, x, x0, y;
    fill(0);
    H = 40;
    textSize(H);
    solution = solve(this.players[0].history[1], this.players[0].target);
    solution.unshift("");
    results = [];
    for (i = j = 0, len = solution.length; j < len; i = ++j) {
      number = solution[i];
      x0 = 0;
      n = (height - H) * 0.9 / H;
      x = int(i / n);
      y = int(i % n);
      results.push(text(number, x0 + x * 100, -(height - H) * 0.9 * 0.5 + y * H));
    }
    return results;
  };

  Game.prototype.createProblem = function() {
    var a, b, d, j, len, lst, ms, player, ref, results, target;
    target = a = 1 + int(random(20));
    lst = [a];
    while (lst.length - 1 < this.level) {
      b = 0;
      switch (int(random(3))) {
        case 0:
          b = a - 2;
          break;
        case 1:
          b = a * 2;
          break;
        case 2:
          if (a % 2 === 0) {
            b = a / 2;
          }
      }
      if (b > 0 && indexOf.call(lst, b) < 0) {
        a = b;
        lst.push(b);
      }
    }
    d = new Date();
    ms = int(d.getTime());
    ref = this.players;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      player = ref[j];
      player.history = [lst[lst.length - 1]];
      player.target = target;
      player.count = 0;
      player.start = ms;
      results.push(player.stopp = 0);
    }
    return results;
  };

  return Game;

})();

setup = function() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  return g = new Game();
};

draw = function() {
  var i, j, len, player, ref;
  g.push();
  g.translate(width / 2, height / 2);
  ref = g.players;
  for (i = j = 0, len = ref.length; j < len; i = ++j) {
    player = ref[i];
    g.push();
    if (i === 0) {
      g.translate(-width / 4, 0);
      g.rotate(90);
    }
    if (i === 1) {
      g.translate(width / 4, 0);
      g.rotate(-90);
    }
    player.draw();
    g.pop();
    if (g.mode === 1) {
      g.result();
    }
  }
  g.display.draw();
  return g.pop();
};

touchStarted = function() {
  var j, len, player, ref;
  ref = g.players;
  for (j = 0, len = ref.length; j < len; j++) {
    player = ref[j];
    player.touchStarted();
  }
  return g.display.touchStarted();
};

mousePressed = function() {
  var j, len, player, ref;
  ref = g.players;
  for (j = 0, len = ref.length; j < len; j++) {
    player = ref[j];
    player.mousePressed();
  }
  return g.display.mousePressed();
};

keyPressed = function() {
  var j, len, player, ref;
  ref = g.players;
  for (j = 0, len = ref.length; j < len; j++) {
    player = ref[j];
    player.keyPressed(key);
  }
  if (key === ' ') {
    autolevel();
    return g.createProblem();
  }
};

autolevel = function() {
  var finished, j, len, perfect, player, ref;
  finished = 0;
  perfect = 0;
  ref = g.players;
  for (j = 0, len = ref.length; j < len; j++) {
    player = ref[j];
    if (player.finished()) {
      finished++;
    }
    if (player.perfect(g.level)) {
      perfect++;
    }
  }
  if (perfect > 0) {
    g.level++;
  } else {
    g.level--;
  }
  if (g.level === 0) {
    return g.level = 1;
  }
};
