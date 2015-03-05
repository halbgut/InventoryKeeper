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