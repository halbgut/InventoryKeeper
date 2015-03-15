Objects = new Mongo.Collection('Objects')

Objects.attachSchema(new SimpleSchema({
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
, picture: {
    type: String
  , label: 'Picture'
  , optional: true
  , autoform: {
      afFieldInput: {
        type: 'fileUpload'
      , collection: 'Pictures'
      }
    }
  }
}))