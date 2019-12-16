const Commando = require('discord.js-commando')

module.exports = class Request extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'request',
      group: 'commands',
      memberName: 'request',
      description: 'Requests a nickname change',
      details:
        'Requests a nickname change that must be approved by a moderator.',
      examples: ['request NewAwesomeNickname'],
      guildOnly: true,
      userPermissions: ['SEND_MESSAGES'],
      argsPromptLimit: 0,
      argsType: 'single'
    })
  }

  run(msg, newName) {
    // TODO: Check if both channels are configured
    if (newName.length > 32)
      return msg.reply('Your nickname must be 32 or fewer characters!')
    console.log(newName)
  }
}
