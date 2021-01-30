const moment = require("moment")

const date = (days = 0) => {
  moment.locale('es');
  return moment().add(days, 'days').format('LLL');
}

module.exports = {
  date,
}
