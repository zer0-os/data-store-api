import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { DomainId } from "@zero-tech/data-store-core";
import { getMongoDomainService } from "../src/helpers";
import { getDomainFindOptionsFromQuery } from "../src/helpers/domainFindOptionsHelper";
import { validateDomainId } from "../src/schemas";
import { createHTTPResponse } from "../src/helpers/createHTTPResponse";
import { createErrorResponse } from "../src/helpers/createErrorResponse";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const domainId: DomainId = req.params.id;
    if (!validateDomainId(domainId)) {
      context.res = createHTTPResponse(400, validateDomainId.errors);
      return;
    }

    const findOptions = getDomainFindOptionsFromQuery(req);
    const domainService = await getMongoDomainService();
    const response = await domainService.getSubdomains(
      req.params.id,
      findOptions
    );
    context.res = {
      body: response,
    };
  } catch (err) {
    context.res = createErrorResponse(err, context);
  }
};

export default httpTrigger;
