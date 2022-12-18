import { SlashCommandBuilder, CommandInteraction, } from 'discord.js';

export type Command = {
    data: SlashCommandBuilder,
    execute: (interaction: CommandInteraction) => Promise<void>
};

export function createCommand(command: Command) {
    return command;
}