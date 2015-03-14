Objects.allow({
  insert: function (userId) {
    return !!userId
  }
, update: function (userId) {
    return !!userId
  }
})

Bookings.allow({
  insert: function (userId) {
    return !!userId
  }
, update: function (userId) {
    return !!userId
  }
})

Humans.allow({
  insert: function (userId) {
    return !!userId
  }
, update: function (userId) {
    return !!userId
  }
})

Pictures.allow({
  insert: function (userId) {
    return !!userId
  }
, update: function(userId) {
    return !!userId
  }
, download: function () {
    return true
  }
})