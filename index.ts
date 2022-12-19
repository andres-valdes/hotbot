import dotenv from 'dotenv';

import { getAPIClient, getRESTClient } from './components/discord';
import { CommandManager } from './components/command-manager';
import { ChannelManager } from './components/channel-manager';
import { ChannelType } from 'discord.js';

async function start(): Promise<void> {
    const client = await getAPIClient();
    const defaultChannelId = dotenv.config().parsed!['DEFAULT_CHANNEL_ID'];
    const defaultChannel = await client.channels.fetch(defaultChannelId);
    if (defaultChannel == null) {
        throw new Error(`Default channel with ID ${defaultChannelId} not found.`);
    }
    if (defaultChannel.type !== ChannelType.GuildText) {
        throw new Error('You can only assign a text channel to Hot Bot!');
    }
    ChannelManager.assign(defaultChannel);
    const syncedCommands = await CommandManager.get().registerWithServer(getRESTClient());
    console.log(`Set ${defaultChannel.name} as default channel.`);
    console.log(`Synchronized commands with server: [${Object.keys(syncedCommands)}]`);
}

start();
