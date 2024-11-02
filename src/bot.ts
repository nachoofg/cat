import { ClientExtends } from './handler';
import { join } from 'path';
import { Logger } from 'tslog';
const logger: Logger = new Logger({
    exposeStack: false
});

new ClientExtends({
    intents: [
        'Guilds',
        'GuildMembers',
        'MessageContent',
        'GuildMessages',
        'DirectMessages',
        'DirectMessageReactions',
        'GuildBans',
        'GuildEmojisAndStickers',
        'GuildInvites',
        'GuildMessageReactions',
        'GuildPresences',
    ]
}).run(join(process.cwd(), 'src/events'), join(process.cwd(), 'src/commands')).catch((err) => {
    logger.fatal(err)
}).then(() => {
    /*   console.clear() */
    logger.info('✔️ El bot esta listo.');
});
process.on('uncaughtException', function (err) {
    /* console.clear(); */
    logger.fatal(err);
    logger.fatal('################ CRASH CRASH CRASH ################');
});
