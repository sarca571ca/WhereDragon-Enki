// INFO: startCampWindows
// loop: 00:00:60,
// task: Starts camp window's for all eligible camps.

import { Events } from "discord.js";
import { ClientWithCommands } from "../types/ClientWithCommands";

export const name = Events.ClientReady;
export const once = true;

export const execute = (client: ClientWithCommands) => {
    const runTask = async () => {
        // TODO: 
        // - Check if a channel is created in the HNM-Attendance catergory
        // - Check if any jobs have been created for the camp yet
        // - Check if the camp is closed, will need to extract this from the chat in channel
        // - Add in ability to restart jobs incase of connection issues etc
    };

    setTimeout(() => {
        runTask();
        setInterval(runTask, 60 * 1000);
    }, 60 * 1000);
};

async function sendCampWindows(client: ClientWithCommands) { };

// TODO: Build an interface to save the job details in
// jobName,
// startTime,
// currentWindow, -- Is this important or can we just infer
// windows,
// endTime,
// isClosed.
