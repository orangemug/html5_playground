(function() {
  var Ball;
  Ball = (function() {
    var HEIGHT, WIDTH;
    WIDTH = 20;
    HEIGHT = 20;
    function Ball(opts) {
      var _ref, _ref2, _ref3;
      this.initDOM();
      this.position = (_ref = opts != null ? opts.position : void 0) != null ? _ref : new V2D(30, 30);
      this.velocity = (_ref2 = opts != null ? opts.velocity : void 0) != null ? _ref2 : new V2D(25, 10);
      this.setSpeed((_ref3 = opts != null ? opts.initialSpeed : void 0) != null ? _ref3 : 100);
      this.stage = opts != null ? opts.stage : void 0;
      this.bats = opts != null ? opts.bats : void 0;
    }
    Ball.prototype.initDOM = function() {
      this.elem = $('<div></div>');
      this.elem.css({
        'position': "absolute",
        'top': 0,
        'left': 0,
        'width': WIDTH,
        'height': HEIGHT,
        'border-radius': "10px",
        'background-color': "black"
      });
      this.elem.addClass('ball');
      return $('body').append(this.elem);
    };
    Ball.prototype.update = function(delta) {
      var position;
      this.checkCollisions(delta);
      this.position = this.position.add(this.velocity.times(delta));
      position = this.position.round();
      return this.elem.css({
        '-webkit-transform': "translate3d(" + position.x + "px," + position.y + "px,0px)"
      });
    };
    Ball.prototype.checkCollisions = function(delta) {
      var bounds, tmpNewPos;
      tmpNewPos = this.position.add(this.velocity.times(delta));
      bounds = this.stage.bounds();
      if (bounds.x1 > tmpNewPos.x || tmpNewPos.x > bounds.x2 - WIDTH) {
        this.velocity.x = -this.velocity.x;
        Sound.play();
      }
      if (bounds.y1 > tmpNewPos.y) {
        null;
      } else if (tmpNewPos.y > bounds.y2 - HEIGHT) {
        null;
      }
      if (bounds.y1 > tmpNewPos.y || tmpNewPos.y > bounds.y2 - HEIGHT) {
        this.velocity.y = -this.velocity.y;
        return Sound.play();
      }
    };
    Ball.prototype.setSpeed = function(unitsPerSecond) {
      return this.velocity = this.velocity.norm().times(unitsPerSecond);
    };
    return Ball;
  })();
  window.Ball = Ball;
}).call(this);
