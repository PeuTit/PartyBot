const dotenv = require('dotenv');
dotenv.config();
// ... client setup (keep reading)
client.login(process.env.TOKEN);

const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.login('your-token-goes-here');