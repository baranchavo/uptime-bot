const Discord = require('discord.js');
const { client } = require('../../client');
const config = require('../../config');
var choices = client.commands.map(x => { return { name: x.name, value: x.value } });

module.exports = {
    name: 'premium',
    description: 'Premium abonelik almak ister misin?',
    options: [],
    execute: async (interaction) => {

        const embed = new Discord.MessageEmbed()
            .setAuthor({ name: 'Premium üyelik al' })
            .setDescription(`
            <a:elmas:965309849447583855> Merhaba Sende Premium Almak İstermisin Ozaman [Destek Sunucumuza](https://discord.gg/653y6XuUwb) Gel Ve Ticket Aç     
            `)
            .setThumbnail(client.user.displayAvatarURL())
            .setColor('GREEN')
            .setFooter({ text: config.defaults.embed.footer });

        interaction.reply({ embeds: [embed] });

    },
}