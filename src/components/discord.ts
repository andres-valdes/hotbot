import { Client, REST } from 'discord.js';
import dotenv from 'dotenv';
import nullthrows from 'nullthrows';

import { setChannel } from '../commands/set-channel';
import { ChannelManager } from './channel-manager';
import { CommandManager } from './command-manager';
import { getPlayer } from './player';

const token = nullthrows(dotenv.config().parsed)['HOTBOT_TOKEN'];

let apiClient: Client<boolean> | null;
let restClient: REST | null;

export async function getAPIClient(): Promise<Client<boolean>> {
    if (apiClient != null) {
        return apiClient;
    }
    apiClient = new Client({
        intents: ['GuildVoiceStates', 'GuildMessages', 'Guilds'],
    });

    const authedToken = await apiClient.login(token);
    console.log(`Logged in with token ${authedToken}`);

    apiClient.on('interactionCreate', async interaction => {
        try {
            const assignedChannel = ChannelManager.getx();
            if (!interaction.isChatInputCommand()) {
                return;
            }
            if (interaction.commandName === 'setchannel') {
                await setChannel.execute(interaction, {
                    player: await getPlayer(),
                    assignedChannel: null,
                });
                return;
            }
            if (interaction.channelId !== assignedChannel.id) {
                await interaction.reply(
                    `My brother in Christ I only have power in ${assignedChannel.name}`,
                );
                return;
            }
            await CommandManager.get().exectute(interaction, assignedChannel);
        } catch (e) {
            console.error(e);
            if (interaction.isRepliable()) {
                await interaction.reply('can you not?');
            }
        }
    });

    return apiClient;
}

export function getRESTClient(): REST {
    if (restClient == null) {
        restClient = new REST({ version: '10' }).setToken(token);
    }
    return restClient;
}
