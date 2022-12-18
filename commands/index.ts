import { SlashCommandBuilder, CommandInteraction, REST, Routes } from "discord.js";
import dotenv from 'dotenv';

export type Command = {
    data: SlashCommandBuilder,
    execute: (interaction: CommandInteraction) => Promise<void>
};

class Commands {
    constructor(private commands: Record<string, Command> = {}) {
    }

    public register(command: Command): void {
        this.commands[command.data.name] = command;
    }

    public async exectute(interaction: CommandInteraction) {
        if (!this.commands[interaction.commandName]) {
            return;
        }
        return await this.commands[interaction.commandName].execute(interaction);
    }

    public async registerWithServer(discord: REST): Promise<void> {
        const commandData = Object.entries(this.commands).map(([_, command]) => command.data.toJSON());
        await discord.put(Routes.applicationCommands(dotenv.config().parsed!['CLIENT_ID']), {body: commandData});
    }
}

export const commands = new Commands();

require('./summon');