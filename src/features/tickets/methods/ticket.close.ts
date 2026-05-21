import TicketsClient from "@feature/client/main.client.js";
import { TicketComponentFunction, TicketMethodReturn } from "@typings";
import { ButtonInteraction } from "discord.js";

const method = (async (
	client: TicketsClient,
	interactaiaon: ButtonInteraction
): Promise<TicketMethodReturn> => {
	return [true, "Closed ticket"];
}) as TicketComponentFunction;

export default method;
