class App
  constructor: () ->
    @lastRun = Date.now()
    @stage = new Stage('.board')

    # Create ball
    @ball  = new Ball
      'stage': @stage

    @mainLoop()


  mainLoop: () ->
    now = Date.now()
    delta = 1/(now - @lastRun)
    @lastRun = now

    # Update actors
    @ball.update(delta)

    requestAnimationFrame () =>
      @mainLoop()


window.App = App
