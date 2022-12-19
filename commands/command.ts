import { CommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody, SlashCommandBuilder, } from 'discord.js';

export type Command = {
    data: RESTPostAPIChatInputApplicationCommandsJSONBody,
    execute: (interaction: CommandInteraction) => Promise<void>
};

export function createCommand(command: Command) {
    return command;
}