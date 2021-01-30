const jsonToMessage = (json) => {
  let message = JSON.stringify(json);
  message = message.replace(/[{}]/g, '')
  message = message.replace(/,/g, '\n')
  message = message.replace(/":"/g, ' : ')
  message = message.replace(/":/g, ' : ')
  message = message.replace(/"\n/g, '\n')
  message = message.replace(/"/g, '> ')
  return message
}

module.exports = {
  jsonToMessage,
}
