import { Client, REST, TextChannel } from 'discord.js';
import nullthrows from 'nullthrows';

import { Reply } from '../commands/reply';
import { ChannelManager } from './channel-manager';
import { CommandManager } from './command-manager';
import { NoSetChannelError, NoVoiceError } from './error';

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

    apiClient.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand()) {
            console.log('Received unknown interaction.');
            return;
        }
        try {
            await interaction.deferReply();
            const assignedChannel =
                ChannelManager.get().getAssignedChannel(interaction);
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
            const channel = interaction.channel as TextChannel;
            if (e instanceof NoVoiceError) {
                await interaction.editReply(
                    'You need to be in a voice channel to summon me, dumbass.',
                );
            } else if (e instanceof NoSetChannelError) {
                await interaction.editReply(
                    `We did not find a set Hotbot channel for your server, setting it to ${channel.name}. You can always use /setchannel to change it.`,
                );
                ChannelManager.get().setAssignedChannel(channel);
            } else {
                await interaction.editReply('can you not?');
            }
        }
    });

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
