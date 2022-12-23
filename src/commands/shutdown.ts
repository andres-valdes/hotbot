import { SlashCommandBuilder } from 'discord.js';

import { createCommand } from './command';
import { Reply } from './reply';

enum HotBoys {
    ANDRES = '106106406838505472',
    TRISTAN = '122834501746425857',
}

export const shutdown = createCommand({
    data: new SlashCommandBuilder()
        .setName('shutdown')
        .setDescription('Kill the Hot Boy if he misbehaves.')
        .toJSON(),
    async execute(interaction) {
        if (
            interaction.user.id == HotBoys.ANDRES ||
            interaction.user.id == HotBoys.TRISTAN
        ) {
            interaction.client.destroy();
            return Reply.send('im sowwy for hurting you :(');
        } else {
            return Reply.send(
                'brother, you are not powerful enough to contain me',
            );
        }
    },
});
