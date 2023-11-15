const Discord = require("discord.js");
const moment = require("moment");
const ms = require("ms");
//kullanıcağınız npm'leri buraya tanımlayın ~ Beş#0005
 
module.exports = {
    name: "eval",  //Bu Kısımları Kendi CommandHandler'ınıza Göre Düzenleyin
    aliases: ["kod-çalıştır"],    //Bu Kısımları Kendi CommandHandler'ınıza Göre Düzenleyin
    ownercommand: true,    //Bu Kısımları Kendi CommandHandler'ınıza Göre Düzenleyin
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!args[0]) return message.reply({content:`> **Kod Nerede Canımın İçin!**`});
        let code = args.join(" ");
        try {
            var sonuç = eval_beş(await eval(code));// Beş Was Here
            if (sonuç.includes(client.token))
                return message.reply({content:"> **OTc4NDM5MjY5MjM0MTg1.GU_AubAkşUantoKeniAldıncaNımBeşwaShEre**"});
        } catch (err) {
        }},};// Beş Was Here
function eval_beş(beş) {
    if (typeof text !== "string")
        beş = require("util").inspect(beş, { depth: 0 });
    beş = beş
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    return beş;
      // Beş Was Here
}