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
      return !!Meteor.users.findOne({_id: this.value})
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
    type: [String]
  , label: 'Things'
  , custom: function () {
      return !!Objects.findOne({_id: this.value})
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

Bookings.attachSchema(Schema.Bookings)