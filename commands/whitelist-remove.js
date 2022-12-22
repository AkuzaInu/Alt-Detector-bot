const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whitelist-remove')
        .setDescription('Remove a user to the whitelist.')
        .setDMPermission(false)
        .addStringOption(option => 
            option.setName('id')
            .setDescription(`The user's id.`)
            .setRequired(true)
        ),
    async execute(interaction, client, { generateEmbed }) {
        try {

            const id = interaction.options.getString('id');

            return await client.alt.removeWhitelist(interaction.guild, id) ?
            interaction.reply({embeds: [
                generateEmbed({
                    title: '📃 | Removed from the whitelist',
                    description: `User with ID \`${id}\` has been removed from the whitelist.`
                })
            ], ephemeral: true}) :
            interaction.reply({embeds: [
                generateEmbed({
                    description: `This user's ID has already been removed from the whitelist.`
                })
            ], ephemeral: true});

        }

        catch (err) {
            console.error('whitelistremoveSlashcommand#Failed: ', err);
            return interaction.reply({content: 'An error occurred.', ephemeral: true});
        }
    }
}