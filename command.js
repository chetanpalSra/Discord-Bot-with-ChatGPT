require('dotenv').config();
import { REST, Routes } from 'discord.js';

//This code is used to register slash commands (commands that users can invoke with /) for your Discord bot using the Discord API and Discord.js.


const commands = [
    {
      name: 'create',
      description: 'Create short Url id.',
    },
    {
        name: 'ping',
        description: 'Reply!Pong.',
    }
  ];

const TOKEN = process.env.AUTH_TOKEN;

const rest = new REST({ version: '10' }).setToken(TOKEN);


(async()=>{try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands('1321571712466423901'), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}
})();

// above function is IIFE(immediately invoked function).

//This file register commands for us.


// This code is used to register slash commands (commands that users can invoke with /) for your Discord bot using the Discord API and Discord.js.

// Here's a breakdown of each part of the code:

// 1. Importing Necessary Modules
// javascript
// Copy code
// import { REST, Routes } from 'discord.js';
// REST: A class from discord.js that allows you to make HTTP requests to the Discord API.
// Routes: Contains various utility functions to get specific API endpoints, like registering commands.
// 2. Define Commands
// javascript
// Copy code
// const commands = [
//     {
//         name: 'ping',
//         description: 'Replies with Pong!',
//     },
// ];
// commands is an array that holds the slash commands you want to register. In this case, it's a simple command called ping with the description "Replies with Pong!".
// 3. Token Setup

// const TOKEN = 'YOUR_BOT_TOKEN';
// This is the bot's authentication token that Discord uses to identify your bot.
// Important: You should never share your bot token publicly because it allows others to control your bot. Make sure to keep it secret!
// 4. REST Client Setup

// const rest = new REST({ version: '10' }).setToken(TOKEN);
// rest is an instance of the REST class, set up to use the bot’s token.
// The { version: '10' } option indicates that you're using the v10 version of the Discord API.
// setToken(TOKEN) ensures that all requests made by the rest client will include your bot's token for authentication.
// 5. Register Commands
// await rest.put(Routes.applicationCommands('1321571712466423901'), { body: commands });
// This line sends a PUT request to the Discord API to register or refresh the slash commands for your bot.
// Routes.applicationCommands('1321571712466423901'):
// This is the API endpoint for registering application (slash) commands for a specific bot.
// '1321571712466423901' is your bot’s client ID. 
// The { body: commands } part sends the commands you defined earlier in the commands array as the request body.
// 6. Logging and Error Handling
// javascript
// Copy code
// console.log('Started refreshing application (/) commands.');

// console.log('Successfully reloaded application (/) commands.');
// These console.log() statements let you know the process of registering the commands has started and completed successfully.
// If an error occurs during registration, it will be caught and logged using console.error(error).
// What This Code Does:
// Registers the /ping command: When users type /ping in a Discord server where your bot is present, the bot can respond with the text "Pong!" (assuming you've written a listener for the command elsewhere).
// Refreshing Commands: Every time this script runs, it updates or refreshes the commands in Discord (so if you modify your commands, you can run this again to apply the changes).