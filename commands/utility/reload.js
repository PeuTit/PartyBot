const fs = require("fs");

module.exports = {
  name: "reload",
  description: "reload a command after change in the code",
  usage: "command",
  args: true,
  execute(message, args) {
    const commandName = args[0].toLowerCase();
    const command =
      message.client.commands.get(commandName) ||
      message.client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) {
      return message.reply(
        `There is no command with name or alias \`${commandName}\``
      );
    }

    const commandFolders = fs.readdirSync("./commands");

    const folderName = commandFolders.find((folder) =>
      fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`)
    );

    const commandPath = `../${folderName}/${command.name}.js`;

    delete require.cache[require.resolve(commandPath)];

    try {
      const newCommand = require(commandPath);
      message.client.commands.set(newCommand.name, newCommand);
      message.reply(`Command \`${newCommand.name}\` was reloaded!`);
    } catch (err) {
      console.log(err);
      message.reply(
        `There was an error reloading the command \`${command.name}\`: \n\`${err.message}\``
      );
    }
  },
};
