require('dotenv').config();

const Discord = require('discord.js');
const { client } = require('./src/client');
const fs = require('node:fs');

// Bir Hata Oluştu
process.on("unhandledRejection", (reason, p) => {
    console.log(reason, p);
    })

  client.on('guildCreate', async guild => { client.channels.cache.get('1084114823241015326').send(`${guild}, isimli sunucuya eklendim!`)})

  // atıldım
  client.on('guildDelete', async guild => { client.channels.cache.get('1084114823241015326').send(`${guild}, isimli sunucudan atıldım.. :(`)})
   
                
for (var handler of fs.readdirSync('./src/handlers')) {
    require(`./src/handlers/${handler}`)(client);
}