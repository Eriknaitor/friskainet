const ytdl = require('youtube-dl-exec');
const { MessageAttachment } = require('discord.js');
const { unlinkSync } = require('fs');

module.exports = {
  replaceAll: (string, mapObject) => {
    const re = new RegExp(Object.keys(mapObject).join('|'), 'gi');

    return string.replace(re, (matched) => mapObject[matched.toLowerCase()]);
  },

  randomColor: () => (1 << 24) * Math.random() | 0,

  neededXP: (level, currentXP) => (500 * (level ** 2) - (500 * level)) - currentXP,
  // Fisher–Yates Shuffle
  shuffle: (array) => {
    let arrayLength = array.length;

    while (arrayLength) {
      const remaining = Math.floor(Math.random() * arrayLength--);
      const currentElement = array[arrayLength];
      array[arrayLength] = array[remaining];
      array[remaining] = currentElement;
    }

    return array;
  },
  // Divides an array in subgroups of arrays
  chunk: (array, size) => {
    const chunks = [];

    while (array.length) {
      chunks.push(array.splice(0, size));
    }

    return chunks;
  },

  downloadVideo: (url, message) => {
    const filePath = `./resources/tmp/${url.split('/')[url.split('/').length - 1]}.mp4`;
    ytdl(url, { noWarnings: true, output: filePath })
      .then(async () => {
        const file = new MessageAttachment(filePath);
        await message.reply({ files: [file] });
        unlinkSync(filePath);
      })
      .catch((err) => {
        if (!err.message.includes('There\'s no video')) {
          message.reply({ content: `Ha habido un error al intentar descargar el vídeo:\n\`\`\`${err} \`\`\`` });
        }

        if (err.message.includes('403')) {
          message.reply({ cotnent: 'Parece que el vídeo ha sido borrado :(' });
        }
      });
  },

  getRandomInt: (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min),
};
