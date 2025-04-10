import { Message } from "discord.js";
import { HnmCommandData } from "../types/CommandData";
import { createHnmTimer } from "../utils/hnmUtils";

export const name = "createcamps";
export const aliases = ["cc"];
export const execute = (message: Message) => {
    const hnmNames: string[] = ["Adamantoise", "King Arthro", "Tiamat"];
    const emojis: string[] = [":turtle:", ":crab:", ":fire::chicken::fire:"];
    const isKing: boolean[] = [true, false, false];
    const isGW: boolean[] = [false, false, true];
    const hq: string[] = ["Aspidochelone", "", ""];

    for (let i: number = 0; i < hnmNames.length; i++) {
        const commandData: HnmCommandData = {
            name: hnmNames[i],
            timerFormat: emojis[i],
            isKing: isKing[i],
            isGW: isGW[i],
            hq: hq[i],
        }

        const now: number = Date.now();
        console.log(now, (now + 1000).toString().slice(0, -3))

        // const time: string = parseInt().toString();
        // createHnmTimer(message, commandData, [""])
    }
}
