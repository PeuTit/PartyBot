module.exports = {
  name: "pyramide",
  description: "Create a pyramide",
  usage: "<user> <size>",
  args: true,
  execute(message, args) {
    const data = [];
    const defaultSize = 5;

    if (!args.length) {
      return message.reply("You need to tag an user!");
    }

    if (!args[1]) {
      args[1] = defaultSize;
    }

    if (isNaN(args[1])) {
      return message.reply("This is not a number!");
    }

    const pyramideSize = args[1];

    for (let index = 1; index < pyramideSize; index++) {
      data.push(args[0].repeat(index));
    }

    const reverseData = [...data];
    data.push(args[0].repeat(args[1] || defaultSize));
    reverseData.reverse();
    const finalData = [...data, ...reverseData];

    return message.channel.send(finalData, { split: true });
  },
};
