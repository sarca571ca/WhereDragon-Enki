import { Events } from "discord.js"
import { ClientWithCommands } from "../types/ClientWithCommands";
import * as fs from "node:fs/promises";
import * as path from "node:path";

export const name = Events.ClientReady;
export const once = true;

export const execute = async (client: ClientWithCommands) => {
    // Discord heavily rate-limits avatar changes; only set it once per account,
    // not on every reconnect/restart, or repeated calls can get the token 401'd.
    if (!client.user?.avatar) {
        const avatar = await fs.readFile(path.join(__dirname, "../assets/enki.png"));
        await client.user?.setAvatar(avatar);
    }
    console.log(`Ready! Logged in as ${client.user?.username}.`)
};

