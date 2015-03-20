Router.route('/', {
  name: 'timesheet'
, template: 'pageTimesheet'
, data: {
    objects: Objects.find()
  , bookings: Bookings.find()
  , humans: Humans.find()
  , pictures: Pictures.find()
  }
})