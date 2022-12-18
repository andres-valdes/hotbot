import {Client, REST} from 'discord.js';
import {commands} from './commands';
import dotenv from 'dotenv';

const token = dotenv.config().parsed!['TOKEN'];

const client = new Client({intents: ['GuildVoiceStates', 'GuildMessages', 'Guilds']});
const discord = new REST({version: '10'}).setToken(token);

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) {
        return;
    }
    await commands.exectute(interaction);
});
client.once('ready', () => console.log('Hot Bot is ready.'));
client.login(token).then(console.log).catch(console.error);

commands.registerWithServer(discord);
