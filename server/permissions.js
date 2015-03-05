Objects.allow({
  insert: function () {
    return !!Meteor.user()
  }
, update: function () {
    return !!Meteor.user()
  }
})