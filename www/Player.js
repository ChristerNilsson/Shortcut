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
    this.level = 0;
    this.buttons = [];
    this.buttons.push(new Button(this, -5, -10, 7.5, 15, "", "3"));
    this.buttons.push(new Button(this, -5, 10, 7.5, 15, "", "2"));
    this.buttons.push(new Button(this, -5, 0, 7.5, 15, keys[0], "undo"));
    this.buttons.push(new Button(this, 15, -10, 7.5, 15, keys[1], "/2"));
    this.buttons.push(new Button(this, 15, 0, 7.5, 15, keys[2], "+2"));
    this.buttons.push(new Button(this, 15, 10, 7.5, 15, keys[3], "*2"));
  }

  Player.prototype.draw = function() {
    var button, j, len, ref;
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
    for (j = 0, len = ref.length; j < len; j++) {
      button = ref[j];
      button.draw();
    }
    textSize(80);
    fill(127);
    return text(this.level - this.history.length + 1, 0, -height / 3);
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

  Player.prototype.touchStarted = function(x, y) {
    var button, j, len, ref, results;
    ref = this.buttons;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      button = ref[j];
      results.push(button.touchStarted(x, y));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheWVyLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJ3d3dcXFBsYXllci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUE7O0FBQU07RUFFUSxnQkFBQyxJQUFELEVBQU0sQ0FBTixFQUFRLENBQVIsRUFBVSxDQUFWLEVBQWEsQ0FBYjtJQUFVLElBQUMsQ0FBQSxJQUFEO0lBQUcsSUFBQyxDQUFBLElBQUQ7SUFDekIsSUFBQyxDQUFBLENBQUQsR0FBSztJQUNMLElBQUMsQ0FBQSxDQUFELEdBQUs7SUFDTCxJQUFDLENBQUEsSUFBRCxHQUFRO0lBQ1IsSUFBQyxDQUFBLENBQUQsR0FBSyxLQUFBLEdBQVEsQ0FBUixHQUFZLElBQUMsQ0FBQTtJQUNsQixJQUFDLENBQUEsQ0FBRCxHQUFLLE1BQUEsR0FBUyxDQUFULEdBQWEsSUFBQyxDQUFBO0lBQ25CLElBQUMsQ0FBQSxPQUFELEdBQVcsQ0FBQyxDQUFEO0lBQ1gsSUFBQyxDQUFBLE1BQUQsR0FBVTtJQUNWLElBQUMsQ0FBQSxLQUFELEdBQVM7SUFDVCxJQUFDLENBQUEsS0FBRCxHQUFTO0lBRVQsSUFBQyxDQUFBLE9BQUQsR0FBVztJQUNYLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFrQixJQUFBLE1BQUEsQ0FBTyxJQUFQLEVBQVMsQ0FBQyxDQUFWLEVBQVksQ0FBQyxFQUFiLEVBQWlCLEdBQWpCLEVBQXNCLEVBQXRCLEVBQTBCLEVBQTFCLEVBQTZCLEdBQTdCLENBQWxCO0lBQ0EsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWtCLElBQUEsTUFBQSxDQUFPLElBQVAsRUFBVSxDQUFDLENBQVgsRUFBYSxFQUFiLEVBQWlCLEdBQWpCLEVBQXNCLEVBQXRCLEVBQTBCLEVBQTFCLEVBQTZCLEdBQTdCLENBQWxCO0lBQ0EsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWtCLElBQUEsTUFBQSxDQUFPLElBQVAsRUFBVSxDQUFDLENBQVgsRUFBYyxDQUFkLEVBQWlCLEdBQWpCLEVBQXNCLEVBQXRCLEVBQTBCLElBQUssQ0FBQSxDQUFBLENBQS9CLEVBQWtDLE1BQWxDLENBQWxCO0lBQ0EsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWtCLElBQUEsTUFBQSxDQUFPLElBQVAsRUFBUyxFQUFULEVBQWEsQ0FBQyxFQUFkLEVBQWtCLEdBQWxCLEVBQXVCLEVBQXZCLEVBQTJCLElBQUssQ0FBQSxDQUFBLENBQWhDLEVBQW1DLElBQW5DLENBQWxCO0lBQ0EsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWtCLElBQUEsTUFBQSxDQUFPLElBQVAsRUFBVyxFQUFYLEVBQWUsQ0FBZixFQUFrQixHQUFsQixFQUF1QixFQUF2QixFQUEyQixJQUFLLENBQUEsQ0FBQSxDQUFoQyxFQUFtQyxJQUFuQyxDQUFsQjtJQUNBLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFrQixJQUFBLE1BQUEsQ0FBTyxJQUFQLEVBQVUsRUFBVixFQUFjLEVBQWQsRUFBa0IsR0FBbEIsRUFBdUIsRUFBdkIsRUFBMkIsSUFBSyxDQUFBLENBQUEsQ0FBaEMsRUFBbUMsSUFBbkMsQ0FBbEI7RUFqQlk7O21CQW1CYixJQUFBLEdBQU8sU0FBQTtBQUNOLFFBQUE7SUFBQSxJQUFHLElBQUMsQ0FBQSxJQUFELEtBQVMsTUFBWjtNQUNDLElBQUcsSUFBQyxDQUFBLE1BQUQsS0FBUyxJQUFDLENBQUEsR0FBRCxDQUFBLENBQVo7UUFDQyxJQUFBLENBQUssQ0FBTCxFQUFPLEdBQVAsRUFBVyxDQUFYLEVBREQ7T0FBQSxNQUFBO1FBR0MsSUFBQSxDQUFLLEdBQUwsRUFBUyxHQUFULEVBQWEsQ0FBYixFQUhEO09BREQ7S0FBQSxNQUFBO01BTUMsSUFBRyxJQUFDLENBQUEsTUFBRCxLQUFTLElBQUMsQ0FBQSxHQUFELENBQUEsQ0FBWjtRQUNDLElBQUEsQ0FBSyxDQUFMLEVBQU8sR0FBUCxFQUFXLENBQVgsRUFERDtPQUFBLE1BQUE7UUFHQyxJQUFBLENBQUssR0FBTCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBSEQ7T0FORDs7SUFXQSxJQUFBLENBQUssQ0FBTCxFQUFPLENBQVAsRUFBVSxNQUFBLEdBQVMsSUFBQyxDQUFBLENBQVYsR0FBYyxJQUFDLENBQUEsQ0FBekIsRUFBNkIsS0FBQSxHQUFRLElBQUMsQ0FBQSxDQUFULEdBQWEsSUFBQyxDQUFBLENBQTNDO0lBQ0EsSUFBQyxDQUFBLE9BQVEsQ0FBQSxDQUFBLENBQUUsQ0FBQyxHQUFaLEdBQWtCLElBQUMsQ0FBQSxHQUFELENBQUEsQ0FBTSxDQUFDLFFBQVAsQ0FBQTtJQUNsQixJQUFDLENBQUEsT0FBUSxDQUFBLENBQUEsQ0FBRSxDQUFDLEdBQVosR0FBa0IsSUFBQyxDQUFBLE1BQU0sQ0FBQyxRQUFSLENBQUE7QUFDbEI7QUFBQSxTQUFBLHFDQUFBOztNQUNDLE1BQU0sQ0FBQyxJQUFQLENBQUE7QUFERDtJQUVBLFFBQUEsQ0FBUyxFQUFUO0lBQ0EsSUFBQSxDQUFLLEdBQUw7V0FDQSxJQUFBLENBQUssSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFDLENBQUEsT0FBTyxDQUFDLE1BQWxCLEdBQTJCLENBQWhDLEVBQW1DLENBQW5DLEVBQXFDLENBQUMsTUFBRCxHQUFRLENBQTdDO0VBbkJNOzttQkFxQlAsWUFBQSxHQUFlLFNBQUE7QUFDZCxRQUFBO0FBQUE7QUFBQTtTQUFBLHFDQUFBOzttQkFDQyxNQUFNLENBQUMsWUFBUCxDQUFBO0FBREQ7O0VBRGM7O21CQUlmLFlBQUEsR0FBZSxTQUFDLENBQUQsRUFBRyxDQUFIO0FBQ2QsUUFBQTtBQUFBO0FBQUE7U0FBQSxxQ0FBQTs7bUJBQ0MsTUFBTSxDQUFDLFlBQVAsQ0FBb0IsQ0FBcEIsRUFBc0IsQ0FBdEI7QUFERDs7RUFEYzs7bUJBSWYsVUFBQSxHQUFhLFNBQUMsR0FBRDtBQUNaLFFBQUE7QUFBQTtBQUFBO1NBQUEscUNBQUE7O21CQUNDLE1BQU0sQ0FBQyxVQUFQLENBQWtCLEdBQWxCO0FBREQ7O0VBRFk7O21CQUliLE9BQUEsR0FBVSxTQUFDLEdBQUQ7SUFDVCxJQUFHLElBQUMsQ0FBQSxNQUFELEtBQVMsSUFBQyxDQUFBLEdBQUQsQ0FBQSxDQUFaO0FBQ0MsYUFERDs7SUFFQSxJQUFHLEdBQUEsS0FBSyxJQUFDLENBQUEsSUFBSyxDQUFBLENBQUEsQ0FBWCxJQUFrQixJQUFDLENBQUEsT0FBTyxDQUFDLE1BQVQsR0FBZ0IsQ0FBckM7TUFDQyxJQUFDLENBQUEsT0FBTyxDQUFDLEdBQVQsQ0FBQSxFQUREOztJQUVBLElBQUcsR0FBQSxLQUFLLElBQUMsQ0FBQSxJQUFLLENBQUEsQ0FBQSxDQUFYLElBQWtCLElBQUMsQ0FBQSxHQUFELENBQUEsQ0FBQSxHQUFPLENBQVAsS0FBVSxDQUEvQjtNQUNDLElBQUMsQ0FBQSxJQUFELENBQU0sSUFBQyxDQUFBLEdBQUQsQ0FBQSxDQUFBLEdBQVMsQ0FBZixFQUREOztJQUVBLElBQUcsR0FBQSxLQUFLLElBQUMsQ0FBQSxJQUFLLENBQUEsQ0FBQSxDQUFkO01BQ0MsSUFBQyxDQUFBLElBQUQsQ0FBTSxJQUFDLENBQUEsR0FBRCxDQUFBLENBQUEsR0FBUyxDQUFmLEVBREQ7O0lBRUEsSUFBRyxHQUFBLEtBQUssSUFBQyxDQUFBLElBQUssQ0FBQSxDQUFBLENBQWQ7YUFDQyxJQUFDLENBQUEsSUFBRCxDQUFNLElBQUMsQ0FBQSxHQUFELENBQUEsQ0FBQSxHQUFTLENBQWYsRUFERDs7RUFUUzs7bUJBWVYsSUFBQSxHQUFPLFNBQUMsS0FBRDtBQUNOLFFBQUE7SUFBQSxJQUFDLENBQUEsS0FBRDtJQUNBLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLEtBQWQ7SUFDQSxJQUFHLElBQUMsQ0FBQSxNQUFELEtBQVMsSUFBQyxDQUFBLEdBQUQsQ0FBQSxDQUFaO01BQ0MsQ0FBQSxHQUFRLElBQUEsSUFBQSxDQUFBO01BQ1IsRUFBQSxHQUFLLENBQUMsQ0FBQyxPQUFGLENBQUE7YUFDTCxJQUFDLENBQUEsS0FBRCxHQUFTLEdBQUEsQ0FBSSxFQUFKLEVBSFY7O0VBSE07O21CQVFQLEtBQUEsR0FBUSxTQUFBO1dBQUcsQ0FBQyxDQUFDLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBQyxDQUFBLEtBQVgsQ0FBQSxHQUFrQixJQUFsQixHQUF5QixJQUFDLENBQUEsS0FBRCxHQUFTLEVBQW5DLENBQXNDLENBQUMsT0FBdkMsQ0FBK0MsQ0FBL0M7RUFBSDs7bUJBRVIsR0FBQSxHQUFNLFNBQUE7V0FBRyxJQUFDLENBQUEsT0FBUSxDQUFBLElBQUMsQ0FBQSxPQUFPLENBQUMsTUFBVCxHQUFnQixDQUFoQjtFQUFaOzttQkFFTixRQUFBLEdBQVcsU0FBQTtXQUFHLElBQUMsQ0FBQSxHQUFELENBQUEsQ0FBQSxLQUFVLElBQUMsQ0FBQTtFQUFkOzttQkFFWCxPQUFBLEdBQVUsU0FBQyxLQUFEO1dBQVcsSUFBQyxDQUFBLFFBQUQsQ0FBQSxDQUFBLElBQWdCLElBQUMsQ0FBQSxLQUFELElBQVU7RUFBckM7O21CQUVWLE1BQUEsR0FBUSxTQUFBO0FBQ1AsUUFBQTtJQUFBLElBQUcsSUFBQyxDQUFBLEtBQUQsS0FBVSxDQUFiO0FBQ0MsYUFERDs7SUFFQSxJQUFBLENBQUssSUFBQyxDQUFBLEtBQU47SUFDQSxDQUFBLEdBQUk7SUFDSixRQUFBLENBQVMsQ0FBVDtBQUNBO0FBQUE7U0FBQSw2Q0FBQTs7TUFDQyxJQUFHLElBQUMsQ0FBQSxJQUFELEtBQU8sTUFBVjtRQUNDLEVBQUEsR0FBSyxHQUFBLEdBQUksS0FBQSxHQUFNLEVBRGhCO09BQUEsTUFBQTtRQUdDLEVBQUEsR0FBSyxJQUhOOztNQUlBLENBQUEsR0FBSSxDQUFDLE1BQUEsR0FBTyxDQUFSLENBQUEsR0FBVyxHQUFYLEdBQWlCO01BQ3JCLENBQUEsR0FBSSxHQUFBLENBQUksQ0FBQSxHQUFJLENBQVI7TUFDSixDQUFBLEdBQUksR0FBQSxDQUFJLENBQUEsR0FBSSxDQUFSO21CQUNKLElBQUEsQ0FBSyxNQUFMLEVBQVksRUFBQSxHQUFHLENBQUEsR0FBRSxHQUFqQixFQUFxQixDQUFDLENBQUMsTUFBQSxHQUFPLENBQVIsQ0FBRCxHQUFZLEdBQVosR0FBZ0IsR0FBaEIsR0FBc0IsQ0FBQSxHQUFFLENBQTdDO0FBUkQ7O0VBTk8iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBQbGF5ZXJcblxuXHRjb25zdHJ1Y3RvcjogKGtleXMseCx5LEB3LEBoKSAtPiAgIyBzaXh0aWVzXG5cdFx0QE0gPSAxMjBcblx0XHRATiA9IDYwXG5cdFx0QGtleXMgPSBrZXlzXG5cdFx0QHggPSB3aWR0aCAqIHggLyBATSAjIGNlbnRydW0gcGl4ZWxzXG5cdFx0QHkgPSBoZWlnaHQgKiB5IC8gQE4gIyBjZW50cnVtIHBpeGVsc1xuXHRcdEBoaXN0b3J5ID0gWzNdXG5cdFx0QHRhcmdldCA9IDJcblx0XHRAY291bnQgPSAwXG5cdFx0QGxldmVsID0gMFxuXG5cdFx0QGJ1dHRvbnMgPSBbXSAgICAgICAgICAgICAgIyB4ICAgeSAgIHcgICBoIChyZWxhdGl2dCBjZW50cnVtKVxuXHRcdEBidXR0b25zLnB1c2ggbmV3IEJ1dHRvbiBALC01LC0xMCwgNy41LCAxNSwgXCJcIixcIjNcIlxuXHRcdEBidXR0b25zLnB1c2ggbmV3IEJ1dHRvbiBALCAtNSwxMCwgNy41LCAxNSwgXCJcIixcIjJcIlxuXHRcdEBidXR0b25zLnB1c2ggbmV3IEJ1dHRvbiBALCAtNSwgMCwgNy41LCAxNSwga2V5c1swXSxcInVuZG9cIlxuXHRcdEBidXR0b25zLnB1c2ggbmV3IEJ1dHRvbiBALDE1LCAtMTAsIDcuNSwgMTUsIGtleXNbMV0sXCIvMlwiXG5cdFx0QGJ1dHRvbnMucHVzaCBuZXcgQnV0dG9uIEAsICAxNSwgMCwgNy41LCAxNSwga2V5c1syXSxcIisyXCJcblx0XHRAYnV0dG9ucy5wdXNoIG5ldyBCdXR0b24gQCwgMTUsIDEwLCA3LjUsIDE1LCBrZXlzWzNdLFwiKjJcIlxuXG5cdGRyYXcgOiAtPlxuXHRcdGlmIEBrZXlzID09IFwiV0FTRFwiXG5cdFx0XHRpZiBAdGFyZ2V0PT1AdG9wKClcblx0XHRcdFx0ZmlsbCAwLDI1NSwwXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGZpbGwgMjU1LDI1NSwwXG5cdFx0ZWxzZVxuXHRcdFx0aWYgQHRhcmdldD09QHRvcCgpXG5cdFx0XHRcdGZpbGwgMCwyNTUsMFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRmaWxsIDI1NSwwLDBcblxuXHRcdHJlY3QgMCwwLCBoZWlnaHQgKiBAaCAvIEBOICwgd2lkdGggKiBAdyAvIEBNIFxuXHRcdEBidXR0b25zWzBdLnR4dCA9IEB0b3AoKS50b1N0cmluZygpXG5cdFx0QGJ1dHRvbnNbMV0udHh0ID0gQHRhcmdldC50b1N0cmluZygpXG5cdFx0Zm9yIGJ1dHRvbiBpbiBAYnV0dG9uc1xuXHRcdFx0YnV0dG9uLmRyYXcoKVxuXHRcdHRleHRTaXplIDgwXG5cdFx0ZmlsbCAxMjdcblx0XHR0ZXh0IEBsZXZlbCAtIEBoaXN0b3J5Lmxlbmd0aCArIDEsIDAsLWhlaWdodC8zXG5cblx0bW91c2VQcmVzc2VkIDogLT5cblx0XHRmb3IgYnV0dG9uIGluIEBidXR0b25zIFxuXHRcdFx0YnV0dG9uLm1vdXNlUHJlc3NlZCgpXG5cblx0dG91Y2hTdGFydGVkIDogKHgseSkgLT5cblx0XHRmb3IgYnV0dG9uIGluIEBidXR0b25zIFxuXHRcdFx0YnV0dG9uLnRvdWNoU3RhcnRlZCh4LHkpXG5cblx0a2V5UHJlc3NlZCA6IChrZXkpIC0+XG5cdFx0Zm9yIGJ1dHRvbiBpbiBAYnV0dG9uc1xuXHRcdFx0YnV0dG9uLmtleVByZXNzZWQga2V5XG5cblx0cHJvY2VzcyA6IChrZXkpIC0+XG5cdFx0aWYgQHRhcmdldD09QHRvcCgpXG5cdFx0XHRyZXR1cm5cblx0XHRpZiBrZXk9PUBrZXlzWzBdIGFuZCBAaGlzdG9yeS5sZW5ndGg+MVxuXHRcdFx0QGhpc3RvcnkucG9wKClcblx0XHRpZiBrZXk9PUBrZXlzWzFdIGFuZCBAdG9wKCklMj09MFxuXHRcdFx0QHNhdmUgQHRvcCgpIC8gMlxuXHRcdGlmIGtleT09QGtleXNbMl0gXG5cdFx0XHRAc2F2ZSBAdG9wKCkgKyAyXG5cdFx0aWYga2V5PT1Aa2V5c1szXVxuXHRcdFx0QHNhdmUgQHRvcCgpICogMlxuXG5cdHNhdmUgOiAodmFsdWUpIC0+XG5cdFx0QGNvdW50Kytcblx0XHRAaGlzdG9yeS5wdXNoIHZhbHVlXG5cdFx0aWYgQHRhcmdldD09QHRvcCgpXG5cdFx0XHRkID0gbmV3IERhdGUoKVxuXHRcdFx0bXMgPSBkLmdldFRpbWUoKVxuXHRcdFx0QHN0b3BwID0gaW50IG1zIFxuXG5cdHNjb3JlIDogLT4gKChAc3RvcHAgLSBAc3RhcnQpLzEwMDAgKyBAY291bnQgKiAxMCkudG9GaXhlZCgzKVxuXG5cdHRvcCA6IC0+IEBoaXN0b3J5W0BoaXN0b3J5Lmxlbmd0aC0xXVxuXG5cdGZpbmlzaGVkIDogLT4gQHRvcCgpID09IEB0YXJnZXRcdFx0XG5cblx0cGVyZmVjdCA6IChsZXZlbCkgLT4gQGZpbmlzaGVkKCkgYW5kIEBjb3VudCA8PSBsZXZlbFxuXG5cdHJlc3VsdCA6KCkgLT5cblx0XHRpZiBAc3RvcHAgPT0gMFxuXHRcdFx0cmV0dXJuXG5cdFx0ZmlsbCBAY29sb3Jcblx0XHRIID0gNDBcblx0XHR0ZXh0U2l6ZSBIXG5cdFx0Zm9yIG51bWJlcixpIGluIEBoaXN0b3J5XG5cdFx0XHRpZiBAa2V5cz09XCJXQVNEXCIgIyBsZWZ0XG5cdFx0XHRcdHgwID0gMTAwLXdpZHRoLzJcblx0XHRcdGVsc2Vcblx0XHRcdFx0eDAgPSAxMDBcblx0XHRcdG4gPSAoaGVpZ2h0LUgpKjAuOSAvIEhcblx0XHRcdHggPSBpbnQgaSAvIG5cblx0XHRcdHkgPSBpbnQgaSAlIG5cblx0XHRcdHRleHQgbnVtYmVyLHgwK3gqMTAwLC0oaGVpZ2h0LUgpKjAuOSowLjUgKyB5KkgiXX0=
//# sourceURL=C:\github\Shortcut\www\Player.coffee