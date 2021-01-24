const { Schema, model } = require("mongoose")

const UserSchema = Schema({
  chat_id: {
    type: Number,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    require: false,
  },
  language_code: {
    type: String,
    require: false,
  },
  is_bot: {
    type: Boolean,
    require: false,
  }
})

module.exports = model("User", UserSchema)
