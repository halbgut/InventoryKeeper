Meteor.publish('allObjects', function () {
  return Objects.find()
})

Meteor.publish('allCurrentBookings', function () {
  var currentDate = new Date()
  return Bookings.find({
    'timeRange.to': {$gt: currentDate}
  })
})

Meteor.publish('allUsers', function () {
  return Meteor.users.find()
})