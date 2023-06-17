import { Client, REST } from 'discord.js';
import nullthrows from 'nullthrows';

import { handle } from '../handler';

let apiClient: Client<boolean> | null;
let restClient: REST | null;

export async function getAPIClient(): Promise<Client<boolean>> {
    const token = nullthrows(process.env['HOTBOT_TOKEN']);
    if (apiClient != null) {
        return apiClient;
    }
    apiClient = new Client({
        intents: ['GuildVoiceStates', 'GuildMessages', 'Guilds'],
    });

    const authedToken = await apiClient.login(token);
    console.log(`Logged in with token ${authedToken}`);

    apiClient.on(
        'interactionCreate',
        async interaction => await handle(interaction),
    );

    return apiClient;
}

export function getRESTClient(): REST {
    if (restClient == null) {
        restClient = new REST({ version: '10' }).setToken(
            nullthrows(process.env['HOTBOT_TOKEN']),
        );
    }
    return restClient;
}
