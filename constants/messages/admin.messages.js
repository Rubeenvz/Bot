const date_helpers = require("../../helpers/date.helpers")

module.exports = {
  SIGN_UP: {
    NEW_USER: "Nueva notificación: "+date_helpers.date()+"\nNuevo usuario registrado."
  },
  ACCEPT_USER: {
    FAILED: "El usuario no fue encontrado.",
    SUCCESSFUL: "Nueva notificación: "+date_helpers.date()+"\nEl usuario fue encontrado y se actualizo el estado de su cuenta."
  },
  UNACCEPT_USER: {
    FAILED: "El usuario no fue encontrado.",
    SUCCESSFUL: "Nueva notificación: "+date_helpers.date()+"\nEl usuario fue encontrado y se actualizo el estado de su cuenta."
  },
  QUIT: {
    SUCCESSFUL: "Nueva notificación: "+date_helpers.date()+"\nEl usuario cambio el estado de su cuenta a *no disponible*"
  },
  HELP: `
  Lista de comandos: \n\n
  /quit: Eliminar un usario por id.\n
  /levelUp: Subir el nivel de un usuario por id.\n
  /levelDown: Bajar el nivel de un usuario por id.\n
  /acceptUser: Aceptar un usuario por id.\n
  /unacceptUser: UnAceptar un usuario por id.\n
  `,
}  