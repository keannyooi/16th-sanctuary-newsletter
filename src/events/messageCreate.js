"use strict";

const { Events } = require("discord.js");

// const outputChannelId = "1178390170609918062"; rhythm-game-news
// const inputChannelIds = ["1185454559385100338", "1185454663374471278", "1185454691824435294"];
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

        outputChannel.send({ 
            // TODO: add randomized funny replacements for "news update from"
            content: `**[NEWS UPDATE FROM ${message.author.username} ]** \n\n ${message.content}`,
            files: attachments
        });
    }
};