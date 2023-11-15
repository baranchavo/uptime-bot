const Discord = require('discord.js');
const fs = require('fs');
const { DatabaseSchemes } = require('../../database');

module.exports = {
    name: 'blacklist',
    description: 'Bir kullanıcıyı karalisteye ekle',
    aliases: [ 'bl' ],
    execute: async (client_, message, args) => {
        
        const userid = args[0];
        if (!userid) {
            message.delete();
            return message.channel.send('Bir kullanıcı ID\'si belirt.').then(msg => setTimeout(() => msg.delete(), 3000));
        }
        
        if (DatabaseSchemes.blacklist.get('blacklist')?.includes(userid)) {
            DatabaseSchemes.blacklist.set('blacklist', DatabaseSchemes.blacklist.get('blacklist').filter(x => x != userid));
            message.delete();
            message.channel.send('Kullanıcı kara listeden çıkarıldı.').then(msg => setTimeout(() => msg.delete(), 3000));
        } else {
            DatabaseSchemes.blacklist.push('blacklist', userid);
            message.delete();
            message.channel.send('Kullanıcı kara listeye eklendi.').then(msg => setTimeout(() => msg.delete(), 3000));
        }
        
    }
}