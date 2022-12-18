import { channelLink, SlashCommandBuilder, GuildMember } from 'discord.js';
import { commands } from './index';
import { joinVoiceChannel, createAudioPlayer, createAudioResource } from '@discordjs/voice';

commands.register({
    data: new SlashCommandBuilder()
        .setName('summon')
        .setDescription('Bring the bot into your voice channel'),
    async execute(interaction) {
        if (interaction == null || interaction.guild == null || !(interaction.member instanceof GuildMember) || interaction.member.voice.channelId == null) {
            return;
        }

        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channelId,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });
        console.log('created conection', connection);
        interaction.reply('Joining for da jams');

        const player = createAudioPlayer();
        const resource = createAudioResource('./sample-12s.mp3');
        console.log('resource', resource);
        player.play(resource);
    }
});