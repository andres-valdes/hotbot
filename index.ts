import { getAPIClient, getRESTClient } from './components/discord';
import { CommandManager } from './components/command-manager';

async function start(): Promise<void> {
    const syncedCommands = await CommandManager.get().registerWithServer(getRESTClient());
    await getAPIClient();
    console.log(`Synchronized commands with server: [${Object.keys(syncedCommands)}]`);
}

start();
