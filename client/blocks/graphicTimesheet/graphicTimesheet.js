graphicTimesheet = {
  config: {
    minTime: new Date().getTime()
  , maxTime: (new Date().getTime() + 50000)
  }
, rows: {}
, init: function (elementSelector, items) {
    var self = this
    self.element = document.querySelector(elementSelector)
    if(!self.element) return false
    self.conversionRate = 0.00001
    self.querySelector('.graphicTimesheet__row').style.width = (self.conversionRate * self.config.maxTime) + 'px'
    self.element.querySelector('.graphicTimesheet__time--from').innerHTML = new Date(self.config.minTime)
    self.element.querySelector('.graphicTimesheet__time--to').innerHTML = new Date(self.config.maxTime)
    self.rowify(items)
  }
, rowTemplate: function (rowId, rowName) {
    var element = document.createElement('div')
  , titleElement = document.createElement('h3')
    titleElement.innerHTML = rowName
    element.appendChild(titleElement)
    titleElement.className = 'graphicTimesheet__rowTitle'
    element.className = 'graphicTimesheet__row'
    element.id = 'graphicTimesheet__row--' + rowId
    return element
  }
, itemTemplate: function (description) {
    var element = document.createElement('div')
  , descriptionElement = document.createElement('p')
    descriptionElement.innerHTML = description
    descriptionElement.className = 'graphicTimesheet__rowDescription'
    element.className = 'graphicTimesheet__item'
    element.style.background = 'hsl(' + Math.round(Math.random() * 360) + ', 40%, 70%)'
    return element
  }
, addItem: function (fromUnixTime, toUnixTime, rowId, description, rowLabel) {
    var self = this
  , newItem = self.itemTemplate(description)
  , timeDiff = toUnixTime - fromUnixTime
    newItem.style.width = timeDiff * self.conversionRate + 'px'
    newItem.style.left = (fromUnixTime - self.config.minTime) * self.conversionRate + 'px'
    self.addToRow(newItem, rowId, rowLabel)
  }
, addToRow: function (node, rowId, rowLabel) {
    var self = this
    if(!self.rows[rowId]) {
      self.addRow(rowId, rowLabel)
    }
    self.rows[rowId].appendChild(node)
  }
, addRow: function (rowId, rowName) {
    var self = this
    rowName = rowName || rowId
    self.rows[rowId] = self.rowTemplate(rowId, rowName)
    self.element.appendChild(self.rows[rowId])
  }
, rowify: function (items) {
    var self = this
    _.each(items, function (item) {
      self.addItem(item.fromUnixTime, item.toUnixTime, item.id, item.description, item.label)
    })
  }
}

Template.graphicTimesheet.rendered = function () {
  var self = this
  graphicTimesheet.init('.graphicTimesheet', self.data.items)
}