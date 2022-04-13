module.exports = {
  // If you want to see some extra output & commands without slash set to true
  debug: false,
  // Only works with debug enabled
  prefix: '!',
  ownerID: 'BOT OWNER ID',
  token: process.env.FRISKAINET_TOKEN || 'DISCORD TOKEN',
  channels: {
    volatile: 'VOLATILE CHANNEL NAME',
    pinneds: 'PINS CHANNEL NAME',
    logs: 'LOGS CHANNEL NAME',
  },
  adminRole: process.env.FRISKAINET_ADMIN_ROLE,
  betRatio: process.env.FRISKAINET_BETTING_RATIO,
  databaseURL: process.env.FRISKAINET_DATABASE_URL || 'DATABASE URL',
  voicerssToken: process.env.FRISKAINET_VOICERSS || 'VOICE RSS TOKEN',
  spotify: {
    clientId: process.env.FRISKAINET_SPOTIFY_CLIENTID || 'SPOTIFY CLIENT ID',
    clientSecret: process.env.FRISKAINET_SPOTIFY_CLIENTSECRET || 'SPOTIFY CLIENT SECRET',
  },
  presence: {
    name: 'Anything you want here',
    // Check https://discord.js.org/#/docs/main/stable/typedef/ActivityType
    type: 'PLAYING',
    // Check https://discord.js.org/#/docs/main/stable/typedef/ClientPresenceStatus
    status: 'online',
  },
  randomizerRoute: process.env.FRISKAINET_RANDOMIZER_ROUTE || 'POKEMON RANDOMIZER ROUTE',
  commands: {
    economy: {
      daily: true,
      dice: true,
      leaderboard: true,
      mug: true,
      slot: true,
      transfer: true,
    },
    fun: {
      kanye: true,
      urban: true,
    },
    moderation: {
      delete: true,
      disconnect: true,
      rules: true,
      warn: true,
    },
    music: {
      clear: true,
      leave: true,
      pause: true,
      play: true,
      queue: true,
      resume: true,
      skip: true,
    },
    nsfw: {
      ass: true,
      boobs: true,
    },
    pokemon: {
      activaterom: true,
      deactivaterom: true,
      listroms: true,
      rom: true,
      uploadrom: true,
    },
    utility: {
      about: true,
      color: true,
      help: true,
      lmgtfy: true,
      poke: true,
      shuffle: true,
    },
  },
};