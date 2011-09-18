function forPixelInLetter(letterElem, callback) {
  for(var i=0; i<5; i++) {
    for(var j=0; j<5; j++) {
      el = letterElem.find(".px"+i+"-"+j)
      callback(el, i, j);
    }
  }
}

function createLetter(id) {
  var master = $("<div id='"+id+"' class='letter'>")
  for(var i=0; i<5; i++) {
    var div = $("<div class='pixel-row'></div>")
    for(var j=0; j<5; j++) {
      div.append("<div class='pixel px"+j+"-"+i+"'></div>")
    }
    master.append(div)
  }
  return master
}

function implode(el, letterElem) {
  forPixelInLetter(letterElem, function(pixelElem) {
    pixelElem.css({
      '-webkit-transform': "translate3d(0px,0px,0px) rotate(0deg)"
    })
  })
}

function explodeLetter(elem) {
  var lastElem;
  forPixelInLetter(elem, function(pixelElem) {
    lastElem = pixelElem
    var x = Math.floor((Math.random()-0.5)*800)
    var y = Math.floor((Math.random()-0.5)*800)
    pixelElem.css({
      '-webkit-transform': "translate3d("+x+"px, "+y+"px, 0px) rotate("+Math.floor((Math.random())*360)+"deg)"
    })
  })

  // Call implode
  lastElem.bind('webkitTransitionEnd', function(e) {
    setTimeout(function() {
      implode(lastElem, elem);
    }, 400)
  })
}


function changeLetter(letter, letterElem) {
  forPixelInLetter(letterElem, function(pixelElem, i, j) {
    if (LETTERS[letter][j][i]) {
      pixelElem.css('opacity', '1')
    } else {
      pixelElem.css('opacity', '0')
    }
  })
}


function bindExplode(el) {
  el.bind('click', function() {
    explodeLetter(el)
    return false
  })
}


function bindTouchMod(elem, bindOn) {
  if (!bindOn) {
    bindOn = elem;
  }
  elem   = $(elem);
  bindOn = $(bindOn);

  // http://www.sitepen.com/blog/2008/07/10/touching-and-gesturing-on-the-iphone/
  var rotation = 0;
  var scale    = 1;
  bindOn.bind('gesturechange', function(e) {
    var changeScale    = e.originalEvent.scale    * scale;
    var changeRotation = e.originalEvent.rotation + rotation;
    elem.css({
      'webkitTransform': "rotate(" + ((changeRotation) % 360) + "deg) scale("+changeScale+")"
    })
  })

  elem.bind('gestureend', function(e) {
    scale    *= e.originalEvent.scale;
    rotation = e.originalEvent.rotation + rotation;        
  })
}


function padZeros(num, str) {
  str = ""+str
  while(str.length < num) {
    str = "0"+str
  }
  return str;
}

$(document).ready(function() {
  // Prevent scrolling on this document
  $(document).bind('touchmove', function(event) {
    event.preventDefault()
  }, false);

  // Create letters
  var d0=createLetter("d0")
  var d1=createLetter("d1")
  var h0=createLetter("h0")
  var h1=createLetter("h1")
  var m0=createLetter("m0")
  var m1=createLetter("m1")
  var s0=createLetter("s0")
  var s1=createLetter("s1")

  // Place the ':' in the time string
  changeLetter(":", d0)
  changeLetter(":", d1)

  // Bind some explode events
  var els = [h0, h1, m0, m1, s0, s1]
  for (el in els) {
    var elem = els[el]

    // Explode!!
    bindExplode(elem)
  }

  // Caption event
  captionHandle = null
  $('.caption').bind('click', function() {
    clearTimeout(captionHandle)
    $('.caption').html("NOT ME... THE NUMBERS!")
    captionHandle = setTimeout(function() {
      $('.caption').html("TOUCH ME BABY!")
    }, 3000)
  })

  // Bind touch events
  bindTouchMod($('.container'), window)

  // Add the letters to the DOM
  $('.time').append(h0)
  $('.time').append(h1)
  $('.time').append(d0)
  $('.time').append(m0)
  $('.time').append(m1)
  $('.time').append(d1)
  $('.time').append(s0)
  $('.time').append(s1)

  // Display the time every 200ms if changed
  var idx=0
  var prevDate = new Date()
  var hdl = setInterval(function() {
    var date = new Date()
    // Just to check we hit the second acuratly
    if(date.toString() == prevDate.toString()) {
      console.log("return")
      return
    }
    var h = padZeros(2, date.getHours()).split("")
    var m = padZeros(2, date.getMinutes()).split("")
    var s = padZeros(2, date.getSeconds()).split("")

    changeLetter(h[0], h0)
    changeLetter(h[1], h1)
    changeLetter(m[0], m0)
    changeLetter(m[1], m1)
    changeLetter(s[0], s0)
    changeLetter(s[1], s1)
    idx+=1

    prevDate = date;
  }, 200)

})
