graphicTimesheet = {
  config: {
    minTime: new Date().getTime()
  , maxTime: (new Date().getTime() + 500000000)
  }
, rows: {}
, init: function (elementSelector, items) {
    var self = this
    self.element = document.querySelector(elementSelector)
    if(!self.element) return false
    self.conversionRate = 0.00001
    self.element.querySelector('.graphicTimesheet__header').style.width = Math.round(self.conversionRate * (self.config.maxTime - self.config.minTime)) + 'px'
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
    return element
  }
, addItem: function (item, row) {
    var self = this
  , newItem = self.itemTemplate(item.description)
  , timeDiff = item.toUnixTime - item.fromUnixTime
    newItem.style.width = timeDiff * self.conversionRate + 'px'
    newItem.style.left = (item.fromUnixTime - self.config.minTime) * self.conversionRate + 'px'
    newItem.style.backgroundColor = item.color
    self.addToRow(newItem, row)
  }
, addToRow: function (node, row) {
    var self = this
    if(!self.rows[row.id]) {
      self.addRow(row)
    }
    self.rows[row.id].appendChild(node)
  }
, addRow: function (row) {
    var self = this
    row.label = row.label || row.id
    self.rows[row.id] = self.rowTemplate(row.id, row.label, row.color)
    self.element.appendChild(self.rows[row.id])
    self.rows[row.id].style.width = Math.round(self.conversionRate * (self.config.maxTime - self.config.minTime)) + 'px'
  }
, rowify: function (items) {
    var self = this
    _.each(items, function (item) {
      self.addItem({
        fromUnixTime: item.fromUnixTime
      , toUnixTime: item.toUnixTime
      , description: item.description
      , color: item.color
      }, {
        id: item.rowId
      , label: item.rowLabel
      })
    })
  }
}

Template.graphicTimesheet.rendered = function () {
  var self = this
  graphicTimesheet.init('.graphicTimesheet', self.data.items)
}