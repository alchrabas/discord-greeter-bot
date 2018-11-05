![discord](https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png)

# discord-greeter-bot
A standard greeter bot used to "import" all messages from the JSON file into Discord. It uses the same format as mattermost-to-json-exporter.

# Prerequisites

* Must have installed Node JS
* Must have Git installed

# Setup

* To install dependencies: `npm install`
* Discord.io's gateway is currently broken so to run bots also run `npm install woor/discord.io#gateway_v6` in the main directory

# Running Server

Simply run the command `node bot.js`

Added by alchrabas:

File `formatted.json` and directory `images/` with the user-uplodaded images should be in the scripts CWD.

