import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Address } from "@zero-tech/data-store-core";
import { getMongoDomainService } from "../src/helpers";
import { createErrorResponse } from "../src/helpers/createErrorResponse";
import { createHTTPResponse } from "../src/helpers/createHTTPResponse";
import { getDomainFindOptionsFromQuery } from "../src/helpers/domainFindOptionsHelper";
import { validateAddress } from "../src/schemas";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    context.log(
      "GET Domains by Owner: HTTP trigger function processed a request."
    );
    const ownerAddress: Address = req.params.address;
    if (!validateAddress(ownerAddress)) {
      context.res = createHTTPResponse(400, validateAddress.errors);
      return;
    }

    let findOptions = getDomainFindOptionsFromQuery(req);
    const domainService = await getMongoDomainService(context);
    const response = await domainService.searchDomainsByOwner(
      ownerAddress,
      findOptions
    );
    context.res = {
      body: response,
    };
  } catch (err) {
    context.log.error(
      `GET Domains by Owner, error encountered: `,
      JSON.stringify(err)
    );
    context.res = createErrorResponse(err, context);
  }
};

export default httpTrigger;
