const SHOW_ERROR = process.env.SHOW_ERROR == "true" ? true : false

const USER_SERVICE = require("../constants/services/user.services")

const User = require("../models/user.model")

const getUsers = async (data) => {
  let responseObj = {
    status: USER_SERVICE.GET_ALL_AVAILABLE_USERS.FAILED
  }
  try {
    const users = await User.find(data)
    responseObj.status = USER_SERVICE.GET_ALL_AVAILABLE_USERS.SUCCESSFUL
    responseObj.data = {
      users
    }
  } catch (err) {
    console.log("Something went wrong with: user.services.getUsers", (SHOW_ERROR ? err : ''))
  }
  return responseObj
}

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
    console.log("Something went wrong with: user.services.findOne", (SHOW_ERROR ? err : ''))
  }
  return responseObj
}

const signUp = async (data) => {
  console.log(data)
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
    console.log("Something went wrong with: user.services.signUp", (SHOW_ERROR ? err : ''))
  }
  return responseObj
}

const editUser = async (data) => {
  let responseObj = {
    status: USER_SERVICE.EDIT_USER.FAILED
  }
  try {
    const userEdited = await User.findOneAndUpdate(data.filter, data.data)
    responseObj.status = USER_SERVICE.EDIT_USER.SUCCESSFUL
    responseObj.data = {
      user: userEdited,
    }
  } catch (err) {
    console.log("Something went wrong with: user.services.signUp", (SHOW_ERROR ? err : ''))
  }
  return responseObj
}

module.exports = {
  getUsers,
  getCurrentUser,
  signUp,
  editUser
}
