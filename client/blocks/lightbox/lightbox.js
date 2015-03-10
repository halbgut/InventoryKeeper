Lightbox = {
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
    if(hashSplit[1] && hashSplit[1].indexOf(self.route) > -1) {
      self.open()
    } else {
      self.close()
    }
  }
, open: function () {
    var self = this
    if(self.element.className.indexOf(self.config.openClass) > -1) return
    self.element.className += ' ' + self.config.openClass
  }
, close: function () {
    var self = this
    if(self.element.className.indexOf(self.config.openClass) < 0) return
    self.element.className = self.element.className.replace(' ' + self.config.openClass, '')
  }
}

Template.lightbox.rendered = function () {
  var self = this
  thisLightbox = Object.create(Lightbox)
  thisLightbox.element = this.firstNode
  thisLightbox.route = self.data.route
  thisLightbox.init()
}