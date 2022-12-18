import { DisTube } from 'distube';
import { getAPIClient } from './discord';

var player: DisTube | null = null;

export async function getPlayer(): Promise<DisTube> {
    if (player != null) {
        return player;
    }
    player = new DisTube(await getAPIClient());
    player.on('playSong', async () => console.log('playSong'));
    player.on('disconnect', async () => console.log('disconnected'));
    player.on('finish', async () => console.log('finish'));
    player.on('finishSong', async () => console.log('finishedSong'));
    return player;
}

