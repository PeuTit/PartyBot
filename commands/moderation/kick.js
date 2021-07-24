module.exports = {
  name: "kick",
  description: "Kick a son of a dog!",
  guildOnly: true,
  permissions: "KICK_MEMBERS",
  execute(message) {
    const taggedUser = message.mentions.users.first();

    if (!taggedUser) {
      return message.reply("You must tag an user in order to kick them");
    }

    message.channel.send(
      `You want to kick this son of a dog? ${taggedUser.username}`
    );
  },
};
