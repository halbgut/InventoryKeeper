Objects.allow({
  insert: function () {
    return !!Meteor.user()
  }
, update: function () {
    return !!Meteor.user()
  }
})

Bookings.allow({
  insert: function () {
    return !!Meteor.user()
  }
, update: function () {
    return !!Meteor.user()
  }
})

Humans.allow({
  insert: function () {
    return !!Meteor.user()
  }
, update: function () {
    return !!Meteor.user()
  }
})