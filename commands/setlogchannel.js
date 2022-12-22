const { SlashCommandBuilder, ChannelType, PermissionsBitField } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setlogchannel')
        .setDescription('Set the channel to log actions against alt accounts.')
        .setDMPermission(false)
        .addChannelOption(option =>
            option.setName('channel')
            .setDescription('The channel to set.')
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText)
        ),
    async execute(interaction, client, { generateEmbed }) {
        try {
            const channel = interaction.options.getChannel('channel');

            if (!await interaction.guild.members.me.permissionsIn(channel).has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({content: `I am not allowed to send messages in ${channel}`, ephemeral: true});

            return await client.alt.setLogChannel(interaction.guild, channel.id) ?
            interaction.reply({embeds: [
                generateEmbed({
                    title: '⚙️ | Setting changed',
                    description: `Changed log channel to ${channel}.` 
                })
            ], ephemeral: true}) :
            interaction.reply({embeds: [
                generateEmbed({
                    description: 'Oops! Looks like something went wrong.'
                })
            ], ephemeral: true});
        }

        catch (err) {
            console.error('setlogchannelSlashcommand#Failed: ', err);
            return interaction.reply({content: 'An error occurred.', ephemeral: true});
        }
    }
}