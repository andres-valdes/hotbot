import { SlashCommandBuilder } from 'discord.js';

import { createCommand } from './command';

const tristan = 'toasty boi#7924';
const andres = 'Ratzu#6158';

export const shutdown = createCommand({
    data: new SlashCommandBuilder()
        .setName('shutdown')
        .setDescription('Kill the Hot Boy if he misbehaves.')
        .toJSON(),
    async execute(interaction) {
        if (interaction.user.tag == tristan || interaction.user.tag == andres) {
            interaction.reply('im sowwy for hurting you :(');
            interaction.client.destroy();
        } else {
            interaction.reply(
                'brother, you are not powerful enough to contain me',
            );
        }
    },
});
