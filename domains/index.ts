import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as service from "../service"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const body = service.returnDomain()

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: body
    };

};

export default httpTrigger;