import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getMongoDomainService } from "../src/helpers";
import { createErrorResponse } from "../src/helpers/createErrorResponse";
import { getDomainFindOptionsFromQuery } from "../src/helpers/domainFindOptionsHelper";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    context.log(
      "GET Domains by Name: HTTP trigger function processed a request."
    );
    const domainName: string = req.params.name;

    let findOptions = getDomainFindOptionsFromQuery(req);
    const domainService = await getMongoDomainService(context);
    const response = await domainService.searchDomainsByName(
      domainName,
      findOptions
    );
    context.res = {
      body: response,
    };
  } catch (err) {
    context.log.error(
      `GET Domains by Name, error encountered: `,
      JSON.stringify(err)
    );
    context.res = createErrorResponse(err, context);
  }
};

export default httpTrigger;
