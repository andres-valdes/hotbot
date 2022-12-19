import { ChatInputCommandInteraction, REST, Routes, TextChannel } from "discord.js";
import dotenv from 'dotenv';

import { commands } from '../commands';
import type { Command } from '../commands';
import { getPlayer } from "./player";

export class CommandManager {
    private static instance: CommandManager | null;
    private registeredCommands: Record<string, Command>;
    private constructor() {
        this.registeredCommands = {};
        commands.reduce((currentlyRegistedCommands, commandToRegister) => {
            currentlyRegistedCommands[commandToRegister.data.name] = commandToRegister;
            return currentlyRegistedCommands;
        }, this.registeredCommands);
    }

    public async exectute(interaction: ChatInputCommandInteraction, assignedChannel: TextChannel) {
        if (!this.registeredCommands[interaction.commandName]) {
            return;
        }
        return await this.registeredCommands[interaction.commandName].execute(interaction, { player: await getPlayer(), assignedChannel });
    }

    public async registerWithServer(restClient: REST): Promise<Record<string, Command>> {
        const commandData = Object.entries(this.registeredCommands).map(([_, command]) => command.data);
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


