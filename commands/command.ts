import { ChatInputCommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody, SlashCommandBuilder, TextChannel, } from 'discord.js';
import { DisTube } from 'distube';

export type Command = {
    data: RESTPostAPIChatInputApplicationCommandsJSONBody,
    execute: (interaction: ChatInputCommandInteraction, ctx: { player: DisTube, assignedChannel: TextChannel }) => Promise<void>
};

export function createCommand<TCommand extends Command>(command: TCommand) {
    return command;
}