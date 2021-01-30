const BOT_CONTROLLER = require("../constants/controllers/bot.controllers")
const ADMIN_MESSAGES = require("../constants/messages/admin.messages")
const USER_MESSAGES = require("../constants/messages/user.messages")
const user_services = require("../services/user.services")

const message_helpers = require("../helpers/message.helpers")

const SHOW_ERROR = process.env.SHOW_ERROR == "true" ? true : false
const ADMIN_ID = process.env.ADMIN_ID

const start = async (ctx) => {
  await ctx.reply(USER_MESSAGES.ID(ctx.from.id))
  let responseObj = {
    status: BOT_CONTROLLER.START.FAILED
  }
  try {
    let responseFromService = await user_services.getCurrentUser({chat_id: ctx.from.id})
    responseObj.data = responseFromService.data
    responseObj.status = BOT_CONTROLLER.START.SUCCESSFUL
  } catch (err) {
    console.log("Something went wrong with: bot.controller.start", (SHOW_ERROR ? err : ''))
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
  await ctx.reply(USER_MESSAGES.ID(ctx.from.id))
  let responseObj = {
    status: BOT_CONTROLLER.SIGN_UP.FAILED
  }
  if(!ctx.from.username) {
    ctx.reply(USER_MESSAGES.SIGN_UP.NOT_USERNAME)
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
      console.log("Something went wrong with: bot.controller.signUp", (SHOW_ERROR ? err : ''))
      ctx.reply(USER_MESSAGES.TRY_AGAIN)
    }
    ctx.reply(USER_MESSAGES.GET_HELP)
    return responseObj
  }
  if(responseObj.data.user != null) {
    ctx.reply(USER_MESSAGES.SIGN_UP.NOT_REGISTERED)
    ctx.telegram.sendMessage(ADMIN_ID, ADMIN_MESSAGES.SIGN_UP.NEW_USER)
    ctx.telegram.sendMessage(ADMIN_ID, message_helpers.jsonToMessage(responseObj.data.user))
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
  await ctx.reply(USER_MESSAGES.ID(ctx.from.id))
  let responseObj = {
    status: BOT_CONTROLLER.LEVEL.FAILED
  }
  try {
    let responseFromService = await user_services.getCurrentUser({chat_id: ctx.from.id})
    responseObj.data = responseFromService.data
    responseObj.status = BOT_CONTROLLER.LEVEL.SUCCESSFUL
  } catch (err) {
    console.log("Something went wrong with: bot.controller.level", (SHOW_ERROR ? err : ''))
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
  await ctx.reply(USER_MESSAGES.ID(ctx.from.id))
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
      console.log("Something went wrong with: bot.controller.LEVEL_UP", (SHOW_ERROR ? err : ''))
      ctx.reply(BOT_CONTROLLER.TRY_AGAIN)
    }
    if(responseObj.data.user) {
      ctx.telegram.sendMessage(ADMIN_ID, ADMIN_MESSAGES.LEVEL_UP.SUCCESSFUL(new_level))
      ctx.telegram.sendMessage(user_id, USER_MESSAGES.LEVEL_UP.SUCCESSFUL(new_level))
    }
    else {
      ctx.telegram.sendMessage(ADMIN_ID, ADMIN_MESSAGES.LEVEL_UP.FAILED)
    }
  }
  else {
    try {
      let responseFromService = await user_services.getCurrentUser({chat_id: ctx.from.id})
      responseObj.data = responseFromService.data
      responseObj.status = BOT_CONTROLLER.LEVEL_UP.SUCCESSFUL
    } catch (err) {
      console.log("Something went wrong with: bot.controller.level", (SHOW_ERROR ? err : ''))
      ctx.reply(BOT_CONTROLLER.TRY_AGAIN)
    }
    if(responseObj.data.user == null) {
      ctx.reply(USER_MESSAGES.LEVEL_UP.NOT_REGISTERED)
    }
    else {
      if(responseObj.data.user.is_available) {
        ctx.reply(USER_MESSAGES.LEVEL_UP.USER_ALREADY_REGISTERED.IS_AVAILABLE(responseObj.data.user.level))
        ctx.telegram.sendMessage(ADMIN_ID, ADMIN_MESSAGES.LEVEL_UP.USER_ALREADY_REGISTERED.IS_AVAILABLE({
          id: responseObj.data.user.chat_id,
          username: responseObj.data.user.username,
          level: responseObj.data.user.level,
        }))
      }
      else {
        ctx.reply(USER_MESSAGES.LEVEL_UP.USER_ALREADY_REGISTERED.NOT_AVAILABLE)
      }
    }
  }
  ctx.reply(USER_MESSAGES.GET_HELP)
  return responseObj
}

