import {SlashCommandBuilder} from 'discord.js';
import {commands} from './index';

commands.register({
    data: new SlashCommandBuilder()
        .setName('summon')
        .setDescription('Bring the bot into your voice channel'),
    async execute(interaction) {
        
    }
})