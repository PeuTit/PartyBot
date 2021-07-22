const dotenv = require('dotenv');
dotenv.config();

const { prefix }= require('./config.json')
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
  if (!message.content.startsWith(`${prefix}`) || message.author.bot) return

  const args = message.content.slice(prefix.length).trim().split(/ +/)
  const command = args.shift().toLowerCase()

  if (command === 'tki?') {
    message.channel.send('toi t ki?')
  } else if (command === 'tcon?') {
    message.channel.send("Moi non mais Sacha oui. C'est pas la moitie d'un con je peux te le dire")
  } else if (command === 'pyramide') {
    message.channel.send("Let's go")
    message.channel.send('?')
    message.channel.send('??')
    message.channel.send('???')
    message.channel.send('??')
    message.channel.send('?')
    message.channel.send("J'ai la flemme de faire plus ok!")
  } else if (command === 'server') {
    message.channel.send(`${message.guild.name} Member: ${message.guild.memberCount}`)
  } else if (command === 'args-info') {
    if (!args.length) {
      return message.channel.send(`No arguments ${message.author.username}`)
    } else if (args[0] == 'foo') {
      message.channel.send('bar')
    }
    message.channel.send(`Command: ${command} Arguments: ${args}`)
  } else if (command === 'kick') {
    const taggedUser = message.mentions.users.first()

    if (!taggedUser) {
      return message.reply('You must tag an user in order to kick them')
    }

    message.channel.send(`You want to kick this son of a dog? ${taggedUser.username}`)
  } else if (command === 'avatar') {
    const taggedUser = message.mentions.users.first()

    if (!taggedUser) {
      return message.reply('You must tag an user in order to kick them')
    }

    message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: 'gif', dynamic: true})}>`)

  }

  // if (message.author.id === '279999507327090689') {
  //   message.channel.send(`Salut ${message.author.username}`)
  // }
})

client.login(process.env.TOKEN);