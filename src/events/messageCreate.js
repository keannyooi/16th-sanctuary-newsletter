"use strict";

const { Events } = require("discord.js");

// TODO: fill this in with webhook ids that correspond to their games
// const webhookIdDictionary = {
//     "": ""
// };
const outputChannelId = "1180735274838397059";
const inputChannelIds = ["1180735158261915702", "1180735220631228527", "1180735239530754119"];
// TODO: change these channel ids to the actual channel ids in the server once you're done testing

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {
        if (!inputChannelIds.includes(message.channel.id)) return;

        const outputChannel = await message.guild.channels.fetch(outputChannelId);
        const attachments = message.attachments.map(attachment => attachment);

        // TODO: replace (game) with game name obtained from webhookIdDictionary
        outputChannel.send({
            content: `**[NEWS UPDATE FROM (game)]** \n\n ${message.content}`,
            files: attachments
        });
    }
};