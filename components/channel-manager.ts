import { ChannelType, TextChannel } from "discord.js";

export class ChannelManager {
    private static instance: ChannelManager | null;
    private constructor(private _assignedChannel: TextChannel) {
    }

    private get assignedChannel(): TextChannel {
        return this._assignedChannel;
    }

    private set assignedChannel(channel: TextChannel) {
        if (channel.type !== ChannelType.GuildText) {
            throw new Error('You can only assign a text channel to Hot Bot!')
        }
        this._assignedChannel = channel;
    }


    public static assign(channel: TextChannel): ChannelManager {
        if (ChannelManager.instance == null) {
            ChannelManager.instance = new ChannelManager(channel);
            return ChannelManager.instance;
        }
        ChannelManager.instance.assignedChannel = channel;
        return ChannelManager.instance;
    }

    public static getx(): TextChannel {
        const assignedChannel = ChannelManager.instance?.assignedChannel;
        if (assignedChannel == null) {
            throw new Error('Channel was not set');
        }
        return assignedChannel;
    }
}


