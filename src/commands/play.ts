import { SlashCommandBuilder } from 'discord.js';

import { executePlay } from '../core/third-party/player';
import { Reply } from '../core/reply';
import { createCommand } from './command';

enum SubCommand {
    SEARCH = 'search',
    URL = 'url',
}

export const play = createCommand({
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song or playlist.')
        .addSubcommand(subcommand =>
            subcommand
                .setName(SubCommand.SEARCH)
                .setDescription('Searches for a song')
                .addStringOption(option =>
                    option
                        .setName('search')
                        .setDescription(
                            'A list of keywords used to search youtube for a video',
                        )
                        .setRequired(true),
                ),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName(SubCommand.URL)
                .setDescription('Link a specific song or playlist')
                .addStringOption(option =>
                    option
                        .setName('url')
                        .setDescription(
                            'A link to the song or playlist to play',
                        )
                        .setRequired(true),
                ),
        )
        .toJSON(),
    async execute(interaction) {
        let playerArguments: string | null = null;
        playerArguments?.do();
        switch (interaction.options.getSubcommand()) {
            case SubCommand.SEARCH: {
                playerArguments = interaction.options.getString('search');
                break;
            }
            case SubCommand.URL: {
                const maybeUrl = interaction.options.getString(SubCommand.URL);
                if (maybeUrl == null) {
                    throw new Error('Null URL passed');
                }
                playerArguments = new URL(maybeUrl).toString();
                break;
            }
        }
        if (playerArguments == null) {
            throw new Error('Failed to parse arguments');
        }
        await executePlay(interaction, playerArguments);
        return Reply.send('BOOTING UP');
    },
});
