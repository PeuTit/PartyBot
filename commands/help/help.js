const { prefix } = require("../../config.json");

module.exports = {
  name: "help",
  aliases: ["commands"],
  description: "List of all of the bot commands or info about a specific one",
  usage: "[command name]",
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

    data.push(`**Name:** ${command.name}`);

    if (command.aliases) {
      data.push(`**Aliases:** ${command.aliases.join(", ")}`);
    }
    if (command.description) {
      data.push(`**Description:** ${command.description}`);
    }
    if (command.usage) {
      data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
    }
    if (command.cooldown) {
      data.push(`**Cooldown:** ${command.cooldown} seconds`);
    }

    message.channel.send(data, { split: true });
  },
};
