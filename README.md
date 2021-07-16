# Jade Studios - Discord Bot

This is a Discord bot written solely for Jade Studios, so with that, this bot is **not** a one size fit all solution.

## Starting out:
---
Do !help to get a full help page

## Note:
---
There are commented out portions of code that was used in development. They may be useful for debugging/ logging purposes.

There is a timezone file in /configs. It has been pruned of DST locations. 

## Dependencies
---
* Node.js v14.4+
* External Node modules:
    * Discord.js
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
* Event Driven
    * Creates a local server file on join with custom user objects
    * Creates a local server config file on join as well
    * Updates a local server file when any changes are made User or Server
    * Moves pinned messages to a dedicated channel and unpins it
    * Deletes local server fils if bot is removed

## Running the bot
---
Get the dependencies from above. 

Get your bot token from the Discord Dev Portal and shove it into the config.json in /configs. 

Create a bot URL with the permissions: 2416176192. 

Start the bot via Node.js

Add the bot to your server.

## Cautions:
---
It's not bug free.

Also, I can't code. This is my first time using Node.js. I know there are ways to write a more efficient program than what I have, but my inexperienced self is the thing keeping me back.

If you are reading this, please tell me how I can fix it and possibly point me to some reading material as well. 
