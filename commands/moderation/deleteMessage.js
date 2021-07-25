module.exports = {
  name: "delete-message",
  description: "Delete a bulk of message!",
  usage: "<number-of-message>",
  guildOnly: true,
  execute(message, args) {
    let amount = parseInt(args[0]);

    if (isNaN(amount)) {
      return message.reply("This doesn't look like a number! Try again.");
    } else if (amount < 2 || amount > 100) {
      return message.reply("You need to send a number between 2 and 100!");
    }

    amount++;
    message.channel.bulkDelete(amount, true).catch((err) => {
      return message.reply(`${err}`);
    });
  },
};
