class Ball
  WIDTH  = 20
  HEIGHT = 20

  constructor: (opts) ->
    @initDOM()

    # Position
    @position = opts?.position ? new V2D(30,30)
    @velocity = opts?.velocity ? new V2D(25,10)
    @setSpeed(opts?.initialSpeed ? 100)

    # Walls
    @stage = opts?.stage

    # Bats
    @bats = opts?.bats


  initDOM: () ->
    @elem = $('<div></div>')
    @elem.css
      'position': "absolute"
      'top': 0
      'left': 0
      'width': WIDTH
      'height': HEIGHT
      'border-radius': "10px"
      'background-color': "black"
    @elem.addClass 'ball'

    $('body').append(@elem)


  update: (delta) ->
    @checkCollisions(delta)
    @position = @position.add(@velocity.times(delta))

    # Round for performance
    position = @position.round()
    @elem.css
      '-webkit-transform': "translate3d(#{position.x}px,#{position.y}px,0px)"


  checkCollisions: (delta) ->
    # Walls
    tmpNewPos = @position.add(@velocity.times(delta))

    bounds = @stage.bounds()

    if bounds.x1 > tmpNewPos.x || tmpNewPos.x > bounds.x2-WIDTH
      @velocity.x = -@velocity.x
      Sound.play()

    # TODO: Check bats here
    # ============ HERE =============

    if bounds.y1 > tmpNewPos.y
      # TODO: Clock up P1's score
      null
    else if tmpNewPos.y > bounds.y2-HEIGHT
      # TODO: Clock up P2's score
      null
    

    if bounds.y1 > tmpNewPos.y || tmpNewPos.y > bounds.y2-HEIGHT
      # TODO: Clock up a score here
      @velocity.y = -@velocity.y
      Sound.play()




  setSpeed: (unitsPerSecond) ->
    @velocity = @velocity.norm().times(unitsPerSecond)


window.Ball = Ball
