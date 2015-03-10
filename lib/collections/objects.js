Objects = new Mongo.Collection('Objects')
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

Objects.attachSchema(Schema.Objects)