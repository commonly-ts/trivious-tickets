import { GuildOptions } from "@typings";
import { MessageCreateOptions, User } from "discord.js";

export enum TicketOption {
	Close,
	Reopen,
	Claim,
	Unclaim,
	Delete,
}

export enum TicketStatus {
	Open = "OPEN",
	Closed = "CLOSED",
	Deleted = "DELETED",
}

/**
 * Specify what options are available based on the ticket state
 */
export type TicketObjectOptions = Record<TicketStatusForOptions, TicketOption[]>;
export type TicketStatusForOptions = Exclude<TicketStatus, TicketStatus.Deleted>;

/**
 * Permissions object for tickets
 */
export interface TicketPermissions {
	/**
	 * Roles that can interact with ticket options
	 *
	 * Roles that are automatically added to opened tickets
	 *
	 * @type `string` - `Snowflake`
	 */
	roleIds?: string[];
	/**
	 * Users that can interact with ticket options
	 *
	 * Users that are automatically added to opened tickets
	 *
	 * @type `string` - `Snowflake`
	 */
	userIds?: string[];
	/**
	 * Member permissions that can interact with ticket options
	 *
	 * @type `bigint` - `PermissionFlagsBits`
	 */
	memberPermissions?: bigint[];
}

export interface TicketCategoryConfig {
	/**
	 * Category channel ID where open tickets are
	 */
	openCategoryId: string;
	/**
	 * Category channel ID where closed tickets go
	 */
	closedCategoryId: string;
}

type TicketTypeName = "name";
type CreatedByUsername = "username";
type TicketId = "id";
export type TicketNameFormat = (TicketTypeName | CreatedByUsername | TicketId)[];
export type TicketNameFormatParts = { [K in TicketNameFormat[number][][number]]: string };

export type TicketHeaderMessage = Pick<MessageCreateOptions, "embeds">;

export interface TicketObject extends GuildOptions {
	name: string;
	description: string;
	/**
	 * What information goes where in the ticket channel name
	 *
	 * `name` - The ticket type name e.g. report
	 *
	 * `username` - The username of who opened the ticket
	 *
	 * `id` - The database ID of the ticket
	 */
	nameFormat: TicketNameFormat;
	headerMessage: TicketHeaderMessage;
	options: TicketObjectOptions;
	categories: TicketCategoryConfig;
	permissions?: TicketPermissions;
}

export type OptionResult = [success: boolean, reason: string];

export interface TicketCreationData {
	user: User;
}
