# Jade Studios - Discord Bot

This is a Discord bot written solely for Jade Studios, so with that, this bot is **not** a one size fit all solution.

## 1.x.x Update
---
Rewritten in Typescript and updated entire codebase to DiscordJS v13.

* Major differences from v0.3.1
    * Higher modularity
    * Higher data resiliency via SQL
    * Faster data access speeds via SQL
    * Faster feature implementations
    * Better readability

## Starting out:
---

Do !help to get a full help page.

## Note:
---

The config.json file will build during tsc, so you can put token there.

DB files need to be copied over to prod.

There is a timezone file in /configs. It has been pruned of DST locations. 

## Dependencies
---
* Node.js v16.13
* External Node modules:
    * Discord.js v13.6.0
    * @discordjs/opus
    * @discordjs/voice
    * better-sqlite3
    * ffmpeg-static
    * @jadestudios/discord-music-player
    * ping

## Functionality
---
This bot has the following functionalities:
* Command Driven
    * Able to send help page via DM
    * Addes attributes to users and prints a table if needed
    * Finds where in the world it is noon 
    * Check the status of different website domains
    * Move pinned messages to a dedicated channel
    * Reminds user within a certain time frame
    * Pongs your Ping
    * Sends the catJam gif
    * Music in your VC
    * Makes your sentences random cased
* Event Driven
    * Core:
        * Creates a local server file on join with custom user objects
        * Creates a local server config file on join as well
        * Updates a local server file when any changes are made User or Server
        * Moves pinned messages to a dedicated channel and unpins it
        * Deletes local server fils if bot is removed
    * Music:
        * Responds to adding and playing songs
        * Responds to any errors from the Music side
* Word Driven - Keyword is found in your message
    * Responds with line from Skyrim if you say Skyrim
    * Also commands: 
        * Plays Clocks when you are in VC
        * Plays Metal Gear Alert when you are in VC
## Running the bot
---
Get the dependencies from above via npm i

Get your bot token from the Discord Dev Portal and shove it into the config.json in ./src/configs. 

Create a bot URL with the permissions: 2436099136 . 

Do npm run build and copy the timezones_compact.db to ./prod/configs

Start the bot via Node.js using npm run start

Add the bot to your server.

## Cautions:
---
It's not bug free. I have scanned it with SonarQube for any vulnerabilites.

Please tell me how I can fix any bugs and possibly point me to some reading material as well. 


## References/ Attributions
---
* <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
* https://discordjs.guide/
* https://github.com/ZerioDev/Music-bot
    * I opted to use discord-music-player since there is a memory leak from discord-player. 
