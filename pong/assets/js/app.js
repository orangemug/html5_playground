(function() {
  var App;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  App = (function() {
    function App() {
      this.lastRun = Date.now();
      this.stage = new Stage('.board');
      this.ball = new Ball({
        'stage': this.stage
      });
      this.mainLoop();
    }
    App.prototype.mainLoop = function() {
      var delta, now;
      now = Date.now();
      delta = 1 / (now - this.lastRun);
      this.lastRun = now;
      this.ball.update(delta);
      return requestAnimationFrame(__bind(function() {
        return this.mainLoop();
      }, this));
    };
    return App;
  })();
  window.App = App;
}).call(this);
