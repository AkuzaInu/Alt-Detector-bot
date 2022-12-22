const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription(`Display a user's info.`)
        .setDMPermission(false)
        .addUserOption(option =>
            option.setName('user')
            .setDescription('The user to display.')
            .setRequired(true)
        ),
    async execute(interaction, client, { generateEmbed }) {
        try {

            const user = interaction.options.getUser('user');
            const member = await interaction.guild.members.fetch(user.id);
            const data = await client.alt.getAll(interaction.guild);

            return interaction.reply({embeds: [
                generateEmbed({
                    title: `User info`,
                    description: `
**User**: ${user.tag}
**ID**: ${user.id}
**Bot**: ${user.bot ? 'Yes' : 'No'}
**Created at**: <t:${(user.createdTimestamp/1000).toFixed(0)}:R>
**Joined at**: <t:${(member.joinedTimestamp/1000).toFixed(0)}:R>
**Whitelisted**: ${data.whitelist.includes(user.id) ? 'Yes' : 'No'}
**Booster**: ${member.premiumSinceTimestamp ? `Since <t:${(member.premiumSinceTimestamp/1000).toFixed(0)}:R>` : 'No'}`,
                    thumbnail: user.displayAvatarURL()
                })
            ], ephemeral: true})

        }

        catch (err) {
            console.error('userinfoSlashcommand#Failed: ', err);
            return interaction.reply({content: 'An error occurred.', ephemeral: true});
        }
    }
}