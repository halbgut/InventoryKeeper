Router.route('/', {
  name: 'timesheet'
, waitOn: function () {
    return [Meteor.subscribe('allObjects'), Meteor.subscribe('allCurrentBookings'), Meteor.subscribe('allUsers'), Meteor.subscribe('allHumans')]
  }
, action: function () {
    var self = this
    self.render('pageTimesheet')
  }
, data: {
    objects: Objects.find()
  , bookings: Bookings.find()
  , humans: Humans.find()
  }
})

Router.route('/objects/:_id/update', {
  name: 'objects.update'
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
, action: function () {
    var self = this
    self.render('blockObjectsUpdate', {data: {
          doc: Objects.findOne({_id: this.params._id})
        }})
  }
})

Router.route('/bookings/:_id/update', {
  name: 'bookings.update'
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
, action: function () {
    var self = this
    self.render('blockBookingsUpdate', {data: {
      doc: Bookings.findOne({_id: this.params._id})
    }})
  }
})
