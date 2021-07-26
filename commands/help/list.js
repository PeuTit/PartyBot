module.exports = {
  name: "list",
  description: "List of all of the bot commands",
  aliases: ["commands"],
  execute(message) {
    const { commands } = message.client;

    const embedMessage = {
      color: 0x0099ff,
      title: this.description,
      fields: [],
    };

    commands.map((command) => {
      embedMessage.fields.push({
        name: command.name,
        value: command.description,
      });
    });

    message.channel.send({ embed: embedMessage });
  },
};
