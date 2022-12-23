import { SlashCommandBuilder, GuildMember } from 'discord.js';
import { DisTubeHandler } from 'distube';

import { createCommand } from './command';

const hotBoysCoolJams =
    'https://music.youtube.com/playlist?list=PLYQA9yqGKUydaT62Y7AQgTchchLYRfVwV&feature=share';

export const usual = createCommand({
    data: new SlashCommandBuilder()
        .setName('usual')
        .setDescription('Plays the big boi playlist')
        .toJSON(),
    async execute(interaction, { player }) {
        const member = interaction.member as GuildMember;
        const channel = member.voice.channel;
        if (channel == null) {
            await interaction.reply(
                'You need to be in a voice channel to summon me, dumbass.',
            );
            return;
        }

        const handler = new DisTubeHandler(player);
        const playlist = await handler.resolvePlaylist(hotBoysCoolJams);

        const shuffled = await player.createCustomPlaylist(
            playlist.songs
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value),
        );

        await player.play(channel, shuffled);
        await interaction.reply(
            `The usual, great choice sir, pre shuffled just for you`,
        );
    },
});
