// INFO: sendHourWarning
// loop: 00:00:60,
// task: Pings discord that a camp is within the hour.

import { Events, TextChannel } from "discord.js";
import { ClientWithCommands } from "../types/ClientWithCommands";
import { MessageWithDisplayName } from "../types/MessageData";
import { getMessageData } from "../utils/channelUtils";
import { chPing, chAutoTimers } from "../config.json"
import { parseDiscordTimestamp } from "../utils/utils";

export const name = Events.ClientReady;
export const once = true;

export const execute = async (client: ClientWithCommands) => {
    setInterval(() => {
        // console.log("sendHourWarning");
        // NOTE: Structure
        // - Collect all the timers from timersChannel
        // - Compare the timer to Date.now()
        // - if within/less than/past 20 minutes create the channel
        // - can set a event to watch for channels created by the bot
        //      and use that to create all the channel tasks.
        sendHourWarning(client)
    }, 5 * 1000);
};

async function sendHourWarning(client: ClientWithCommands) {
    const pingChannel = await client.channels.fetch(chPing);
    const timerChannel = await client.channels.fetch(chAutoTimers);
    if (timerChannel instanceof TextChannel) {
        const messageData: MessageWithDisplayName[] = await getMessageData(timerChannel);

        for (const message of messageData) {
            const timer: Date | null = parseDiscordTimestamp(message.content);
            if (timer) {
                const utcTimeStamp: number = Date.UTC(
                    timer.getUTCFullYear(),
                    timer.getUTCMonth(),
                    timer.getUTCDate(),
                    timer.getUTCHours(),
                    timer.getUTCMinutes(),
                    timer.getUTCSeconds(),
                )

                if (pingChannel instanceof TextChannel &&
                    utcTimeStamp <= (Date.now() + 20 * 1000 * 60) &&
                    utcTimeStamp >= (Date.now() + 60 * 1000 * 60)) {
                    await pingChannel.send("@everyone Ping!")
                }
            }
        }
    }
};


