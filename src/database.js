const { JsonDatabase } = require('wio.db');
var DatabaseSchemes = {}
DatabaseSchemes.blacklist = new JsonDatabase({ databasePath: './src/databases/blacklist.json' });
DatabaseSchemes.linklimit = new JsonDatabase({ databasePath: './src/databases/linklimit.json' });
DatabaseSchemes.premium = new JsonDatabase({ databasePath: './src/databases/premium.json' });
module.exports.DatabaseSchemes = DatabaseSchemes;