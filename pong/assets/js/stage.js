(function() {
  var Stage;
  Stage = (function() {
    function Stage(elem) {
      this.elem = $(elem);
    }
    Stage.prototype.bounds = function() {
      var h, pos, w, x, y;
      w = this.elem.width();
      h = this.elem.height();
      pos = this.elem.position();
      x = this.elem.position().left;
      y = this.elem.position().top;
      return {
        'x1': x,
        'y1': y,
        'x2': x + w,
        'y2': y + h
      };
    };
    return Stage;
  })();
  window.Stage = Stage;
}).call(this);
