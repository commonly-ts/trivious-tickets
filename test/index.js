import { TriviousClient } from "trivious";
import { TicketsClient } from "../dist/index.js";

const client = new TriviousClient({
	intents: [],
	corePath: "",
	credentials: { clientIdReference: "", tokenReference: "" },
});
const tickets = new TicketsClient(client);

(async () => {
	await tickets.bindEvents();
})();
