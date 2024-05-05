const Discord = require("discord.js");
const bot = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMembers, Discord.GatewayIntentBits.GuildMessages] });
const fs = require("node:fs");
const path = require("node:path");
