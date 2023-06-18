import {
    mockClient,
    mockGuild,
    mockTextChannel,
} from '@answeroverflow/discordjs-mock';
import { ChannelManager } from '../channel-manager';

const client = mockClient();

test('Single guild can set assigned channel', () => {
    const guild = mockGuild(client);
    const channel = mockTextChannel(client, guild);
    ChannelManager.get().setAssignedChannel(channel);
    expect(ChannelManager.get().getAssignedChannel(guild.id)).toEqual(channel);
});

test('Multiple guilds can set assigned channels', () => {
    const guild1 = mockGuild(client);
    const guild2 = mockGuild(client);

    const hotBotChannel1 = mockTextChannel(client, guild1);
    const hotBotChannel2 = mockTextChannel(client, guild2);

    ChannelManager.get().setAssignedChannel(hotBotChannel1);
    ChannelManager.get().setAssignedChannel(hotBotChannel2);

    expect(ChannelManager.get().getAssignedChannel(guild1.id)).toEqual(
        hotBotChannel1,
    );
    expect(ChannelManager.get().getAssignedChannel(guild2.id)).toEqual(
        hotBotChannel2,
    );

    expect(hotBotChannel1).not.toEqual(hotBotChannel2);
});
