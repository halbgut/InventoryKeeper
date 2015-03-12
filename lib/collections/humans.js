Humans = new Mongo.Collection('Humans')

Humans.attachSchema(new SimpleSchema({
  givenName: {
    type: String
  , label: 'Name'
  }
}))