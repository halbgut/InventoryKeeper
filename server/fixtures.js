if(Objects.find({}).count() < 1) {

  Humans.insert({
    name: 'superman'
  })

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

  Objects.insert({
    name: 'Sony FS7 4K'
  , objectType: 'Camera'
  , serialNo: 'PXW-FS7'
  })

  Objects.insert({
    name: 'Luca Schmid'
  , objectType: 'Lehrling'
  , serialNo: '42'
  })

  Accounts.createUser({
    username: 'superman'
  , password: 'megasicher'
  })

  Bookings.insert({
    user: Humans.findOne({})._id
  , description: 'Engadiner Ski Marathon'
  , timeRange: {
      from: new Date(new Date().getTime() + 10000000)
    , to: new Date(new Date().getTime() + 30000000)
    }
  , objects: [
      Objects.findOne({serialNo: 'XYS9448'})._id
    ]
  })
  Bookings.insert({
    user: Humans.findOne({})._id
  , description: 'Some Event'
  , timeRange: {
      from: new Date(new Date().getTime() + 40000000)
    , to: new Date(new Date().getTime() + 60000000)
    }
  , objects: [
      Objects.findOne({serialNo: 'XZS9480'})._id
    , Objects.findOne({serialNo: 'XYS9448'})._id
    ]
  })
  Bookings.insert({
    user: Humans.findOne({})._id
  , description: 'Another Event'
  , timeRange: {
      from: new Date(new Date().getTime() + 15000000)
    , to: new Date(new Date().getTime() + 30000000)
    }
  , objects: [
      Objects.findOne({serialNo: '2391DSG'})._id
    , Objects.findOne({serialNo: 'XYS9448'})._id
    ]
  })
}