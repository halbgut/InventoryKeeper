lightbox = {
  boxes: {}
}

lightbox.Lightbox = {
  config: {
    openClass: 'lightbox--js--open'
  }
, init: function () {
    var self = this
    self.checkRoute()
    self.addURLListeners()
  }
, addURLListeners: function () {
    var self = this
    setInterval(function () {
      self.checkRoute()
    })
  }
, checkRoute: function () {
    var self = this
  , hashSplit = location.href.split('#')
    if(hashSplit[1] == self.name) {
      self.open()
    } else {
      self.close()
    }
  }
, open: function () {
    var self = this
    if(self.element.className.indexOf(self.config.openClass) > -1) return
    self.element.style.display = 'flex'
    setTimeout(function () {
      if(self.element.className.indexOf(self.config.openClass) > -1) return
      self.element.className += ' ' + self.config.openClass
    }, 100)
  }

, close: function () {
    var self = this
    if(self.element.className.indexOf(self.config.openClass) < 0) return
    self.element.className = self.element.className.replace(' ' + self.config.openClass, '')
    setTimeout(function () {
      self.element.style.display = 'none'
    }, 200)
  }
}

Template.lightbox.rendered = function () {
  var self = this
  lightbox.boxes[self.data.name] = Object.create(lightbox.Lightbox)
  lightbox.boxes[self.data.name].name = self.data.name
  lightbox.boxes[self.data.name].element = this.firstNode
  lightbox.boxes[self.data.name].init()
}