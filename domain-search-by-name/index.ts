import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getMongoDomainService } from "../src/helpers";
import { createErrorResponse } from "../src/helpers/createErrorResponse";
import { getDomainFindOptionsFromQuery } from "../src/helpers/domainFindOptionsHelper";
import { generatePaginationResponse } from "../src/helpers/paginationHelper";
import * as constants from "../src/constants";
import { DomainDto } from "../src/types";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    context.log(
      "GET Domains by Name: HTTP trigger function processed a request."
    );
    const domainName: string = req.params.name;

    let findOptions = getDomainFindOptionsFromQuery(req, true);
    const domainService = await getMongoDomainService(context.log);
    const response = await domainService.searchDomainsByName(
      domainName,
      findOptions
    );
    const paginationResponse = generatePaginationResponse<DomainDto>(
      response,
      findOptions.skip ?? constants.defaultSkip,
      findOptions.limit ?? constants.defaultLimit,
      req.query,
      constants.routes.v1.searchDomainsByName + domainName
    );
    context.res = {
      body: paginationResponse,
    };
  } catch (err) {
    context.log.error(
      "GET Domains by Name, error encountered: ",
      JSON.stringify(err)
    );
    context.res = createErrorResponse(err, context);
  }
};

export default httpTrigger;
