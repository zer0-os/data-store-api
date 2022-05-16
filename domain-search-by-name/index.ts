import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { doServiceOperation, searchDomainsByName } from "../src/services/domainService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  await doServiceOperation(searchDomainsByName, context, req);
};

export default httpTrigger;
