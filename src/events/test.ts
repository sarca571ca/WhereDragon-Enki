import { Events } from "discord.js"
import { ClientWithCommands } from "../types/ClientWithCommands";
import { formatCampHeadings } from "../utils/stringUtils";

export const name = Events.ClientReady;
export const once = true;

export const execute = (client: ClientWithCommands) => {
    // const campStartTime = Date.now() - 20 * 1000; // started 20 secs ago
    // const now = Date.now();
    // const interval: number = 10 * 1000; // 10 secs
    // const campDuration = 60 * 1000; // 60 secs
    // const campEndTime = campStartTime + campDuration;
    //
    // console.log("Test event started!")
    // let windowInterval: Timeout | null;
    // // const window: number = getWindowNumber(campStartTime, campDuration);
    //
    // // NOTE: 
    // // This needs to be determined by (campEnd - now)
    // // for restarting the camp duringa window.
    // // const currentWindow = Math.floor(((campDuration * 1000) - (campEndTime - campStartTime)) / interval)
    // const currentWindow = Math.floor((campDuration - (campEndTime - now)) / interval)
    //
    // console.log(currentWindow)
    //
    // // setTimeout(() => {
    // //     sendWindows(window);
    // // }, campTime - now - interval)
    //
    // function sendWindows(window: number) {
    //     if (!windowInterval) {
    //         windowInterval = setInterval(() => {
    //             const heading: string = formatCampHeadings(`Window ${window}`);
    //             console.log(heading);
    //             window++;
    //             if (window > 7) {
    //                 clearInterval(windowInterval);
    //             }
    //         }, interval);
    //     }
    // }
    //
    // function getWindowNumber(campTime: number, duration: number): number {
    //     const now: number = Date.now();
    //     const windowTime: number = interval * .1000
    //
    //     if ((now - campTime) < 0 && (campTime - duration * 1000) <= now) {
    //         return Math.floor((campTime - now) % duration + 1);
    //     } else if ((now - campTime) < 0 && (campTime - duration * 1000) >= now) {
    //         return 8;
    //     }
    //     return duration % duration + 1;
    // };
};
