const moment = require("moment")

const date = () => {
  moment.locale('es');
  return moment().format('LLL');
}

module.exports = {
  date,
}
