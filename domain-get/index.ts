import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { doOp, getDomain } from "../services/domainService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  await doOp(getDomain, context, req);
};

export default httpTrigger;
