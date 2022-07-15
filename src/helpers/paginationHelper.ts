import { HttpRequestQuery } from "@azure/functions";
import { DomainFindOptions } from "@zero-tech/data-store-core";
import { PaginationResponse } from "../types";

/**
 * Transforms an array of objects into a paginated response payload
 * @param results - An array of objects to be included as the primary resposne
 * @param limit - The upper limit of returnable objects from the query
 * @param skip - The amount of objectst that were skipped in the query
 * @param query - The query string parameters used to generate the query
 * @param path - The Path of the function that was called
 * @returns
 */
export function generatePaginationResponse<T>(
  results: T[],
  skip: number,
  limit: number,
  query: HttpRequestQuery,
  path: string
): PaginationResponse<T> {
  //Decrement the limit by one, as it was increased by one to determine next page status
  if (limit > 0) limit -= 1;
  const next = generateNextLink(
    new Map(Object.entries(query)),
    limit,
    results.length,
    path
  );
  const previous = generatePreviousLink(
    new Map(Object.entries(query)),
    skip,
    limit,
    path
  );
  //Remove last result, as it was only included to determine next page status
  if (results.length > 1) {
    results = results.slice(0, -1);
  }
  const response: PaginationResponse<T> = {
    results: results,
    pagination: {
      //Default to 1 as minimum page, otherwise round up to the nearest page
      pageNumber: Math.abs(
        limit > 0 && skip > 0 && skip > limit ? Math.ceil(skip / limit) : 1
      ),
      pageSize: limit,
      pageResults: results.length,
      links: {
        next: next,
        previous: previous,
      },
    },
  };
  return response;
}

/**
 * Enables a DomainFindOptions to be pageable by expanding the limit for 1 (So that the status of the next page can be determined)
 * @param findOptions  - A DomainFindOptions object used to determine the mongo query parameters
 * @returns - A DomainFindOptions with the limit increased by 1, unless there is no limit or the limit is already at its maximum value
 */
export function generatePageableFindOptions(
  findOptions: DomainFindOptions
): DomainFindOptions {
  if (
    isNaN(findOptions?.limit ?? NaN) ||
    !findOptions.limit ||
    findOptions.limit == Number.MAX_VALUE
  ) {
    return findOptions;
  }
  findOptions.limit += 1;
  return findOptions;
}

function generateNextLink(
  query: Map<string, string>,
  limit: number,
  numResults: number,
  path: string
): string {
  //Check for status of next page
  if (numResults >= limit) {
    return path + generateQueryString(query, limit, true);
  }
  return "";
}

function generatePreviousLink(
  query: Map<string, string>,
  skip: number,
  limit: number,
  path: string
): string {
  //Check for status of previous page
  if (skip >= limit) {
    return path + generateQueryString(query, limit, false);
  }
  return "";
}

function generateQueryString(
  query: Map<string, string>,
  reqLimit: number,
  next: boolean
): string {
  const qSkip = query.get("skip") ?? 0;
  query.delete("limit");
  query.delete("skip");
  let skip = isNaN(+qSkip) ? 0 : +qSkip;
  if (next) {
    //Generate next page skip value
    skip = skip + reqLimit;
  } else if (skip >= reqLimit) {
    //Generate previous page skip value
    skip = skip - reqLimit;
  } else {
    //Previous page defaulted to beginning
    skip = 0;
  }
  let queryString = `?limit=${reqLimit}&skip=${skip}`;

  //Populate the remaining query string parameters
  for (let [key, value] of query) {
    queryString += `&${key}=${value}`;
  }
  return queryString;
}
