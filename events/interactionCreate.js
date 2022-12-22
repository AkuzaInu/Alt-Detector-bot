const { PermissionsBitField } = require("discord.js");
const GlobalFunctions = require(`${process.cwd()}/structures/Functions`)

module.exports = async (client, interaction) => {
    try {
        const permArray = ['SendMessages', 'SendMessagesInThreads', 'BanMembers', 'KickMembers'];

        if (!interaction.guild.members.me.permissions.has([
            PermissionsBitField.Flags.SendMessages, 
            PermissionsBitField.Flags.SendMessagesInThreads,
            PermissionsBitField.Flags.BanMembers,
            PermissionsBitField.Flags.KickMembers
        ])) {
            return interaction.reply({content: `I am missing permissions, make sure I have \`${permArray.join('\`, \`')}\``})
        }
        const fs = new GlobalFunctions(client.config);

        if (!interaction.isCommand()) return
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        command.execute(interaction, client, fs);
    }

    catch (err) {
        console.log(err);
    }
}