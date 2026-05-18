import { TicketEntity } from "@feature/database/TicketEntity.js";
import bindButtonHandlers from "@feature/tickets/handlers/_index.js";
import ticketClose from "@feature/tickets/methods/ticket.close.js";
import ticketCreate from "@feature/tickets/methods/ticket.create.js";
import { GuildOptions, TicketCreationData, TicketObject } from "@typings";
import { TriviousClient } from "trivious";
import { DataSource } from "typeorm";

export default class TicketsClient {
	private readonly _entities = [TicketEntity];
	objects: Map<string, TicketObject> = new Map();

	constructor(
		public readonly trivious: TriviousClient,
		public readonly dataSource: DataSource,
		public options: GuildOptions
	) {
		bindButtonHandlers(this);
	}

	async close(ticketId: number) {
		const repository = this.dataSource.getRepository(TicketEntity);
		const ticket = await repository.findOneBy({ id: ticketId });
		if (!ticket) return [false, "Could not find ticket in database"];
		return ticketClose(this, ticket.metadata);
	}

	async create(ticket: TicketObject, data: TicketCreationData) {
		if (!this.objects.has(ticket.name)) this.objects.set(ticket.name, ticket);
		return ticketCreate(this, ticket, data);
	}

	get entities() {
		return this._entities;
	}
}
