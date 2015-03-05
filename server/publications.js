Meteor.publish('allObjects', function () {
  return Objects.find({})
})