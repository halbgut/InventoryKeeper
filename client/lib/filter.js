// Filter is intendet to be a prototype for filters. It is totally reactive.
Filter = {
  // This should be defined before the object is used. It's the collection that should be queried
  collection: {}
  // The array of filtered items. Never use it to get or set Items. Use getItems instead to be reactive
, _items: []
  // The dep for items
, _itemsDep: new Tracker.Dependency
  // Filters are added to this object when newFilter is called
, subFilters: {}
  // The return values of all subFilters.generateSubFilter are concatinated into this object. It's later used as the actual query
, concatinatedFilter: {}
  // Always use this function to get the filter.items array
, getItems: function () {
    var self = this
    self._itemsDep.depend()
    return self._items
  }
  // this sets the items array and triggers the dep. It's not inteded for use outside this dictionary
, _setItems: function (newValue) {
    var self = this
    self._items = newValue
    self._itemsDep.changed()
  }
  // This regenerates the concatinatedFilter, reruns the query and runs filter._setItems
, updateItems: function () {
    var self = this
    self.concatinatedFilter = {}
    _.map(self.subFilters, function (subFilter) {
      if(subFilter.active) {
        _.extend(self.concatinatedFilter, subFilter.generateSubFilter())
      }
      return subFilter
    })
    self._setItems(self.queryItems(self.concatinatedFilter))
  }
  // Use this to add a filter newProps is a dictionary that will be concatinated with the filterTemplate read it for further information
, newSubFilter: function (subFilterName, newProps) {
    var self = this
    self.filterTemplate = {
      // this can be used to deactivate the whole filter
      active: true
      // All attributes used in the actual filter (filter.generateSubFilter) should be stored here
    , attributes: {
        // An example to show the pattern that should be used
        sampleAttribute: {
          // When setAttribute is called the typeof newValue is checked against this
          dataType: 'bool'
          // Never manipulate this value directly after initiating the subfilter. Always use setAttribute. That way the change propagetes and _items changes reactively
        , value: true
        }
      }
      // This is just an example and should be overwritten with newProps.generateSubFilter. The return value of this function should match [this](http://docs.meteor.com/#/full/selectors) pattern. [further reference](http://docs.mongodb.org/manual/reference/operator/query/)
    , generateSubFilter: function () {
        var that = this
        return {boolVal: that.attributes.sampleAttribute.value}
      }
    }
    self.subFilters[subFilterName] = _.extend(self.filterTemplate, newProps)
    // This should be called to set attributes (expl.: someFilter.subFilters.usage.setAttribute('sampleAttribute', true))
    self.subFilters[subFilterName].setAttribute = function (attribute, newValue) {
      var that = this
      // Check if the attribute matches the pattern
      if(that.attributes[attribute]
        && that.attributes[attribute].dataType) {
        // check if the datatype matches
        if(typeof newValue == that.attributes[attribute].dataType) {
          that.attributes[attribute].value = newValue
          // Update _items and trigger the dep
          self.updateItems()
        } else {
          console.log('data type should be ' + that.attributes[attribute].dataType + ', ' +  typeof newValue + ' was passed instead')
        }
      } else {
        console.log('Invalid attribute name: ' + attribute)
      }
    }
  }
  // This executes the query saved in concatinatedFilter. It can be used the get _items as an unreactive array
, queryItems: function () {
    var self = this
    return self.collection.find(self.concatinatedFilter).fetch()
  }
}