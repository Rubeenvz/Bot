const dotEnv = require("dotenv").config();
const telegraf = require('telegraf')

const bot = new telegraf.Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => {
	ctx.reply('Welcome')
})

bot.help((ctx) => {
	ctx.reply('Send me a sticker')
})

bot.launch()

console.log('Bot is running')