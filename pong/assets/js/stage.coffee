class Stage
  constructor: (elem) ->
    @elem = $(elem)


  bounds: () ->
    w = @elem.width()
    h = @elem.height()
    pos = @elem.position()
    x = @elem.position().left
    y = @elem.position().top

    return {
      'x1': x
      'y1': y
      'x2': x+w
      'y2': y+h
    }


window.Stage = Stage
