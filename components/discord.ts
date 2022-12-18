import { Client, REST } from 'discord.js';
import dotenv from 'dotenv';

import { CommandManager } from './command-manager';

const token = dotenv.config().parsed!['HOTBOT_TOKEN'];

var apiClient: Client<boolean> | null;
var restClient: REST | null;

export async function getAPIClient(): Promise<Client<boolean>> {
    if (apiClient != null) {
        return apiClient;
    }
    apiClient = new Client({ intents: ['GuildVoiceStates', 'GuildMessages', 'Guilds'] });
    apiClient.on('interactionCreate', async interaction => {
        try {
            if (!interaction.isChatInputCommand()) {
                return;
            }
            await CommandManager.get().exectute(interaction);
        } catch (e) {
            console.error(e);
        }
    });
    const authedToken = await apiClient.login(token);
    console.log(`Logged in with token ${authedToken}`);

    return apiClient;
}

export function getRESTClient(): REST {
    if (restClient == null) {
        restClient = new REST({ version: '10' }).setToken(token);
    }
    return restClient;
}