import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getMongoDomainService } from "../src/helpers";
import { createErrorResponse } from "../src/helpers/createErrorResponse";
import { createHTTPResponse } from "../src/helpers/createHTTPResponse";
import { validateResourceType } from "../src/schemas";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    context.log(
      "GET Domain Resources: HTTP trigger function processed a request."
    );
    const resourceType: string = req.params.type;
    if (!validateResourceType(resourceType)) {
      context.res = createHTTPResponse(400, validateResourceType.errors);
      return;
    }

    const domainService = await getMongoDomainService(context.log);
    const response = await domainService.getResourceRegistry(resourceType);
    if (response) {
      context.res = {
        body: response,
      };
    } else {
      context.res = createHTTPResponse(204);
    }
  } catch (err) {
    context.log.error(
      "GET Domain Resources, error encountered: ",
      JSON.stringify(err)
    );
    context.res = createErrorResponse(err, context);
  }
};

export default httpTrigger;
