const mongoose = require("mongoose")

const connect = new Promise(function (resolve, reject) {
  mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    resolve('Success')
  })
  .catch((error) => {
    reject(error)
  })
})

module.exports = { 
  connect
}
