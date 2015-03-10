Bookings = new Mongo.Collection('Bookings')

Schema.Bookings = new SimpleSchema({
  user: {
    type: String
  , autoValue: function () {
      return this.field('user').isSet ? this.field('user').value : Meteor.userId()
    }
  , label: 'User'
  , optional: true
  , custom: function () {
      if(!Meteor.users.findOne({_id: this.value})) return 'invalidID'
      return true
    }
  , allowedValues: function () {
      var allUserIdsArray = []
      Meteor.users.find().forEach(function (user) {
        allUserIdsArray.push(user._id)
      })
      return allUserIdsArray
    }
  , autoform: {
      options: function () {
        var allUsersOptionsDict = {}
        Meteor.users.find().forEach(function (user) {
          allUsersOptionsDict[user._id] = user.username
        })
        return allUsersOptionsDict
      }
    }
  }
, description: {
    type: String
  , label: 'Description'
  }
, timeRange: {
    type: Object
  , label: 'Time Range'
  }
, 'timeRange.from': {
    type: Date
  , label: 'From'
  }
, 'timeRange.to': {
    type: Date
  , label: 'To'
  }
, subjects: {
    type: Array
  , label: 'Things'
  }
, 'subjects.$': {
    type: String
  , custom: function () {
      if(!Objects.findOne({_id: this.value})) return 'invalidID'
      return true
    }
  }
, color: {
    type: String
  , label: 'Color'
  , optional: true
  , autoValue: function () {
      return 'hsla(' + Math.round(Math.random() * 360) + ', 50%, 70%, .6)'
    }
  }
})

Schema.Bookings.messages({
  invalidID: 'Invalid ID'
})

Bookings.attachSchema(Schema.Bookings)