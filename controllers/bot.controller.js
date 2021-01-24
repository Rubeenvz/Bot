const user_services = require("../services/user.services")

const start = async (ctx) => {
  ctx.reply('Start')
  const user = console.log(ctx.from)
  let response = await user_services.signUp()
  console.log(response)
}

const help = (ctx) => {
  ctx.reply('Help')
}

const command = (ctx) => {
  ctx.reply('Command')
}

module.exports = {
  start,
  help,
  command
}