Template.humansList.created = function () {
  bookingsFilter.newSubFilter('humans', {
    active: false
  , attributes: {
      humans: {
        dataType: 'object'
      , value: []
      }
    }
  , generateSubFilter: function () {
      var self = this
      return {human: {$in: self.attributes.humans.value}}
    }
  })
}

Template.humansList.helpers({
  getEditURL: function () {
    return '/humans/' + this._id + '/update'
  }
})

Template.humansList.events({
  'click input[type=checkbox]': function (e) {
    var self = this
  , newValue = []
  , oldValue = bookingsFilter.subFilters.humans.attributes.humans.value
    if(e.target.checked) {
      bookingsFilter.subFilters.humans.active = true
      newValue = _.union(self._id, oldValue)
    } else {
      oldValue.splice(oldValue.indexOf(self._id), 1)
      newValue = oldValue
      if(newValue.length == 0) {
        bookingsFilter.subFilters.humans.active = false
      }
    }
    bookingsFilter.subFilters.humans.setAttribute('humans', newValue)
  }
})