if(Objects.find({}).count() < 1) {
  Objects.insert({
    name: 'JVC Camera'
  , objectType: 'Camera'
  , serialNo: 'XYS9448'
  })
  Objects.insert({
    name: 'Panasonic Camera'
  , objectType: 'Camera'
  , serialNo: 'XYS9448'
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
}