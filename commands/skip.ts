import { SlashCommandBuilder, GuildMember } from 'discord.js';

import { createCommand } from './command';

export const skip = createCommand({
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips the current song.')
        .toJSON(),
    async execute(interaction, { player, assignedChannel }) {
        const queue = player.getQueue(assignedChannel);
        if (queue == null || queue.songs.length === 0) {
            await player.stop(assignedChannel);
            return;
        }
        await player.skip(assignedChannel);
        await interaction.reply('playing stuff');
    }
});