import { SlashCommandBuilder } from 'discord.js';
import { DisTubeHandler } from 'distube';
import { executePlay } from '../components/player';

import { createCommand } from './command';

const hotBoysCoolJams =
    'https://music.youtube.com/playlist?list=PLYQA9yqGKUydaT62Y7AQgTchchLYRfVwV&feature=share';

export const usual = createCommand({
    data: new SlashCommandBuilder()
        .setName('usual')
        .setDescription('Plays the big boi playlist')
        .toJSON(),
    async execute(interaction, { player }) {
        const handler = new DisTubeHandler(player);
        const playlist = await handler.resolvePlaylist(hotBoysCoolJams);

        const shuffled = await player.createCustomPlaylist(
            playlist.songs
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value),
        );
        await executePlay(interaction, shuffled);
        await interaction.editReply(
            `The usual, great choice sir, pre shuffled just for you`,
        );
    },
});
