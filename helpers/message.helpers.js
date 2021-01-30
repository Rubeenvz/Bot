const jsonToMessage = (json) => {
  let message = JSON.stringify(json);
  message = message.replace(/[{}]/g, '')
  message = message.replace(/,/g, '\n')
  return message
}

module.exports = {
  jsonToMessage,
}
