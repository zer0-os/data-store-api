import { Context } from "@azure/functions";
import { createHTTPResponse } from "./createHTTPResponse";

export function createErrorResponse(err: unknown, context: Context): Object {
  let body = err;
  if (err instanceof Error) {
    body = err.message;
    context.log(err.name, err.message, err.stack);
  }
  return createHTTPResponse(500, body);
}
