import { ChatInputCommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody, SlashCommandBuilder, } from 'discord.js';
import { DisTube } from 'distube';

export type Command = {
    data: RESTPostAPIChatInputApplicationCommandsJSONBody,
    execute: (interaction: ChatInputCommandInteraction, player: DisTube) => Promise<void>
};

export function createCommand(command: Command) {
    return command;
}