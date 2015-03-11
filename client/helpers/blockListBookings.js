Template.blockListBookings.helpers({
  formatDate: function (dateObject) {
    return dateObject.getHours() + ':' + dateObject.getMinutes() + ' – ' + dateObject.getDate() + '.' + dateObject.getMonth() + ' ' + dateObject.getFullYear()
  }
, getHumansName: function (humanId) {
    var human = {}
    if(human = Humans.findOne({_id: humanId})) {
      return human.name
    } else {
      return humanId
    }
  }
})