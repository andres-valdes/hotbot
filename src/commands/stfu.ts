import { SlashCommandBuilder } from 'discord.js';

import { createCommand } from './command';
import { getPlayer } from '../components/player';

export const stfu = createCommand({
    data: new SlashCommandBuilder()
        .setName('stfu')
        .setDescription('Tell the bot to shut up.')
        .toJSON(),
    async execute(interaction) {
        if (interaction.guild == null) {
            throw new Error();
        }

        const player = await getPlayer();
        await player.stop(interaction.guild);

        await interaction.reply('aight chill man');
    },
});
