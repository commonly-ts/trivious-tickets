import { TicketObject, TicketStatus } from "@typings";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "ticket" })
export class TicketEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: "opened_by_id", type: "varchar" })
	openedById: string;

	@Column({ type: "enum", enum: TicketStatus, default: TicketStatus.Open })
	status: TicketStatus;

	@Column({ type: "jsonb" })
	metadata: TicketObject;

	@Column({ name: "claimed_by_id", nullable: true, type: "varchar" })
	claimedById: string;

	@Column({ name: "channel_id", nullable: true, type: "varchar" })
	channelId: string;

	@Column({ name: "header_message_id", nullable: true, type: "varchar" })
	headerMessageId: string;

	@Column({ name: "closed_message_id", nullable: true, type: "varchar" })
	closedMessageId: string;
}
