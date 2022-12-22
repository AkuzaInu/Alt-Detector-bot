const GlobalFunctions = require(`${process.cwd()}/structures/Functions`);
const types = {
    0: 'nothing',
    1: 'kick',
    2: 'ban'
}

module.exports = async (client, member) => {
    const fs = new GlobalFunctions(client.config);
    try {
        const data = await client.alt.getAll(member.guild);
        const time = Number(data.days) * 24 * 60 * 60 * 1000;
        
        if ((member.joinedTimestamp - member.user.createdTimestamp) <= time) {

            if (data.whitelist.includes(member.id)) return;

            if (data.mail) {
                await member.send({embeds: [
                    fs.generateEmbed({
                        title: '👥 | Alt account detected',
                        description: `${data.actionmessage.replace('<guild>', `\`${member.guild.name}\``)}
                        Due to the alt detection you have been ${data.action === 1 ? 'kicked' : 'banned'} from this guild.`,
                        thumbnail: member.guild.iconURL(),
                        footer: `You were detected as an alt because your account did not meet the requirement of ${data.days} days of existence.`
                    })
                ]})
            }

            if (data.action === 1) {
                if (!member.kickable) return;
                await member.kick('You were detected as an alt account by the Alt-Detector Bot.');
            }
            else if (data.action === 2) {
                if (!member.bannable) return;
                await member.ban({reason: 'You were detected as an alt account by the Alt-Detector Bot.'})
            }

            if (data.logchannel) {
                const channel = await member.guild.channels.fetch(data.logchannel);

                await channel.send({embeds: [
                    fs.generateEmbed({
                        title: '👥 | Alt account detected',
                        description: `
                        **User**: ${member.user.tag}
                        **ID**: ${member.id}
                        **Bot**: ${member.user.bot ? 'Yes' : 'No'}
                        **Created at**: <t:${(member.user.createdTimestamp/1000).toFixed(0)}:R>
                        **Joined at**: <t:${(member.joinedTimestamp/1000).toFixed(0)}:R>
                        
                        **Action**: ${types[data.action]}`,
                        thumbnail: member.displayAvatarURL(),
                        footer: `User did not meet the requirement of ${data.days} days.`
                    })
                ]});
            }

            return;
        }
    }
    catch (err) {
        console.log(`guildmemberaddEvent#Failed: ${err}`);
    }
}