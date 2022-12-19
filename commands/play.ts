import { SlashCommandBuilder, GuildMember } from 'discord.js';

import { createCommand } from './command';
import { getPlayer } from '../components/player';

enum subcommands {
    search = 'search',
    url = 'url',
}

export const play = createCommand({
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play "Biggie Smalls feat. Thomas the Tank Engine"')
        .addSubcommand(subcommand =>
            subcommand
                .setName(subcommands.search)
                .setDescription('Searches for a song')
                .addStringOption(
                    option =>
                        option
                            .setName('search')
                            .setDescription('A list of keywords used to search youtube for a video')
                            .setRequired(true),
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName(subcommands.url)
                .setDescription('Link a specific song or playlist')
                .addStringOption(
                    option =>
                        option
                            .setName('url')
                            .setDescription('A link to the song or playlist to play')
                            .setRequired(true),
                )
        )
        .toJSON(),
    async execute(interaction) {
        const member = interaction.member as GuildMember;
        const channel = member.voice.channel;
        const url = interaction.options.getString('url');
        console.log(interaction.options);

        if (channel == null) {
            await interaction.reply('You need to be in a voice channel to summon me, dumbass.');
            return;
        }

        let player_arguments = null;
        switch (interaction.options.getSubcommand()) {
            case subcommands.search: {
                player_arguments = interaction.options.getString('search-terms');
                console.log(`searching for keywords ${player_arguments}`);
                break;
            }
            case subcommands.url: {
                const maybe_url = interaction.options.getString(subcommands.url);
                if (maybe_url == null) {
                    console.log('url was null');
                    return;
                }
                player_arguments = new URL(maybe_url).toString();
                console.log(`loading url ${player_arguments}`);
                break;
            }
        }

        if (player_arguments == null) {
            return;
        }

        await (await getPlayer()).play(channel, player_arguments);
        await interaction.reply('playing stuff');
    }
});