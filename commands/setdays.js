const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setdays')
        .setDescription(`Set the minimum amount of days the user's account has to exist to be allowed in.`)
        .setDMPermission(false)
        .addNumberOption(option =>
            option.setName('days')
            .setDescription('The amount of days.')
            .setRequired(true)
        ),
    async execute(interaction, client, { generateEmbed }) {
        try {

            const days = interaction.options.getNumber('days');

            return await client.alt.setDays(interaction.guild, days) ?
            interaction.reply({embeds: [
                generateEmbed({
                    title: '⚙️ | Setting changed',
                    description: `Changed minimum amount of days to \`${days}\` days.`,
                })
            ], ephemeral: true}) :
            interaction.reply({embeds: [
                generateEmbed({
                    description: 'Oops! Looks like something went wrong.'
                })
            ], ephemeral: true});

        }

        catch (err) {
            console.error('setdaysSlashcommand#Failed: ', err);
            return interaction.reply({content: 'An error occurred.', ephemeral: true});
        }

    }
}