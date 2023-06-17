import {
    ChatInputCommandInteraction,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    TextChannel,
} from 'discord.js';
import { DisTube } from 'distube';

import { Reply } from '../core/reply';

export type DeferredChatInputCommandInteraction = Omit<
    ChatInputCommandInteraction,
    'reply' | 'deferReply' | 'editReply'
>;

export type CommandCreationData = {
    data: RESTPostAPIChatInputApplicationCommandsJSONBody;
    execute(
        interaction: DeferredChatInputCommandInteraction,
        ctx: { player: DisTube; assignedChannel: TextChannel },
    ): Promise<Reply>;
};

export type Command<TCommandCreationData extends CommandCreationData> =
    TCommandCreationData & { name: string };

export function createCommand<TCommandCreationData extends CommandCreationData>(
    commandCreationData: TCommandCreationData,
): Command<TCommandCreationData> {
    return { ...commandCreationData, name: commandCreationData.data.name };
}
