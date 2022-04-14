import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { MongoClient } from "mongodb";
import { MongoDbService } from  "@zero-tech/data-store/src/database/mongo/mongoDbService"
import { getDbConnectionInfo } from "@zero-tech/data-store/src/database/helpers";
import * as env from "env-var"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const dbUri = env.get("DATABASE_URI").required().asString();

    context.log('HTTP trigger function processed a request.');
    let dbClient = new MongoClient(dbUri);

    let dbService = new MongoDbService(dbClient, getDbConnectionInfo());

    let results = await dbService.getAllDomains();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: results
    };

};

export default httpTrigger;