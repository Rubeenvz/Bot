module.exports = {
  START: {
    NOT_REGISTERED: "Hola, bienvenido a "+process.env.APP_NAME+". Aún no has sido registrado en el sistema. Para comenzar a recibir las notificaciones registrate utilizando el comando /signUp. Muchas gracias.",
    IS_REGISTERED: "Bienvenido nuevamente, tu cuenta se encuentra registrada en el sistema. Para continuar con el proceso y comenzar a recibir notificaciones, envía un mensaje a "+process.env.ADMIN_USER+" para validar tu información. Muchas gracias.",
    IS_AVAILABLE: "Bienvenido nuevamente, tu cuenta ya esta registrada y disponible en nuestro sistema. Muchas gracias."
  },
  SIGN_UP: {
    USER_ALREADY_REGISTERED: {
      IS_AVAILABLE: "Tu cuenta ha sido registrada correctamente en el sistema con anterioridad y ya se encuentra disponible. Muchas gracias.",
      NOT_AVAILABLE: "Tu cuenta ha sido registrada correctamente en el sistema con anterioridad. Para continuar con el proceso envía un mensaje a "+process.env.ADMIN_USER+" para validar tu información.",
    },
    NOT_REGISTERED: "Tu cuenta ha sido registrada correctamente en el sistema. Para continuar con el proceso envía un mensaje a "+process.env.ADMIN_USER+" para validar tu información.",
    IS_REGISTERED: "Tu cuenta ya se encuentra registrada en el sistema. Para continuar con el proceso y comenzar a recibir las notificaciones, envía un mensaje a "+process.env.ADMIN_USER+" para validar tu información.",
    IS_AVAILABLE: "Tu cuenta ya esta disponible en nuestro sistema.",
  },
  HELP: `
  Lista de comandos: \n\n
  /start: Comenzar a utilizar ${process.env.APP_NAME}.\n
  /signUp: Registrarme en ${process.env.APP_NAME}.\n
  /level: Ver mi nivel de usuario.\n
  /levelUp: Subir mi nivel de usuario.\n
  /help: Ver todos los comandos disponibles.\n
  `,
  GET_HELP: "Utiliza el comando /help si necesitas ayuda. Para cualquier duda, sugerencia o ayuda personalizada envia un mensaje a: "+process.env.ADMIN_USER+"."
}  