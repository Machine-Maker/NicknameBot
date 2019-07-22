const Commando = require('discord.js-commando')

module.exports = class Status extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'status',
      group: 'admin',
      memberName: 'status',
      description: 'Checks status of the configured channels',
      details: 'Shows configuration of both request and receive channels',
      examples: ['status'],
      guildOnly: true
    })
  }

  run(msg) {
    const reqChannel = this.client.provider.get(msg.guild, 'channel.request')
    const recChannel = this.client.provider.get(msg.guild, 'channel.receive')

    let reply = '```diff\n'
    reply += reqChannel
      ? `+ Request channel is configured (${reqChannel})`
      : '- Request channel is NOT configured!!!'
    reply += '\n'
    reply += recChannel
      ? `+ Receive channel is configured (${recChannel})`
      : '- Receive channel is NOT configured!!!'
    reply += '\n\n'
    if (/-/.exec(reply))
      reply += '- The bot will NOT function without both channels configured!'
    else reply += '+ The bot is 100% functional!'

    reply += '\n```'
    msg.reply(reply)
  }
}
