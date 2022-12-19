import { SlashCommandBuilder, GuildMember } from 'discord.js';

import { createCommand } from './command';
import { getPlayer } from '../components/player';
import { Queue } from 'distube';

export const skip = createCommand({
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips the current song.')
        .toJSON(),
    async execute(interaction) {
        const member = interaction.member as GuildMember;
        const channel = member.voice.channel;
        if (channel == null) {
            await interaction.reply('You need to be in a voice channel to summon me, dumbass.');
            return;
        }
        await (await getPlayer()).skip(channel);
        await interaction.reply('playing stuff');
    }
});