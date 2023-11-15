const Discord = require('discord.js');
const { client } = require('../../client');
const fs = require('fs');
const { DatabaseSchemes } = require('../../database');

module.exports = {
    name: 'link',
    description: 'Kullanıcının link limitini yönet',
    aliases: [],
    execute: async (client_, message, args) => {
        var action = args[0];
        var userid = args[1];
        if (action == 'limit') {
            var action = args[1];
            const max = DatabaseSchemes.linklimit.get(`${userid}.max`) || 5;
            if (action == '+') {
                var userid = args[2];
                var num = args[3];
                if (!userid) {
                    message.delete();
                    return message.channel.send('Bir kullanıcı ID\'si belirt.').then(msg => setTimeout(() => msg.delete(), 3000));
                }
                if (!num || isNaN(num)) {
                    message.delete();
                    return message.channel.send('Geçerli bir sayı belirt.').then(msg => setTimeout(() => msg.delete(), 3000));
                }
                DatabaseSchemes.linklimit.set(`${userid}.max`, Number(max) + Number(num));
                message.delete();
                message.channel.send(
                    `Kullanıcının link ekleme limiti **${DatabaseSchemes.linklimit.get(`${userid}.max`)}** oldu.`
                );
            } else if (action == '?') {
                var userid = args[2];
                message.delete();
                message.channel.send(
                    `\`${client.users.cache.get(userid)?.tag || 'Undefined'}\` \`${userid}\` kullanıcının link ekleme limiti **${DatabaseSchemes.linklimit.get(`${userid}.max`) || 5}**.`
                );
            }
        } else if (action == 'liste') {
            
        } else if (action == 'sil') {

        } else message.delete();
    },
}