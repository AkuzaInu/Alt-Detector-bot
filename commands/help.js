const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Display the help panel.')
        .setDMPermission(false),
    async execute(interaction, client, { generateEmbed }) {
        try {
            const commandArray = [];
            client.commandsArr.forEach(cmd => commandArray.push(cmd.name))

            return interaction.reply({embeds: [
                generateEmbed({
                    author: {name: client.user.username, image: client.user.displayAvatarURL()},
                    title: 'Help panel',
                    description: `
**Commands**
\`${commandArray.filter(x => x !== 'help').join('\`, \`')}\``
                })
            ], ephemeral: true})

        }

        catch (err) {
            console.error('helpSlashcommand#Failed: ', err);
            return interaction.reply({content: 'An error occurred.', ephemeral: true});
        }

    }
}