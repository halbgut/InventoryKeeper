Template.blockListBookings.helpers({
  formatDate: function (dateObject) {
    return dateObject.getHours() + ':' + dateObject.getMinutes() + ' – ' + dateObject.getDate() + '.' + dateObject.getMonth() + ' ' + dateObject.getFullYear()
  }
, getUsername: function (userId) {
    var user = {}
    if(user = Meteor.users.findOne({_id: userId})) {
      return user.username
    } else {
      return userId
    }
  }
})