const { prefix } = require("../config.json");

module.exports = {
  name: "message",
  execute(message, client) {
    console.log(
      `${message.author.tag} in #${message.channel.name} sent: ${message.content}`
    );

    // client.on("message", (message) => {
    if (!message.content.startsWith(`${prefix}`) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) {
      return message.reply("We don't have this command!");
    }

    if (command.guildOnly && message.channel.type === "dm") {
      return message.reply("I can't execute that command here!");
    }

    if (command.permissions) {
      const authorParams = message.channel.permissionsFor(message.author);
      if (!authorParams || authorParams.has(command.permissions)) {
        return message.reply("You can't do that!");
      }
    }

    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`;

      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
      }

      return message.reply(reply);
    }

    try {
      command.execute(message, args, commandName);
    } catch (error) {
      console.log(error);
      message.reply("An error occured! Please try again");
    }
    // if (message.author.id === '279999507327090689') {
    //   message.channel.send(`Salut ${message.author.username}`)
    // }
    // });
  },
};
