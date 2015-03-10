Meteor.publish('allObjects', function () {
  return Objects.find()
})

Meteor.publish('allBookings', function () {
  return Bookings.find()
})

Meteor.publish('allUsers', function () {
  return Meteor.users.find()
})