const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setmail')
        .setDescription(`Set whether the bot should mail the alt accounts against whom an action was performed.`)
        .setDMPermission(false)
        .addBooleanOption(option => 
            option.setName('allow')
            .setDescription('Whether the bot should send a message to alt accounts.')
            .setRequired(true)
        ),
    async execute(interaction, client, { generateEmbed }) {
        try {
            const allow = interaction.options.getBoolean('allow');

            return await client.alt.setMail(interaction.guild, allow) ?
            interaction.reply({embeds: [
                generateEmbed({
                    title: '⚙️ | Setting changed',
                    description: `Changed mail preference to \`${allow}\`.` 
                })
            ], ephemeral: true}) :
            interaction.reply({embeds: [
                generateEmbed({
                    description: 'Oops! Looks like something went wrong.'
                })
            ], ephemeral: true});
        }

        catch (err) {
            console.error('setmailSlashcommand#Failed: ', err);
            return interaction.reply({content: 'An error occurred.', ephemeral: true});
        }
    }
}