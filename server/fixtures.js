if(Objects.find({}).count() < 1) {
  Objects.insert({
    name: 'JVC Camera'
  , objectType: 'Camera'
  , serialNo: 'XYS9448'
  })
  Objects.insert({
    name: 'Panasonic Camera'
  , objectType: 'Camera'
  , serialNo: 'XZS9480'
  })
  Objects.insert({
    name: 'Rode Mic'
  , objectType: 'Mic'
  , serialNo: '2391DSG'
  })

  Accounts.createUser({
    username: 'superman'
  , password: 'megasicher'
  })

  Bookings.insert({
    user: Meteor.users.findOne({})._id
  , description: 'Engadiner Ski Marathon'
  , timeRange: {
      from: currentTimeStamp + 10000
    , to: currentTimeStamp + 30000
    }
  , subjects: [
      Objects.findOne({serialNo: 'XYS9448'})._id
    ]
  })
  Bookings.insert({
    user: Meteor.users.findOne({})._id
  , description: 'Some Event'
  , timeRange: {
      from: currentTimeStamp + 40000
    , to: currentTimeStamp + 60000
    }
  , subjects: [
      Objects.findOne({serialNo: 'XZS9480'})._id
    , Objects.findOne({serialNo: 'XYS9448'})._id
    ]
  })
  Bookings.insert({
    user: Meteor.users.findOne({})._id
  , description: 'Another Event'
  , timeRange: {
      from: currentTimeStamp + 15000
    , to: currentTimeStamp + 30000
    }
  , subjects: [
      Objects.findOne({serialNo: '2391DSG'})._id
    , Objects.findOne({serialNo: 'XYS9448'})._id
    ]
  })
}