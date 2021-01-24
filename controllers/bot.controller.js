const BOT_CONTROLLER = require("../constants/controllers/bot.controllers")
const ADMIN_MESSAGES = require("../constants/messages/admin.messages")
const USER_MESSAGES = require("../constants/messages/user.messages")
const user_services = require("../services/user.services")

const start = async (ctx) => {
  let responseObj = {
    status: BOT_CONTROLLER.START.FAILED
  }
  try {
    let responseFromService = await user_services.getCurrentUser({chat_id: ctx.from.id});
    responseObj.data = responseFromService.data
    responseObj.status = BOT_CONTROLLER.START.SUCCESSFUL
  } catch (err) {
    console.log("Something went wrong with: bot.controller.signUp", err);
    ctx.reply(BOT_CONTROLLER.TRY_AGAIN)
  }
  if(responseObj.data.user == null) {
    ctx.reply(BOT_CONTROLLER.START.NOT_REGISTERED)
    ctx.reply(BOT_CONTROLLER.GET_HELP)
  }
  else {
    if(responseObj.data.user.is_available) {
      ctx.reply(BOT_CONTROLLER.START.IS_AVAILABLE)
      ctx.reply(BOT_CONTROLLER.GET_HELP)
    }
    else {
      ctx.reply(BOT_CONTROLLER.START.IS_REGISTERED)
      ctx.reply(BOT_CONTROLLER.GET_HELP)
    }      
  }
  return responseObj
}

const signUp = async (ctx) => {
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
    let responseFromService = await user_services.signUp(data);
    responseObj.data = responseFromService.data
    responseObj.status = BOT_CONTROLLER.SIGN_UP.SUCCESSFUL
  } catch (err) {
    console.log("Something went wrong with: bot.controller.signUp", err);
    ctx.reply(BOT_CONTROLLER.TRY_AGAIN)
  }
  if(!responseObj.data) {
    try {
      let responseFromService = await user_services.getCurrentUser({chat_id: ctx.from.id});
      if(responseFromService.data.user.is_available) {
          ctx.reply(BOT_CONTROLLER.SIGN_UP.USER_ALREADY_REGISTERED.IS_AVAILABLE)
          ctx.reply(BOT_CONTROLLER.GET_HELP)
        }
      else {
        ctx.reply(BOT_CONTROLLER.SIGN_UP.USER_ALREADY_REGISTERED.NOT_AVAILABLE)
        ctx.reply(BOT_CONTROLLER.GET_HELP)
      }
    } catch (err) {
      console.log("Something went wrong with: bot.controller.signUp", err);
      ctx.reply(BOT_CONTROLLER.TRY_AGAIN)
    }
    return responseObj
  }
  if(responseObj.data.user != null) {
    ctx.reply(BOT_CONTROLLER.SIGN_UP.NOT_REGISTERED)
    ctx.reply(BOT_CONTROLLER.GET_HELP)
  }
  else {
    if(responseObj.data.user.is_available) {
      ctx.reply(BOT_CONTROLLER.START.IS_AVAILABLE)
    }
    else {
      ctx.reply(BOT_CONTROLLER.START.IS_REGISTERED)
    } 
  }
  return responseObj
}

const help = (ctx) => {
  ctx.reply('Help')
}

module.exports = {
  start,
  signUp,
  help
}