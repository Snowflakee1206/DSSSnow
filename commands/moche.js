const { Message } = require("discord.js");

module.exports = {

    run: message => message.channel.send('tu es vraiment très moche'),
    name: 'insulte'

}