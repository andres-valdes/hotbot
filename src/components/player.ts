import { DisTube, Playlist, SearchResult, Song } from 'distube';
import { SpotifyPlugin } from '@distube/spotify';

import { ChannelManager } from './channel-manager';
import { getAPIClient } from './discord';
import {
    CacheType,
    ChatInputCommandInteraction,
    GuildMember,
    Message,
} from 'discord.js';

let player: DisTube | null = null;
let lastPlayMessage: Message<boolean> | null = null;

export async function getPlayer(): Promise<DisTube> {
    if (player != null) {
        return player;
    }
    player = new DisTube(await getAPIClient(), {
        ytdlOptions: {
            quality: 'highestaudio',
            highWaterMark: 1 << 25,
        },
        plugins: [
            new SpotifyPlugin({
                parallel: true,
            }),
        ],
    });
    player.on('playSong', async (_, song) => {
        const channel = ChannelManager.getx();
        const messageContent = `Playing ${song.name} uploaded by ${song.uploader.name}`;
        if (
            lastPlayMessage != null &&
            lastPlayMessage.id == channel.lastMessageId
        ) {
            await lastPlayMessage.edit(messageContent);
        } else {
            const message = await channel.send(messageContent);
            lastPlayMessage = message;
        }
    });
    player.on('disconnect', async () => console.log('disconnected'));
    player.on('finish', async () => console.log('finish'));
    player.on('finishSong', async () => console.log('finishedSong'));
    player.on('addSong', async (_, song) => {
        const channel = ChannelManager.getx();
        if (channel?.isTextBased()) {
            await channel.send(`Added ${song.name} to the queue`);
        }
    });
    return player;
}

export async function executePlay(
    interaction: ChatInputCommandInteraction<CacheType>,
    playable: string | Song<unknown> | Playlist<unknown> | SearchResult,
): Promise<void> {
    const member = interaction.member as GuildMember;
    const channel = member.voice.channel;
    if (channel == null) {
        await interaction.editReply(
            'You need to be in a voice channel to summon me, dumbass.',
        );
        throw new Error('Attempted to play from a non-voice channel.');
    }
    await (await getPlayer()).play(channel, playable);
}
