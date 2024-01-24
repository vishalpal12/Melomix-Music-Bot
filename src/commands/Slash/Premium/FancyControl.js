const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const GControl = require("../../../settings/models/Control.js");

module.exports = {
    name: "control",
    description: "Display or hide the player control button.",
    category: "Premium",
    options: [
        {
            name: "mode",
            description: "Choose display or hide",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "Display",
                    value: "display",
                },
                {
                    name: "Hide",
                    value: "hide",
                },
            ],
        },
    ],
    permissions: {
        bot: [],
        channel: [],
        user: ["ManageGuild"],
    },
    settings: {
        inVc: true,
        sameVc: true,
        player: true,
        current: false,
        owner: false,
        premium: true,
    },
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const Control = await GControl.findOne({ guild: interaction.guild.id });
        const choice = interaction.options.getString("mode");

        if (choice === "display") {
            if (!Control) {
                const Control = new GControl({ guild: interaction.guild.id, playerControl: "enable" });

                Control.save()
                    .then(() => {
                        const embed = new EmbedBuilder()
                            .setDescription(`<a:on2:1147902444953681980> | Control has been set to: \`Enable\``)
                            .setColor(client.color);

                        interaction.editReply({ embeds: [embed] });
                    })
                    .catch((err) => {
                        interaction.editReply(`An error occured while setting the player control mode!`);
                        console.log(err);
                    });
            } else if (Control) {
                Control.playerControl = "enable";

                Control.save()
                    .then(() => {
                        const embed = new EmbedBuilder()
                            .setDescription(`<a:on2:1147902444953681980> | Control has been changed to: \`Enable\``)
                            .setColor(client.color);

                        interaction.editReply({ embeds: [embed] });
                    })
                    .catch((err) => {
                        interaction.editReply(`An error occured while setting the player control mode!`);
                        console.log(err);
                    });
            }
        } else if (choice === "hide") {
            if (!Control) {
                const Control = new GControl({ guild: interaction.guild.id, playerControl: "disable" });

                Control.save()
                    .then(() => {
                        const embed = new EmbedBuilder()
                            .setDescription(`<a:off_off:1147902531792556124> | Control has been set to: \`Disable\``)
                            .setColor(client.color);

                        interaction.editReply({ embeds: [embed] });
                    })
                    .catch((err) => {
                        interaction.editReply(`An error occured while setting the player control mode!`);
                        console.log(err);
                    });
            } else if (Control) {
                Control.playerControl = "disable";

                Control.save()
                    .then(() => {
                        const embed = new EmbedBuilder()
                            .setDescription(`<a:off_off:1147902531792556124> | Control has been changed to: \`Disable\``)
                            .setColor(client.color);

                        interaction.editReply({ embeds: [embed] });
                    })
                    .catch((err) => {
                        interaction.editReply(`An error occured while setting the player control mode!`);
                        console.log(err);
                    });
            }
        }
    },
};
