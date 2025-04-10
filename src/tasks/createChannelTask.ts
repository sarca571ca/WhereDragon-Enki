// INFO: createChannelTask
// loop: 00:00:60,
// task: Creates the channel for the camp

import { Events } from "discord.js";

export const name = Events.ClientReady;
export const once = true;

export const execute = () => {
    setInterval(() => {
        console.log("createChannelTask");
    }, 60 * 1000);
};
