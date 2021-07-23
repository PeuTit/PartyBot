module.exports = {
	name: 'avatar',
	description: 'Show the avatar picture of a user (or a list of users)!',
	execute(message) {
    if (!message.mentions.users.size) {
      return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: 'png', dynamic: true })}>`)
    }

    const avatarList = message.mentions.users.map(user => {
      return `${user.username}'s avatar: <${user.displayAvatarURL({ format: 'png', dynamic: true })}>`
    })

    message.channel.send(avatarList)
	},
};