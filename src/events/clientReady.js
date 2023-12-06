"use strict";

const { ActivityType: { Watching }, Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        client.user.setActivity("for rhythm game news 24/7", { type: Watching });
        console.log("Welcome to the Rhythm Game Round-up Live Show, I'm your host Michiko and let's get the live coverage started!");
    }
};