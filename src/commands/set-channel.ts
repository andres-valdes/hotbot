import { ChannelType, SlashCommandBuilder, TextChannel } from 'discord.js';

import { createCommand } from './command';
import { ChannelManager } from '../components/channel-manager';
import { DisTube } from 'distube';

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
    async execute(
        interaction,
        _: { player: DisTube; assignedChannel: TextChannel | null },
    ) {
        const channel = interaction.options.getChannel(
            'channel',
            true,
        ) as TextChannel;
        ChannelManager.assign(channel);
        await interaction.reply(`Aight, moving over to ${channel.name}.`);
    },
});
