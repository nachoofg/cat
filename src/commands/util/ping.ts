import { Command } from "../../handler/exp";

export const command: Command = {
    name: 'ping',
    description: "no se",
    aliases: ['p'],
    permissionsClient: [],
    permissionsMember: [],
    usage: 'p',
    run: async (client, message, args) => {
        return message.reply(`pong ${client.ws.ping}`)
    }
}