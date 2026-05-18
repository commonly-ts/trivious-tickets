import TicketsClient from "@feature/client/main.client.js";
import { ButtonInteraction } from "discord.js";
import { createButtonComponent, customId } from "trivious";

function fetchTicketId(interaction: ButtonInteraction) {
	const { data } = customId.decode(interaction.customId);
	return Number(data);
}

export default function setButtonHandlers(client: TicketsClient) {
	client.trivious.stores.components.set(
		"ticket#close",
		createButtonComponent({
			identifier: "ticket#close",
			async execute(_, interaction) {
				await client.close(fetchTicketId(interaction));
			},
		})
	);
}
