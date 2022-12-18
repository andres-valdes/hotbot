import { CommandInteraction, REST, Routes } from "discord.js";
import dotenv from 'dotenv';

import { commands } from '../commands';
import type { Command } from '../commands';

export class CommandManager {
    static instance: CommandManager | null;
    private registeredCommands: Record<string, Command>;
    private constructor() {
        this.registeredCommands = {};
        commands.reduce((currentlyRegistedCommands, commandToRegister) => {
            currentlyRegistedCommands[commandToRegister.data.name] = commandToRegister;
            return currentlyRegistedCommands;
        }, this.registeredCommands);
    }

    public async exectute(interaction: CommandInteraction) {
        if (!this.registeredCommands[interaction.commandName]) {
            return;
        }
        return await this.registeredCommands[interaction.commandName].execute(interaction);
    }

    public async registerWithServer(restClient: REST): Promise<Record<string, Command>> {
        const commandData = Object.entries(this.registeredCommands).map(([_, command]) => command.data.toJSON());
        await restClient.put(Routes.applicationCommands(dotenv.config().parsed!['DISCORD_CLIENT_ID']), { body: commandData });
        return this.registeredCommands;
    }

    public static get(): CommandManager {
        if (CommandManager.instance == null) {
            CommandManager.instance = new CommandManager();
        }
        return CommandManager.instance;
    }
}


