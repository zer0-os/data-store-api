import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { doServiceOperation, getDomain } from "../src/services/domainService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  await doServiceOperation(getDomain, context, req);
};

export default httpTrigger;
