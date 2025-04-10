// INFO: deletOldChannels
// loop: 24:00:00,
// task: Deletes old channels after they 
//      are proccessed for DKP

import { Events } from "discord.js";

export const name = Events.ClientReady;
export const once = true;

export const execute = () => {
    setInterval(() => {
        console.log("deletOldChannels");
    }, 24 * 60 * 60 * 1000);
};
