const Discord = require('discord.js');
const fs = require('fs');
const { client } = require('../client');
const config = require('../config');

module.exports = async (client_) => {

    client.mcommands = new Discord.Collection();

    const commandFolders = fs.readdirSync('./src/commands');

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./src/commands/mod`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../commands/mod/${file}`);
            client.mcommands.set(command.name, command);
        }
    }

    client.on('messageCreate', async (message) => {

        if (!message.content.startsWith(config.bot.prefix) || message.author.bot) return;
        if (message.channel.type == 'DM') return;

        if (!config.bot.admins.includes(message.author.id)) return;

        const args = message.content.slice((config.bot.prefix).length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.mcommands.get(commandName)
            || client.mcommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        command.execute(client, message, args);

    });

}