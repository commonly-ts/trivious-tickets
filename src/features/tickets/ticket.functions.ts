import optionsBuilders from "@feature/builders/ticket.options.js";
import { TicketNameFormat, TicketNameFormatParts, TicketOption } from "@typings";

export function parseTicketOptionsButtons(ticketId: number, options: TicketOption[]) {
	return options.map((value) => optionsBuilders[value](ticketId));
}

export function buildTicketName<F extends TicketNameFormat[number][]>(
	format: F,
	parts: TicketNameFormatParts
): string {
	return format.map((key) => String(parts[key as F[number]])).join("-");
}
