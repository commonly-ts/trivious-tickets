import { TriviousClient } from "trivious";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import TicketsClient from "../src/features/client/main.client.js";
import { TestDataSource } from "./datasource.js";

describe("TicketsClient", () => {
	let client: TriviousClient;
	let tickets: TicketsClient;

	beforeAll(async () => {
		client = new TriviousClient({
			intents: [],
			corePath: "tests",
			credentials: {
				clientIdReference: "",
				tokenReference: "",
			},
		});

		tickets = new TicketsClient(client, TestDataSource);

		await TestDataSource.initialize();
		await tickets.bindButtons();
		await client.register();
	});

	afterAll(async () => {
		if (TestDataSource.isInitialized) {
			await TestDataSource.destroy();
		}
	});

	it("should initialize successfully", () => {
		expect(client).toBeDefined();
		expect(tickets).toBeDefined();
	});

	it("should have bound buttons", () => {
		expect(client.stores.components).toBeDefined();
		expect(client.stores.components.size).toBeGreaterThan(0);
	});
});
