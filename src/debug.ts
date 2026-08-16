import { TextChannel } from "discord.js";
import { loadJsonFile } from "./utils/utils";
import { MessageWithDisplayName } from "./types/MessageData";
import { channelMessagesToWindows } from "./utils/channelToDKP";

// New Alise camp channel
// const file = loadJsonFile("aug13-beh6.json") as
//     TextChannel & { messages: MessageWithDisplayName[] };

// Old Alise camp channel
const file = loadJsonFile("nov30-faf3.json") as
    TextChannel & { messages: MessageWithDisplayName[] };

const { windowsPerMember: parsedWindowsPerMember } =
    channelMessagesToWindows(file)

console.log(parsedWindowsPerMember)
