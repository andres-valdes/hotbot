import { ChatInputCommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody, TextChannel, } from 'discord.js';
import { DisTube } from 'distube';

export type CommandCreationData = {
    data: RESTPostAPIChatInputApplicationCommandsJSONBody,
    execute(interaction: ChatInputCommandInteraction, ctx: { player: DisTube, assignedChannel: TextChannel }): Promise<void>
};

export type Command<TCommandCreationData extends CommandCreationData> = TCommandCreationData & { name: string };

export function createCommand<TCommandCreationData extends CommandCreationData>(commandCreationData: TCommandCreationData): Command<TCommandCreationData> {
    return { ...commandCreationData, name: commandCreationData.data.name };
}