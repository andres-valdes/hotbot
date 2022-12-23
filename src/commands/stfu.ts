import { SlashCommandBuilder } from 'discord.js';

import { createCommand } from './command';
import { getPlayer } from '../components/player';
import { Reply } from './reply';

export const stfu = createCommand({
    data: new SlashCommandBuilder()
        .setName('stfu')
        .setDescription('Tell the bot to shut up.')
        .toJSON(),
    async execute(_, { assignedChannel }) {
        const player = await getPlayer();
        await player.stop(assignedChannel);
        return Reply.send('aight chill man');
    },
});
