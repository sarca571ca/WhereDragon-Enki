import { Events } from "discord.js"
import { ClientWithCommands } from "../types/ClientWithCommands";
import * as fs from "node:fs/promises";

export const name = Events.ClientReady;
export const once = true;

export const execute = async (client: ClientWithCommands) => {
    const avatar = await fs.readFile("../assets/enki.png");
    await client.user?.setAvatar(avatar);
    console.log(`Ready! Logged in as ${client.user?.username}.`)
};

