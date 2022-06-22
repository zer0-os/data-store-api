import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getMongoDomainService } from "../src/helpers";
import { createErrorResponse } from "../src/helpers/createErrorResponse";
import { getDomainFindOptionsFromQuery } from "../src/helpers/domainFindOptionsHelper";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    context.log("GET Domains: HTTP trigger function processed a request.");
    let findOptions = getDomainFindOptionsFromQuery(req);
    const domainService = await getMongoDomainService(context);
    const response = await domainService.listDomains(findOptions);
    context.res = {
      body: response,
    };
  } catch (err) {
    context.log.error(`GET Domains, error encountered: `, JSON.stringify(err));
    context.res = createErrorResponse(err, context);
  }
};

export default httpTrigger;
