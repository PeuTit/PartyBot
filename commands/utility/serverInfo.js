module.exports = {
	name: 'server-info',
	description: 'Get some info about the server!',
	execute(message) {
    message.channel.send(`${message.guild.name} Member: ${message.guild.memberCount}`)
	},
};