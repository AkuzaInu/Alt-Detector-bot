const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setactiontype')
        .setDescription('Set the type of action to perform on alt accounts.')
        .setDMPermission(false)
        .addNumberOption(option =>
            option.setName('type')
            .setDescription('The type of action.')
            .setRequired(true)
            .addChoices(
                { name: 'Nothing', value: 0 },
                { name: 'Kick', value: 1 },
                { name: 'Ban', value: 2 }
            )
        ),
    types: {
        0: 'Nothing',
        1: 'Kick',
        2: 'Ban'
    },
    async execute(interaction, client, { generateEmbed }) {
        try {

            const type = interaction.options.getNumber('type');

            return await client.alt.setActionType(interaction.guild, type) ?
            interaction.reply({embeds: [
                generateEmbed({
                    title: '⚙️ | Setting changed',
                    description: `Changed action type to \`${this.types[type]}\`.` 
                })
            ], ephemeral: true}) :
            interaction.reply({embeds: [
                generateEmbed({
                    description: 'Oops! Looks like something went wrong.'
                })
            ], ephemeral: true})
        }

        catch (err) {
            console.error('setactiontypeSlashcommand#Failed: ', err);
            return interaction.reply({content: 'An error occurred.', ephemeral: true});
        }
    }
}