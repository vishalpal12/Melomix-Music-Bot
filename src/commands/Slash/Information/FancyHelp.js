const {
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");
const { readdirSync } = require("fs");
const { supportUrl, inviteUrl, voteUrl } = require("../../../settings/config.js");

module.exports = {
    name: "help",
    description: "Anxious Help Menu.",
    category: "Information",
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
        owner: false,
        premium: false,
    },
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const row2 = new ActionRowBuilder()
            .addComponents(new ButtonBuilder().setLabel("Invite").setURL(inviteUrl).setStyle(ButtonStyle.Link))
            .addComponents(new ButtonBuilder().setLabel("Support Server").setURL(supportUrl).setStyle(ButtonStyle.Link));

        const categories = readdirSync("./src/commands/Slash/");

        const embed = new EmbedBuilder()
            .setAuthor({
                name: `${interaction.guild.members.me.displayName} Help Panel! 💖`,
                iconURL: interaction.guild.iconURL({ dynamic: true }),
            })
            .setColor(client.color)
            .setDescription(
                `👋🏻 Hey **${interaction.member}**, Me **${client.user}** \n\n<:Icon:1147907715495112804>  **__About Anxious__**\n**A best and advanced Discord-Music bots with Premium system and high quality music.** \n\n<:stats:1137416455525249044> **__Category Anxious__**\n<:information:1135759462876073984>  **Information**\n<:music:1137415986111328286>  **Music**\n<:stars:1137417390020362351>  **Premium**\n<:developer:1137416771800936518>  **Developer**\n<:playing:1137416085277249626>  **Filters**\n\n<:ping_Zyrex:1118527879282704445> **__Status Anxious__**\n<:home:1137416706537558076>  Server: **${client.guilds.cache.size}**\n<:ping:1135758846741188609>  Ping: **${Math.round(client.ws.ping)}ms**\n`
            )
            .setFooter({
                text: `Ash Coder | Anxious Planet`,
                iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp();

        const row = new ActionRowBuilder().addComponents([
            new StringSelectMenuBuilder()
                .setCustomId("help-category")
                .setPlaceholder(`Anxious`)
                .setMaxValues(1)
                .setMinValues(1)
                .setOptions(
                    categories.map((category) => {
                        return new StringSelectMenuOptionBuilder().setLabel(category).setValue(category);
                    })
                ),
        ]);

        interaction.editReply({ embeds: [embed], components: [row, row2] }).then(async (msg) => {
            let filter = (i) => i.isStringSelectMenu() && i.user && i.message.author.id == client.user.id;

            let collector = await msg.createMessageComponentCollector({
                filter,
                time: 90000,
            });

            collector.on("collect", async (m) => {
                if (m.isStringSelectMenu()) {
                    if (m.customId === "help-category") {
                        await m.deferUpdate();

                        let [directory] = m.values;

                        const embed = new EmbedBuilder()
                            .setAuthor({
                                name: `${interaction.guild.members.me.displayName} Help Command!`,
                                iconURL: interaction.guild.iconURL({ dynamic: true }),
                            })
                            .setDescription(
                                `\ \n\n**\ <:Icon:1147907715495112804>   ${
                                    directory.slice(0, 1).toUpperCase() + directory.slice(1)
                                } Commands:**\n${client.slashCommands
                                    .filter((c) => c.category === directory)
                                    .map((c) => `\`${c.name}\` : *${c.description}*`)
                                    .join("\n")}`
                            )
                            .setColor(client.color)
                            .setFooter({
                                text: `Anxious | Commands: ${
                                    client.slashCommands.filter((c) => c.category === directory).size
                                }`,
                                iconURL: client.user.displayAvatarURL({ dynamic: true }),
                            })
                            .setTimestamp();

                        msg.edit({ embeds: [embed] });
                    }
                }
            });

            collector.on("end", async (collected, reason) => {
                if (reason === "time") {
                    const timed = new EmbedBuilder()
                        .setAuthor({
                            name: `${interaction.guild.members.me.displayName} Help Panel! 💖`,
                            iconURL: interaction.guild.iconURL({ dynamic: true }),
                        })
                        .setDescription(
                            `Help Command Menu was timed out, try using \`/help\` to show the help command menu again.`
                        )
                        .setColor(client.color)
                        .setFooter({
                            text: `Anxious Planet Forever`,
                            iconURL: client.user.displayAvatarURL({ dynamic: true }),
                        })
                        .setTimestamp();

                    msg.edit({ embeds: [timed], components: [row2] });
                }
            });
        });
    },
};
