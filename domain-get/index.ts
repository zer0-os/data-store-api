import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { DomainId } from "@zero-tech/data-store-core";
import { getMongoDomainService } from "../src/helpers";
import { createErrorResponse } from "../src/helpers/createErrorResponse";
import { createHTTPResponse } from "../src/helpers/createHTTPResponse";
import { getDomainFindOptionsFromQuery } from "../src/helpers/domainFindOptionsHelper";
import { validateDomainId } from "../src/schemas";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    context.log("GET Domain: HTTP trigger function processed a request.");
    const domainId: DomainId = req.params.id;
    if (!validateDomainId(domainId)) {
      context.res = createHTTPResponse(400, validateDomainId.errors);
      return;
    }

    const findOptions = getDomainFindOptionsFromQuery(req);
    const domainService = await getMongoDomainService(context.log);
    const response = await domainService.getDomain(req.params.id, findOptions);
    if (response) {
      context.res = {
        body: response,
      };
    } else {
      context.res = createHTTPResponse(204);
    }
  } catch (err) {
    context.log.error("GET Domain, error encountered: ", JSON.stringify(err));
    context.res = createErrorResponse(err, context);
  }
};

export default httpTrigger;
