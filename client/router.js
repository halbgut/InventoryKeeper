Router.route('/', {
  name: 'timesheet'
, waitOn: function () {
    return [Meteor.subscribe('allObjects'), Meteor.subscribe('allBookings')]
  }
, action: function () {
    var self = this
    self.render('pageTimesheet')
  }
, data: {
    objects: Objects.find()
  , bookings: Bookings.find()
  }
})

Router.route('/objects/new', {
  name: 'objects.new'
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
    self.render('blockObjectsNew')
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

Router.route('/bookings/new', {
  name: 'bookings.new'
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
    self.render('blockBookingsNew')
  }
})

Router.route('/bookings/:_id/update', {
  name: 'bookings.update'
, waitOn: function () {
    return Meteor.subscribe('allBookings')
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

Router.route('/login', {
  name: 'user.login'
, action: function () {
    var self = this
    self.render('blockLogin')
  }
})
