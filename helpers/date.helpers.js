const moment = require("moment")

const date = (days = 0, format = 'LLL') => {
  moment.locale('es');
  return moment().add(days, 'days').format(format);
}

module.exports = {
  date,
}
