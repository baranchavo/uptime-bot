const Discord = require('discord.js');
const fs = require('fs');
const { DatabaseSchemes } = require('../../database');

module.exports = {
    name: 'premium',
    description: 'Bir kullanıcıyı premium ver',
    aliases: ['pre'],
    execute: async (client_, message, args) => {

        const userid = args[0];
        if (!userid) {
            message.delete();
            return message.channel.send('Bir kullanıcı ID\'si belirt.').then(msg => setTimeout(() => msg.delete(), 3000));
        }

        if (DatabaseSchemes.premium.get('premium')?.find(x => x.userid == userid)) {
            DatabaseSchemes.premium.set('premium', DatabaseSchemes.premium.get('premium').filter(x => x != userid));
            message.delete();
            message.channel.send(
             `Kullanıcının Premium Hizmeti Sona Erdi`   
            );
        } else {
            DatabaseSchemes.premium.push('premium', { userid: userid });
            message.delete();
            message.channel.send(
                `Kullanıcının Premium Hizmeti Başladı`
            );
        }

    }
}