import { GuildMember, TextChannel, EmbedBuilder } from "discord.js";
import { Command } from "../../handler/exp";

export const command: Command = {
    name: 'mban',
    description: "ya tu sabe",
    aliases: ['mb'],
    permissionsClient: ["BanMembers"],
    permissionsMember: ["BanMembers"],
    usage: 'mb <users/members>',
    run: async (client, message, args) => {
        var bans_id = [], no_bans_id = [], bans_nan = 0, no_bans_nan = 0, hm_bans_nan = 0, hm_bans_id = []
        if (!args[0]) return message.reply('te faltan los miembros')
        message.reply("procesando")
            .then(async (x) => {
                for (const id of args) {
                    if (!id)
                        return message.reply('una id/mencion esta mal o no existe')
                    if (id) { //meter todo en un intervalo de 1100
                        if ((await message.guild.bans.fetch()).get(id)) {
                            hm_bans_id.push(`[${hm_bans_nan}]:${id}`);
                            hm_bans_nan++;
                        } else {
                            setInterval(() => {
                                message.guild.members
                                    .ban(id)
                                    .then(() => {
                                        bans_id.push(`[${bans_nan}]:${id}`);
                                        bans_nan++;
                                    }).catch(() => {
                                        no_bans_id.push(`[${no_bans_nan}]:${id}`);
                                        no_bans_nan++;
                                        return;
                                    })

                            }, 1100);
                        }
                    }
                }
                message.reply(`
                    ${hm_bans_id.length ? `\`\`\`md\n${hm_bans_id}\`\`\`` : ""}
                    \n${bans_id.length ? `\`\`\`md\n${bans_id}\`\`\`` : ""}
                    \n${no_bans_id.length ? `\`\`\`md\n${no_bans_id}\`\`\`` : ""}`)
            })
    }
}