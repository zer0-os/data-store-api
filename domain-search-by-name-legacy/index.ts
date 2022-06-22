import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  doServiceOperation,
  searchDomainsByName,
} from "../src/services/legacyDomainService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  await doServiceOperation(searchDomainsByName, context, req);
};

export default httpTrigger;
