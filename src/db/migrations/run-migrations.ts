import { promisify } from "util";
import fs from "fs";
import { getClient } from "../index";
import { PoolClient } from "pg";

async function runInitMigrationFile(client: PoolClient) {
  const path = "00000001-init-migrations.sql";

  try {
    const query = await promisify(fs.readFile)(`${__dirname}/scripts/${path}`, {
      encoding: "utf-8",
    });
    console.log("🚀 ~ query ~ query:", query);

    await client.query(query.toString());

    const result = await client.query("SELECT * FROM migrations");
    const foundMigrationFIle = result.rows.find((r) => r.file === path);
    if (foundMigrationFIle) {
      return;
    }

    await client.query("INSERT INTO migrations (file) VALUES ($1)", [path]);
  } catch (error) {
    console.error(error);
  }
}

async function getOutstandingMigrations(migrations: string[] = []) {
  const files = await promisify(fs.readdir)(`${__dirname}/scripts`);
  console.log("🚀 ~ getOutstandingMigrations ~ files:", files);
  const sql = await Promise.all(
    files
      .filter((file) => file.split(".")[1] === "sql")
      .filter((file) => !migrations.includes(file))
      .map(async (file) => {
        console.log("🚀 ~ .map ~ file:", file);
        return {
          file,
          query: await promisify(fs.readFile)(`${__dirname}/scripts/${file}`, {
            encoding: "utf-8",
          }),
        };
      })
  );
  console.log("🚀 ~ getOutstandingMigrations ~ sql:", sql);

  return sql;
}

async function migrate() {
  // Check previous migrations
  const client = await getClient();
  await runInitMigrationFile(client);
  let existingMigrations: string[] = [];
  try {
    let result = await client.query("SELECT * FROM migrations");

    existingMigrations = result.rows.map((r) => r.file);
    console.log("🚀 ~ migrate ~ existingMigrations:", existingMigrations);
  } catch (err) {
    console.error(err);
  }

  // Get outstanding migrations
  const outstandingMigrations = await getOutstandingMigrations(
    existingMigrations
  );

  if (!outstandingMigrations.length) {
    console.log("No outstanding migrations need to run");
    client.release();
    return;
  }

  try {
    // Start transaction
    await client.query("BEGIN");

    // Run each migration sequentially in a transaction
    for (let migration of outstandingMigrations) {
      // Run the migration
      await client.query(migration.query.toString());
      // Keep track of the migration
      await client.query("INSERT INTO migrations (file) VALUES ($1)", [
        migration.file,
      ]);
    }

    // All good, we can commit the transaction
    await client.query("COMMIT");
  } catch (err) {
    // Oops, something went wrong, rollback!
    await client.query("ROLLBACK");
    console.error(err);
  } finally {
    // Don't forget to release the client!
    client.release();
  }
}

migrate();
