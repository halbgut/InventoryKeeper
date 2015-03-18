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
    self.titleWrapper = self.element.querySelector('.graphicTimesheet__titles')
    self.rowContainer = self.element.querySelector('.graphicTimesheet__rowContainer')
    self.element.querySelector('.graphicTimesheet__header').style.width = self.conversionRate * (self.config.maxTime - self.config.minTime) + 'px'
    self.element.querySelector('.graphicTimesheet__time--from').innerHTML = new Date(self.config.minTime)
    self.element.querySelector('.graphicTimesheet__time--to').innerHTML = new Date(self.config.maxTime)
    self.addEventListeners()
    self.createTimeRuler()
    Tracker.autorun(function (comp) {
      self.invalidateComp = function () {
        comp.invalidate()
      }
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
        , imageURL: item.rowImageURL ? item.rowImageURL : false
        })
      })
    })
  }
, addEventListeners: function () {
    var self = this
    self.element.querySelector('.graphicTimesheet__zoom--in').addEventListener('click', function () {
      self.zoom(0.000001)
    })
    self.element.querySelector('.graphicTimesheet__zoom--out').addEventListener('click', function () {
      self.zoom(-0.000001)
    })
  }
, clearRows: function () {
    var self = this
    self.titleWrapper.innerHTML = ''
    _.each(self.rows, function (item, key) {
      self.rowContainer.removeChild(item)
    })
    self.rows = {}
  }
, rowTemplate: function (rowId, rowName, rowImageURL) {
    var self = this
  , element = document.createElement('div')
  , titleElement = document.createElement('h3')
  , imageElement = document.createElement('img')
    titleElement.innerHTML = rowName
    self.titleWrapper.appendChild(titleElement)
    titleElement.className = 'graphicTimesheet__rowTitle'
    element.className = 'graphicTimesheet__row'
    element.id = 'graphicTimesheet__row--' + rowId
    element.style.width = self.conversionRate * (self.config.maxTime - self.config.minTime) + 'px'
    if(rowImageURL) {
      titleElement.className += ' graphicTimesheet__rowTitle--hasImage'
      imageElement.className = 'graphicTimesheet__rowImage'
      imageElement.src = rowImageURL
      titleElement.appendChild(imageElement)
    }
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
    self.rows[row.id] = self.rowTemplate(row.id, row.label, row.imageURL)
    self.rowContainer.appendChild(self.rows[row.id])
  }
, createTimeRuler: function () {
    var self = this
  , hoursInRange = self.convertUnixToHours(self.config.maxTime - self.config.minTime)
  , rowWidth = self.conversionRate * (self.config.maxTime - self.config.minTime)
  , daysElement = document.getElementById('graphicTimesheet__row--days')
  , hoursElement = document.getElementById('graphicTimesheet__row--hours')

    daysElement ? self.rowContainer.removeChild(daysElement) : ''
    hoursElement ? self.rowContainer.removeChild(hoursElement) : ''
    dayRow = self.rowTemplate('days', '')
    dayRow.appendChild(self.createDayRuler(hoursInRange / 24))
    hourRow = self.rowTemplate('hours', '')
    hourRow.appendChild(self.createHourRuler(hoursInRange))
    self.rowContainer.insertBefore(hourRow, self.rowContainer.children[1])
    self.rowContainer.insertBefore(dayRow, self.rowContainer.children[1])
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
  , label = document.createElement('text')
    hour.className = 'graphicTimesheet__marker graphicTimesheet__marker--hour'
    hour.style.width = hourWidth
    hour.innerHTML = '&nbsp;'
    label.innerHTML = date.getHours()
    label.className = 'graphicTimesheet__markerText graphicTimesheet__markerText--hour'
    hour.appendChild(label)
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
  , label = document.createElement('text')
    day.className = 'graphicTimesheet__marker graphicTimesheet__marker--day'
    day.style.width = dayWidth
    day.innerHTML = '&nbsp;'
    label.innerHTML = date.getDate()
    label.className = 'graphicTimesheet__markerText graphicTimesheet__markerText--day'
    day.appendChild(label)
    return day
  }
, zoom: function (by) {
    var self = this
    self.conversionRate += by
    self.createTimeRuler()
    self.invalidateComp()
  }
}