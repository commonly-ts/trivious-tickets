import "reflect-metadata";

import { TicketBuilder } from "@src/index.js";
import { TicketsClient } from "@typings";
import { TestDataSource } from "tests/datasource.js";
import { TriviousClient } from "trivious";

const appDataSource = TestDataSource;
const client = new TriviousClient({
	corePath: "dev",
	intents: [],
	credentials: {
		clientIdReference: "CLIENT_ID",
		tokenReference: "BOT_TOKEN",
	},
});
const tickets = new TicketsClient(client, appDataSource);
const _testTicket = new TicketBuilder().setName("report").setDescription("Report players please");

(async () => {
	await appDataSource.initialize();
	await tickets.bindButtons();
	await client.start();
})();
