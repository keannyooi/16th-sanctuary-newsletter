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
    "1318417072270606417",
];
/*
// test
const outputChannelId = "1185803977623863356"; 
const inputChannelIds = ["1185798622772744274"];
*/


function getRandomAnnouncement(source) {
    const humor = [
        // arcaea references
        `And in that light, I find ${source} news`,
        `${source} News...it's behind you`,
        `Her chest is leashed. A line of ${source} news flies from the darkness and wraps her chest in a pointed embrace.`,
        `Fire burns this ${source} update away, but her chest is leashed again`,
        `Her arms are leashed. With effort, she turns her head to read the latest update from ${source}. Her legs, her feet, her thighs are leashed.`,
        `Her stomach is leashed. Her body burns again, and ${source} news is updated again.`,
        `These shadows--these memories of ${source} are keeping her trapped`,
        `${source}... There's some black humor in ${source}.`,
        // phigros references
        `Abracadabra, ${source} news!`,
        `${source} is meant to be played, but sometimes it needs helping hands (e.g. reading their news)`,
        `Have you disabled your ${source} notifications?`,
        `This is ${source} News!`,
        `Information matters more than score for the real ${source} player.`,
        `This ${source} update reminds me of last time when I read a ${source} update`,
        `Guess how many ${source} updates are literally useful?`,
        `Fun fact: ${source} updates are ALL useless. (aren't they?)`,
        `print("${source} update 16.sanctuary");`,
        `Oh, a tip! Oh, it's a ${source} notification...`,
        `Oh! Let me choose the ${source} update to display for you...`,
        `Once upon a time, when a player plays ${source}...`,
        `Play ${source} to relax your fingers and improve brain coordination!`,
        `Hit me with the HARDCORE ${source} update!!!`,
        `Funding for this ${source} update was made possible by viewers like you`,
        // Ace Combat References
        `There's no mercy in ${source}. People live and people die. That's all there is to it.`,
        `Yo ${source}, still alive?`,
        `"Too bad buddy. This twisted game needs to be reset. We'll start over from 'Zero' with this ${source} update and entrust the future to the next generation`,
        `I finally found my reason to update. And it doesn't involve you, ${source}`,
        `So, tell me: have you found a reason to update yet?......${source}?`,
        // Meme References
        `Oooooo You Like ${source} Ur A ${source} kisser`,
        `w-where are all the u-updates for ${source}?? i need ${source} updates!`,
        // bms references
        `I'm sorry for dragging you all the way, I just hope you're interested in ${source}...`, // baa-baa-baa-baa
        `Hello-안녕-salut! Luna Fozer here bringing you an update from ${source}!`,
        `${source}: 不为所动，做更专业的报道`, // reference to chinese health ad bms made by zris and co. for bof:et
        `"In a desperate conflict, with a ruthless announcement..." (referring to ${source})`,
        `${source} information alone is not enough, we also need the meaning of that information.`,
        `Is it really wrong to like ${source} news?`, // PUPA
        `LET THE ${source} NEWS KICK!`, //bbkkbkk
        // random by sobrem & silentroom references
        `Lalalalala~la, ${source} is everupdating`,
        `Here's everything you're looking for, ${source} update!`,
        `Nothing to care, nothing to lose and ${source} is updating!`,
        `Play ${source} like you never did before!`,
        `All the joys and updates you might be wanted to but you never knew that even existed from ${source}`,
        // Minecraft References
        `Removed Herobrine from ${source}`,
        `Did you hear about the guy who saw the new ${source} update?  He was destroyed!`,
        // monty python references
        `'It's just a flesh ${source} update...`,
        `"Someday son, all this will be yours." "What, the ${source} news?"`,
        `Nobody expects the ${source} Inquisition!`,
        `“Strange women lying in ponds distributing ${source} news is no basis for a system of government.”`,
        `“I fart in your general direction. Your mother was a ${source} and your father smelt of updateberries…”`,
        `“Come and see the violence inherent in ${source}. Help! Help! I’m being updated!”`,
        `What… is the air-speed velocity of an unladen ${source} update?”`,
        `“Every update's sacred, every update's great. If a update's wasted, ${source} gets quite irate!”`,
        // takumi3 references
        `(secret report) Oh, why is ${source} news so pretty?`,
        `Nice to meet you, ${source} play³r...`,
        // lanota reference
        `News of ${source} are on your fingertips.`,
        // eris
        `All My ${source} Fellas!`,
        `Piping hot update from ${source}`,
        `EXTRA EXTRA READ ALL ABOUT ${source}`,
        `Didja hear what happened in ${source}?`,
        `Peep the newness coming from ${source}`,
        `I'm reading ${source} news!`,
        // regen
        `Hear ye, hear ye! News from ${source}!`,
        `This just in from ${source}:`,
        `This is the 16th Sanctuary, bringing in news from ${source}.`,
        `News update from ${source}:`,
        `Intel has reported from ${source}:`,
        `${source} ALERT!`,
        `Attention all rhythm gamers, ${source} needs your attention.`,
        `${source}: I'm once again asking for your time and attention.`, // bernie sanders meme reference
        `${source}, you know the drill`,
        `A reminder that you are not immune to ${source} propaganda.`,
        `Hello there, ~~General Kenobi~~ ${source} update.`,
        `Girls are now reporting ${source} news..`, // touhou loading screen gag
        // yuh
        `So true ${source} bestie`
    ];
    const randomIndex = Math.floor(Math.random() * humor.length);
    return humor[randomIndex];
}

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {
        try {
            if (!inputChannelIds.includes(message.channel.id)) return;
            if (message.type === 12) return;

            const outputChannel = await message.guild.channels.fetch(outputChannelId);
            const attachments = message.attachments.map(attachment => attachment);
            // console.log(message);

            const sentMessage = await outputChannel.send({
                content: `# **[ ${getRandomAnnouncement(message.author.username.split('#')[0].trim())} ]**` + `\n\n ${message.content}`,
                files: attachments
            });

            // Crosspost the sent message
            sentMessage.crosspost();
        } catch (error) {
            console.log(error);
        }
    }
};