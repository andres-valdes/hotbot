import { DisTube, Playlist, SearchResult, Song } from 'distube';
import { SpotifyPlugin } from '@distube/spotify';

import { ChannelManager } from './channel-manager';
import { getAPIClient } from './discord';
import { GuildMember, Message } from 'discord.js';
import { NoVoiceError } from './error';
import { DeferredChatInputCommandInteraction } from '../commands/command';

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
        plugins: [new SpotifyPlugin()],
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
    interaction: DeferredChatInputCommandInteraction,
    playable: string | Song<unknown> | Playlist<unknown> | SearchResult,
): Promise<void> {
    const member = interaction.member as GuildMember;
    const channel = member.voice.channel;
    if (channel == null) {
        throw new NoVoiceError('Attempted to play from a non-voice channel.');
    }
    await (await getPlayer()).play(channel, playable);
}
