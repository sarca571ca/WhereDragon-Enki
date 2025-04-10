import { Message } from "discord.js";
import { createHnmTimer } from "../utils/hnmUtils";
import { HnmCommandData } from "../types/CommandData";

const commandData: HnmCommandData = {
    name: "Tiamat",
    timerFormat: ":fire::chicken::fire:",
    isKing: false,
    isGW: true,
}

export const name = "tiamat";
export const aliases = ["tia"];
export const execute = (message: Message, args: string[]) => {
    createHnmTimer(message, commandData, args);
}
