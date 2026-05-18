import { Guild } from "discord.js";

export * from "@feature/tickets/ticket.types.js";

export interface GuildOptions {
	guild?: Guild;
	guildId?: string;
}

export type AsRecord<T> = { [K in keyof T]: T[K] };
