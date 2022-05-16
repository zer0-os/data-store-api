import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { doServiceOperation, searchDomainsByOwner } from "../src/services/domainService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  await doServiceOperation(searchDomainsByOwner, context, req);
};

export default httpTrigger;
