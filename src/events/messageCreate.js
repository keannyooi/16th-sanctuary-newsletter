"use strict";

const { Events } = require("discord.js");

// const outputChannelId = "1178390170609918062"; rhythm-game-news
// const inputChannelIds = ["1185454559385100338", "1185454663374471278", "1185454691824435294"];
const randomHeaders = [
    "Piping hot update from",
    "Hear ye, hear ye! News from",
    "This just in:",
    "This is the 16th Sanctuary, bringing in news from",
    "News update from",
    "Intel has reported from"
];
const outputChannelId = "1185803977623863356"; // test-news
const inputChannelIds = ["1185798622772744274"];

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {
        if (!inputChannelIds.includes(message.channel.id)) return;
        if (message.type === 12) return;

        const outputChannel = await message.guild.channels.fetch(outputChannelId);
        const attachments = message.attachments.map(attachment => attachment);
        console.log(message);

        const randomIndex = Math.floor(Math.random() * randomHeaders.length)
        const sentMessage = await outputChannel.send({ 
            // TODO: add randomized funny replacements for "news update from"
            content: `**[ ${randomHeaders[randomIndex]} ${message.author.username} ]** \n\n ${message.content}`,
            files: attachments
        });

        // Crosspost the sent message
        sentMessage.crosspost();
    }
};