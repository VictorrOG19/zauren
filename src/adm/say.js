const Discord = require("discord.js");
const { Interaction } = require("../../index.js")

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
        let button = new Interaction("Botão", "botao", Discord.ButtonStyle.Primary, "📢");
    let row = new Discord.ActionRowBuilder().addComponents(button.Botao());
        
        await inter.editReply({ content: `Olá **${inter.user.username}**`, components: [row] });
    } 
}