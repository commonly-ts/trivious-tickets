import TicketsClient from "@feature/client/main.client.js";
import { TicketEntity } from "@feature/database/TicketEntity.js";
import { TicketObject } from "@typings";

export default async (
	client: TicketsClient,
	ticket: TicketObject
): Promise<[success: boolean, reason: string]> => {
	const repository = client.dataSource.getRepository(TicketEntity);

	return [true, "Closed ticket"];
};
