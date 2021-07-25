module.exports = {
  name: "avatar",
  usage: "<user>",
  aliases: ["icon", "pfp"],
  description: "Show the avatar picture of a user (or a list of users)!",
  // TODO: Refactor using args
  execute(message) {
    if (!message.mentions.users.size) {
      return message.channel.send(
        `Your avatar: <${message.author.displayAvatarURL({
          format: "png",
          dynamic: true,
        })}>`
      );
    }

    const avatarList = message.mentions.users.map((user) => {
      return `${user.username}'s avatar: <${user.displayAvatarURL({
        format: "png",
        dynamic: true,
      })}>`;
    });

    message.channel.send(avatarList);
  },
};
