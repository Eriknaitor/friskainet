require('dotenv').config();
const { Client, Intents } = require('discord.js');
const { mkdirSync, existsSync } = require('fs');
const { discordToken } = require('./config');
const { User, syncAll } = require('../libs/database/index');
const logger = require('../libs/logger');

const bot = new Client({ intents: Intents.ALL });

bot.once('ready', async () => {
  bot.guilds.cache.each(async (guild) => {
    const memberList = await guild.members.cache;

    if (guild.available) {
      memberList.each((guildMemeber) => {
        if (!guildMemeber.user.bot) {
          User.create({
            discordID: guildMemeber.user.id,
            birthday: null,
          }).then(() => {
            logger.db(`[${guild.name}] - ${guildMemeber.user.tag} ha sido añadido a la base de datos`);
          }).catch((err) => {
            logger.error(err);
          });
        }
      });
    }
  });
});

const init = async () => {
  if (!existsSync('./resources/voice')) {
    mkdirSync('./resources/voice');
    mkdirSync('./resources/voice/join');
    mkdirSync('./resources/voice/leave');
  }

  await syncAll();
  bot.login(discordToken);
};

init();
