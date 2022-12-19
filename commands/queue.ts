import { SlashCommandBuilder, GuildMember } from 'discord.js';

import { createCommand } from './command';

export const queue = createCommand({
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Add an audio to the end of the queue."')
        .addStringOption(option => option
            .setName('url')
            .setDescription('The URL of the audio to queue.')
            .setRequired(true))
        .toJSON(),
    async execute(interaction, player) {
        const member = interaction.member as GuildMember;
        const channel = member.voice.channel;
        if (channel == null) {
            await interaction.reply('You need to be in a voice channel to summon me, dumbass.');
            return;
        }
        const urlQuery = interaction.options.getString('url');
        if (urlQuery == null) {
            throw new Error();
        }
        const url = new URL(urlQuery);

        await player.play(channel, url.toString());
        await interaction.reply(`Added song to queue`);
    }
});