import { SlashCommandBuilder } from 'discord.js';

import { createCommand } from './command';
import { executePlay } from '../components/player';

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
        switch (interaction.options.getSubcommand()) {
            case SubCommand.SEARCH: {
                playerArguments = interaction.options.getString('search');
                console.log(`Searching for keywords ${playerArguments}`);
                break;
            }
            case SubCommand.URL: {
                const maybeUrl = interaction.options.getString(SubCommand.URL);
                if (maybeUrl == null) {
                    throw new Error('Null URL passed');
                }
                playerArguments = new URL(maybeUrl).toString();
                console.log(`Loading url ${playerArguments}`);
                break;
            }
        }
        if (playerArguments == null) {
            throw new Error('Failed to parse arguments');
        }
        await interaction.editReply('BOOTING UP');
        await executePlay(interaction, playerArguments);
    },
});
