"use strict";

const { Events } = require("discord.js");

// TODO: fill this in with webhook ids that correspond to their games
// const webhookIdDictionary = {
//     "": ""
// };
// const outputChannelId = "1178390170609918062"; rhythm-game-news
const outputChannelId = "1185803977623863356"; // test-news
const inputChannelIds = ["1185798622772744274"];
// const inputChannelIds = ["1185454559385100338", "1185454663374471278", "1185454691824435294"];

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {
        if (!inputChannelIds.includes(message.channel.id)) return;

        const outputChannel = await message.guild.channels.fetch(outputChannelId);
        const attachments = message.attachments.map(attachment => attachment);
        console.log(message);

        // TODO: replace (game) with game name obtained from webhookIdDictionary
        outputChannel.send({ 
            // TODO: add randomized funny replacements for "news update from"
            content: `**[NEWS UPDATE FROM ${message.author.username} ]** \n\n ${message.content}`,
            files: attachments
        });
    }
};