import { ChatInputCommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody, SlashCommandBuilder, } from 'discord.js';

export type Command = {
    data: RESTPostAPIChatInputApplicationCommandsJSONBody,
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>
};

export function createCommand(command: Command) {
    return command;
}