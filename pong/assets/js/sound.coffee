class Sound

  constructor: () ->
    @ctx = new webkitAudioContext()
    @sine = new Oscillator(DSP.SINE, 440, 1.0, 2048, 44100).generate()


  play: () ->
    src = @ctx.createBufferSource()
    src.buffer = @ctx.createBuffer(1, 2048, 44100)
    src.buffer.getChannelData(0).set(@sine)
    src.connect(@ctx.destination);
    #src.noteOn(0);


class Dummy
  play: () ->null


window.Sound = if webkitAudioContext?
  new Sound()
else
  new Dummy()
