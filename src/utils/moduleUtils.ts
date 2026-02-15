import * as path from 'path';
import * as fs from 'fs';
import { ClientWithCommands } from "../types/ClientWithCommands";

export async function loadEvents(client: ClientWithCommands) {
    const eventsDir = path.join(process.cwd(), 'dist/events');
    const eventFiles = fs.readdirSync(eventsDir);

    let numberOfEvents: number = 0;
    let numberOfLoadedEvents: number = 0;
    const noEventHandlers: string[] = [];
    const failedEvents: string[] = []

    for (const file of eventFiles) {
        const eventName = file.split('.')[0];

        try {
            const event = await import(path.join(eventsDir, file));

            if (event?.name && typeof event.execute === "function") {
                if (event.once) {
                    client.once(event.name, (...args) => event.execute(...args, client))
                } else {
                    client.on(event.name, (...args) => event.execute(...args, client))
                }
                numberOfLoadedEvents++;
            } else {
                noEventHandlers.push(eventName);
            }
        } catch {
            failedEvents.push(eventName);
        }
        numberOfEvents++;
    }
    console.log(`[EVENTS  ] ${numberOfLoadedEvents} of ${numberOfEvents} loaded.`)
    if (noEventHandlers.length > 0) {
        console.log(`[EVENTS  ] ${noEventHandlers} have no handlers.`)
    }

    if (failedEvents.length > 0) {
        console.log(`[EVENTS  ] ${failedEvents} failed to load.`)
    }
}

export async function loadTasks(client: ClientWithCommands) {
    const tasksDir = path.join(process.cwd(), 'dist/tasks');
    const taskFiles = fs.readdirSync(tasksDir);

    let numberOfTasks: number = 0;
    let numberOfLoadedTasks: number = 0;
    const noTaskHandlers: string[] = [];
    const failedTasks: string[] = []

    for (const file of taskFiles) {
        const taskName = file.split('.')[0];

        try {
            const task = await import(path.join(tasksDir, file));

            if (task?.name && typeof task.execute === "function") {
                if (task.once) {
                    client.once(task.name, (...args) => task.execute(...args, client))
                } else {
                    client.on(task.name, (...args) => task.execute(...args, client))
                }
                numberOfLoadedTasks++;
            } else {
                noTaskHandlers.push(taskName)
            }
        } catch {
            failedTasks.push(taskName)
        }
        numberOfTasks++;
    }
    console.log(`[TASKS   ] ${numberOfLoadedTasks} of ${numberOfTasks} loaded.`)
    if (noTaskHandlers.length > 0) {
        console.log(`[TASKS   ] ${noTaskHandlers} have no handlers.`)
    }
    if (failedTasks.length > 0) {
        console.log(`[TASKS   ] ${failedTasks} failed to load.`)
    }
}

export async function loadCommands(client: ClientWithCommands) {
    const commandsDir = path.join(process.cwd(), 'dist/commands');
    const commandFiles = fs.readdirSync(commandsDir);

    let numberOfCommands: number = 0;
    let numberOfLoadedCommands: number = 0;
    const noCommandHandlers: string[] = [];
    const failedCommands: string[] = []

    for (const file of commandFiles) {
        const commandName = file.split('.')[0];

        try {
            const command = await import(path.join(commandsDir, file));

            if (command?.name && typeof command.execute === "function") {
                client.commands?.set(command?.name, command)
                if (command.aliases && Array.isArray(command.aliases)) {
                    command.aliases.forEach((alias: string) =>
                        client.commands?.set(alias, command),
                    );
                }
                numberOfLoadedCommands++;
            } else {
                noCommandHandlers.push(commandName);
            }
            numberOfCommands++;
        } catch {
            failedCommands.push(commandName);
        }
    }
    console.log(`[COMMANDS] ${numberOfLoadedCommands} of ${numberOfCommands} loaded.`)
    if (noCommandHandlers.length > 0) {
        console.log(`[COMMANDS] ${noCommandHandlers} have no handlers.`)
    }
    if (failedCommands.length > 0) {
        console.log(`[COMMANDS] ${failedCommands} failed to load.`)
    }
}

// TODO: Add in autoloading tasks from "../tasks/"
