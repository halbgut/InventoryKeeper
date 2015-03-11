Template.blockListBookings.helpers({
  formatDate: function (dateObject) {
    return dateObject.getHours() + ':' + dateObject.getMinutes() + ' – ' + dateObject.getDate() + '.' + dateObject.getMonth() + ' ' + dateObject.getFullYear()
  }
, getUsername: function (userId) {
    return Meteor.users.findOne({_id: userId}).username
  }
})