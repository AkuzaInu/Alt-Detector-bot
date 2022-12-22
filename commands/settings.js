const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('settings')
        .setDescription('The display the current settings for this guild.')
        .setDMPermission(false),
    types: {
        0: 'Nothing',
        1: 'Kick',
        2: 'Ban'
    },
    async execute(interaction, client, { generateEmbed }) {
        try {

            const data = await client.alt.getAll(interaction.guild);

            if (!data) return interaction.reply({embeds: [
                generateEmbed({
                    description: 'Oops! Looks like something went wrong.'
                })
            ], ephemeral: true});


            return interaction.reply({embeds: [
                generateEmbed({
                    title: '⚙️ | Settings',
                    description: `
                    **Days**: ${data.days}
                    **Action**: ${this.types[data.action]}
                    **Mail**: ${data.mail ? 'allowed' : 'disallowed'}
                    **LogChannel**: ${data.logchannel ? await interaction.guild.channels.fetch(data.logchannel) : 'None'}`
                })
            ], ephemeral: true})
        }

        catch (err) {
            console.error('settingsSlashcommand#Failed: ', err);
            return interaction.reply({content: 'An error occurred.', ephemeral: true});
        }
    }
}