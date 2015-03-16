function getFormatedBookings () {
  var returnVal = []
  _formatedBookingsDep.depend()
  bookingsFilter.getItems().forEach(function (booking) {
    _.each(booking.objects, function (thing) {
      var thingDict = Objects.findOne({_id: thing})
      returnVal.push({
        rowId: thing
      , rowLabel: thingDict.serialNo
      , rowImageURL: thingDict.picture ? Pictures.findOne({_id: thingDict.picture}).url({stores: 'Thumbs'}) : false
      , description: booking.description + ' - <i>' + Humans.findOne({_id: booking.human}).givenName + '</i>'
      , fromUnixTime: new Date(booking.timeRange.from).getTime()
      , toUnixTime: new Date(booking.timeRange.to).getTime()
      , color: booking.color
      })
    })
  })
  return returnVal
}

Template.pageTimesheet.created = function () {
  bookingsFilter.updateItems()
  _formatedBookingsDep = new Tracker.Dependency()
  Bookings.find().observe({
    added: function () {
      _formatedBookingsDep.changed()
    }
  })
}

Template.pageTimesheet.rendered = function () {
  var self = this
  thisGraphicTimesheet = Object.create(graphicTimesheet)
  thisGraphicTimesheet.getItems = getFormatedBookings
  thisGraphicTimesheet.init('.graphicTimesheet', getFormatedBookings())
  _.each(kriegslustigLightbox.boxes, function (box) {
    box.element.addEventListener('open', function () {
      box.element.querySelector('input').focus()
    })
  })
}

Template.pageTimesheet.helpers({
  getFormatedBookings: getFormatedBookings
, formatedBookingsDep: function () {
    return _formatedBookingsDep
  }
})