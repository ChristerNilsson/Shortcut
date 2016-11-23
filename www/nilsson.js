// Generated by CoffeeScript 1.11.1
var bg, circle, fc, fixColor, range, rd, sc, sw;

fixColor = function(args) {
  var a, b, g, n, r;
  n = args.length;
  r = 0;
  g = 0;
  b = 0;
  a = 1;
  if (n === 1) {
    r = args[0];
    g = r;
    b = r;
  } else if (n === 3) {
    r = args[0];
    g = args[1];
    b = args[2];
  } else if (n === 4) {
    r = args[0];
    g = args[1];
    b = args[2];
    a = args[3];
  }
  return color(255 * r, 255 * g, 255 * b, 255 * a);
};

bg = function() {
  fill(fixColor(arguments));
  return rect(0, 0, 200, 200);
};

fc = function() {
  var n;
  n = arguments.length;
  if (n === 0) {
    return noFill();
  } else {
    return fill(fixColor(arguments));
  }
};

sc = function(r, g, b) {
  var n;
  n = arguments.length;
  if (n === 0) {
    return noStroke();
  } else {
    return stroke(fixColor(arguments));
  }
};

sw = function(n) {
  return strokeWeight(n);
};

circle = function(x, y, r) {
  return ellipse(x, y, 2 * r, 2 * r);
};

rd = function(vinkel) {
  return rotate(radians(vinkel));
};

