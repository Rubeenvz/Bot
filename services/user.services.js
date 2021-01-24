const USER_SERVICE = require("../constants/services/user.services")
const User = require("../models/user.model")

const getCurrentUser = async (data) => {
  let responseObj = {
    status: USER_SERVICE.GET_CURRENT_USER.FAILED
  }
  try {
    const user = await User.findOne(data)
    responseObj.status = USER_SERVICE.GET_CURRENT_USER.SUCCESSFUL
    responseObj.data = {
      user
    }
  } catch (err) {
    console.log("Something went wrong with: user.services.findOne", err)
  }
  return responseObj
}

const signUp = async (data) => {
  let responseObj = {
    status: USER_SERVICE.SIGN_UP.FAILED
  }
  try {
    const newUser = await User.create(data)
    responseObj.status = USER_SERVICE.SIGN_UP.SUCCESSFUL
    responseObj.data = {
      user: newUser,
    }
  } catch (err) {
    console.log("Something went wrong with: user.services.signUp", err)
  }
  return responseObj
}

module.exports = {
  getCurrentUser,
  signUp
}
