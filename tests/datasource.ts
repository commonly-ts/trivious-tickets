import { DataType, newDb } from "pg-mem";
import { DataSource } from "typeorm";
import { TicketEntity } from "../src/features/database/TicketEntity.js";

const db = newDb();

db.public.registerFunction({
	name: "version",
	returns: DataType.text,
	implementation: () => "PostgreSQL 16.0",
});

db.public.registerFunction({
	name: "current_database",
	args: [],
	returns: DataType.text,
	implementation: () => "test",
	impure: true,
});

db.public.registerFunction({
	name: "current_schema",
	args: [],
	returns: DataType.text,
	implementation: () => "public",
	impure: true,
});

export const TestDataSource: DataSource = await db.adapters.createTypeormDataSource({
	type: "postgres",
	database: "test",
	username: "postgres",
	password: "",
	synchronize: true,
	logging: false,
	entities: [TicketEntity],
});
