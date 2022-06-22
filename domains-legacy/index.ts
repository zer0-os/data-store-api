import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  doServiceOperation,
  listDomains,
} from "../src/services/legacyDomainService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  await doServiceOperation(listDomains, context, req);
};

export default httpTrigger;
