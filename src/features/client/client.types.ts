import { GuildOptions } from "@typings";

export interface TicketClientOptions extends GuildOptions {
	/**
	 * Things that are automatically inserted into the Trivious client
	 *
	 * Properties default to true if not this is not defined
	 */
	binds?: {
		/**
		 * Whether to auto deploy ticket slash commands (e.g. /ticket close)
		 *
		 * @default true
		 */
		slashCommands: boolean;
		/**
		 * Whether to auto bind events (e.g. button handlers)
		 *
		 * @default true
		 */
		events: boolean;
	};
}
