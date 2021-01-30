const date_helpers = require("../../helpers/date.helpers")

module.exports = {
  SIGN_UP: {
    NEW_USER: "Nueva notificación: "+date_helpers.date()+"\nNuevo usuario registrado."
  },
  ACCEPT_USER: {
    FAILED: "El usuario no fue encontrado.",
    SUCCESSFUL: "Nueva notificación: "+date_helpers.date()+"\nEl usuario fue encontrado y se actualizo el estado de su cuenta."
  },
  QUIT: {
    SUCCESSFUL: "Nueva notificación: "+date_helpers.date()+"\nEl usuario cambio el estado de su cuenta a *no disponible.*"
  },
  LEVEL_UP: {
    FAILED: "El usuario no fue encontrado.",
    SUCCESSFUL: (level) => "Nueva notificación: "+date_helpers.date()+"\n*El usuario fue encontrado y se actualizo el estado de su cuenta a: "+level+".*",
    USER_ALREADY_REGISTERED: {
      IS_AVAILABLE: (data) => "Nueva notificación: "+date_helpers.date()+"\n*El usuario con id: "+data.id+" y username: @"+data.username+" con nivel: "+data.level+" quiere aumentar su nivel.*",
    }
  },
  HELP: `
  Lista de comandos: \n
  /quit: Deshabilitar un usario por id.\n
  /levelUp: Bajar el nivel de un usuario por id.\n
  /acceptUser: Aceptar un usuario por id.\n
  /unacceptUser: UnAceptar un usuario por id.\n
  `,
}  