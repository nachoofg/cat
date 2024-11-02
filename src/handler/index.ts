import { Client, Collection } from 'discord.js';
import { readdirSync } from 'fs';
import type { Command, Event } from './inter/exp';
import { connect } from 'mongoose';
import { Logger } from 'tslog';
const logger: Logger = new Logger({
	exposeStack: false
});
require('dotenv').config();

export class ClientExtends extends Client {
	public events: Collection<string, Event> = new Collection();
	public commands: Collection<string, Command> = new Collection();
	public aliases: Collection<string, Command> = new Collection();
	public prefix!: string;

	public async run(pathEvent: string, pathCommand: string) {
		try {
			readdirSync(pathCommand).forEach((dir) => {
				const commands = readdirSync(`${pathCommand}/${dir}`).filter((file) => file.endsWith('.ts'));
				for (const file of commands) {
					const { command } = require(`${pathCommand}/${dir}/${file}`);
					this.commands.set(command.name, command);
					if (command?.aliases.lenght !== 0) {
						command.aliases.forEach((alias: string) => {
							this.aliases.set(alias, command);
						});
					}
				}
			});
		} catch (error) {
			logger.error(error);
		}
		try {
			readdirSync(pathEvent).forEach(async (file) => {
				const { event } = await import(`${pathEvent}/${file}`);
				this.events.set(event.name, event);
				this.on(event.name, event.run.bind(null, this));
			});
		} catch (error) {
			logger.error(error);
		}
		this.login(process.env.TOKEN)
			.then(() => {
				connect(`${process.env.MONGO}`, {}).then(() =>{
					logger.info('✔️ Se conecto a mongo.')
				}).catch((error) => {
					logger.error('❌ No se conecto a mongo.')
					/* throw new Error(error); */
				});
			})
			.catch((error) => {
				logger.error(error);
			});
	}
}