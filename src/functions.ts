import TicketsClient from "@feature/client/main.client.js";
import type { GuildOptions } from "@typings";
import { TriviousClient } from "trivious";

async function fetchGuildFromId(trivious: TriviousClient, guildId?: string) {
	return (await trivious.guilds.fetch(guildId!)) ?? null;
}

export async function resolveGuildOptions(
	client: TicketsClient,
	...options: Array<GuildOptions & Record<string, unknown>>
) {
	const option = options.findLast((opt) => opt?.guild || opt.guildId);

	if (!option) {
		if (client.options?.guild) return client.options.guild;
		if (client.options?.guildId)
			return await fetchGuildFromId(client.trivious, client.options.guildId);
		return null;
	}

	if (option.guild) return option.guild;
	return await fetchGuildFromId(client.trivious, option.guildId);
}
