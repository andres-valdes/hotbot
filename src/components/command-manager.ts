import {
    ChatInputCommandInteraction,
    REST,
    Routes,
    TextChannel,
} from 'discord.js';
import nullthrows from 'nullthrows';

import { commands } from '../commands';
import type { Command } from '../commands';
import { getPlayer } from './player';
import { CommandCreationData } from '../commands/command';

export class CommandManager {
    private static instance: CommandManager | null;
    private registeredCommands: Record<string, Command<CommandCreationData>>;
    private constructor() {
        this.registeredCommands = {};
        commands.reduce((currentlyRegistedCommands, commandToRegister) => {
            currentlyRegistedCommands[commandToRegister.data.name] =
                commandToRegister;
            return currentlyRegistedCommands;
        }, this.registeredCommands);
    }

    public async exectute(
        interaction: ChatInputCommandInteraction,
        assignedChannel: TextChannel,
    ) {
        if (!this.registeredCommands[interaction.commandName]) {
            throw new Error('Received unknown command');
        }
        return await this.registeredCommands[interaction.commandName].execute(
            interaction,
            { player: await getPlayer(), assignedChannel },
        );
    }

    public async registerWithServer(
        restClient: REST,
    ): Promise<Record<string, Command<CommandCreationData>>> {
        const commandData = Object.entries(this.registeredCommands).map(
            ([_, command]) => command.data,
        );
        await restClient.put(
            Routes.applicationCommands(
                nullthrows(process.env['DISCORD_CLIENT_ID']),
            ),
            { body: commandData },
        );
        return this.registeredCommands;
    }

    public static get(): CommandManager {
        if (CommandManager.instance == null) {
            CommandManager.instance = new CommandManager();
        }
        return CommandManager.instance;
    }
}
