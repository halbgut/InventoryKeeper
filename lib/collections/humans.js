Humans = new Mongo.Collection('Humans')

Humans.attachSchema(new SimpleSchema({
  name: {
    type: String
  , label: 'Name'
  }
}))