const dotenv = require("dotenv");
dotenv.config();

const fs = require("fs");
const { prefix } = require("./config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
console.log("start of the programs");

const commandFolders = fs.readdirSync("./commands");

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message) => {
  if (!message.content.startsWith(`${prefix}`) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) {
    return message.reply("We don't have this command!");
  }

  const command = client.commands.get(commandName);

  if (command.guildOnly && message.channel.type === "dm") {
    return message.reply("I can't execute that command here!");
  }

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.reply(reply);
  }

  // Cooldowns feature
  // Problems: I can't get back the command from the cooldowns collections
  // See the various comments to see my test

  // if (command.cooldown) {
  //   // destructuring of the cooldown collection from the client object
  //   // instead of calling client.cooldowns each time
  //   const { cooldowns } = client;

  //   if (!cooldowns.has(command.name)) {
  //     cooldowns.set(command.name, new Discord.Collection());
  //   }

  //   console.log("cooldowns", cooldowns);
  //   const now = Date.now();

  //   // using the name property from the command object
  //   // e.g. command.name: return the name of the command
  //   console.log(command.name);

  //   // geting back the command info from the cooldowns collection
  //   // with command.name
  //   console.log(cooldowns.get(command.name));
  //   // with hard coded string
  //   console.log(cooldowns.get("tki?"));

  //   // This collection is empty because I can't get the
  //   // command back from the cooldowns collection
  //   const timestamps = cooldowns.get(command.name);
  //   console.log("timestamp", timestamps);

  //   const cooldownAmount = command.cooldown * 1000;

  //   if (timestamps.has(message.author.id)) {
  //     const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

  //     if (now < expirationTime) {
  //       const timeLeft = (expirationTime - now) / 1000;
  //       return message.reply(
  //         `please wait ${timeLeft.toFixed(
  //           1
  //         )} more second(s) before reusing the \`${command.name}\` command.`
  //       );
  //     }
  //   }

  //   console.log("Cooldowns end", cooldowns);
  // }

  try {
    command.execute(message, args, commandName);
  } catch (error) {
    console.log(error);
    message.reply("An error occured! Please try again");
  }
  // if (message.author.id === '279999507327090689') {
  //   message.channel.send(`Salut ${message.author.username}`)
  // }
});

client.login(process.env.TOKEN);
