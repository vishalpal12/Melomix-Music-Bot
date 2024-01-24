const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "owner-help",
    description: "Anxious Owner Help.",
    category: "Developer",
    permissions: {
        bot: [],
        channel: [],
        user: [],
    },
    settings: {
        inVc: false,
        sameVc: false,
        player: false,
        current: false,
        owner: true,
        premium: false,
    },
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const embed = new EmbedBuilder().setDescription(`<:Developers:1149697595879469166> Anxious Owner Commands\n\n <:stars:1137417390020362351> **Premium Commands**\`\`\`yml\n!generate : Generate premium user code.\n!unpremium : Delete user from premium.\n!list : Get list of all premium user.\`\`\`\n\n <:developer:1137416771800936518> **Developer Commands**\`\`\`yml\n!ban : Ban a user from using the bot.\n!maintenance : Maintenance mode.\n!eval : Bot eval.\`\`\``).setColor(client.color);

        return interaction.editReply({ embeds: [embed] });
    },
};

