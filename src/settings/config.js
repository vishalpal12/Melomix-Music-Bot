require("dotenv").config();

module.exports = {
    // ⬇⬇⬇ BOT DETAILS
    token: process.env.TOKEN || "MTE5NjY4MzI3NjE3NDI0MTg0Mg.GqhzYq.X8opDF3x0tonLZU_Xfhp4ed03mLPhCB8HAdN4I",
    prefix: process.env.PREFIX || ">",
    color: process.env.EMBED_COLOR || "#fc3520",
    owner: process.env.OWNER_ID || "851741626056835092",
    guildLogs: process.env.GUILD_LOGS || "1194543842511294484",
    leaveTimeout: process.env.LEAVE_TIMEOUT || "20000",
    disableYouTube: parseBoolean(process.env.DISABLE_YOUTUBE || ""),

    // ⬇⬇⬇ PORU DETAILS
    playSource: process.env.PLAY_SOURCE || "ytsearch",
    poruOptions: {
        defaultPlatform: process.env.DEFAULT_SOURCE || "ytsearch",
        clientID: process.env.SPOTIFY_ID || "6c31645ffb004ab8b44d06f7b96d1b66",
        clientSecret: process.env.SPOTIFY_SECRET || "3618fdc0b4824cfd91a8d425dac32987",
        reconnectTries: 5,
        playlistLimit: 2, // <==== 1 = 100 TRACKS
        albumLimit: 2, // <==== 1 = 50 TRACKS
        artistLimit: 2, // <==== 1 = 50 TRACKS
        searchMarket: "us",
    },
    nodes: [
        {
            name: process.env.NODE_NAME1 || "Triped", 
            host: process.env.NODE_HOST1 || "lavalink.techpoint.world",
            port: parseInt(process.env.NODE_PORT1 || "80"),
            password: process.env.NODE_PASSWORD1 || "techpoint", 
            secure: parseBoolean(process.env.NODE_SECURE1 || "false"), // <==== LAVALINK SECURE "true/false"
            regions: process.env.NODE_REGIONS1 || [""],
        }
    ],

    // ⬇⬇⬇ LINK BOTS DETAILS
    mongoUri: process.env.MONGO_URI || "mongodb+srv://sfz6m:qa19ql@cluster0.vvri7su.mongodb.net/?retryWrites=true&w=majority", // <==== YOUR MONGODB LINK
    supportUrl: process.env.SUPPORT_URL || "https://discord.gg/6acZdKcjtk", // <==== YOUR SUPPORT SERVER LINK
    voteUrl: process.env.VOTE_URL || "https://top.gg/bot/vote", // <==== YOUR VOTE URL
    inviteUrl: process.env.INVITE_URL || "https://discord.gg/6acZdKcjtk", // <==== YOUR BOT INVITE LINK
    imageUrl: process.env.IMAGE_URL || "https://cdn.discordapp.com/attachments/1196488493136871595/1196529104950923355/download_1.jpeg?ex=65b7f591&is=65a58091&hm=6e98c6fba1df31ea4413a6d224e08bd7ffbb16934b5b91db9a62538e24b03455&", // <==== YOUR IMAGE LINK 
};

function parseBoolean(value) {
    if (typeof value === "string") {
        value = value.trim().toLowerCase();
    }
    switch (value) {
        case true:
        case "true":
            return true;
        default:
            return false;
    }
}