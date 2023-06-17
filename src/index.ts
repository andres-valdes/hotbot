import dotenv from 'dotenv';

import { getAPIClient, getRESTClient } from './core/third-party/discord';
import { CommandManager } from './core/command-manager';

dotenv.config();

async function start(): Promise<void> {
    await getAPIClient();
    const syncedCommands = await CommandManager.get().registerWithServer(
        getRESTClient(),
    );
    console.log(
        `Synchronized commands with server: [${Object.keys(syncedCommands)}]`,
    );
}

start();
