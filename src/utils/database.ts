import { Pool } from "pg";
import * as Configs from "../../config.json";
import { Secre } from "../overrides";

export class DatabaseHandler {
	pool: Pool;
	client: Secre;
	running: boolean = false;
	constructor() {
		this.pool = new Pool(Configs.postgresConfigs);
	}
	async setupDatabase(client: Secre) {
		if (this.running) return;
		this.client = client;
		await this.pool.connect();
		await this.pool.query(
			"CREATE TABLE IF NOT EXISTS secre_moderation_configs (guild_id INTEGER, moderator_roles VARCHAR ARRAY);"
		);
	}
}
