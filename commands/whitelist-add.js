const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whitelist-add')
        .setDescription('Add a user to the whitelist.')
        .setDMPermission(false)
        .addStringOption(option => 
            option.setName('id')
            .setDescription(`The user's id.`)
            .setRequired(true)
        ),
    async execute(interaction, client, { generateEmbed }) {
        try {

            const id = interaction.options.getString('id');

            return await client.alt.addWhitelist(interaction.guild, id) ?
            interaction.reply({embeds: [
                generateEmbed({
                    title: '📃 | Added to the whitelist',
                    description: `User with ID \`${id}\` has been added to the whitelist.`
                })
            ], ephemeral: true}) :
            interaction.reply({embeds: [
                generateEmbed({
                    description: `This user's ID has already been added to the whitelist.`
                })
            ], ephemeral: true});

        }

        catch (err) {
            console.error('whitelistaddSlashcommand#Failed: ', err);
            return interaction.reply({content: 'An error occurred.', ephemeral: true});
        }
    }
}