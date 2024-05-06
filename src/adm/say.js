const Discord = require("discord.js");

module.exports = {
    name: "falar",
    description: "Comando teste",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [{
        name: "fale",
        description: "O que eu devo falar",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    }],

    run: async (bot, inter) => {
        let res = await inter.options.getString("fale");
        await inter.editReply(res);
    } 
}