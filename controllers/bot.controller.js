const BOT_CONTROLLER = require("../constants/controllers/bot.controllers")
const ADMIN_MESSAGES = require("../constants/messages/admin.messages")
const USER_MESSAGES = require("../constants/messages/user.messages")
const user_services = require("../services/user.services")

const start = async (ctx) => {
  await ctx.reply("*Mi ID:"+ctx.from.id+"*\n\n")
  let responseObj = {
    status: BOT_CONTROLLER.START.FAILED
  }
  try {
    let responseFromService = await user_services.getCurrentUser({chat_id: ctx.from.id})
    responseObj.data = responseFromService.data
    responseObj.status = BOT_CONTROLLER.START.SUCCESSFUL
  } catch (err) {
    console.log("Something went wrong with: bot.controller.signUp", err)
    ctx.reply(BOT_CONTROLLER.TRY_AGAIN)
  }
  if(responseObj.data.user == null) {
    ctx.reply(USER_MESSAGES.START.NOT_REGISTERED)
  }
  else {
    if(responseObj.data.user.is_available) {
      ctx.reply(USER_MESSAGES.START.IS_AVAILABLE)
    }
    else {
      ctx.reply(USER_MESSAGES.START.IS_REGISTERED)
    }      
  }
  ctx.reply(USER_MESSAGES.HELP)
  ctx.reply(USER_MESSAGES.GET_HELP)
  return responseObj
}

const signUp = async (ctx) => {
  await ctx.reply("*Mi ID:"+ctx.from.id+"*\n\n")
  let responseObj = {
    status: BOT_CONTROLLER.SIGN_UP.FAILED
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
    console.log("Something went wrong with: bot.controller.signUp", err)
    ctx.reply(BOT_CONTROLLER.TRY_AGAIN)
  }
  if(!responseObj.data) {
    try {
      let responseFromService = await user_services.getCurrentUser({chat_id: ctx.from.id})
      if(responseFromService.data.user.is_available) {
          ctx.reply(BOT_CONTROLLER.SIGN_UP.USER_ALREADY_REGISTERED.IS_AVAILABLE)
        }
      else {
        ctx.reply(USER_MESSAGES.SIGN_UP.USER_ALREADY_REGISTERED.NOT_AVAILABLE)
      }
    } catch (err) {
      console.log("Something went wrong with: bot.controller.signUp", err)
      ctx.reply(USER_MESSAGES.TRY_AGAIN)
    }
    ctx.reply(USER_MESSAGES.GET_HELP)
    return responseObj
  }
  if(responseObj.data.user != null) {
    ctx.reply(USER_MESSAGES.SIGN_UP.NOT_REGISTERED)
    ctx.telegram.sendMessage(process.env.ADMIN_ID, ADMIN_MESSAGES.SIGN_UP.NEW_USER)
    ctx.telegram.sendMessage(process.env.ADMIN_ID, responseObj.data.user)
  }
  else {
    if(responseObj.data.user.is_available) {
      ctx.reply(USER_MESSAGES.START.IS_AVAILABLE)
    }
    else {
      ctx.reply(USER_MESSAGES.START.IS_REGISTERED)
    } 
  }
  ctx.reply(USER_MESSAGES.GET_HELP)
  return responseObj
}

const level = async (ctx) => {
  await ctx.reply("*Mi ID:"+ctx.from.id+"*\n\n")
  let responseObj = {
    status: BOT_CONTROLLER.LEVEL.FAILED
  }
  try {
    let responseFromService = await user_services.getCurrentUser({chat_id: ctx.from.id})
    responseObj.data = responseFromService.data
    responseObj.status = BOT_CONTROLLER.LEVEL.SUCCESSFUL
  } catch (err) {
    console.log("Something went wrong with: bot.controller.level", err)
    ctx.reply(BOT_CONTROLLER.TRY_AGAIN)
  }
  if(responseObj.data.user == null) {
    ctx.reply(USER_MESSAGES.LEVEL.NOT_REGISTERED)
  }
  else {
    if(responseObj.data.user.is_available) {
      ctx.reply(USER_MESSAGES.LEVEL.USER_ALREADY_REGISTERED.IS_AVAILABLE(responseObj.data.user.level))
    }
    else {
      ctx.reply(USER_MESSAGES.LEVEL.USER_ALREADY_REGISTERED.NOT_AVAILABLE)
    }
  }
  ctx.reply(USER_MESSAGES.GET_HELP)
  return responseObj
}

