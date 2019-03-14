import moment from 'moment'
import 'moment/locale/de'

export default {
  //from timestamp
  ddmmmyy: function (timestamp) {
    return moment.unix(timestamp).locale("de").format("DD. MMM YY")
  },
  ddmmyy: function (timestamp) {
    return moment.unix(timestamp).locale("de").format('DD.MM.YY')
  },
  ddmmyyyy: function (timestamp) {
    return moment.unix(timestamp).locale("de").format('DD.MM.YYYY')
  },
  iso8601: function (timestamp) {
    return moment.unix(timestamp).format()
  },
  fromnow: function (timestamp) {
    return moment(timestamp, 'X').locale("de").startOf('day').fromNow()
      .replace('vor', '')
      .replace(' Jahren', 'J').replace(' Jahr', 'J').replace('einem', '1')
      .replace(' Monaten', 'M').replace(' Monat', 'M').replace('einem', '1')
      .replace(' Wochen', 'W').replace(' Woche', 'W').replace('einem', '1')
      .replace(' Tagen', 'T').replace(' Tag', 'T').replace('einem', '1')
      .replace(' Stunden', 'S').replace(' Stunde', 'S').replace('einer', '1')
      .replace(' Minuten', 'M').replace(' Minute', 'M').replace('einer', '1')
  },

  //from date
  timestamp: function (date) {
    return moment(date).locale("de").format('X')
  },
}
