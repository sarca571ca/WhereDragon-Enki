// INFO: createChannelTask
// loop: 00:00:60,
// task: Creates the channel for the camp

import { Events, Message, TextChannel } from "discord.js";
import { MessageWithDisplayName } from "../types/MessageData";
import { getMessageData } from "../utils/channelUtils";
import { extractHnmNameFromTimerMessage, extractHnmTimestampFromTimerMessage } from "../utils/channelUtils"
import { ClientWithCommands } from "../types/ClientWithCommands"
import { chAutoTimers } from "../config.json"

export const name = Events.ClientReady;
export const once = true;

export const execute = (client: ClientWithCommands) => {
    const runTask = async () => {
        try {
            const timerChannel = await client.channels.fetch(chAutoTimers);
            const now = Math.floor(Date.now() * 1e-3);

            if (timerChannel instanceof TextChannel) {
                const allMessagesData: MessageWithDisplayName[] = await getMessageData(timerChannel)
                for (const timer of allMessagesData) {
                    const hnmName = extractHnmNameFromTimerMessage(timer.content);
                    const timestamp = extractHnmTimestampFromTimerMessage(timer.content);

                }
            }

        } catch (err) {
            console.log(err);
        }
    };

    const now = Date.now();
    const msUntilNextMinute = 60000 - (now % 60000);

    setTimeout(() => {
        runTask();
        setInterval(runTask, 60 * 1000);
    }, msUntilNextMinute);
};
