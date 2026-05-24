import optionsBuilders from "@feature/builders/ticket.options.js";
import TicketsClient from "@feature/client/main.client.js";
import { TicketEntity } from "@feature/database/TicketEntity.js";
import { TicketNameFormat, TicketNameFormatParts, TicketOption } from "@typings";
import { OverwriteResolvable, OverwriteType, PermissionFlagsBits } from "discord.js";
import { customId as customIdMethods } from "trivious";

export const baseDefaultPermissionFlags = [
	PermissionFlagsBits.ViewChannel,
	PermissionFlagsBits.SendMessages,
	PermissionFlagsBits.AttachFiles,
	PermissionFlagsBits.EmbedLinks,
];

export function defaultChannelPermissions(
	guildId: string,
	userId: string,
	hide?: boolean
): OverwriteResolvable[] {
	const memberOverwrites: OverwriteResolvable = {
		type: OverwriteType.Member,
		id: userId,
	};
	if (hide) memberOverwrites.deny = baseDefaultPermissionFlags;
	else memberOverwrites.allow = baseDefaultPermissionFlags;

	return [
		memberOverwrites,
		{
			id: guildId,
			deny: [PermissionFlagsBits.ViewChannel],
		},
	];
}

export async function getTicketByCustomId(client: TicketsClient, customId: string) {
	const repository = client.getRepository(TicketEntity);
	const { data } = customIdMethods.decode(customId);
	if (!data) return null;
	const id = Number(data);
	return await repository.findOneBy({ id });
}

export async function getTicketByChannelId(client: TicketsClient, channelId: string) {
	const repository = client.getRepository(TicketEntity);
	return await repository.findOneBy({ channelId });
}

export function parseTicketOptionsButtons(ticketId: number, options: TicketOption[]) {
	return options.map((value) => optionsBuilders[value](ticketId));
}

export function buildTicketName<F extends TicketNameFormat[number][]>(
	format: F,
	parts: TicketNameFormatParts
): string {
	return format.map((key) => String(parts[key as F[number]])).join("-");
}
