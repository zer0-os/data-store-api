import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Domain, DomainId } from "@zero-tech/data-store-core";
import { getMongoDomainService } from "../src/helpers";
import { getDomainFindOptionsFromQuery } from "../src/helpers/domainFindOptionsHelper";
import { validateDomainId } from "../src/schemas";
import { createHTTPResponse } from "../src/helpers/createHTTPResponse";
import { createErrorResponse } from "../src/helpers/createErrorResponse";
import { generatePaginationResponse } from "../src/helpers/paginationHelper";
import * as constants from "../src/constants";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    context.log("GET Subdomains: HTTP trigger function processed a request.");
    const domainId: DomainId = req.params.id;
    if (!validateDomainId(domainId)) {
      context.res = createHTTPResponse(400, validateDomainId.errors);
      return;
    }

    const findOptions = getDomainFindOptionsFromQuery(req, true);
    const domainService = await getMongoDomainService(context.log);
    const response = await domainService.getSubdomains(
      req.params.id,
      findOptions
    );
    const paginationResponse = generatePaginationResponse<Domain>(
      response,
      findOptions.skip ?? constants.defaultSkip,
      findOptions.limit ?? constants.defaultLimit,
      req.query,
      constants.routes.v1.getSubdomainsById + domainId
    );
    context.res = {
      body: paginationResponse,
    };
  } catch (err) {
    context.log.error(
      "GET Subdomains, error encountered: ",
      JSON.stringify(err)
    );
    context.res = createErrorResponse(err, context);
  }
};

export default httpTrigger;
