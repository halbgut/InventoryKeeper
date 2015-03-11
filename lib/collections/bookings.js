Bookings = new Mongo.Collection('Bookings')

var schemaBookings = new SimpleSchema({
  human: {
    type: String
  , label: 'Human'
  , custom: function () {
      if(!Humans.findOne({_id: this.value})) return 'invalidID'
      return true
    }
  , allowedValues: function () {
      var allHumanIdsArray = []
      Humans.find().forEach(function (human) {
        allHumanIdsArray.push(human._id)
      })
      return allHumanIdsArray
    }
  , autoform: {
      options: function () {
        var allHumansOptionsDict = {}
        Humans.find().forEach(function (human) {
          allHumansOptionsDict[human._id] = human.name
        })
        return allHumansOptionsDict
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
  , custom: function () {
      var self = this
      if(self.field('timeRange.from').value.getTime() >= self.value.getTime()) return 'valueToLow'
    }
  }
, objects: {
    type: Array
  , allowedValues: function () {
      var returnArr = []
      Objects.find().forEach(function (object) {
        returnArr.push(object._id)
      })
      return returnArr
    }
  , autoform: {
      options: function () {
        var returnDict = {}
        Objects.find().forEach(function (object) {
          returnDict[object._id] = object.name
        });
        return returnDict
      }
    }
  }
, 'objects.$': {
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
      return 'hsl(' + Math.round(Math.random() * 360) + ', 50%, 70%)'
    }
  }
})

schemaBookings.messages({
  invalidID: 'Invalid ID in [label]'
, valueToLow: 'Please choose a higher value for [label]'
})

Bookings.attachSchema(schemaBookings)