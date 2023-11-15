const { Client } = require('discord.js');
const client = new Client({
    allowedMentions: {
        //parse: [ 'everyone', 'roles', 'users' ],
        //roles: false,
        //repliedUser: false,
        //users: false,
    },
    intents: 98303,
    partials: [ 'MESSAGE', 'CHANNEL' ],
    presence: {
        status: 'online',
        activities: [
            {
                name: 'Almanya Sunucusu Aktif',
                type: 'WATCHING',
            },
        ]
    },
});
client.login("MTA5Nzg5MTY4MjA0Njk4MDIyNw.GA5r_k.hdRPpJONBg3BENxmkviMqGg3G-m5-Vi5JEFG2w");
module.exports.client = client;