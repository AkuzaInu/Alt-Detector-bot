const { Client, Collection } = require('discord.js');
const packageJSON = require(`${process.cwd()}/package`);
const fs = require('fs');
const Alt = require(`${process.cwd()}/structures/Alt`)

class LocalClient extends Client {
    constructor(options) {
        super(options.clientOptions || {})

        this.commands = new Collection();
        this.commandsArr = [];

        this.config = options.config ? require(options.config) : {};

        this.commandFiles = fs.readdirSync(`${process.cwd()}/commands`).filter(file => file.endsWith('.js'));
        this.eventFiles = fs.readdirSync(`${process.cwd()}/events`).filter(file => file.endsWith('.js'));

        console.log(`Client initialised. You are using discord.js version ${packageJSON.dependencies["discord.js"]}`);

    }

    build(token) {
        this.login(token);
        this.alt = new Alt();

        return this;
    }

    loadCommands(path) {
        for (const file of this.commandFiles) {
            const command = require(`${path}/${file}`);

            if (command.data) {
                this.commandsArr.push(command.data.toJSON());
                this.commands.set(command.data.name, command);
            }

            else {
                continue;
            }
        }

        return this;
    }

    loadEvents(path) {
        for (const file of this.eventFiles) {
            const event = require(`${path}/${file}`);

            this.on(file.split('.')[0], event.bind(null, this));
        }

        return this;
    }

    
}

module.exports = LocalClient;