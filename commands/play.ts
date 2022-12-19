import { SlashCommandBuilder, GuildMember } from 'discord.js';

import { createCommand } from './command';
import { getPlayer } from '../components/player';

export const play = createCommand({
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play "Biggie Smalls feat. Thomas the Tank Engine"')
        .toJSON(),
    async execute(interaction) {
        const member = interaction.member as GuildMember;
        const channel = member.voice.channel;
        if (channel == null) {
            await interaction.reply('You need to be in a voice channel to summon me, dumbass.');
            return;
        }
        await (await getPlayer()).play(channel, 'https://www.youtube.com/watch?v=ETfiUYij5UE');
        
        await interaction.reply('playing stuff');
    }
});