import { getDbConnectionInfo } from "@zero-tech/data-store-core/lib/database/helpers";
import { Context, Logger } from "@azure/functions";
import { MongoClient, MongoClientOptions } from "mongodb";
import { MongoDbService } from "@zero-tech/data-store-core/lib/database/mongo/mongoDbService";
import * as env from "env-var";
import { MongoDomainService } from "../services/mongoDomainService";

export async function getConnectedDbClient(context?: Context) {
  const dbUser = env.get("DATABASE_USERNAME").required().asString();
  const dbPassword = env.get("DATABASE_PASSWORD").required().asString();
  const dbUri = env.get("DATABASE_URI").required().asString();

  const options: MongoClientOptions = {
    connectTimeoutMS: 10000,
    retryWrites: true,
    retryReads: true,
    w: "majority",
    keepAlive: true,
    auth: {
      username: dbUser,
      password: dbPassword,
    },
  };

  const dbClient = new MongoClient(dbUri, options);
  await dbClient.connect();
  console.log("Database connection established");

  return dbClient;
}

export async function getDatabaseService(dbClient: MongoClient) {
  const dbConnectionInfo = getDbConnectionInfo();
  const serviceInstance = MongoDbService.instance(dbClient, dbConnectionInfo);
  return serviceInstance;
}

export async function getMongoDomainService(logger: Logger) {
  const dbClient = await getConnectedDbClient();
  const dbService = await getDatabaseService(dbClient);
  return new MongoDomainService(dbClient, dbService, logger);
}
