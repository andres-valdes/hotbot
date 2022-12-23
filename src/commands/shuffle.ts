import { SlashCommandBuilder, GuildMember } from 'discord.js';

import { createCommand } from './command';
import { Reply } from './reply';

export const shuffle = createCommand({
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Shuffles the list of songs')
        .toJSON(),
    async execute(interaction, { player }) {
        const member = interaction.member as GuildMember;
        const channel = member.voice.channel;
        if (channel == null) {
            return Reply.send(
                'You need to be in a voice channel to summon me, dumbass.',
            );
        }
        await player.shuffle(channel);
        return Reply.send('Scramblin time');
    },
});
