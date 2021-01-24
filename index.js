const dotEnv = require("dotenv").config();
const telegraf = require('telegraf')

let bot_controllers = require("./controllers/bot.controller");

const bot = new telegraf.Telegraf(process.env.BOT_TOKEN)

bot.start(bot_controllers.start)

bot.help(bot_controllers.help)

bot.command('command', bot_controllers.command)

bot.launch()

console.log('Bot is running')