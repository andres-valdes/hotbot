import { CacheType, Interaction, TextChannel } from 'discord.js';

import { Reply } from './reply';
import { ChannelManager } from './channel-manager';
import { CommandManager } from './command-manager';
import { NoSetChannelError, NoVoiceError } from './error';

export async function handle(
    interaction: Interaction<CacheType>,
): Promise<void> {
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
                : await CommandManager.get().execute(
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
}
