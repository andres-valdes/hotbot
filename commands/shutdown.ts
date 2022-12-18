import { SlashCommandBuilder } from 'discord.js';

import { createCommand } from './command';

export const shutdown = createCommand({
    data: new SlashCommandBuilder()
        .setName('shutdown')
        .setDescription('Kill the Hot Boy if he misbehaves.'),
    async execute(interaction) {
        interaction.client.destroy();
    }
});