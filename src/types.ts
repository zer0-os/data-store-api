import { Domain } from "@zero-tech/data-store-core";

export interface PaginationResponse<T> {
  numResults: number;
  results: T[];
}

export enum DomainSortDirection {
  desc = 0,
  asc = 1,
}

/**
 * If this ever fails to compile, initialize the missing variable with a default value
 */
export const domainReflectionSchema: Domain = {
  domainId: "",
  isRoot: false,
  children: [],
  history: {
    transfers: [],
  },
  label: undefined,
  name: undefined,
  parent: undefined,
  labelHash: undefined,
  minter: undefined,
  owner: undefined,
  metadataUri: undefined,
  royaltyAmount: undefined,
  locked: undefined,
  lockedBy: undefined,
  created: undefined,
  registrar: undefined,
  isValid: false,
};
