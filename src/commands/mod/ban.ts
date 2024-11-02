import { GuildMember } from "discord.js";
import { Command } from "../../handler/exp";

export const command: Command = {
    name: 'ban',
    description: "ya tu sabe",
    aliases: ['b'],
    permissionsClient: ["BanMembers"],
    permissionsMember: ["BanMembers"],
    usage: 'b <user/member> <reason>',
    run: async (client, message, args) => {
        let member;
        const reason = args.slice(1).join(' ') || 'sin razon';
        let day7;
        if (args[0]) member = message.mentions.members?.first() || message.mentions.users.first() || client.users.cache.get(args[0]);
        else return message.reply(`tenes que poner un miembro/usuario`);
        if (!member)
            return message.reply(`no se encontro el usuario/miembro, recorda que el ingreso es mediante mencion o ID`);
        if (member.id == message.member?.id) return message.react("❌")
        if (member.id == client.user?.id) return message.react("❌")
        if (member.id === message.guild?.ownerId) return message.react("❌")
        if (!(member as GuildMember).bannable)
            return message.reply(`no tengo tantos permisos`);
        message.guild?.members
            .ban(member.id, { reason })
            .then(() => {
                return message.react("👌")
            })
            .catch((err) => {
                return message.reply(`no pude banear al usuario porque ${err}`);
            });
    }

}