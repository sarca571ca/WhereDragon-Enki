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

        // WARN: This technically crashes the bot since it is trying to simultaneously
        // deleting timers and sorting them.
        const now = new Date(Date.now());
        let randomSeconds: string = (now.getSeconds() + Math.floor(Math.random() * (2 - 0 + 1)) + 0).toString()
        let randomMinutes: string = (now.getMinutes() + Math.floor(Math.random() * (2 - 0 + 1)) + 0).toString()
        let randomHours: string = (now.getHours()).toString()

        if (parseInt(randomSeconds) >= 60) {
            randomSeconds = (0).toString();
            randomMinutes = (parseInt(randomMinutes) + 1).toString();
        }
        if (parseInt(randomMinutes) >= 60) {
            randomMinutes = (0).toString();
            randomHours = (parseInt(randomHours) + 1).toString();
        }
        if (parseInt(randomHours) >= 24) {
            randomHours = (0).toString();
        }

        createHnmTimer(message, commandData, [randomHours + randomMinutes + randomSeconds])
    }
}
