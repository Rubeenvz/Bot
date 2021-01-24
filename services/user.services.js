const USER_SERVICE = require("../constants/services/user.services")
const User = require("../models/user.model")

const signUp = async (data) => {
  let responseObj = {
    status: USER_SERVICE.FAILED,
  }
  try {
    const newUser = await User.create(data)
    responseObj.status = USER_SERVICE.SUCCESSFUL
    responseObj.data = {
      user: newUser,
    }
  } catch (err) {
    console.log("Something went wrong with: user.services.signUp", err)
  }
  return responseObj
}

module.exports = {
  signUp,
}
