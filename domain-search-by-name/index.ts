import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { doOp, searchDomainsByName } from "../services/domainService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  await doOp(searchDomainsByName, context, req);
};

export default httpTrigger;