const levelUp = async (ctx) => {
  await ctx.reply("*Mi ID:"+ctx.from.id+"*\n\n")

}

const levelDown = async (ctx) => {
  await ctx.reply("*Mi ID:"+ctx.from.id+"*\n\n")

}

const quit = async (ctx) => {
  await ctx.reply("*Mi ID:"+ctx.from.id+"*\n\n")

}

const acceptUser = async (ctx) => {
  await ctx.reply("*Mi ID:"+ctx.from.id+"*\n\n")
  let responseObj = {
    status: BOT_CONTROLLER.ACCEPT_USER.FAILED
  }
  if(ctx.from.id == process.env.ADMIN_ID) {
    let user_id = ctx.message.text.split(' ')[1]
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
      console.log("Something went wrong with: bot.controller.level", err)
      ctx.reply(BOT_CONTROLLER.TRY_AGAIN)
    }
    if(responseObj.data.user) {
      ctx.telegram.sendMessage(process.env.ADMIN_ID, ADMIN_MESSAGES.ACCEPT_USER.SUCCESSFUL)
      ctx.telegram.sendMessage(user_id, USER_MESSAGES.ACCEPT_USER.SUCCESSFUL)
    }
    else {
      ctx.telegram.sendMessage(process.env.ADMIN_ID, ADMIN_MESSAGES.ACCEPT_USER.FAILED)
    }
  }
  else {
    ctx.reply(USER_MESSAGES.NO_PERMISSION)
  }
  ctx.telegram.sendMessage(user_id, USER_MESSAGES.GET_HELP)
  return responseObj
}

const unacceptUser = async (ctx) => {
  await ctx.reply("*Mi ID:"+ctx.from.id+"*\n\n")
  let responseObj = {
    status: BOT_CONTROLLER.ACCEPT_USER.FAILED
  }
  if(ctx.from.id == process.env.ADMIN_ID) {
    let user_id = ctx.message.text.split(' ')[1]
    try {
      let responseFromService = await user_services.editUser({
        filter: {
          chat_id: user_id
        },
        data: {
          is_available: false
        }
      })
      responseObj.data = responseFromService.data
      responseObj.status = BOT_CONTROLLER.ACCEPT_USER.SUCCESSFUL
    } catch (err) {
      console.log("Something went wrong with: bot.controller.level", err)
      ctx.reply(BOT_CONTROLLER.TRY_AGAIN)
    }
    if(responseObj.data.user) {
      ctx.telegram.sendMessage(process.env.ADMIN_ID, ADMIN_MESSAGES.UNACCEPT_USER.SUCCESSFUL)
      ctx.telegram.sendMessage(user_id, USER_MESSAGES.UNACCEPT_USER.SUCCESSFUL)
    }
    else {
      ctx.telegram.sendMessage(process.env.ADMIN_ID, ADMIN_MESSAGES.UNACCEPT_USER.FAILED)
    }
  }
  else {
    ctx.reply(USER_MESSAGES.NO_PERMISSION)
  }
  ctx.telegram.sendMessage(user_id, USER_MESSAGES.GET_HELP)
  return responseObj
}

const help = async (ctx) => {
  await ctx.reply("*Mi ID:"+ctx.from.id+"*\n\n")
  ctx.reply(USER_MESSAGES.HELP)
  if(ctx.from.id == process.env.ADMIN_ID) {
    ctx.reply(ADMIN_MESSAGES.HELP)
  }
  ctx.reply(USER_MESSAGES.GET_HELP)
}

module.exports = {
  start,
  signUp,
  level,
  levelUp,
  levelDown,
  quit,
  acceptUser,
  unacceptUser,
  help
}