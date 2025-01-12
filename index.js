require('dotenv').config();
const {Client,GatewayIntentBits} = require('discord.js');

// Create a bot client with specific intents.

const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent] });  //virtual client(suppose as virtual browser) to work with our server.

// const EventEmitter = require('events');

// const urlEmitter = new EventEmitter();



const {createShortId,startServer} = require('./shortId');
const {sendMessageToChatGPT} = require('./chatGPT.js')

startServer();

client.on('messageCreate',async(message)=>{
    if(message.author.bot){
        // means agar message ka author bot ha toh kuch mt kro nhi toh woh baar baar reply krega.
        return;
    }
    if(message.content.startsWith('create')){
         url = message.content.split('create')[1];

         let newUrl = url.trim();

         // here above url will have one extra space in it.

         if(newUrl.startsWith('www.')){
            newUrl = "https://"+ url.trim();            
         }

         const shortId = await createShortId(newUrl); // as createShortId is async so it returns promise so to resolve it use await.

        //  urlEmitter.emit('urlUpdated', url);
        return message.reply({
            content: 'Short ID for' + url + ' is:  '+ `http://localhost:7009/${shortId}`,
        })
    }
    if(message.content.startsWith('chatGPT')){
        const prompt = message.content.split('chatGPT')[1].trim();
        const response = await sendMessageToChatGPT(prompt);
        return message.reply({
            content: `ChatGPT says:\n ${response}`,
        });
          
    }
    message.reply({
        content: "Hi From bot."
    });
    
}) 

//created for returning something when a command that is set by us first by setting command.js file full then calling node command.js to set the commands on discord server and then refreshing the page and typing /ping as it is the command set by us and pressing enter, so to get it's reply we create this event.

//event listener -->
// The interactionCreate event listener in Discord.js is triggered whenever an interaction occurs within your bot's environment. Interactions are events that happen when a user directly interacts with your bot, such as using slash commands, clicking buttons, selecting options in a select menu, or interacting with other components. 

client.on('interactionCreate',(interaction)=>{
     return interaction.reply("Pong!");
     
})

//login kiya ha jha.
//The token is a unique key that identifies your bot. When you call client.login(token), Discord verifies that the token is valid and belongs to your bot.
const token = process.env.AUTH_TOKEN;
 
client.login(token); 

// module.exports = {urlEmitter};