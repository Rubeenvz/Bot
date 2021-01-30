const SHOW_ERROR = process.env.SHOW_ERROR == "true" ? true : false
const ADMIN_ID = process.env.ADMIN_ID

const BOT_CONTROLLER = require("../constants/controllers/bot.controllers")
const ADMIN_MESSAGES = require("../constants/messages/admin.messages")
const USER_MESSAGES = require("../constants/messages/user.messages")
const user_services = require("../services/user.services")

const message_helpers = require("../helpers/message.helpers")

const start = async (ctx) => {
  await ctx.replyWithMarkdown(USER_MESSAGES.ID(ctx.from.id))
  let responseObj = {
    status: BOT_CONTROLLER.START.FAILED
  }
  try {
    let responseFromService = await user_services.getCurrentUser({chat_id: ctx.from.id})
    responseObj.data = responseFromService.data
    responseObj.status = BOT_CONTROLLER.START.SUCCESSFUL
  } catch (err) {
    console.log("Something went wrong with: bot.controller.start", (SHOW_ERROR ? err : ''))
    await ctx.reply(BOT_CONTROLLER.TRY_AGAIN)
  }
  if(responseObj.data.user == null) {
    await ctx.replyWithMarkdown(USER_MESSAGES.START.NOT_REGISTERED)
  }
  else {
    if(responseObj.data.user.is_available) {
      await ctx.reply(USER_MESSAGES.START.IS_AVAILABLE)
    }
    else {
      await ctx.reply(USER_MESSAGES.START.IS_REGISTERED)
    }      
  }
  await ctx.reply(USER_MESSAGES.HELP)
  await ctx.reply(USER_MESSAGES.GET_HELP)
  return responseObj
}

const signUp = async (ctx) => {
  await ctx.replyWithMarkdown(USER_MESSAGES.ID(ctx.from.id))
  let responseObj = {
    status: BOT_CONTROLLER.SIGN_UP.FAILED
  }
  if(!ctx.from.username) {
    await ctx.reply(USER_MESSAGES.SIGN_UP.NOT_USERNAME)
    return responseObj
  }
  let data = {
    chat_id: ctx.from.id,
    name: ctx.from.first_name,
    language_code: ctx.from.language_code,
    is_bot: ctx.from.is_bot,
    username: ctx.from.username
  }
  try {
    let responseFromService = await user_services.signUp(data)
    responseObj.data = responseFromService.data
    responseObj.status = BOT_CONTROLLER.SIGN_UP.SUCCESSFUL
  } catch (err) {
    console.log("Something went wrong with: bot.controller.signUp", (SHOW_ERROR ? err : ''))
    await ctx.reply(BOT_CONTROLLER.TRY_AGAIN)
  }
  if(!responseObj.data) {
    try {
      let responseFromService = await user_services.getCurrentUser({chat_id: ctx.from.id})
      if(responseFromService.data.user.is_available) {
          await ctx.reply(BOT_CONTROLLER.SIGN_UP.USER_ALREADY_REGISTERED.IS_AVAILABLE)
        }
      else {
        await ctx.reply(USER_MESSAGES.SIGN_UP.USER_ALREADY_REGISTERED.NOT_AVAILABLE)
      }
    } catch (err) {
      console.log("Something went wrong with: bot.controller.signUp", (SHOW_ERROR ? err : ''))
      await ctx.reply(USER_MESSAGES.TRY_AGAIN)
    }
    await ctx.reply(USER_MESSAGES.GET_HELP)
    return responseObj
  }
  if(responseObj.data.user != null) {
    await ctx.replyWithMarkdown(USER_MESSAGES.SIGN_UP.NOT_REGISTERED)
    await ctx.telegram.sendMessage(ADMIN_ID, ADMIN_MESSAGES.SIGN_UP.NEW_USER)
    await ctx.telegram.sendMessage(ADMIN_ID, message_helpers.jsonToMessage(responseObj.data.user))
  }
  else {
    if(responseObj.data.user.is_available) {
      await ctx.reply(USER_MESSAGES.START.IS_AVAILABLE)
    }
    else {
      await ctx.reply(USER_MESSAGES.START.IS_REGISTERED)
    } 
  }
  await ctx.reply(USER_MESSAGES.GET_HELP)
  return responseObj
}

const viewLevels = async (ctx) => {
  await ctx.replyWithMarkdown(USER_MESSAGES.ID(ctx.from.id))
  await ctx.reply(USER_MESSAGES.VIEW_LEVELS)
}

