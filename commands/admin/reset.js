const Commando = require('discord.js-commando')

module.exports = class Reset extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'reset',
      group: 'admin',
      memberName: 'reset',
      description: 'Resets the configuration',
      details: 'Resets both channel configurations for the guild',
      examples: ['reset'],
      guildOnly: true,
      userPermissions: ['ADMINISTRATOR']
    })
  }

  run(msg) {
    // TODO: Add confirmation
    this.client.provider.remove(msg.guild, 'channel.request')
    this.client.provider.remove(msg.guild, 'channel.receive')
    msg.reply('Reset the configuration')
  }
}
