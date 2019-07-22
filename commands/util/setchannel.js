const Commando = require('discord.js-commando')

module.exports = class SetChannel extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'setchannel',
      group: 'admin',
      memberName: 'setchannel',
      description: 'Configures channels',
      details:
        'Configures channels for requesting and approving nickname changes',
      examples: ['setchannel request #request-channel'],
      guildOnly: true,
      argsPromptLimit: 2,
      args: [
        {
          key: 'type',
          label: 'Channel Type',
          prompt: 'Enter `request` or `receive` to denote the channel type.',
          type: 'string',
          error: 'Enter `request` or `receive` to denote the channel type.',
          oneOf: ['request', 'receive']
        },
        {
          key: 'channel',
          label: 'Channel',
          prompt: 'Enter the channel',
          type: 'text-channel'
        }
      ]
    })
  }

  run(msg, args) {
    try {
      switch (args.type) {
        case 'request': {
          this.client.provider.set(
            msg.guild,
            'channel.request',
            args.channel.id
          )
          msg.reply(
            `You have successfully set the \`Request\` channel to <#${args.channel.id}>`
          )
          break
        }
        case 'receive': {
          this.client.provider.set(
            msg.guild,
            'channel.receive',
            args.channel.id
          )
          msg.reply(
            `You have successfully set the \`Receive\` channel to <#${args.channel.id}>`
          )
          break
        }
        default: {
          console.error("This shouldn't be possible...")
          break
        }
      }
    } catch (error) {
      console.error(error)
      this.client.provider.remove(
        msg.guild,
        `channel.${args.type.toLowerCase()}`,
        args.channel.id
      )
      msg.reply(`Something went wrong... Please try again!`)
    }
  }
}
