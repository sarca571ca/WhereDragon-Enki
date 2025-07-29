import { Message, TextChannel } from "discord.js";
import { parseDiscordTimestamp } from "../utils/utils";
import { ClientWithCommands } from "../types/ClientWithCommands";
import { WDSheetsAPI } from "../sheets-api";

export const name = "update";
export const description = "update sign ups";

export const execute = async (message: Message) => {
  const client: ClientWithCommands = message.client;
  if (message.author.bot) return; // Ignore bot messages
  if (
    message.channel instanceof TextChannel &&
    message.channel.topic !== null
  ) {
    console.log("DEBUG:", message.channel.topic);
    console.log(parseDiscordTimestamp(message.channel.topic));
  }

  updateSignupChannel(client, message.channel.id);
};

export const updateSignupChannel = async (
  client: ClientWithCommands,
  channelId: string
) => {
  const channel = client.channels.cache.get(channelId) as
    | TextChannel
    | undefined;

  if (!channel) return;
  const signups = await WDSheetsAPI.readSignupSheet(channel.name as any);

  const primaries: string[] = [];
  const secondaries: string[] = [];
  const buyers: string[] = [];

  for (const [name, data] of Object.entries(signups)) {
    if (data.priority === "Primary" || data.priority === "First") {
      data.date
        ? primaries.push(`${name}  -- ${data.date}`)
        : primaries.push(`${name}`);
    } else if (data.priority === "Secondary") {
      data.date
        ? secondaries.push(`${name}  -- ${data.date}`)
        : secondaries.push(`${name}`);
    } else {
      buyers.push(`${name} ${data.priority}`);
    }
  }

  const messageContent = `
**__Primary__**
${primaries.join("\n")}

**__Secondary__**
${secondaries.join("\n")}

**__Buyers__**
${buyers.join("\n")}
    `.trim();

  try {
    const fetchedMessages = await channel.messages.fetch({
      limit: 50,
    });
    const botMessages = fetchedMessages.filter(
      (m) => m.author.id === client.user?.id
    );

    if (botMessages.size > 0) {
      const lastBotMessage = botMessages.first()!;
      await lastBotMessage.edit(messageContent);
      console.log(`Message edited in ${channel.name} channel.`);
    } else {
      if (channel instanceof TextChannel) {
        await channel.send(messageContent);
      }
      console.log(`New message sent to ${channel.name} channel.`);
    }
  } catch (error) {
    console.error("Error handling message:", error);
  }
};
