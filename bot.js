require('dotenv').config()
const Commando = require('discord.js-commando')
const path = require('path')
const sqlite = require('sqlite')

const client = new Commando.Client({
  commandPrefix: '$',
  owner: '338670732403933194'
})

function setPresence() {
  client.user.setPresence({
    game: { name: 'with names! | dm me help', type: 'PLAYING' },
    status: 'online'
  })
}

client
  .on('error', err => {
    console.error(err.message)
    setPresence()
  })
  .on('warn', console.warn)
  .on('ready', () => {
    const msg = `Logged in as: ${client.user.username}`
    console.log(`${msg}\n${client.user.id}\n${'_'.repeat(msg.length)}`)
    setPresence()
  })
  .on('disconnect', () => console.warn('Diconnected!'))
  .on('reconnecting', () => setPresence())

client
  .setProvider(
    sqlite
      .open(path.join(__dirname, 'database.sqlite3'))
      .then(db => new Commando.SQLiteProvider(db))
  )
  .catch(console.error)

client.registry
  .registerDefaults()
  .registerGroup(['admin', 'Administrator'])
  .registerTypesIn(path.join(__dirname, 'types'))
  .registerCommandsIn(path.join(__dirname, 'commands'))

client.login(
  process.env.ENVIRONMENT === 'dev' ? process.env.TOKEN_TEST : process.env.TOKEN
)
