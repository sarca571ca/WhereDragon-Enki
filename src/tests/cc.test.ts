import * as dotenv from "dotenv";
import * as modules from "../utils/moduleUtils"
import test from "tape";
import { execute } from "../events/channelCreate";
import client from "../client";
import { chCommands } from "../config.json";

// test("Command createcamps", (t) => {
//     dotenv.config();
//     modules.loadEvents(client)
//     modules.loadCommands(client)
//     const TOKEN = process.env.DISCORD_BOT_TOKEN;
//     client.login(TOKEN);
//
//     const channel = client.channels.fetch(chCommands);
//     t.deepEqual(, passResult);
//     console.log(`Expect: ${passResult}\nActual: ${getDateDataFromTimeResult}\n`)
//     t.end();
// });




