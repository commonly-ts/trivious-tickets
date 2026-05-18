import {
	TicketCategoryConfig,
	TicketNameFormat,
	TicketObject,
	TicketObjectOptions,
	TicketOption,
	TicketPermissions,
} from "@typings";

export class TicketOptionsBuilder {
	private _data: Partial<TicketObjectOptions>;
	constructor(data?: TicketObjectOptions) {
		this._data = data || {};
	}

	setOpenOptions(...options: TicketOption[]): this {
		this._data.OPEN = options;
		return this;
	}

	setClosedOptions(...options: TicketOption[]): this {
		this._data.CLOSED = options;
		return this;
	}

	get data(): TicketObjectOptions {
		return this._data as TicketObjectOptions;
	}
}

export class TicketBuilder {
	private _data: Partial<TicketObject>;
	constructor(data?: TicketObject) {
		this._data = data || {};
	}

	get data(): TicketObject {
		return this._data as TicketObject;
	}

	setName(name: string): this {
		this._data.name = name;
		return this;
	}

	setDescription(description: string): this {
		this._data.description = description;
		return this;
	}

	setFormat(format: TicketNameFormat): this {
		this._data.nameFormat = format;
		return this;
	}

	setOptions(builder: (builder: TicketOptionsBuilder) => TicketOptionsBuilder): this {
		this._data.options = builder(new TicketOptionsBuilder()).data;
		return this;
	}

	setCategories(data: TicketCategoryConfig): this {
		this._data.categories = data;
		return this;
	}

	setOpenCategory(id: string): this {
		if (!this._data.categories) this._data.categories = {} as any;
		this._data.categories!.openCategoryId = id;
		return this;
	}

	setClosedCategory(id: string): this {
		if (!this._data.categories) this._data.categories = {} as any;
		this._data.categories!.closedCategoryId = id;
		return this;
	}

	setPermissions(data: TicketPermissions): this {
		this._data.permissions = data;
		return this;
	}

	setMemberPermissions(permissionBits: bigint[]): this {
		if (!this._data.permissions) this._data.permissions = {};
		this._data.permissions.memberPermissions = permissionBits;
		return this;
	}

	setUserPermissions(userIds: string[]): this {
		if (!this._data.permissions) this._data.permissions = {};
		this._data.permissions.userIds = userIds;
		return this;
	}

	setRolePermissions(roleIds: string[]): this {
		if (!this._data.permissions) this._data.permissions = {};
		this._data.permissions.roleIds = roleIds;
		return this;
	}
}
