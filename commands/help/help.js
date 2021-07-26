const { prefix } = require("../../config.json");

module.exports = {
  name: "help",
  aliases: ["commands"],
  description: "List of all of the bot commands or info about a specific one",
  usage: "<command>",
  execute(message, args) {
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
      data.push("Here's the list of all my commands:");
      data.push(commands.map((command) => command.name).join(", "));
      data.push(
        `You can send ${prefix}${this.name} ${this.usage} to get info on a specific command`
      );

      return message.author
        .send(data, { split: true })
        .then(() => {
          if (message.channel.type === "dm") return;
          message.reply("I have sent you a DM");
        })
        .catch((error) => {
          console.log(error);
          message.reply("I can't send you a DM! Have you disabled them?");
        });
    }

    const commandName = args[0].toLowerCase();

    const command =
      commands.get(commandName) ||
      commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) {
      return message.reply("We don't have this command!");
    }

    // inside a command, event listener, etc.
    const exampleEmbed = {
      color: 0x0099ff,
      title: command.name,
      author: {
        name: message.client.user.tag,
      },
      fields: [],
    };

    if (command.description) {
      exampleEmbed.description = command.description;
    }
    if (command.aliases) {
      exampleEmbed.fields.push({
        name: "Aliases",
        value: command.aliases.join(", "),
      });
    }
    if (command.usage) {
      exampleEmbed.fields.push({
        name: "Usage",
        value: `${prefix}${command.name} ${command.usage}`,
      });
    }
    if (command.cooldown) {
      exampleEmbed.fields.push({
        name: "Cooldown",
        value: command.cooldown,
      });
    }

    message.channel.send({ embed: exampleEmbed });
  },
};
