// INFO: taskutils
// This is where all task based stuff will live most
// likely. 

import { TextChannel } from "discord.js";
import { ClientWithCommands } from "../types/ClientWithCommands";
import { chPing } from "../config.json";

export async function sendWindows(channel: TextChannel): Promise<void> {
    await channel.send(" ");
}

export async function sendHourWarning(client: ClientWithCommands) {
    const pingChannel = await client.channels.fetch(chPing)
    if (pingChannel instanceof TextChannel) {
        await pingChannel.send("@everyone Ping!")
    }
}
