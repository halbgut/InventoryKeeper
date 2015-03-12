function getFormatedBookings () {
  var returnVal = []
  _formatedBookingsDep.depend()
  Bookings.find({}).forEach(function (booking) {
    _.each(booking.objects, function (thing) {
      returnVal.push({
        rowId: thing
      , rowLabel: Objects.findOne({_id: thing}).serialNo
      , description: booking.description + ' - ' + Humans.findOne({_id: booking.human}).givenName
      , fromUnixTime: new Date(booking.timeRange.from).getTime()
      , toUnixTime: new Date(booking.timeRange.to).getTime()
      , color: booking.color
      })
    })
  })
  return returnVal
}

Template.pageTimesheet.created = function () {
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
}

Template.pageTimesheet.helpers({
  getFormatedBookings: getFormatedBookings
, formatedBookingsDep: function () {
    return _formatedBookingsDep
  }
})