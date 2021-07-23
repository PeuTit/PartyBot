module.exports = {
	name: 'args-info',
	description: 'Get info about the args passed by the user!',
  args: true,
  usage: '<args>',
	execute(message, args, command) {
    if (args[0] == 'foo') {
      message.channel.send('bar')
    }
    message.channel.send(`Command: ${command} Arguments: ${args}`)
	},
};