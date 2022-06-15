import { Domain } from "@zero-tech/data-store-core";

export interface DomainsApiResponse {
  numResults?: number;
  results: Domain[];
}

export enum DomainSortDirection {
  descending = 0,
  ascending = 1,
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
