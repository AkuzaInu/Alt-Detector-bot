const Keyv = require('keyv');

class Database extends Keyv {
    constructor (path) {
        super(`sqlite://${path}`);

        this.default = {
            days: 30,
            action: 1, // 0=nothing(just for logging) 1=kick 2=ban
            logchannel: undefined,
            actionmessage: `I detected you as a Alt Account, so you were removed from **<guild>**.`,
            mail: true,
            whitelist: []
        }
    }

    async get (id) {
        let data = await super.get(id);
        if (!data) {
            await super.set(id, this.default)
            return this.default;
        }
        return data;
    }

    async clear (id) {
        await super.clear(id);
        return true;
    }

    async set (id, type, value) {
        let data = await super.get(id);
        if (!data) {
            this.default[type] = value;
            await super.set(id, this.default);
            return true;
        }
        
        data[type] = value;
        await super.set(id, data);
        return true;
    }
}

module.exports = Database;