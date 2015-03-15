Router.route('/', {
  name: 'timesheet'
, waitOn: function () {
    return [
      Meteor.subscribe('allObjects'),
      Meteor.subscribe('allCurrentBookings'),
      Meteor.subscribe('allUsers'),
      Meteor.subscribe('allHumans'),
      Meteor.subscribe('allPictures')
    ]
  }
, template: 'pageTimesheet'
, data: {
    objects: Objects.find()
  , bookings: Bookings.find()
  , humans: Humans.find()
  , pictures: Pictures.find()
  }
})