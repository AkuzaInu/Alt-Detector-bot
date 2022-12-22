const Databasing = require(`${process.cwd()}/structures/Databasing`)

class Alt extends Databasing {
    constructor () {
        super(`${process.cwd()}/db.sqlite`)
    }

    /**
     * Sets the minimum days the account has to exist.
     * @param {Guild} guild The guild to set to.
     * @param {Number} value The value to set.
     * @returns {Promise<boolean>} Whether the action has succeeded.
     */
    async setDays (guild, value) {
        return await super.set(guild.id, 'days', value);
    }

    /**
     * Sets the action type.
     * @param {Guild} guild The guild to set to.
     * @param {Number} value The value to set.
     * @returns {Promise<boolean>} Whether the action has succeeded.
     */
    async setActionType (guild, value) {
        return await super.set(guild.id, 'action', value);
    }

    /**
     * Sets the action message.
     * @param {Guild} guild The guild to set to.
     * @param {String} value The value to set.
     * @returns {Promise<boolean>} Whether the action has succeeded.
     */
    async setActionMessage (guild, value) {
        return await super.set(guild.id, 'actionmessage', value);
    }

    /**
     * Sets the log channel id.
     * @param {Guild} guild The guild to set to.
     * @param {GuildChannel.id} value The value to set.
     * @returns {Promise<boolean>} Whether the action has succeeded.
     */
    async setLogChannel (guild, value) {
        return await super.set(guild.id, 'logchannel', value);
    }

    /**
     * Sets mail preference.
     * @param {Guild} guild The guild to set to.
     * @param {Boolean} value The value to set.
     * @returns {Promise<boolean>} Whether the action has succeeded.
     */
    async setMail (guild, value) {
        return await super.set(guild.id, 'mail', value)
    }

    /**
     * Adds to the whitelist
     * @param {Guild} guild The guild to set to.
     * @param {String} value The value to set.
     * @returns {Promise<boolean>} Whether the action has succeeded.
     */
    async addWhitelist (guild, value) {
        let data = await super.get(guild.id);
        if (data.whitelist.includes(value)) return false;
        data.whitelist.push(value);
        return await super.set(guild.id, 'whitelist', data.whitelist);
    }

    /**
     * Removes from the whitelist
     * @param {Guild} guild The guild to set to.
     * @param {String} value The value to set.
     * @returns {Promise<boolean>} Whether the action has succeeded.
     */
    async removeWhitelist (guild, value) {
        const data = await super.get(guild.id);
        if (data.whitelist.indexOf(value) <= -1) return false;
        data.whitelist.pop(data.whitelist.indexOf(value));
        return await super.set(guild.id, 'whitelist', data.whitelist);
    }


    /**
     * Get all data.
     * @param {Guild} guild The guild to get from.
     * @returns {Object} Database object.
     */
    async getAll (guild) {
        return await super.get(guild.id);
    }
}

module.exports = Alt