import TicketsClient from "@feature/client/main.client.js";
import { TicketEntity } from "@feature/database/TicketEntity.js";
import { type TicketComponentFunction, type TicketMethodReturn, TicketStatus } from "@typings";
import { ButtonInteraction, EmbedBuilder, GuildChannelEditOptions } from "discord.js";
import { createActionRow } from "trivious";
import {
	defaultChannelPermissions,
	getTicketByCustomId,
	parseTicketOptionsButtons,
} from "../ticket.functions.js";

const method = (async (
	client: TicketsClient,
	interaction: ButtonInteraction
): Promise<TicketMethodReturn> => {
	if (!interaction.inCachedGuild()) return [false, "Not in cached guild"];
	const { channel, channelId, guildId } = interaction;
	if (!channelId || !channel) return [false, "Button must be used inside a channel."];
	const ticket = await getTicketByCustomId(client, interaction.customId);
	if (!ticket) return [false, "Could not find ticket from customId or database"];
	if (ticket.status !== TicketStatus.Open)
		return [false, "Cannot close an already closed or deleted ticket"];
	const { metadata } = ticket;
	const repository = client.getRepository(TicketEntity);

	// Edit channel name and permissions
	const options: GuildChannelEditOptions = {
		permissionOverwrites: defaultChannelPermissions(
			guildId,
			ticket.openedById,
			!!metadata.behaviour?.onClose?.removeOpenedByUser
		),
	};
	if (metadata.categories.closedCategoryId) options.parent = metadata.categories.closedCategoryId;
	await channel.edit(options);

	// Edit available ticket options
	const headerMessage = await channel.messages.fetch(ticket.headerMessageId);
	const parsedComponents = createActionRow(
		...parseTicketOptionsButtons(ticket.id, metadata.options.CLOSED)
	);
	await headerMessage.edit({ components: [parsedComponents] });

	// Send closed message
	const closedMessage = await channel.send({
		embeds: [
			new EmbedBuilder()
				.setDescription(`**Ticket closed by ${interaction.member}**`)
				.setColor("Red"),
		],
		components: [parsedComponents],
	});

	// Update database
	await repository.update(
		{ id: ticket.id },
		{ status: TicketStatus.Closed, closedMessageId: closedMessage.id }
	);

	return [true, "Closed ticket"];
}) as TicketComponentFunction;

export default method;
