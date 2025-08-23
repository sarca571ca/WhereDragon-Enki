import { Message, TextChannel } from "discord.js";
import { MessageWithDisplayName } from "../types/MessageData";
import { getMessageData } from "../utils/channelUtils";
import { extractHnmNameFromTimerMessage, extractHnmTimestampFromTimerMessage } from "../utils/channelUtils"
import { ClientWithCommands } from "../types/ClientWithCommands"
import { chAutoTimers } from "../config.json"

export const name = "tet"
export const description = "Testing extraction of timers."
export const execute = async (message: Message) => {
    const client: ClientWithCommands = message.client;
    const timerChannel = await client.channels.fetch(chAutoTimers);
    const now = new Date().toUTCString().slice(0, -3);

    if (timerChannel instanceof TextChannel) {
        const allMessagesData: MessageWithDisplayName[] = await getMessageData(timerChannel)

        for (const timer in allMessagesData) {
            console.log(`HnmName: ${extractHnmNameFromTimerMessage(timer)}\nTimestamp: ${extractHnmTimestampFromTimerMessage(timer)}\nNow: \t${now}`)
        }
    }
}
