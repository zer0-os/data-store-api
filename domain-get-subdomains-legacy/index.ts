import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  doServiceOperation,
  getSubdomains,
} from "../src/services/legacyDomainService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  await doServiceOperation(getSubdomains, context, req);
};

export default httpTrigger;
