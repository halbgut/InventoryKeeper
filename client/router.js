Router.route('/', {
  name: 'timesheet'
, waitOn: function () {
    return Meteor.subscribe('allObjects')
  }
, action: function () {}
})