Template.pageTimesheet.helpers({
  getFormatedBookings: function () {
    var returnVal = []
    _.each(Bookings.find({}).fetch(), function (booking) {
      _.each(booking.subjects, function (thing) {
        returnVal.push({
          id: thing
        , label: Objects.findOne({_id: thing}).serialNo
        , description: booking.description
        , fromUnixTime: new Date(booking.timeRange.from).getTime()
        , toUnixTime: new Date(booking.timeRange.to).getTime()
        })
      })
    })
    return returnVal
  }
})