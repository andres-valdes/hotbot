import { Client, REST } from 'discord.js';
import dotenv from 'dotenv';
import nullthrows from 'nullthrows';

import { Reply } from '../commands/reply';
import { ChannelManager } from './channel-manager';
import { CommandManager } from './command-manager';
import { NoVoiceError } from './error';

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
        if (!interaction.isChatInputCommand()) {
            console.log('Received unknown interaction.');
            return;
        }
        try {
            await interaction.deferReply();
            const assignedChannel = ChannelManager.getx();
            const { content } =
                interaction.channelId !== assignedChannel.id &&
                interaction.commandName !== 'setchannel'
                    ? Reply.send(
                          `My brother in Christ I only have power in ${assignedChannel.name}`,
                      )
                    : await CommandManager.get().exectute(
                          interaction,
                          assignedChannel,
                      );
            await interaction.editReply(content);
        } catch (e) {
            console.error(e);
            e instanceof NoVoiceError
                ? await interaction.editReply(
                      'You need to be in a voice channel to summon me, dumbass.',
                  )
                : await interaction.editReply('can you not?');
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
