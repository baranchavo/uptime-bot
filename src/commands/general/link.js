const Discord = require('discord.js');
const { client } = require('../../client');
const config = require('../../config');
const fetch = require('node-fetch');
var choices = client.commands.map(x => { return { name: x.name, value: x.value } });
const { DatabaseSchemes } = require('../../database');

module.exports = {
    name: 'link',
    description: 'Link ekle, listele, sil',
    options: [
        {
            name: 'ekle',
            description: 'Linkinizi aktif tutun',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'link',
                    description: 'Aktif tutacağınız linki girin',
                    type: 'STRING',
                    required: true,
                }
            ],
        },
        {
            name: 'liste',
            description: 'Aktif linklerinize bakın',
            type: 'SUB_COMMAND',
            options: [],
        },
        {
            name: 'sil',
            description: 'Sistemdeki bir linkinizi silin',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'link',
                    description: 'Kaldıracağınız linki girin',
                    type: 'STRING',
                    required: true,
                }
            ],
        },
    ],
    execute: async (interaction) => {

        var subc = interaction.options.getSubcommand();
        if (subc == 'ekle') {
            const count = DatabaseSchemes.linklimit.get(`${interaction.user.id}.count`) || 0;
            const max = DatabaseSchemes.linklimit.get(`${interaction.user.id}.max`) || 5;
            if (!DatabaseSchemes.premium.get('premium')?.find(x => x.userid == interaction.user.id) && (count >= max)) return interaction.reply({
                content: `Hata: 101 Limit Dolu`,
                ephemeral: true,
            });
            DatabaseSchemes.linklimit.add(`${interaction.user.id}.count`, 1);
            fetch(`${config.api.baseurl}/register/url/${interaction.user.id}/?key=${config.api.key}&url=${interaction.options.getString('link')}`)
                .then(async (res) => {
                    const json = await res.json();
                    if (json.error)
                        return interaction.reply({ content: `${json.error}`, ephemeral: true });
                    interaction.reply({ content: `<a:onayland:1074431963101921463> <https://${json.url}/> bağlantısına sahip linkin sisteme eklendi.`, ephemeral: true });
                    const embed = new Discord.MessageEmbed()
                        .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                        .setColor('GREEN')
                          
    .setDescription(`https://${json.url}/`)
                    .setTitle('Sisteme yeni bir link eklendi')
                        .setFooter({ text: config.defaults.embed.footer });
                    client.channels.cache.get(config.bot.logchannel).send({ embeds: [embed] });
                })
                .catch(async (err) => {
                    interaction.reply({ content: `<:leave:1018637599952339015> Beklenmeyen bir hata oluştu. Bu kodu yetkililere ilet: \`${err.code}\``, ephemeral: true });
                    console.error(err);
                });
        } else if (subc == 'liste') {
            fetch(`${config.api.baseurl}/urls/user/${interaction.user.id}/?key=${config.api.key}`, {
                headers: {
                    'X-Uptimer-Key': config.api.key,
                },
            })
                .then(async (res) => {
                    const json = await res.json();
                    if (json.error)
                        return interaction.reply({ content: `${json.error}`, ephemeral: true });
                    const embed = new Discord.MessageEmbed()
                        .setAuthor({ name: 'Eklediğin linkler' })
                        .setDescription(json.urls.map(x => `👍 https://${x.url}/`).join('\n'))
                        .setColor('GREEN')
                        .setFooter({ text: config.defaults.embed.footer });
                    interaction.reply({ embeds: [embed], ephemeral: true });
                })
                .catch(async (err) => {
                    interaction.channel.send({ content: `<:leave:1018637599952339015> Beklenmeyen bir hata oluştu. Bu kodu yetkililere ilet: \`${err.code}\``, ephemeral: true });
                    console.error(err);
                });
        } else if (subc == 'sil') {
            fetch(`${config.api.baseurl}/urls/user/${interaction.user.id}/?key=${config.api.key}`, {
                headers: {
                    'X-Uptimer-Key': config.api.key,
                },
            })
                .then(async (res) => {
                    const json = await res.json();
                    if (json.error)
                        return interaction.reply({ content: `${json.error}`, ephemeral: true });
                    const urls = json.urls.map(x => x.url);

                    var url = interaction.options.getString('link').includes('://')
                        ? interaction.options.getString('link').split('://')[1]
                        : interaction.options.getString('link');

                    if (!urls.includes(url)) return interaction.reply({
                        content: `Hata : 612 Link registered in the system`,
                        ephemeral: true
                    });

                    fetch(`${config.api.baseurl}/delete/url/?key=${config.api.key}&url=${interaction.options.getString('link')}`)
                        .then(async (res2) => {
                            const json = await res2.json();
                            if (json.error)
                                return interaction.reply({ content: json.error, ephemeral: true });
                            interaction.reply({ content: `<a:onayland:1074431963101921463> <https://${json.url}/> bağlantısına sahip linkin sistemden kaldırıldı.`, ephemeral: true });
                        })
                        .catch(async (err) => {
                            if (err.code == 10062)
                                return interaction.channel.send({ content: `Linkin sistemden kaldırıldı.` });
                            interaction.reply({ content: `<:leave:1018637599952339015> Beklenmeyen bir hata oluştu. Bu kodu yetkililere ilet: \`${err.code}\``, ephemeral: true });
                            console.error(err);
                        });

                })
                .catch(async (err) => {
                    interaction.channel.send({ content: `<:leave:1018637599952339015> Beklenmeyen bir hata oluştu. Bu kodu yetkililere ilet: \`${err.code}\``, ephemeral: true });
                    console.error(err);
                });
        }

    },
}