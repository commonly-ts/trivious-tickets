import { TicketOption } from "@typings";
import { ButtonBuilder, ButtonStyle } from "discord.js";
import { ComponentContext, customId } from "trivious";

export default {
	[TicketOption.Close]: (id: number) => {
		return new ButtonBuilder()
			.setLabel("Close")
			.setStyle(ButtonStyle.Secondary)
			.setEmoji("🔒")
			.setCustomId(
				customId.encode({
					context: ComponentContext.Button,
					identifier: "ticket#close",
					data: id.toString(),
				})
			);
	},
	[TicketOption.Reopen]: (id: number) => {
		return new ButtonBuilder()
			.setLabel("Reopen")
			.setStyle(ButtonStyle.Secondary)
			.setEmoji("🔓")
			.setCustomId(
				customId.encode({
					context: ComponentContext.Button,
					identifier: "ticket#reopen",
					data: id.toString(),
				})
			);
	},
	[TicketOption.Claim]: (id: number) => {
		return new ButtonBuilder()
			.setLabel("Claim")
			.setStyle(ButtonStyle.Primary)
			.setEmoji("🙋")
			.setCustomId(
				customId.encode({
					context: ComponentContext.Button,
					identifier: "ticket#claim",
					data: id.toString(),
				})
			);
	},
	[TicketOption.Unclaim]: (id: number) => {
		return new ButtonBuilder()
			.setLabel("Unclaim")
			.setStyle(ButtonStyle.Primary)
			.setEmoji("🏷️")
			.setCustomId(
				customId.encode({
					context: ComponentContext.Button,
					identifier: "ticket#unclaim",
					data: id.toString(),
				})
			);
	},
	[TicketOption.Delete]: (id: number) => {
		return new ButtonBuilder()
			.setLabel("Delete")
			.setStyle(ButtonStyle.Danger)
			.setEmoji("💣")
			.setCustomId(
				customId.encode({
					context: ComponentContext.Button,
					identifier: "ticket#delete",
					data: id.toString(),
				})
			);
	},
} as Record<TicketOption, (id: number) => ButtonBuilder>;
