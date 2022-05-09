import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { doOp, listDomains } from "../services/domainService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  await doOp(listDomains, context, req);
};

export default httpTrigger;
