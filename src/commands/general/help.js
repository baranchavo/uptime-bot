const Discord = require('discord.js');
const { client } = require('../../client');
const config = require('../../config');
var choices = client.commands.map(x => { return { name: x.name, value: x.value } });

module.exports = {
    name: 'yardım',
    description: 'Bot komutları hakkında bilgi al',
    options: [
        {
            name: 'command',
            description: 'Bilgi almak istediğiniz komutu seçin',
            type: 'STRING',
            required: false,
            choices: choices,
        },
    ],
    execute: async (interaction) => {

        const embed = new Discord.MessageEmbed()
            .setAuthor({ name: 'Yardım menüsü' })
            .setDescription(
                client.commands.map(x => {
                    if (x.options.some(y => y.type == 'SUB_COMMAND')) return `${client.emojis.cache.get('1066942553884217415')} **${x.name}** ${x.options.length ? (x.options.map(y => `${y.name}`).length
                    ? '**' + x.options.map(y => `${y.name}`).join('** **') + '**' : x.options.map(y => `${y.name}`)[0]) : ''
                    } — ${x.description}`
                    return `${client.emojis.cache.get('1066942553884217415')} **${x.name}** ${x.options.length ? (x.options.map(y => `${y.name}:`).length
                            ? '`' + x.options.map(y => `${y.name}:`).join('` `') + '`' : x.options.map(y => `${y.name}:`)[0]) : ''
                            } — ${x.description}`
                }
                ).join('\n')
            )
            .setThumbnail(client.user.displayAvatarURL())
            .setColor('GREEN')
            .setFooter({ text: config.defaults.embed.footer });

        interaction.reply({ embeds: [embed] });

    },
}