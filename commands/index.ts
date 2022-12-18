import { Command } from './command';
import { play } from './play';
import { shutdown } from './shutdown';
import { stfu } from './stfu';

export type { Command } from './command';

export const commands: Command[] = [play, shutdown, stfu];