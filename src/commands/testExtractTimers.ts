import { Message, TextChannel } from "discord.js";
import { MessageWithDisplayName } from "../types/MessageData";
import { getMessageData } from "../utils/channelUtils";
import { extractHnmNameFromTimerMessage, extractHnmTimestampFromTimerMessage } from "../utils/channelUtils"
import { ClientWithCommands } from "../types/ClientWithCommands"
import { chAutoTimers } from "../config.json"
import { getDateDataFromUnixTimeStamp } from "../utils/timeUtils";
import { createChannelName } from "../utils/hnmUtils";

export const name = "tet"
export const description = "Testing extraction of timers."
export const execute = async (message: Message) => {
    const client: ClientWithCommands = message.client;
    const timerChannel = await client.channels.fetch(chAutoTimers);
    const now = Math.floor(Date.now() * 1e-3);

    if (timerChannel instanceof TextChannel) {
        const allMessagesData: MessageWithDisplayName[] = await getMessageData(timerChannel)
        for (const timer of allMessagesData) {
            const hnmName = extractHnmNameFromTimerMessage(timer.content);
            const timestamp = extractHnmTimestampFromTimerMessage(timer.content);
            const timeTillCamp = timestamp - now;

            if (timeTillCamp <= 20 * 60 && timeTillCamp > 0) {
                console.log(`Within 20 minutes creating channel ${hnmName}`)
                const channelName = createChannelName(hnmName, timestamp);
                console.log(channelName)
            }

        }
    }
}
