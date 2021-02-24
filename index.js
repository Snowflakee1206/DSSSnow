const { send } = require('process')

const Discord = require('discord.js'),

client = new Discord.Client({
    fetchAllMembers: true,
    partials: ['MESSAGE', 'REACTION']
}),


config = require('./config.json')
fs = require('fs')

client.login(process.env.TOKEN)
client.commands = new Discord.Collection()




fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    })
})

client.on('message', message => {
    if (message.type !== 'DEFAULT' || message.author.bot) return

    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) return
    command.run(message, args, client)

})
 


client.on('guildMemberAdd', member => {
    member.guild.channels.cache.get(config.greeting.channel).send (`${member} a rejoint le serveur. Tu es notre ${member.guild.memberCount}ème membre ! 🎉`)
    member.roles.add(config.greeting.role)
})



client.on('ready', () => {
client.user.setActivity('Snowflakee1206 on twitch', {type: 'STREAMING', url: 'https://twitch.tv/snowflakee1206' })

})


client.on('messageReactionAdd', (reaction, user) => 
{
    if (!reaction.message.guild || user.bot) return
    const reactionRoleElem = config.reactionRole[reaction.message.id]
    if (!reactionRoleElem) return
    const prop = reaction.emoji.id ? 'id' : 'name'
    const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
    if (emoji) reaction.message.guild.member(user).roles.add(emoji.roles)
    else reactio.user.remove(user)

})
