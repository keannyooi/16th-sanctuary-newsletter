"use strict";

const { Events } = require("discord.js");

// prod
const outputChannelId = "1178390170609918062";
const inputChannelIds = [
    "1185454559385100338",
    "1185454663374471278",
    "1185454691824435294",
    "1185838290411200512",
    "1185839033180508180",
];
/*
// test
const outputChannelId = "1185803977623863356"; 
const inputChannelIds = ["1185798622772744274"];
*/


function getRandomAnnouncement(source) {
    const humor = [
        // eris
        `All My ${source} Fellas!`,
        `Piping hot update from ${source}`,
        `EXTRA EXTRA READ ALL ABOUT ${source}`,
        `Didja hear what happened in ${source}?`,
        `Peep the newness coming from ${source}`,
        `Piping hot update from ${source}`,
        // keanny
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