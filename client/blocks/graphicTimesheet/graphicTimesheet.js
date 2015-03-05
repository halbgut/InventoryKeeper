graphicTimesheet = {
  config: {
    minTime: new Date()
  , maxTime: (new Date().getTime() + 50000)
  }
, rows: {}
, init: function (elementSelector) {
    var self = this
    self.element = document.querySelector(elementSelector)
    if(!self.element) return false
    self.conversionRate = 0.00001
    self.element.style.width = self.config.maxTime - self.config.minTime * self.conversionRate + 'px'
  }
, rowTemplate: function (title) {
    var element = document.createEelment('div')
  , titleElement = document.createElement('h3')
    titleElement.innerHTML = title
    element.appendChild(titleElement)
    titleElement.className = 'graphicTimesheet__rowTitle'
    element.className = 'graphicTimesheet__row'
    return element
  }
, itemTemplate: function (description) {
    var element = document.createEelment('div')
  , descriptionElement = document.createEelment('p')
    descriptionElement.innerHTML = description
    descriptionElement.className = 'graphicTimesheet__rowDescription'
    element.className = 'graphicTimesheet__item'
    return element
  }
, addItem: function (fromUnixTime, toUnixTime, rowName) {
    var self = this
  , newItem = self.itemTemplate(description)
  , timeDiff = toUnixTime - fromUnixTime
    newItem.style.width = timeDiff * self.conversionRate
    newItem.style.left = fromUnixTime * self.conversionRate
    self.addToRow(newItem, rowName)
  }
, addToRow: function (node, rowName) {
    var self = this
    if(!self.rows[rowName]) {
      self.rows[rowName] = self.rowTemplate(rowName)
      self.element.appendChild(self.rows[rowName])
    }
    self.rows[rowName].appendChild(node)
  }
}