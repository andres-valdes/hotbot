import { Command } from './command';
import { play } from './play';
import { queue } from './queue';
import { setChannel } from './set-channel';
import { shutdown } from './shutdown';
import { skip } from './skip';
import { stfu } from './stfu';
import { shuffle } from './shuffle';

export type { Command } from './command';

export const commands: Command[] = [play, shutdown, stfu, queue, skip, setChannel, shuffle];
