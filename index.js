const dotEnv = require("dotenv").config()
const telegraf = require("telegraf")

let bot_controllers = require("./controllers/bot.controller")

var db_connection = require("./db.connection")

db_connection.connect
.then(() => console.log("Database connection is successful"))
.catch(() => console.log("Error establishing a database connection "))

const bot = new telegraf.Telegraf(process.env.BOT_TOKEN)

bot.start(bot_controllers.start)

bot.command("getUsers", bot_controllers.getUsers)

bot.command("signUp", bot_controllers.signUp)

bot.command("viewLevels", bot_controllers.viewLevels)

bot.command("level", bot_controllers.level)

bot.command("levelUp", bot_controllers.levelUp)

bot.command("quit", bot_controllers.quit)

bot.command("acceptUser", bot_controllers.acceptUser)

bot.command("newPaymentDate", bot_controllers.newPaymentDate)

bot.help(bot_controllers.help)

bot.launch()

console.log("Bot is running")