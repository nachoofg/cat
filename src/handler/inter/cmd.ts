import { PermissionFlags, Message } from "discord.js"
import { ClientExtends } from '../index'

export interface Command {
    name: string
    description: string
    usage: string
    aliases: string[]
    permissionsMember: (keyof PermissionFlags)[]
    permissionsClient: (keyof PermissionFlags)[]
    canUse?: boolean
    run: run
}

interface run {
    (Client: ClientExtends, message: Message, args: string[]): void
}