import { PermissionFlagsBits } from "discord.js";
import { beforeEach, describe, expect, it } from "vitest";
import { TicketBuilder, TicketOptionsBuilder } from "../src/features/builders/ticket.object.js";
import { TicketOption } from "../src/features/tickets/ticket.types.js";

describe("TicketBuilder", () => {
	let data: ReturnType<TicketBuilder["toObject"]>;

	beforeEach(() => {
		const ticketOptions = new TicketOptionsBuilder()
			.setOpenOptions(TicketOption.Claim, TicketOption.Close)
			.setClosedOptions(TicketOption.Delete, TicketOption.Reopen);

		const ticketObject = new TicketBuilder();
		ticketObject
			.setClosedCategory("1234")
			.setDescription("Description")
			.setFormat(["name", "id"])
			.setMemberPermissions([PermissionFlagsBits.Administrator])
			.setName("test")
			.setOnCloseBehaviour({ removeOpenedByUser: true })
			.setOpenCategory("5678")
			.setRolePermissions(["123456789"])
			.setUserPermissions(["987654321"])
			.setOptions(ticketOptions);
		data = ticketObject.toObject();
	});

	it("should set categories correctly", () => {
		expect(data.categories).toMatchObject({
			closedCategoryId: "1234",
			openCategoryId: "5678",
		});
	});

	it("should set permissions correctly", () => {
		expect(data.permissions?.memberPermissions).toContain(PermissionFlagsBits.Administrator);
		expect(data.permissions?.roleIds).toContain("123456789");
		expect(data.permissions?.userIds).toContain("987654321");
	});

	it("should set close behaviour", () => {
		expect(data.behaviour?.onClose).toMatchObject({
			removeOpenedByUser: true,
		});
	});

	it("should set ticket options", () => {
		expect(data.options).toEqual({
			OPEN: [TicketOption.Claim, TicketOption.Close],
			CLOSED: [TicketOption.Delete, TicketOption.Reopen],
		});
	});
});
