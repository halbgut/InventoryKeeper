Meteor.publish('allObjects', function () {
  return Objects.find()
})

Meteor.publish('allBookings', function () {
  return Bookings.find()
})