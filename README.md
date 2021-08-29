# Jade Studios - Discord Bot

This is a Discord bot written solely for Jade Studios, so with that, this bot is **not** a one size fit all solution.

## Starting out:
---
Do !help to get a full help page.

## Planned work:
---
Transition all sync'd code to async

## Note:
---
There are commented out portions of code that was used in development. They may be useful for debugging/ logging purposes.

There is a timezone file in /configs. It has been pruned of DST locations. 

## Dependencies
---
* Node.js v14.4+
* External Node modules:
    * Discord.js@12.5.3
    * @discordjs/opus
    * ffmpeg-static
    * discord-music-player@7.2.0
    * seedrandom
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
## Running the bot
---
Get the dependencies from above. 

Get your bot token from the Discord Dev Portal and shove it into the config.json in /configs. 

Create a bot URL with the permissions: 2419321920. 

Start the bot via Node.js

Add the bot to your server.

## Cautions:
---
It's not bug free.

Also, I can't code. This is my first time using Node.js. I know there are ways to write a more efficient program than what I have, but my inexperienced self is the thing keeping me back.

If you are reading this, please tell me how I can fix it and possibly point me to some reading material as well. 


## References/ Attributions
---
* <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
* https://v12.discordjs.guide/
* https://github.com/ZerioDev/Music-bot
    * I opted to use discord-music-player since there is a memory leak from discord-player. 