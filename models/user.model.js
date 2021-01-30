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
  username: {
    type: String,
    require: false,
  },
  is_bot: {
    type: Boolean,
    require: false,
  },
  is_available: {
    type: Boolean,
    default: false,
    require: false,
  },
  level: {
    type: Number,
    default: 0,
    require: false,
  },
  registration_date: {
    type: Date,
    default: new Date()
  },
  last_payment_date: {
    type: Date,
    default: new Date()
  }
})

module.exports = model("User", UserSchema)
