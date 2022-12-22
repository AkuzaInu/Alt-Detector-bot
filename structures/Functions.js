const { EmbedBuilder } = require("discord.js");
const { color } = require(`${process.cwd()}/config.json`);

class GlobalFunctions {
    constructor(config) {
        this.config = config;
    }

    generateEmbed ({title, description, footer, image, thumbnail}) {
        const embed = new EmbedBuilder()
        .setColor(color);
        
        if (title) embed.setTitle(title);
        if (description) embed.setDescription(description);
        if (footer) embed.setFooter({text: footer});
        if (thumbnail) embed.setThumbnail(thumbnail);
        if (image) embed.setImage(image);

        return embed;
    }

    generateButton ({id, label, style, emoji, url}) {
        const button = new ButtonBuilder()
            
        if (id) button.setCustomId(id);
        if (label) button.setLabel(label);
        if (style) button.setStyle(style);
        if (emoji) button.setEmoji(emoji);
        if (url) button.setURL(url);
    
        return button;
    }
}

module.exports = GlobalFunctions;