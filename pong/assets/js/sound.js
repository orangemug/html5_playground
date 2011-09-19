(function() {
  var Dummy, Sound;
  Sound = (function() {
    function Sound() {
      this.ctx = new webkitAudioContext();
      this.sine = new Oscillator(DSP.SINE, 440, 1.0, 2048, 44100).generate();
    }
    Sound.prototype.play = function() {
      var src;
      src = this.ctx.createBufferSource();
      src.buffer = this.ctx.createBuffer(1, 2048, 44100);
      src.buffer.getChannelData(0).set(this.sine);
      return src.connect(this.ctx.destination);
    };
    return Sound;
  })();
  Dummy = (function() {
    function Dummy() {}
    Dummy.prototype.play = function() {
      return null;
    };
    return Dummy;
  })();
  window.Sound = typeof webkitAudioContext !== "undefined" && webkitAudioContext !== null ? new Sound() : new Dummy();
}).call(this);
