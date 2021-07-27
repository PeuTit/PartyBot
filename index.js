const dotenv = require("dotenv");
dotenv.config();

const fs = require("fs");
const Discord = require("discord.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const eventPath = "./events";
const commandPath = "./commands";
const fileType = ".js";

const eventFiles = fs
  .readdirSync(eventPath)
  .filter((file) => file.endsWith(fileType));

for (const file of eventFiles) {
  const event = require(`${eventPath}/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

const commandFolders = fs.readdirSync(commandPath);

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`${commandPath}/${folder}`)
    .filter((file) => file.endsWith(fileType));
  for (const file of commandFiles) {
    const command = require(`${commandPath}/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

client.login(process.env.TOKEN);
