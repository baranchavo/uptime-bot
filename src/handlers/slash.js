const Discord = require('discord.js');
const fs = require('node:fs');
const { client } = require('../client');
const { DatabaseSchemes } = require('../database');

module.exports = async (client_) => {

    client.commands = new Discord.Collection();
    for (var file in fs.readdirSync('./src/commands/general')) {
        client.commands.set(
            require(`../commands/general/${fs.readdirSync('./src/commands/general')[file]}`).name,
            require(`../commands/general/${fs.readdirSync('./src/commands/general')[file]}`)
        );
    }
    var files = client.commands.map(a => {
        return { name: a.name, description: a.description, options: a.options };
    });

    client.on('ready', async () => {
        client.application.commands.set(files);
        console.log(client.commands.size + ' application commands loaded');
    });

    client.on('interactionCreate', (interaction) => {
        if (!interaction.isCommand()) return;
        if (!client.commands.get(interaction.commandName)) return;
        if (interaction.channel.type == 'DM') return;
        if (DatabaseSchemes.blacklist.get('blacklist')?.includes(interaction.user.id)) return;

        interaction.selectedValue = (interaction.options._hoistedOptions[0]) ? interaction.options._hoistedOptions[0].value : undefined;
        const cmd = client.commands.get(interaction.commandName);
        cmd.execute(interaction);
    });

}