import { ClientWithCommands } from "../types/ClientWithCommands";
import { extractHnmTimestampFromTimerMessage, getMessageData } from "../utils/channelUtils";
import { chAutoTimers } from "../config.json";
import { TextChannel, Message } from "discord.js";
import { MessageWithDisplayName } from "../types/MessageData";
import { formatDateForChannelName } from "../utils/timeUtils";

export const name = "t";
export const description = "";
export const execute = async (message: Message) => {
    const client: ClientWithCommands = message.client;
    const timerChannel = await client.channels.fetch(chAutoTimers);

    if (timerChannel instanceof TextChannel) {
        const allMessagesData: MessageWithDisplayName[] = await getMessageData(timerChannel)
        for (const timer of allMessagesData) {
            const timestamp = extractHnmTimestampFromTimerMessage(timer.content);
            const dateOfTimestamp = formatDateForChannelName(timestamp * 1000)
            console.log(timestamp)
            console.log(dateOfTimestamp)
        }
    }
}