const level = async (ctx) => {
  await ctx.replyWithMarkdown(USER_MESSAGES.ID(ctx.from.id))
  let responseObj = {
    status: BOT_CONTROLLER.LEVEL.FAILED
  }
  try {
    let responseFromService = await user_services.getCurrentUser({chat_id: ctx.from.id})
    responseObj.data = responseFromService.data
    responseObj.status = BOT_CONTROLLER.LEVEL.SUCCESSFUL
  } catch (err) {
    console.log("Something went wrong with: bot.controller.level", (SHOW_ERROR ? err : ''))
    await ctx.reply(BOT_CONTROLLER.TRY_AGAIN)
  }
  if(responseObj.data.user == null) {
    await ctx.reply(USER_MESSAGES.LEVEL.NOT_REGISTERED)
  }
  else {
    if(responseObj.data.user.is_available) {
      await ctx.reply(USER_MESSAGES.LEVEL.USER_ALREADY_REGISTERED.IS_AVAILABLE(responseObj.data.user.level))
    }
    else {
      await ctx.reply(USER_MESSAGES.LEVEL.USER_ALREADY_REGISTERED.NOT_AVAILABLE)
    }
  }
  await ctx.reply(USER_MESSAGES.GET_HELP)
  return responseObj
}

const levelUp = async (ctx) => {
  await ctx.replyWithMarkdown(USER_MESSAGES.ID(ctx.from.id))
  let responseObj = {
    status: BOT_CONTROLLER.LEVEL_UP.FAILED
  }
  if(ctx.from.id == ADMIN_ID) {
    let user_id = ctx.message.text.split(' ')[1]
    let new_level = ctx.message.text.split(' ')[2]
    try {
      let responseFromService = await user_services.editUser({
        filter: {
          chat_id: user_id
        },
        data: {
          level: new_level
        }
      })
      responseObj.data = responseFromService.data
      responseObj.status = BOT_CONTROLLER.LEVEL_UP.SUCCESSFUL
    } catch (err) {
      console.log("Something went wrong with: bot.controller.levelUp", (SHOW_ERROR ? err : ''))
      await ctx.reply(BOT_CONTROLLER.TRY_AGAIN)
    }
    if(responseObj.data.user) {
      await ctx.telegram.sendMessage(ADMIN_ID, ADMIN_MESSAGES.LEVEL_UP.SUCCESSFUL(new_level))
      await ctx.telegram.sendMessage(user_id, USER_MESSAGES.LEVEL_UP.SUCCESSFUL(new_level))
    }
    else {
      await ctx.telegram.sendMessage(ADMIN_ID, ADMIN_MESSAGES.LEVEL_UP.FAILED)
    }
  }
  else {
    try {
      let responseFromService = await user_services.getCurrentUser({chat_id: ctx.from.id})
      responseObj.data = responseFromService.data
      responseObj.status = BOT_CONTROLLER.LEVEL_UP.SUCCESSFUL
    } catch (err) {
      console.log("Something went wrong with: bot.controller.level", (SHOW_ERROR ? err : ''))
      await ctx.reply(BOT_CONTROLLER.TRY_AGAIN)
    }
    if(responseObj.data.user == null) {
      await ctx.reply(USER_MESSAGES.LEVEL_UP.NOT_REGISTERED)
    }
    else {
      if(responseObj.data.user.is_available) {
        await ctx.reply(USER_MESSAGES.LEVEL_UP.USER_ALREADY_REGISTERED.IS_AVAILABLE(responseObj.data.user.level))
        await ctx.telegram.sendMessage(ADMIN_ID, ADMIN_MESSAGES.LEVEL_UP.USER_ALREADY_REGISTERED.IS_AVAILABLE({
          id: responseObj.data.user.chat_id,
          username: responseObj.data.user.username,
          level: responseObj.data.user.level,
        }))
      }
      else {
        await ctx.reply(USER_MESSAGES.LEVEL_UP.USER_ALREADY_REGISTERED.NOT_AVAILABLE)
      }
    }
  }
  await ctx.reply(USER_MESSAGES.GET_HELP)
  return responseObj
}

