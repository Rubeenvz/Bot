const start = (ctx) => {
  ctx.reply('Start')
};

const help = (ctx) => {
  ctx.reply('Help')
};

const command = (ctx) => {
  ctx.reply('Command')
};


module.exports = {
  start,
  help,
  command
};