import { SlashCommandBuilder, GuildMember } from 'discord.js';

import { createCommand } from './command';

export const shuffle = createCommand({
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Shuffles the list of songs')
        .toJSON(),
    async execute(interaction, {player}) {
        const member = interaction.member as GuildMember;
        const channel = member.voice.channel;
        if (channel == null) {
            await interaction.reply('You need to be in a voice channel to summon me, dumbass.');
            return;
        }
        
        await player.shuffle(channel);
        await interaction.reply(`Scramblin time`);
    }
});