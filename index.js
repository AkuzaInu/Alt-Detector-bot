const Client = require(`${process.cwd()}/structures/Client`);
const { GatewayIntentBits, Partials } = require('discord.js');

const client = new Client ({
    config: `${process.cwd()}/config.json`,
    clientOptions: {
        intents: [
            GatewayIntentBits.Guilds, 
            GatewayIntentBits.GuildMessages,  
            GatewayIntentBits.GuildMembers
        ],
        partials: [
            Partials.Message, 
            Partials.Channel, 
        ]
    }
});

client.build(client.config.Token);
client.loadCommands(`${process.cwd()}/commands`);
client.loadEvents(`${process.cwd()}/events`);

module.exports = client;