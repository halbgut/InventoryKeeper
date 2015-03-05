Objects = new Mongo.Collection('Places')
Schema.Objects = new SimpleSchema({
  name: {
    type: String
  , label: 'Name'
  }
, objectType: {
    type: String
  , label: 'Type'
  }
, serialNo: {
    type: String
  , label: 'Serial No.'
  , optional: true
  }
})