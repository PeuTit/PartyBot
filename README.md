# Party Bot

My first discord bot in javascript!

This first bot was developed using the discord.js library. 
I followed their guide to get to this results.
You can check their guide here:
https://discordjs.guide/

Prefix: %

You can get the list of commands with:

    %list
    
To invite this bot, simply click on the following link:
https://discord.com/api/oauth2/authorize?client_id=867706887100301342&scope=bot

## Usage

Start by installing the dependencies:
  
    npm install
  
Then run the bot:

    npm run start
  
You can also user `pm2` to start, stop, restart, watch changes and monitor the bot.

Don't forget to create an .env file a the root of the repo with your credentials!
Just copy the `.env.exemple` and rename it `.env`. You only need to populate the secret_id field.
You can find this id in your developer portal on discord.

https://discord.com/developers/
