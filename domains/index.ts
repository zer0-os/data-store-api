import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { doServiceOperation, listDomains } from "../services/domainService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  await doServiceOperation(listDomains, context, req);
};

export default httpTrigger;
