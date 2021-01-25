const date_helpers = require("../../helpers/date.helpers")

module.exports = {
  SIGN_UP: {
    NEW_USER: "Nueva notificación: "+date_helpers.date()+"\nNuevo usuario registrado."
  },
  HELP: `
  Lista de comandos: \n\n
  /quit: Eliminar un usario por id.\n
  /levelUp: Subir el nivel de un usuario por id.\n
  /levelDown: Bajar el nivel de un usuario por id.\n
  /acceptUser: Aceptar un usuario por id.\n
  `,
}  