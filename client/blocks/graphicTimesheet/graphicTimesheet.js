graphicTimesheet = {
  config: {
    minTime: new Date().getTime()
  , maxTime: (new Date().getTime() + 500000000)
  }
, rows: {}
, getItems: function () {
    return this.items
  }
, init: function (elementSelector, items) {
    var self = this
    self.element = document.querySelector(elementSelector)
    if(!self.element) return false
    self.conversionRate = 0.000003
    self.items = items
    self.element.querySelector('.graphicTimesheet__header').style.width = self.conversionRate * (self.config.maxTime - self.config.minTime) + 'px'
    self.element.querySelector('.graphicTimesheet__time--from').innerHTML = new Date(self.config.minTime)
    self.element.querySelector('.graphicTimesheet__time--to').innerHTML = new Date(self.config.maxTime)
    self.createTimeRuler()
    Tracker.autorun(function () {
      self.items = self.getItems()
      self.clearRows()
      _.each(self.items, function (item) {
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
    })
  }
, clearRows: function () {
    var self = this
    _.each(self.rows, function (item, key) {
      self.element.removeChild(item)
    })
    self.rows = {}
  }
, rowTemplate: function (rowId, rowName) {
    var self = this
  , element = document.createElement('div')
  , titleElement = document.createElement('h3')
    titleElement.innerHTML = rowName
    element.appendChild(titleElement)
    titleElement.className = 'graphicTimesheet__rowTitle'
    element.className = 'graphicTimesheet__row'
    element.id = 'graphicTimesheet__row--' + rowId
    element.style.width = self.conversionRate * (self.config.maxTime - self.config.minTime) + 'px'
    return element
  }
, itemTemplate: function (description) {
    var element = document.createElement('div')
  , descriptionElement = document.createElement('p')
    descriptionElement.innerHTML = description
    element.appendChild(descriptionElement)
    descriptionElement.className = 'graphicTimesheet__itemDescription'
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
  }
, createTimeRuler: function () {
    var self = this
  , hoursInRange = self.convertUnixToHours(self.config.maxTime - self.config.minTime)
  , rowWidth = self.conversionRate * (self.config.maxTime - self.config.minTime)

    dayRow = self.rowTemplate('days', '')
    dayRow.appendChild(self.createDayRuler(hoursInRange / 24))
    self.element.appendChild(dayRow)
    hourRow = self.rowTemplate('hours', '')
    hourRow.appendChild(self.createHourRuler(hoursInRange))
    self.element.appendChild(hourRow)
  }
, calcCurrHourDiff: function () {
    var self = this
  , currentHours = self.config.minTime / 3600000
  , diff = (Math.floor(currentHours) * 3600000 - currentHours * 3600000 + new Date().getTimezoneOffset() * 60000) * self.conversionRate
    return diff
  }
, calcCurrDayDiff: function () {
    var self = this
  , currentDays = self.config.minTime / 86400000
  , diff = (Math.floor(currentDays) * 86400000 - currentDays * 86400000 + new Date().getTimezoneOffset() * 60000) * self.conversionRate
    return diff
  }
, convertUnixToHours: function (unixTime) {
    return unixTime / 1000 / 60 / 60
  }
, createHourRuler: function (number) {
    var self = this
  , hourWidth = (3600000 * self.conversionRate) + 'px'
  , hourRuler = document.createElement('div')
    hourRuler.className = 'graphicTimesheet__ruler graphicTimesheet__ruler--hour'
    hourRuler.style.marginLeft = (self.calcCurrHourDiff()) + 'px'
    for (var i = 0; i < number; i++) {
      hourRuler.appendChild(self.createHourElement(hourWidth, new Date(i * 3600000 + self.config.minTime)))
    }
    return hourRuler
  }
, createHourElement: function (hourWidth, date) {
    var self = this
  , hour = document.createElement('div')
    hour.className = 'graphicTimesheet__marker graphicTimesheet____marker--hour'
    hour.style.width = hourWidth
    hour.innerHTML = date.getHours()
    return hour
  }
, createDayRuler: function (number) {
    var self = this
  , dayWidth = (86400000 * self.conversionRate) + 'px'
  , dayRuler = document.createElement('div')
    dayRuler.className = 'graphicTimesheet__ruler graphicTimesheet__ruler--day'
    dayRuler.style.marginLeft = (self.calcCurrDayDiff()) + 'px'
    for (var i = 0; i < number; i++) {
      dayRuler.appendChild(self.createDayElement(dayWidth, new Date(i * 86400000 + self.config.minTime)))
    }
    return dayRuler
  }
, createDayElement: function (dayWidth, date) {
    var self = this
  , day = document.createElement('div')
    day.className = 'graphicTimesheet__marker graphicTimesheet____marker--day'
    day.style.width = dayWidth
    day.innerHTML = date.getDate()
    return day
  }
}