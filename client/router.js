Router.route('/', {
  name: 'timesheet'
, waitOn: function () {
    return [Meteor.subscribe('allObjects'), Meteor.subscribe('allCurrentBookings'), Meteor.subscribe('allUsers'), Meteor.subscribe('allHumans')]
  }
, template: 'pageTimesheet'
, data: {
    objects: Objects.find()
  , bookings: Bookings.find()
  , humans: Humans.find()
  }
})

Router.route('/objects/:_id/update', {
  name: 'objectsUpdate'
, waitOn: function () {
    return Meteor.subscribe('allObjects')
  }
, onBeforeAction: function () {
    var self = this
    if(!Meteor.userId()) {
      self.render('blockNotAllowed')
    } else {
      self.next()
    }
  }
, template: 'objectsUpdate'
, data: function () {
    return Objects.findOne({_id: this.params._id})
  }
})

Router.route('/bookings/:_id/update', {
  name: 'bookingsUpdate'
, waitOn: function () {
    return Meteor.subscribe('allCurrentBookings')
  }
, onBeforeAction: function () {
    var self = this
    if(!Meteor.userId()) {
      self.render('blockNotAllowed')
    } else {
      self.next()
    }
  }
, template: 'bookingsUpdate'
, data: function () {
    return Bookings.findOne({_id: this.params._id})
  }
})
