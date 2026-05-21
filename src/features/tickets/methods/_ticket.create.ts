import TicketsClient from "@feature/client/main.client.js";
import { resolveGuildOptions } from "@src/functions.js";
import { AsRecord, OptionResult, TicketCreationData, TicketObject } from "@typings";
import { CategoryChannel } from "discord.js";

export default async (
	client: TicketsClient,
	ticket: TicketObject,
	data: TicketCreationData
): Promise<OptionResult> => {
	const guild = await resolveGuildOptions(client, ticket as AsRecord<TicketObject>);
	if (!guild) return [false, "Could not resolve guild from TicketObject or Client"];

	const categoryChannel = (await guild.channels.fetch(
		ticket.categories.openCategoryId
	)) as CategoryChannel | null;
	if (!categoryChannel)
		return [false, `Could not fetch open category channel '${ticket.categories.openCategoryId}'`];

	try {
		// const ticketRepository = client.dataSource.getRepository(TicketEntity);
		// const dbTicket = await ticketRepository.save(
		// 	ticketRepository.create({
		// 		metadata: ticket,
		// 		status: TicketStatus.Open,
		// 		openedById: data.user.id,
		// 	})
		// );
		// const ticketName = buildTicketName(ticket.nameFormat, {
		// 	id: dbTicket.id.toString(),
		// 	name: ticket.name.toLowerCase().replaceAll(" ", "-"),
		// 	username: data.user.username,
		// });
		// const channel = await guild.channels.create({
		// 	type: ChannelType.GuildText,
		// 	parent: ticket.categories.openCategoryId,
		// 	name: ticketName,
		// });
		// const headerMessage = await channel.send({
		// 	...ticket.headerMessage,
		// 	components: [createActionRow(...parseTicketOptionsButtons(dbTicket.id, ticket.options.OPEN))],
		// });
		// await headerMessage.pin();
		// await ticketRepository.update(
		// 	{ id: dbTicket.id },
		// 	{ channelId: channel.id, headerMessageId: headerMessage.id }
		// );
	} catch (err: unknown) {
		const error = err as Error;
		console.error(error);
		return [false, error.message];
	}

	return [true, "Successfully created ticket"];
};
