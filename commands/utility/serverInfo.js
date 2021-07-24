module.exports = {
  name: "server-info",
  aliases: ["info"],
  guildOnly: true,
  description: "Get some info about the server!",
  execute(message) {
    message.channel.send(
      `${message.guild.name} Member: ${message.guild.memberCount}`
    );
  },
};
