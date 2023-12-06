"use strict";

require("dotenv").config();
const { readdirSync } = require("node:fs");
const { join } = require("node:path");
const { Client, Collection, GatewayIntentBits } = require("discord.js");

const eventFolderPath = join(__dirname, "src/events");
const eventFolder = readdirSync(eventFolderPath);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ]
});
client.events = new Collection();

for (const eventFile of eventFolder) {
    const eventPath = join(eventFolderPath, eventFile);
    const event = require(eventPath); 
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(process.env.BOT_TOKEN);