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


function getRandomAnnouncement(source) {
    const humor = [
        // eris
        `All My ${source} Fellas!`,
        `Piping hot update from ${source}`,
        `EXTRA EXTRA READ ALL ABOUT ${source}`,
        `Didja hear what happened in ${source}?`,
        `Peep the newness coming from ${source}`,
        // keanny
        `Piping hot update from ${source}`,
        `Hear ye, hear ye! News from ${source}`,
        `This just in from ${source}:`,
        `This is the 16th Sanctuary, bringing in news from ${source}`,
        `News update from ${source}`,
        `Intel has reported from ${source}`
    ];
    const randomIndex = Math.floor(Math.random() * humor.length);
    return humor[randomIndex];
}

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {
        if (!inputChannelIds.includes(message.channel.id)) return;
        if (message.type === 12) return;

        const outputChannel = await message.guild.channels.fetch(outputChannelId);
        const attachments = message.attachments.map(attachment => attachment);
        // console.log(message);

        const sentMessage = await outputChannel.send({
            content: `**[ ${getRandomAnnouncement(message.author.username.replace(/#.*$/, ''))} ]** \n\n ${message.content}`,
            files: attachments
        });

        // Crosspost the sent message
        sentMessage.crosspost();
    }
};