const quit = async (ctx) => {
  await ctx.replyWithMarkdown(USER_MESSAGES.ID(ctx.from.id))
  let responseObj = {
    status: BOT_CONTROLLER.QUIT.FAILED
  }
  try {
    let responseFromService = await user_services.editUser({
      filter: {
        chat_id: ctx.from.id
      },
      data: {
        is_available: false
      }
    })
    responseObj.data = responseFromService.data
    responseObj.status = BOT_CONTROLLER.QUIT.SUCCESSFUL
  } catch (err) {
    console.log("Something went wrong with: bot.controller.quit", (SHOW_ERROR ? err : ''))
    await ctx.reply(BOT_CONTROLLER.TRY_AGAIN)
  }
  if(responseObj.data.user) {
    await ctx.telegram.sendMessage(ADMIN_ID, ADMIN_MESSAGES.QUIT.SUCCESSFUL)
    await ctx.reply(USER_MESSAGES.QUIT.SUCCESSFUL)
  }
  else {
    await ctx.reply(USER_MESSAGES.QUIT.NOT_AVAILABLE)
  }
  await ctx.reply(USER_MESSAGES.GET_HELP)
  return responseObj
}

const newPaymentDate = async (ctx) => {
  await ctx.replyWithMarkdown(USER_MESSAGES.ID(ctx.from.id))
  let responseObj = {
    status: BOT_CONTROLLER.NEW_PAYMENT_DATE.FAILED
  }
  let user_id = ctx.message.text.split(' ')[1]
  if(ctx.from.id == ADMIN_ID) {
    try {
      let responseFromService = await user_services.editUser({
        filter: {
          chat_id: user_id
        },
        data: {
          last_payment_date: new Date()
        }
      })
      responseObj.data = responseFromService.data
      responseObj.status = BOT_CONTROLLER.NEW_PAYMENT_DATE.SUCCESSFUL
    } catch (err) {
      console.log("Something went wrong with: bot.controller.acceptUser", (SHOW_ERROR ? err : ''))
      await ctx.reply(BOT_CONTROLLER.TRY_AGAIN)
    }
    if(responseObj.data.user) {
      await ctx.telegram.sendMessage(ADMIN_ID, ADMIN_MESSAGES.NEW_PAYMENT_DATE.SUCCESSFUL)
      await ctx.telegram.sendMessage(user_id, USER_MESSAGES.NEW_PAYMENT_DATE.SUCCESSFUL)
    }
    else {
      await ctx.telegram.sendMessage(ADMIN_ID, ADMIN_MESSAGES.NEW_PAYMENT_DATE.FAILED)
    }
  }
  else {
    await ctx.reply(USER_MESSAGES.NO_PERMISSION)
  }
  await ctx.telegram.sendMessage(user_id, USER_MESSAGES.GET_HELP)
  return responseObj
}

const acceptUser = async (ctx) => {
  await ctx.replyWithMarkdown(USER_MESSAGES.ID(ctx.from.id))
  let responseObj = {
    status: BOT_CONTROLLER.ACCEPT_USER.FAILED
  }
  let user_id = ctx.message.text.split(' ')[1]
  if(ctx.from.id == ADMIN_ID) {
    try {
      let responseFromService = await user_services.editUser({
        filter: {
          chat_id: user_id
        },
        data: {
          is_available: true
        }
      })
      responseObj.data = responseFromService.data
      responseObj.status = BOT_CONTROLLER.ACCEPT_USER.SUCCESSFUL
    } catch (err) {
      console.log("Something went wrong with: bot.controller.acceptUser", (SHOW_ERROR ? err : ''))
      await ctx.reply(BOT_CONTROLLER.TRY_AGAIN)
    }
    if(responseObj.data.user) {
      await ctx.telegram.sendMessage(ADMIN_ID, ADMIN_MESSAGES.ACCEPT_USER.SUCCESSFUL)
      await ctx.telegram.sendMessage(user_id, USER_MESSAGES.ACCEPT_USER.SUCCESSFUL)
    }
    else {
      await ctx.telegram.sendMessage(ADMIN_ID, ADMIN_MESSAGES.ACCEPT_USER.FAILED)
    }
  }
  else {
    await ctx.reply(USER_MESSAGES.NO_PERMISSION)
  }
  await ctx.telegram.sendMessage(user_id, USER_MESSAGES.GET_HELP)
  return responseObj
}

const help = async (ctx) => {
  await ctx.replyWithMarkdown(USER_MESSAGES.ID(ctx.from.id))
  await ctx.reply(USER_MESSAGES.HELP)
  if(ctx.from.id == ADMIN_ID) {
    await ctx.reply(ADMIN_MESSAGES.HELP)
  }
  await ctx.reply(USER_MESSAGES.GET_HELP)
}

module.exports = {
  start,
  signUp,
  viewLevels,
  level,
  levelUp,
  quit,
  acceptUser,
  newPaymentDate,
  help
}