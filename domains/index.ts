import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Domain } from "@zero-tech/data-store-core";
import { getMongoDomainService } from "../src/helpers";
import { createErrorResponse } from "../src/helpers/createErrorResponse";
import { getDomainFindOptionsFromQuery } from "../src/helpers/domainFindOptionsHelper";
import { generatePaginationResponse } from "../src/helpers/paginationHelper";
import * as constants from "../src/constants";
import { DomainDto } from "../src/types";
import { replaceOfDefinedKeys } from "../src/helpers/objectHelper";
const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    context.log("GET Domains: HTTP trigger function processed a request.");
    const findOptions = getDomainFindOptionsFromQuery(req, true);
    const domainService = await getMongoDomainService(context.log);
    const response = await domainService.listDomains(findOptions);
    const paginationResponse = generatePaginationResponse<DomainDto>(
      response,
      findOptions.skip ?? constants.defaultSkip,
      findOptions.limit ?? constants.defaultLimit,
      req.query,
      constants.routes.v1.listDomains
    );

    // Collect all the different resource types and replace resource registry with latest data
    const resourceTypes: Set<string> = new Set();
    paginationResponse.results.forEach((domain: DomainDto) => {
      Object.keys(domain.resources).forEach((resourceType: string) =>
        resourceTypes.add(resourceType)
      );
    });
    const resourceRegistries = await domainService.getResourceRegistries(
      Array.from(resourceTypes)
    );
    paginationResponse.results.forEach((domain: DomainDto) => {
      domain.resources = replaceOfDefinedKeys(
        domain.resources,
        resourceRegistries
      );
    });

    context.res = {
      body: paginationResponse,
    };
  } catch (err) {
    context.log.error("GET Domains, error encountered: ", JSON.stringify(err));
    context.res = createErrorResponse(err, context);
  }
};

export default httpTrigger;
