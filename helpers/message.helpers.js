const USER_MODEL = require("../constants/models/user.model")

const jsonToMessage = (json) => {
  json = JSON.parse(JSON.stringify(json))
  let message = ''
  json.forEach(element => {
    Object.keys(element).forEach(key => {
      message += "> "+USER_MODEL[key]+" : "+element[key]+"\n"
    })
    message += "\n\n"
  });
  return message ? message : "jsonToMessage: No hay información."
}

module.exports = {
  jsonToMessage,
}
