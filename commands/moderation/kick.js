module.exports = {
  name: "kick",
  usage: "<username>",
  description: "Kick a son of a dog!",
  guildOnly: true,
  permissions: "KICK_MEMBERS",
  args: true,
  execute(message, args) {
    if (!args.length) {
      return message.reply("You need to tag an user!");
    }

    message.channel.send(`You want to kick this son of a dog? ${args}`);
  },
};
