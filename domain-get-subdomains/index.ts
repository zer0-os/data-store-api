import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { doOp, getSubdomains } from "../services/domainService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  await doOp(getSubdomains, context, req);
};

export default httpTrigger;
