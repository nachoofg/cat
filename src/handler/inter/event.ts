import { ClientEvents } from 'discord.js';
import { ClientExtends } from '../index';

export interface Event {
	name: keyof ClientEvents;
	run: run;
}
interface run {
	(Client: ClientExtends, ...args: any[]);
}