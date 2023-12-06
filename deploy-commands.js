"use strict";

require("dotenv").config();
const { readdirSync } = require("node:fs");
const { join } = require("node:path");
const { REST, Routes } = require("discord.js");

const commands = [];
const commandFolderPath = join(__dirname, "src/commands");
const commandFolder = readdirSync(commandFolderPath);

for (const category of commandFolder) {
    const categoryPath = join(commandFolderPath, category);
    const categoryFiles = readdirSync(categoryPath).filter(file => file.endsWith(".js"));
    for (const file of categoryFiles) {
        const commandPath = join(categoryPath, file);
        const command = require(commandPath);
        if ("data" in command && "execute" in command) {
            commands.push(command.data.toJSON());
        }
        else {
            console.log(`[WARNING] The command at ${filePath} doesn't have either a "data" or "execute" property.`);
        }
    }
}

const rest = new REST().setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        console.log(`reloading ${commands.length} slash commands...`);
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );
        console.log(`${data.length} slash commands reloaded!`);
    }
    catch (error) {
        console.error(error);
    } 
})();