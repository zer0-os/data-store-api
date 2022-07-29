export function createHTTPResponse(statusCode: number, body?: unknown): Object {
  let response;
  if (body) {
    response = {
      status: statusCode,
      body: body,
    };
  } else {
    response = {
      statusCode: statusCode,
    };
  }
  return response;
}