const quit = async (ctx) => {
  await ctx.reply(USER_MESSAGES.ID(ctx.from.id))
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
    ctx.reply(BOT_CONTROLLER.TRY_AGAIN)
  }
  if(responseObj.data.user) {
    ctx.telegram.sendMessage(ADMIN_ID, ADMIN_MESSAGES.QUIT.SUCCESSFUL)
    ctx.reply(USER_MESSAGES.QUIT.SUCCESSFUL)
  }
  else {
    ctx.reply(USER_MESSAGES.QUIT.NOT_AVAILABLE)
  }
  ctx.reply(USER_MESSAGES.GET_HELP)
  return responseObj
}

const acceptUser = async (ctx) => {
  await ctx.reply(USER_MESSAGES.ID(ctx.from.id))
  let responseObj = {
    status: BOT_CONTROLLER.ACCEPT_USER.FAILED
  }
  if(ctx.from.id == ADMIN_ID) {
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
      console.log("Something went wrong with: bot.controller.acceptUser", (SHOW_ERROR ? err : ''))
      ctx.reply(BOT_CONTROLLER.TRY_AGAIN)
    }
    if(responseObj.data.user) {
      ctx.telegram.sendMessage(ADMIN_ID, ADMIN_MESSAGES.ACCEPT_USER.SUCCESSFUL)
      ctx.telegram.sendMessage(user_id, USER_MESSAGES.ACCEPT_USER.SUCCESSFUL)
    }
    else {
      ctx.telegram.sendMessage(ADMIN_ID, ADMIN_MESSAGES.ACCEPT_USER.FAILED)
    }
  }
  else {
    ctx.reply(USER_MESSAGES.NO_PERMISSION)
  }
  ctx.telegram.sendMessage(user_id, USER_MESSAGES.GET_HELP)
  return responseObj
}

const unacceptUser = async (ctx) => {
  await ctx.reply(USER_MESSAGES.ID(ctx.from.id))
  let responseObj = {
    status: BOT_CONTROLLER.ACCEPT_USER.FAILED
  }
  if(ctx.from.id == ADMIN_ID) {
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
      console.log("Something went wrong with: bot.controller.unacceptUser", (SHOW_ERROR ? err : ''))
      ctx.reply(BOT_CONTROLLER.TRY_AGAIN)
    }
    if(responseObj.data.user) {
      ctx.telegram.sendMessage(ADMIN_ID, ADMIN_MESSAGES.UNACCEPT_USER.SUCCESSFUL)
      ctx.telegram.sendMessage(user_id, USER_MESSAGES.UNACCEPT_USER.SUCCESSFUL)
    }
    else {
      ctx.telegram.sendMessage(ADMIN_ID, ADMIN_MESSAGES.UNACCEPT_USER.FAILED)
    }
  }
  else {
    ctx.reply(USER_MESSAGES.NO_PERMISSION)
  }
  ctx.telegram.sendMessage(user_id, USER_MESSAGES.GET_HELP)
  return responseObj
}

const help = async (ctx) => {
  await ctx.reply(USER_MESSAGES.ID(ctx.from.id))
  ctx.reply(USER_MESSAGES.HELP)
  if(ctx.from.id == ADMIN_ID) {
    ctx.reply(ADMIN_MESSAGES.HELP)
  }
  ctx.reply(USER_MESSAGES.GET_HELP)
}

module.exports = {
  start,
  signUp,
  level,
  levelUp,
  quit,
  acceptUser,
  unacceptUser,
  help
}