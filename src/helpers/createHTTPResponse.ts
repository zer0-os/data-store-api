export function createHTTPResponse(statusCode: number, body: unknown): Object {
  const response = {
    status: statusCode,
    body: body,
  };
  return response;
}
