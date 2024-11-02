import { Message, PermissionsBitField } from 'discord.js';
import { Event, Command } from '../handler/exp';
require('dotenv').config();

export const event: Event = {
    name: 'messageCreate',
    run: async (client, message: Message) => {
        if (!message.guild || message.author.bot || !message.guild.members.me?.permissions.has(PermissionsBitField.Flags.SendMessages)) return;
        let prefix = process.env.prefix;
        client.prefix = prefix;
        if (!message.content.startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift();
        if (!cmd) return;
        const command = client.commands.get(cmd) || client.aliases.get(cmd);
        (command as Command).run(client, message as Message, args);
    }
};