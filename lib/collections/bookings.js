Bookings = new Mongo.Collection('Bookings')
Schema.Bookings = new SimpleSchema({
  user: {
    type: String
  , autoValue: function () {
      return this.field('user').isSet ? this.field('user').value : Meteor.userId()
    }
  , label: 'User'
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
    type: Number
  , label: 'From'
  }
, 'timeRange.to': {
    type: Number
  , label: 'To'
  }
})

Bookings.attachSchema(Schema.Bookings)