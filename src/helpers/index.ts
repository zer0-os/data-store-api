import { getDbConnectionInfo } from "@zero-tech/data-store-core/lib/database/helpers";
import { Context } from "@azure/functions";
import { MongoClient } from "mongodb";
import { MongoDbService } from "@zero-tech/data-store-core/lib/database/mongo/mongoDbService";
import * as env from "env-var"

const dbUri = env.get("DATABASE_URI").required().asString();

export async function getConnectedDbClient(context: Context) {
  const dbClient = new MongoClient(dbUri);
  await dbClient.connect();

  return dbClient;
}

export function getDatabaseService(dbClient: MongoClient) {
  const dbConnectionInfo = getDbConnectionInfo();
  return MongoDbService.instance(dbClient, dbConnectionInfo);
}
