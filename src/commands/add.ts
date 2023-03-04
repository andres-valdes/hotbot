import { SlashCommandBuilder } from 'discord.js';

import { createCommand } from './command';
import { Reply } from './reply';

export const add = createCommand({
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription(
            'Adds song to queue, optionally give it queue number starting at 0',
        )
        .addBooleanOption(option =>
            option
                .setName('first')
                .setDescription(
                    'Set this as the next song to play instead of the last',
                )
                .set
                .setRequired(false),
        )
        .toJSON(),
    async execute(interaction, { player, assignedChannel }) {
        const queue = player.getQueue(assignedChannel);
        const index = interaction.options.getInteger('queue-number');

        if(index >= )

        queue?.songs.length;
        return Reply.send(`Damn that song sucked, good choice king`);
    },
});
