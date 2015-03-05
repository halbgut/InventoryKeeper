Router.route('/', {
  name: 'timesheet'
, waitOn: function () {
    return Meteor.subscribe('allObjects')
  }
, action: function () {
    var self = this
    self.render('pageTimesheet')
  }
, data: {
    objects: Objects.find()
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
    // self.render('blockObjectsNew')
  }
})

Router.route('/login', {
  name: 'user.login'
, action: function () {
    var self = this
    self.render('blockLogin')
  }
})
