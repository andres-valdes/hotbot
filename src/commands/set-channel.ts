import { ChannelType, SlashCommandBuilder, TextChannel } from 'discord.js';

import { createCommand } from './command';
import { ChannelManager } from '../components/channel-manager';
import { Reply } from './reply';

export const setChannel = createCommand({
    data: new SlashCommandBuilder()
        .setName('setchannel')
        .setDescription('Change the channel assigned to Hot Bot.')
        .addChannelOption(option =>
            option
                .addChannelTypes(ChannelType.GuildText)
                .setName('channel')
                .setRequired(true)
                .setDescription('The channel that belongs to Hot Bot'),
        )
        .toJSON(),
    async execute(interaction) {
        const channel = interaction.options.getChannel(
            'channel',
            true,
        ) as TextChannel;
        ChannelManager.get().setAssignedChannel(channel);
        return Reply.send(`Aight, moving over to ${channel.name}.`);
    },
});
