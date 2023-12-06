"use strict";

require("dotenv").config();
const { REST, Routes } = require("discord.js");
const rest = new REST().setToken(process.env.BOT_TOKEN);

const commandIdToDelete = "command id here";
rest.delete(Routes.applicationGuildCommand(process.env.CLIENT_ID, process.env.GUILD_ID, commandIdToDelete))
    .then(() => console.log(`Successfully deleted the command of ID ${commandIdToDelete}`))
    .catch(console.error);