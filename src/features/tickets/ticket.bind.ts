import TicketsClient from "@feature/client/main.client.js";
import { importFile, resolveRelativePath } from "@src/structure.js";
import type { TicketComponentFunction } from "@typings";
import { Collection } from "discord.js";
import { promises as fs } from "fs";
import path from "path";
import { Component, createButtonComponent } from "trivious";

function getMethodFiles() {
	const pattern = path.join(resolveRelativePath("features/tickets/methods"), "ticket.*.js");
	return fs.glob(pattern);
}

function getName(dir: string) {
	if (!dir.endsWith(".js")) throw new Error("Invalid file path, must end with .js");
	const parts = dir.split(".");
	return parts[parts.length - 2];
}

export async function bindButtons(client: TicketsClient) {
	const files = getMethodFiles();
	const components = new Collection<string, Component>();
	for await (const file of files) {
		const name = getName(file);
		const method = await importFile<TicketComponentFunction>(file);
		const identifier = `tt#${name}`;
		if (!method) continue;
		components.set(
			identifier,
			createButtonComponent({
				identifier,
				async execute(_, interaction) {
					await method(client, interaction);
				},
			})
		);
	}
	const existingComponents = client.trivious.stores.components;
	client.trivious.stores.components = existingComponents.concat(components);
}

export async function bindSlashCommands(client: TicketsClient) {}
