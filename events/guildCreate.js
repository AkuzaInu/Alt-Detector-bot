const GlobalFunctions = require(`${process.cwd()}/structures/Functions`);
const { ChannelType, PermissionsBitField, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = async (client, guild) => {
    const fs = new GlobalFunctions(client.config);
    try {
        const channel = guild.channels.cache.find(channel => channel.type === ChannelType.GuildText && guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages));
        const button = fs.generateButton({
            label: 'Need help?',
            style: ButtonStyle.Link,
            url: 'https://discord.gg/tCMM4AJqxc'
        });

        channel.send({embeds: [
            fs.generateEmbed({
                thumbnail: client.user.displayAvatarURL(),
                description: `
Thank you for inviting **Alt Detector** to your server!
                
This bot uses slash commands so in order to interact with it you need to write a \`/\` in chat.
You can then click on the bot's avatar to view all available commands.
                
No setup is needed, but a *little* setup is **advised**.
Use \`/setlogchannel\`, \`/setdays\`, \`/setactiontype\` and \`/setmail\` to set it all up.
                
*If you need help with anything, please join our support server, by clicking the button below.*`
            })
        ], components: [new ActionRowBuilder().addComponents(button)]});
    }

    catch (err) {
        console.error('guildcreateEvent#Failed: ', err);
    }
}