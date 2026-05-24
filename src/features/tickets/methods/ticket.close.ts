import TicketsClient from "@feature/client/main.client.js";
import { type TicketComponentFunction, type TicketMethodReturn, TicketStatus } from "@typings";
import { ButtonInteraction } from "discord.js";
import { defaultChannelPermissions, getTicketByChannelId } from "../ticket.functions.js";

const method = (async (
	client: TicketsClient,
	interaction: ButtonInteraction
): Promise<TicketMethodReturn> => {
	if (!interaction.inCachedGuild()) return [false, "Not in cached guild"];
	const { channel, channelId, guildId } = interaction;
	if (!channelId || !channel) return [false, "Button must be used inside a channel."];
	const ticket = await getTicketByChannelId(client, channelId);
	if (!ticket) return [false, "Could not find ticket from channelId"];
	if (ticket.status !== TicketStatus.Open)
		return [false, "Cannot close an already closed or deleted ticket"];
	const { metadata } = ticket;

	const closedCategoryId = metadata.categories.closedCategoryId;
	await channel.edit({
		parent: closedCategoryId,
		permissionOverwrites: defaultChannelPermissions(
			guildId,
			ticket.openedById,
			!!metadata.behaviour?.onClose?.removeOpenedByUser
		),
	});

	return [true, "Closed ticket"];
}) as TicketComponentFunction;

export default method;
