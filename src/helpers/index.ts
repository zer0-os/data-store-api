import { getDbConnectionInfo } from "@zero-tech/data-store-core/lib/database/helpers";
import { Context } from "@azure/functions";
import { MongoClient } from "mongodb";
import { MongoDbService } from "@zero-tech/data-store-core/lib/database/mongo/mongoDbService";

export async function getConnectedDbClient(context: Context) {
  const dbConnectionInfo = getDbConnectionInfo();
  const dbClient = new MongoClient(dbConnectionInfo.uri);
  await dbClient.connect();

  return dbClient;
}

export function getDatabaseService(dbClient: MongoClient) {
  const dbConnectionInfo = getDbConnectionInfo();
  return MongoDbService.instance(dbClient, dbConnectionInfo);
}
