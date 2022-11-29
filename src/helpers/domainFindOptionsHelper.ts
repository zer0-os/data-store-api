import { HttpRequest } from "@azure/functions";
import { QueryParamSortDirection } from "../types";
import { DomainFindOptions } from "@zero-tech/data-store-core/lib/shared/types/findOptions";
import { SortDirection } from "@zero-tech/data-store-core/lib/shared/types/findOptions";
import * as constants from "../../src/constants";
import { generatePageableFindOptions } from "./paginationHelper";
import { InvalidSortFieldsError } from "../errors";

interface DynamicObject<T> {
  [key: string]: T;
}

/*
 * Generates a DomainFindOptions object based on query string parameters
 * @param req - An HttpRequest
 * @returns  - a DomainFindOptions object, with either default values or values supplied from the query string
 */
export function getDomainFindOptionsFromQuery(
  req: HttpRequest,
  pageable = false
): DomainFindOptions {
  const sort = createSort(req);

  let findOptions: DomainFindOptions = {
    sort: sort,
    limit: isNaN(+req.query.limit) ? constants.defaultLimit : +req.query.limit, //Setting limit to 0 will return all entries
    skip: isNaN(+req.query.skip) ? constants.defaultSkip : +req.query.skip,
  };
  if (pageable) findOptions = generatePageableFindOptions(findOptions);
  return findOptions;
}

//Converting Number to either 1 or -1
export function valueToSortDirection(
  val: QueryParamSortDirection
): SortDirection {
  return Number(val) === QueryParamSortDirection.desc ? -1 : 1;
}

/**
 * Creates a SortObject, dynamically. If no sort directions are supplied,
 * default sort direction is descending.
 * Throws Error if found that have invalid sort fields.
 * @param req - an HttpRequest
 * @returns  - a DomainSortOptions object
 */
export function createSort(req: HttpRequest): DynamicObject<SortDirection> {
  let sortValues = constants.defaultSort;
  let sortDirections = constants.defaultSortDirection;
  if (req.query) {
    if (req.query.sort) {
      sortValues = req.query.sort.split(",");
      sortValues = sortValues.filter(
        (item, index) => sortValues.indexOf(item) === index
      );
    }
    if (req.query.sortDirection) {
      sortDirections = req.query.sortDirection
        .split(",")
        .map((val) =>
          valueToSortDirection(
            QueryParamSortDirection[
              val.toLowerCase() as keyof typeof QueryParamSortDirection
            ] ?? QueryParamSortDirection.desc
          )
        );
    }
  }

  const sortObject: DynamicObject<SortDirection> = {};
  sortValues.forEach((sortValue, index) => {
    // Check if sort field is valid
    if (sortValue in constants.mappingSortProps) {
      // Map sort field to mutliple fields with default sort direction
      for (const [mappingKey, defaultDirection] of Object.entries(
        constants.mappingSortProps[sortValue]
      )) {
        sortObject[mappingKey] =
          sortDirections[index] !== undefined
            ? sortDirections[index]
            : defaultDirection;
      }
    } else {
      throw new InvalidSortFieldsError(
        `Found an invalid sort field: ${sortValue}`
      );
    }
  });

  return sortObject;
}
