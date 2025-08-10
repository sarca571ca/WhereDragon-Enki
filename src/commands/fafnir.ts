import { Message } from "discord.js";
import { createHnmTimer } from "../utils/hnmUtils";
import { HnmCommandData } from "../types/CommandData";

const commandData: HnmCommandData = {
    name: "Fafnir",
    timerFormat: ":dragon_face:",
    isKing: true,
    isGW: false,
    hq: "Nidhogg"
}

export const name = "fafnir";
export const aliases = ["faf"];
export const execute = (message: Message, args: string[]) => {
    createHnmTimer(message, commandData, args);
}
