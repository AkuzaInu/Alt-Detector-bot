module.exports = async (client, guild) => {
    try {
        const data = await client.alt.clearData(guild);
        if (!data) console.log(`Could not clear data from guild ${guild.id}`);
    }

    catch (err) {
        console.error('guilddeleteEvent#Failed: ', err);
    }
}