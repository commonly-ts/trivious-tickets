// import { TicketObject, TicketStatus } from "@typings";
// import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// @Entity({ name: "ticket" })
// export class TicketEntity {
// 	@PrimaryGeneratedColumn()
// 	id: number;

// 	@Column({ name: "opened_by_id" })
// 	openedById: string;

// 	@Column()
// 	status: TicketStatus;

// 	@Column({ type: "jsonb" })
// 	metadata: TicketObject;

// 	@Column({ name: "claimed_by_id", nullable: true })
// 	claimedById: string;

// 	@Column({ name: "channel_id", nullable: true })
// 	channelId: string;

// 	@Column({ name: "header_message_id", nullable: true })
// 	headerMessageId: string;

// 	@Column({ name: "closed_message_id", nullable: true })
// 	closedMessageId: string;
// }
