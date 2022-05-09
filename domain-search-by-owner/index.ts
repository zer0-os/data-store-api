import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { doOp, searchDomainsByOwner } from "../services/domainService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  await doOp(searchDomainsByOwner, context, req);
};

export default httpTrigger;
