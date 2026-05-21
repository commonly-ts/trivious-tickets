// import { TicketEntity } from "@feature/database/TicketEntity.js";
// import ticketClose from "@feature/tickets/methods/ticket.close.js";
// import ticketCreate from "@feature/tickets/methods/ticket.create.js";
import { bindButtons as bindTicketButtons } from "@feature/tickets/ticket.bind.js";
import { TicketClientOptions, TicketCreationData, TicketObject } from "@typings";
import { TriviousClient } from "trivious";
// import { DataSource } from "typeorm";

export default class TicketsClient {
	// private readonly _entities = [TicketEntity];
	objects: Map<string, TicketObject> = new Map();

	constructor(
		public readonly trivious: TriviousClient,
		// public readonly dataSource: DataSource,
		public readonly options: TicketClientOptions = {
			binds: {
				events: true,
				slashCommands: true,
			},
		}
	) {}

	async bindButtons() {
		await bindTicketButtons(this);
	}

	async close(ticketId: number) {
		// 	const repository = this.dataSource.getRepository(TicketEntity);
		// 	const ticket = await repository.findOneBy({ id: ticketId });
		// 	if (!ticket) return [false, "Could not find ticket in database"];
		// 	return ticketClose(this, ticket.metadata);
	}

	async create(ticket: TicketObject, data: TicketCreationData) {
		// 	if (!this.objects.has(ticket.name)) this.objects.set(ticket.name, ticket);
		// 	return ticketCreate(this, ticket, data);
	}

	// get entities() {
	// 	return this._entities;
	// }
}
