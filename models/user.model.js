const { Schema, model } = require("mongoose")

 const LEVEL_CONFIG = require("../constants/configs/level.configs")

const date_helpers = require("../helpers/date.helpers")

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
  },
  level: {
    type: Number,
    default: 0,
  },
  registration_date: {
    type: Date,
    default: new Date()
  },
  last_payment_date: {
    type: Date,
    default: date_helpers.date(8, '')
  },
  number_of_notifications: {
    type: Number,
    default: LEVEL_CONFIG['level_0'].number_of_notifications,
  },
  current_notificacion: {
    type: Number,
    default: 0,
  },
  is_listening: {
    type: Boolean,
    default: false
  }
},{
  versionKey: false
})

module.exports = model("User", UserSchema)
