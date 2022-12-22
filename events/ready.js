const { Token } = require(`${process.cwd()}/config.json`);
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');

module.exports = async (client) => {
    console.log('Ready!');

	const CLIENT_ID = client.user.id;
	const GUILD_ID = '956983778499264552';

	const rest = new REST({
		version: "10"
	}).setToken(Token);

	(async () => {
		try {
			await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
				{ body: client.commandsArr},
			);

			console.log('Successfully reloaded application (/) commands.');
		}

		catch (err) {
			console.log(`ApplicationCommandLoading#Failed: ${err}`);
		}
	})();
}
