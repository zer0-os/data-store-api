import { Context } from "@azure/functions";
import { DataStoreApiError } from "../errors";
import { createHTTPResponse } from "./createHTTPResponse";

export function createErrorResponse(err: unknown, context: Context): Object {
  let body = err;
  if (err instanceof Error) {
    body = err.message;
    context.log(err.name, err.message, err.stack);

    if (err instanceof DataStoreApiError) {
      const apiError = err as DataStoreApiError;
      return createHTTPResponse(apiError.errorCode, body);
    }
  }
  return createHTTPResponse(500, body);
}
