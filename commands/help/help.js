const { prefix } = require("../../config.json");

module.exports = {
  name: "help",
  description: "Info about a specific command",
  usage: "<command>",
  execute(message, args) {
    const { commands } = message.client;

    if (!args.length) {
      return message.reply("You need to specify a command!");
    }

    const commandName = args[0].toLowerCase();

    const command =
      commands.get(commandName) ||
      commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) {
      return message.reply("We don't have this command!");
    }

    // inside a command, event listener, etc.
    const embedMessage = {
      color: 0x0099ff,
      title: command.name,
      fields: [],
    };

    if (command.description) {
      embedMessage.description = command.description;
    }
    if (command.aliases) {
      embedMessage.fields.push({
        name: "Aliases",
        value: command.aliases.join(", "),
      });
    }
    if (command.usage) {
      embedMessage.fields.push({
        name: "Usage",
        value: `${prefix}${command.name} ${command.usage}`,
      });
    }
    if (command.cooldown) {
      embedMessage.fields.push({
        name: "Cooldown",
        value: command.cooldown,
      });
    }

    message.channel.send({ embed: embedMessage });
  },
};
