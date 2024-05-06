const Discord = require("discord.js");
const bot = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMembers, Discord.GatewayIntentBits.GuildMessages] });
const fs = require("node:fs");
const path = require("node:path");
bot.slashCommands = new Discord.Collection();

const commands = [];
const source = path.join(__dirname, "./src");
const dirs = fs.readdirSync(source);
let countItens = {"files": 0, "dirs": 0};

dirs.forEach(item => {
    const allDirs = path.join(source, item);
    countItens.dirs++;

    if (fs.statSync(allDirs).isDirectory()) {
        
        itens = fs.readdirSync(allDirs).filter(f => f.endsWith(".js"));
        for (const file of itens) {
            countItens.files++;
            const content = require(path.join(allDirs, file));
            bot.slashCommands.set(content.name, content);
            commands.push(content);
        }
    }
});


/*
CLASSES
*/

class CreateInteraction {
    constructor(label, customId, style = Discord.ButtonStyle.Primary, emoji = "") {
        this.label = label;
        this.customId = customId;
        this.style = style;
        this.emoji = emoji;
    }

    Botao() {
        let button = new Discord.ButtonBuilder()
        .setLabel(this.label)
        .setCustomId(this.customId)
        .setStyle(this.style);
        
        if (this.emoji) {
            button.setEmoji(this.emoji);
        }
        
        return button;
    }
}

bot.on("ready", async () => {
    console.log(`☑ 〜 ${bot.user.username} Pronto!\n☑ 〜 ${countItens.dirs} Diretório(s) econtrado(s).\n☑ 〜 ${countItens.files} Arquivo(s) econtrado(s)`);
    await bot.application.commands.set(commands);
});

bot.on("interactionCreate", async inter => {
    try {
        await inter.deferReply().catch((_) => {});

        if (inter.user.bot) return;
        if (!inter.guild) {
            await inter.editReply({ content: `Me desculpe **${inter.user.username}**! Mas não é possivel usar Comandos na DM, tente isso em um Servidor.`, ephemeral: true });
        }
        if (inter.type === Discord.InteractionType.ApplicationCommand) {
            const cmd = await bot.slashCommands.get(inter.commandName)
            if (!cmd) return await inter.editReply(`**${inter.user.username}**, um Erro inesperado aconteceu ao Executar este Comando! Tente novamente.`);

            await cmd.run(bot, inter);
        }
    } catch(err) {
        console.error(`Um erro ocorreu:\n\n${err}`)
    }
});

bot.login(process.env.TOKEN);