range = function() {
  var n;
  n = arguments.length;
  if (n === 1) {
    return _.range(arguments[0]);
  } else if (n === 2) {
    return _.range(arguments[0], arguments[1]);
  } else if (n === 3) {
    return _.range(arguments[0], arguments[1], arguments[2]);
  }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmlsc3Nvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5pbHNzb24uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFBOztBQUFBLFFBQUEsR0FBVyxTQUFDLElBQUQ7QUFDVCxNQUFBO0VBQUEsQ0FBQSxHQUFJLElBQUksQ0FBQztFQUNULENBQUEsR0FBRTtFQUNGLENBQUEsR0FBRTtFQUNGLENBQUEsR0FBRTtFQUNGLENBQUEsR0FBRTtFQUNGLElBQUcsQ0FBQSxLQUFLLENBQVI7SUFDRSxDQUFBLEdBQUksSUFBSyxDQUFBLENBQUE7SUFDVCxDQUFBLEdBQUk7SUFDSixDQUFBLEdBQUksRUFITjtHQUFBLE1BSUssSUFBRyxDQUFBLEtBQUssQ0FBUjtJQUNILENBQUEsR0FBSSxJQUFLLENBQUEsQ0FBQTtJQUNULENBQUEsR0FBSSxJQUFLLENBQUEsQ0FBQTtJQUNULENBQUEsR0FBSSxJQUFLLENBQUEsQ0FBQSxFQUhOO0dBQUEsTUFJQSxJQUFHLENBQUEsS0FBRyxDQUFOO0lBQ0gsQ0FBQSxHQUFJLElBQUssQ0FBQSxDQUFBO0lBQ1QsQ0FBQSxHQUFJLElBQUssQ0FBQSxDQUFBO0lBQ1QsQ0FBQSxHQUFJLElBQUssQ0FBQSxDQUFBO0lBQ1QsQ0FBQSxHQUFJLElBQUssQ0FBQSxDQUFBLEVBSk47O0FBS0wsU0FBTyxLQUFBLENBQU0sR0FBQSxHQUFNLENBQVosRUFBZSxHQUFBLEdBQU0sQ0FBckIsRUFBd0IsR0FBQSxHQUFNLENBQTlCLEVBQWlDLEdBQUEsR0FBTSxDQUF2QztBQW5CRTs7QUFxQlgsRUFBQSxHQUFLLFNBQUE7RUFDSCxJQUFBLENBQUssUUFBQSxDQUFTLFNBQVQsQ0FBTDtTQUNBLElBQUEsQ0FBSyxDQUFMLEVBQVEsQ0FBUixFQUFXLEdBQVgsRUFBZ0IsR0FBaEI7QUFGRzs7QUFJTCxFQUFBLEdBQUssU0FBQTtBQUNILE1BQUE7RUFBQSxDQUFBLEdBQUksU0FBUyxDQUFDO0VBQ2QsSUFBRyxDQUFBLEtBQUssQ0FBUjtXQUNFLE1BQUEsQ0FBQSxFQURGO0dBQUEsTUFBQTtXQUdFLElBQUEsQ0FBSyxRQUFBLENBQVMsU0FBVCxDQUFMLEVBSEY7O0FBRkc7O0FBT0wsRUFBQSxHQUFLLFNBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQO0FBQ0gsTUFBQTtFQUFBLENBQUEsR0FBSSxTQUFTLENBQUM7RUFDZCxJQUFHLENBQUEsS0FBSyxDQUFSO1dBQ0UsUUFBQSxDQUFBLEVBREY7R0FBQSxNQUFBO1dBR0UsTUFBQSxDQUFPLFFBQUEsQ0FBUyxTQUFULENBQVAsRUFIRjs7QUFGRzs7QUFPTCxFQUFBLEdBQUssU0FBQyxDQUFEO1NBQ0gsWUFBQSxDQUFhLENBQWI7QUFERzs7QUFHTCxNQUFBLEdBQVMsU0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUw7U0FDUCxPQUFBLENBQVEsQ0FBUixFQUFVLENBQVYsRUFBWSxDQUFBLEdBQUUsQ0FBZCxFQUFnQixDQUFBLEdBQUUsQ0FBbEI7QUFETzs7QUFHVCxFQUFBLEdBQUssU0FBQyxNQUFEO0FBQ0gsU0FBTyxNQUFBLENBQU8sT0FBQSxDQUFRLE1BQVIsQ0FBUDtBQURKOztBQUdMLEtBQUEsR0FBUSxTQUFBO0FBQ04sTUFBQTtFQUFBLENBQUEsR0FBSSxTQUFTLENBQUM7RUFDZCxJQUFHLENBQUEsS0FBRyxDQUFOO0FBQ0UsV0FBTyxDQUFDLENBQUMsS0FBRixDQUFRLFNBQVUsQ0FBQSxDQUFBLENBQWxCLEVBRFQ7R0FBQSxNQUVLLElBQUcsQ0FBQSxLQUFHLENBQU47QUFDSCxXQUFPLENBQUMsQ0FBQyxLQUFGLENBQVEsU0FBVSxDQUFBLENBQUEsQ0FBbEIsRUFBcUIsU0FBVSxDQUFBLENBQUEsQ0FBL0IsRUFESjtHQUFBLE1BRUEsSUFBRyxDQUFBLEtBQUcsQ0FBTjtBQUNILFdBQU8sQ0FBQyxDQUFDLEtBQUYsQ0FBUSxTQUFVLENBQUEsQ0FBQSxDQUFsQixFQUFxQixTQUFVLENBQUEsQ0FBQSxDQUEvQixFQUFrQyxTQUFVLENBQUEsQ0FBQSxDQUE1QyxFQURKOztBQU5DIiwic291cmNlc0NvbnRlbnQiOlsiZml4Q29sb3IgPSAoYXJncykgLT5cclxuICBuID0gYXJncy5sZW5ndGhcclxuICByPTBcclxuICBnPTBcclxuICBiPTBcclxuICBhPTFcclxuICBpZiBuID09IDFcclxuICAgIHIgPSBhcmdzWzBdXHJcbiAgICBnID0gclxyXG4gICAgYiA9IHJcclxuICBlbHNlIGlmIG4gPT0gM1xyXG4gICAgciA9IGFyZ3NbMF1cclxuICAgIGcgPSBhcmdzWzFdXHJcbiAgICBiID0gYXJnc1syXVxyXG4gIGVsc2UgaWYgbj09NFxyXG4gICAgciA9IGFyZ3NbMF1cclxuICAgIGcgPSBhcmdzWzFdXHJcbiAgICBiID0gYXJnc1syXVxyXG4gICAgYSA9IGFyZ3NbM10gICAgXHJcbiAgcmV0dXJuIGNvbG9yIDI1NSAqIHIsIDI1NSAqIGcsIDI1NSAqIGIsIDI1NSAqIGFcclxuXHJcbmJnID0gKCkgLT5cclxuICBmaWxsIGZpeENvbG9yIGFyZ3VtZW50c1xyXG4gIHJlY3QgMCwgMCwgMjAwLCAyMDBcclxuXHJcbmZjID0gKCkgLT5cclxuICBuID0gYXJndW1lbnRzLmxlbmd0aFxyXG4gIGlmIG4gPT0gMFxyXG4gICAgbm9GaWxsKClcclxuICBlbHNlXHJcbiAgICBmaWxsIGZpeENvbG9yIGFyZ3VtZW50c1xyXG5cclxuc2MgPSAociwgZywgYikgLT5cclxuICBuID0gYXJndW1lbnRzLmxlbmd0aFxyXG4gIGlmIG4gPT0gMFxyXG4gICAgbm9TdHJva2UoKVxyXG4gIGVsc2VcclxuICAgIHN0cm9rZSBmaXhDb2xvciBhcmd1bWVudHNcclxuXHJcbnN3ID0gKG4pIC0+XHJcbiAgc3Ryb2tlV2VpZ2h0IG5cclxuXHJcbmNpcmNsZSA9ICh4LHkscikgLT5cclxuICBlbGxpcHNlIHgseSwyKnIsMipyXHJcblxyXG5yZCA9ICh2aW5rZWwpIC0+XHJcbiAgcmV0dXJuIHJvdGF0ZSByYWRpYW5zIHZpbmtlbFxyXG5cclxucmFuZ2UgPSAoKSAtPlxyXG4gIG4gPSBhcmd1bWVudHMubGVuZ3RoXHJcbiAgaWYgbj09MVxyXG4gICAgcmV0dXJuIF8ucmFuZ2UgYXJndW1lbnRzWzBdXHJcbiAgZWxzZSBpZiBuPT0yXHJcbiAgICByZXR1cm4gXy5yYW5nZSBhcmd1bWVudHNbMF0sYXJndW1lbnRzWzFdXHJcbiAgZWxzZSBpZiBuPT0zXHJcbiAgICByZXR1cm4gXy5yYW5nZSBhcmd1bWVudHNbMF0sYXJndW1lbnRzWzFdLGFyZ3VtZW50c1syXSJdfQ==
//# sourceURL=C:\github\Shortcut\www\nilsson.coffee