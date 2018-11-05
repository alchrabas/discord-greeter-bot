var Discord = require('discord.io');

var logger = require('winston');
var auth = require('./auth.json');
var formatted = require('./formatted.json');

var channel_name = process.argv[2];
var discord_channel_name = process.argv[3];

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';


// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

var channel_data = null;
for (var i = 0; i < formatted.length; i++) {
    if (formatted[i].name == channel_name) {
        channel_data = formatted[i].messages;
    }
}

function getChannelDataByName(channels, chan_name) {
    for (channel_id in channels) {
        if (channels[channel_id].name == chan_name) {
            return channel_id;
        }
    }
}

function sendNextRow(i, discord_channel_id) {
    if (i >= channel_data.length) {
        return;
    }

    for (var pic_id = 0; pic_id < channel_data[i].pictures.length; pic_id++) {
         var pic_name = channel_data[i].pictures[pic_id];
         bot.uploadFile({to: discord_channel_id, file: "images/" + pic_name});
    }

    bot.sendMessage({ to: discord_channel_id, message: channel_data[i].message });

    setTimeout(function() {
        sendNextRow(i + 1, discord_channel_id);
    }, 500);
}



bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    var discord_channel_id = getChannelDataByName(bot.channels, discord_channel_name);
    sendNextRow(0, discord_channel_id);
});


