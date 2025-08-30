import { ClientWithCommands } from "../types/ClientWithCommands";
import { fetchCategoryChannelNames } from "../utils/channelUtils";
import { chAutoTimers, catHnmAttendance } from "../config.json";
import { ChannelType, TextChannel, Message } from "discord.js";
import { MessageWithDisplayName } from "../types/MessageData";
import { formatDateForChannelName } from "../utils/timeUtils";

export const name = "t";
export const description = "";
export const execute = async (message: Message) => {
    const client: ClientWithCommands = message.client;
    const hnmAttendaceChannelNames = fetchCategoryChannelNames(client, catHnmAttendance)
    if (hnmAttendaceChannelNames) {
        console.log(hnmAttendaceChannelNames)
    }
    const allChannelNames = fetchCategoryChannelNames(client)
    if (allChannelNames) {
        console.log(allChannelNames)
    }
}
