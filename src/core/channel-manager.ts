import { TextChannel } from 'discord.js';
import { GuildIdResolvable, resolveGuildId } from 'distube';
import { NoSetChannelError } from './error';

export class ChannelManager {
    private static instance: ChannelManager | null;
    private _guildsToChannels: Record<string, TextChannel>;
    private constructor() {
        this._guildsToChannels = {};
    }

    public getAssignedChannel(guild: GuildIdResolvable): TextChannel {
        const guildId = resolveGuildId(guild);
        const channel = this._guildsToChannels[guildId];
        if (channel == null) {
            throw new NoSetChannelError();
        }
        return channel;
    }

    public setAssignedChannel(channel: TextChannel) {
        const guildId = resolveGuildId(channel);
        this._guildsToChannels[guildId] = channel;
    }

    public static get(): ChannelManager {
        if (ChannelManager.instance == null) {
            ChannelManager.instance = new ChannelManager();
            return ChannelManager.instance;
        }
        return ChannelManager.instance;
    }
}
