Template.pageTimesheet.helpers({
  getFormatedBookings: function () {
    return _.map(Bookings.find({}).fetch(), function (booking) {
      return {
        id: booking._id
      , description: booking.description
      , fromUnixTime: new Date(booking.timeRange.from).getTime()
      , toUnixTime: new Date(booking.timeRange.to).getTime()
      }
    })
  }
})