import { Command, CommandCreationData } from './command';
import { play } from './play';
import { setChannel } from './set-channel';
import { shutdown } from './shutdown';
import { skip } from './skip';
import { stfu } from './stfu';
import { shuffle } from './shuffle';
import { usual } from './usual';

export type { Command } from './command';

export const commands: Command<CommandCreationData>[] = [
    play,
    shutdown,
    stfu,
    skip,
    setChannel,
    shuffle,
    usual,
];
