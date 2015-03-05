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
    type: String
  , label: 'From'
  }
, 'timeRange.to': {
    type: String
  , label: 'To'
  }
, subjects: {
    type: [String]
  , label: 'Things'
  }
})

Bookings.attachSchema(Schema.Bookings)