process.title = 'Friskainet';
global.basedir = __dirname; // Shitty trick for getting the main folder ¯\_(ツ)_/¯

require('dotenv').config();
const { Client, Intents, Collection } = require('discord.js');
const cron = require('node-cron');
const { readdirSync } = require('fs');

const bot = new Client({
  intents: Intents.ALL/* [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] */,
  disableMentions: 'everyone',
});

bot.database = require('./libs/database/index');
bot.logger = require('./libs/logger');
bot.config = require('./resources/config');

bot.commands = new Collection();
bot.commandCooldowns = new Collection();
bot.util = require('./libs/utils');

const init = async () => {
  // Loading commands
  const commandFolders = readdirSync('./commands');
  let numberCommands = 0;
  let numberCategories = 0;

  commandFolders.forEach((folder) => {
    const commands = readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js'));
    numberCategories += 1;

    commands.forEach((command) => {
      const file = require(`./commands/${folder}/${command}`);
      numberCommands += 1;
      bot.commands.set(file.name, file);
    });
  });

  bot.logger.log(`Cargando ${numberCommands} comandos en ${numberCategories} categorías`);

  // Loading events
  const events = readdirSync('./events').filter((file) => file.endsWith('.js'));
  let numberEvents = 0;

  events.forEach((event) => {
    const file = require(`./events/${event}`);
    numberEvents += 1;
    if (event.once) {
      return bot.once(file.name, (...args) => file.execute(...args, bot));
    }
    return bot.on(file.name, (...args) => file.execute(...args, bot));
  });

  bot.logger.log(`Cargando ${numberEvents} eventos`);

  const jobs = readdirSync('./jobs').filter((job) => job.endsWith('.js'));
  let numberJobs = 0;
  jobs.forEach((job) => {
    numberJobs += 1;
    const { expression, run } = require(`./jobs/${job}`);
    cron.schedule(expression, () => run(bot), { scheduled: true });
  });

  bot.logger.log(`Cargando ${numberJobs} cron-jobs`);

  // Log in the bot
  bot.login(bot.config.discordToken);
};

init();
