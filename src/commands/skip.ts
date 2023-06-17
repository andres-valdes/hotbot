import { SlashCommandBuilder } from 'discord.js';

import { createCommand } from './command';
import { Reply } from '../core/reply';

export const skip = createCommand({
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips the current song.')
        .toJSON(),
    async execute(interaction, { player, assignedChannel }) {
        const queue = player.getQueue(assignedChannel);
        if (queue == null || queue.songs.length === 0) {
            await player.stop(assignedChannel);
        } else {
            await player.skip(assignedChannel);
        }
        return Reply.send(`Damn that song sucked, good choice king`);
    },
});
