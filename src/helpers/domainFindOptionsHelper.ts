import { HttpRequest } from "@azure/functions";
import { SortDirection } from "mongodb";
import { DomainFindOptions } from "@zero-tech/data-store-core";
import {
  DomainSortDirection,
  domainReflectionSchema,
  Sort,
  Projection,
} from "../types";
import * as constants from "../constants";
import { generatePageableFindOptions } from "./paginationHelper";
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
) {
  //Get variables to project, matching the case insensitive names to case sensitive object names
  const projection = createProjection(req);
  const sort = createSort(req);

  let findOptions: DomainFindOptions = {
    sort: sort,
    projection: projection,
    limit: isNaN(+req.query.limit) ? constants.defaultLimit : +req.query.limit, //Setting limit to 0 will return all entries
    skip: isNaN(+req.query.skip) ? constants.defaultSkip : +req.query.skip,
  };
  if (pageable) findOptions = generatePageableFindOptions(findOptions);
  return findOptions;
}

//Converting Number to either 1 or -1
export function valueToSortDirection(val: DomainSortDirection): Sort {
  return Number(val) === DomainSortDirection.desc ? -1 : 1;
}

//Converting Number to either 1 or 0
export function valueToProjection(val: Number): Projection {
  return Number(val) === 1 ? 1 : 0;
}

/**
 * Creates a Projection object, dynamically. If projection is true, and no fields are supplied, it will use the default projection value
 * @param req - an HttpRequest
 * @returns - A DomainProjectionOptions object
 */
export function createProjection(req: HttpRequest): DynamicObject<Projection> {
  const projectionInclusion =
    (req.query?.projection ?? "true").toLowerCase() == "true" ||
    (req.query?.projection ?? "1") == "1";

  let projectionValues: string[] = [];
  if (req.query?.fields) {
    projectionValues = req.query?.fields
      .split(",")
      .map((val) => resolveObjectValues(domainReflectionSchema, val));
  } else if (projectionInclusion) {
    projectionValues = constants.defaultProjection.map((val) =>
      resolveObjectValues(domainReflectionSchema, val)
    );
  }
  const projectionObject = createProjectionDynamicObject(
    projectionValues,
    valueToProjection(Number(projectionInclusion))
  );
  return projectionObject;
}

/**
 * Creates a SortObject, dynamically. If no sort directions are supplied, default sort direction is descending
 * @param req - an HttpRequest
 * @returns  - a DomainSortOptions object
 */
export function createSort(req: HttpRequest): DynamicObject<SortDirection> {
  let sortValues = constants.defaultSort;
  let sortDirection = constants.defaultSortDirection;
  if (req.query) {
    if (req.query.sort) {
      sortValues = req.query.sort
        .split(",")
        .map((val) => resolveObjectValues(domainReflectionSchema, val));
    }
    if (req.query.sortDirection) {
      sortDirection = req.query?.sortDirection
        .split(",")
        .map((val) =>
          valueToSortDirection(
            DomainSortDirection[
              val.toLowerCase() as keyof typeof DomainSortDirection
            ] ?? DomainSortDirection.desc
          )
        );
    }
  }
  const sortObject = createSortDynamicObject(sortValues, sortDirection);

  return sortObject;
}

/**
 * Creates a dynamic object with the variables named after the given string and the values set to the projection
 * @param values - Array of strings to set as the variable names within the object
 * @param include - The value to set the variables within the object to
 * @returns
 */
export function createProjectionDynamicObject(
  values: string[],
  include: Projection
): DynamicObject<Projection> {
  let projection: DynamicObject<Projection> = {};
  values = values.filter((item, index) => {
    return values.indexOf(item) === index && item !== "";
  });
  values.forEach((x) => {
    projection[x] = include;
  });
  return projection;
}
/**
 * Creates a dynamic object with the variables named after the given string and the values set to the sortDirections.
 * Defaults to -1 when a direction is not supplied
 * @param sortValues - Array of strings to set as the variable names within the object
 * @param sortDirections - An array of sort directions to set the variables within the object to
 * @returns
 */
export function createSortDynamicObject(
  sortValues: string[],
  sortDirections: SortDirection[]
): DynamicObject<SortDirection> {
  let sort: DynamicObject<SortDirection> = {};
  sortValues = sortValues.filter((item, index) => {
    return sortValues.indexOf(item) === index;
  });
  sortValues.forEach((x, index) => {
    sort[x] = sortDirections[index] !== undefined ? sortDirections[index] : -1;
  });
  return sort;
}

//Iterates through an object to find matching field names with correct capitalization
export function resolveObjectValues(
  object: Object,
  incomingValue: string
): string {
  let match = "";
  Object.keys(object).some((element) => {
    if (element.toLowerCase() == incomingValue.toLowerCase()) {
      match = element;
      return true; //Break loop
    }
  });
  return match;
}
