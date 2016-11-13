# Axebot

Axebot is a Discord bot written in Node with [Discord.js](https://github.com/hydrabolt/discord.js/). It is intended to have the 'personality' of the Dota 2 hero Axe. 

# Usage

I would not recommend using Axebot in its current state as I am still working through some known issues that can crash it.

## However...

If you are looking at Axebot as example code, if you want to see how it runs right now you would need to clone this repo. Then, once you are in that folder, you want to run `npm install` to install dependencies, then `mkdir data` once you are inside the folder. Then, rename `secret_template.js` to `secret.js` and fill it in with appropriate api keys.

## Really, though, don't use this on your Discord server

This is a heavy work in progress and is going to change **a lot**. I'll update this readme when it's in a more usable state. 

If you are looking for a plug and play bot, there are others out there in a more complete form.

# Known (Major) Issues

* Crashes when an invalid Steam ID is entered with the **!register** command.

