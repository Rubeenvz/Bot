const date_helpers = require("../../helpers/date.helpers")

module.exports = {
  SIGN_UP: {
    NEW_USER: "*Nueva notificación: "+date_helpers.date()+"*\nNuevo usuario registrado."
  },
  ACCEPT_USER: {
    FAILED: "El usuario no fue encontrado.",
    SUCCESSFUL: "*Nueva notificación: "+date_helpers.date()+"*\nEl usuario fue encontrado y se actualizo el estado de su cuenta."
  },
  QUIT: {
    SUCCESSFUL: "*Nueva notificación: "+date_helpers.date()+"*\nEl usuario cambio el estado de su cuenta a *no disponible.*"
  },
  LEVEL_UP: {
    FAILED: "El usuario no fue encontrado.",
    SUCCESSFUL: (level) => "*Nueva notificación: "+date_helpers.date()+"*\n*El usuario fue encontrado y se actualizo el estado de su cuenta a: "+level+".*",
    USER_ALREADY_REGISTERED: {
      IS_AVAILABLE: (data) => "*Nueva notificación: "+date_helpers.date()+"*\n*El usuario con id: "+data.id+" y username: @"+data.username+" con nivel: "+data.level+" quiere aumentar su nivel.*",
    }
  },
  NEW_PAYMENT_DATE: {
    FAILED:"El usuario no fue encontrado.",
    SUCCESSFUL: "*Nueva notificación: "+date_helpers.date()+"*\n*El usuario fue encontrado y se actualizo su fecha de pago a: "+date_helpers.date()+", el usuario recibira notificaciones hasta el dia:"+date_helpers.date(8)+"*"
  },
  RESET_USER: {
    FAILED:"El usuario no fue encontrado.",
    SUCCESSFUL: (user_id) => "*Nueva notificación: "+date_helpers.date()+"*\n*El numero de notificaciones de: "+user_id+" fue reseteado.",
  },
  HELP: `
  Lista de comandos: \n
  /getUsers: Ver los usuarios que estan recibiendo notificaciones.\n
  /quit: Deshabilitar un usario por id. Ej: /quit: [ID]\n
  /levelUp: Cambiar el nuvel de un usuario por id. Ej: /levelUp: [ID] [NEW_LEVEL]\n
  /acceptUser: Aceptar un usuario por id. Ej: /acceptUser: [ID]\n
  /newPaymentDate: Actualiza la fecha de pago del usuario. Ej: /newPaymentDate: [ID]\n
  `,
}  