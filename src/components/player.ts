import { DisTube } from 'distube';
import { SpotifyPlugin } from '@distube/spotify';

import { ChannelManager } from './channel-manager';
import { getAPIClient } from './discord';

let player: DisTube | null = null;

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
        const client = await getAPIClient();
        const channel = client.channels.resolve(ChannelManager.getx());
        if (channel?.isTextBased()) {
            const messageContent = `Playing ${song.name} by ${song.uploader.name}`;
            const lastMessage = channel.lastMessage;
            if (
                lastMessage != null &&
                lastMessage.content.includes('Playing')
            ) {
                await lastMessage.edit(messageContent);
            } else {
                await channel.send(messageContent);
            }
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
