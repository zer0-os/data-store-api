import { SortDirection } from "@zero-tech/data-store-core";
import { MappingSortProps } from "./types";

export const defaultLimit = 100;
export const defaultSkip = 0;
export const defaultSort = ["name"];
export const defaultSortDirection: SortDirection[] = [-1];

export const routes = {
  v1: {
    listDomains: "v1/domains/list",
    searchDomainsByName: "v1/domains/search/name/",
    searchDomainsByOwner: "v1/domains/search/owner/",
    getSubdomainsById: "v1/domains/subdomains/",
    getSubdomainsByIdDeep: "v1/domains/subdomains/deep",
    getDomainsById: "v1/domains/get/",
  },
};

export const mappingSortProps: MappingSortProps = {
  domainId: {
    domainId: -1,
  },
  isRoot: {
    isRoot: -1,
  },
  isValid: {
    isValid: -1,
  },
  registrar: {
    registrar: -1,
  },
  label: {
    label: -1,
  },
  name: {
    name: -1,
  },
  parent: {
    parent: -1,
  },
  labelHash: {
    labelHash: -1,
  },
  minter: {
    minter: -1,
  },
  owner: {
    "owner.value": -1,
  },
  metadataUri: {
    "metadataUri.value": -1,
  },
  royaltyAmount: {
    "royaltyAmount.value": -1,
  },
  locked: {
    "locked.value": -1,
  },
  lockedBy: {
    "lockedBy.value": -1,
  },
  created: {
    "created.timestamp": -1,
    "created.blockNumber": -1,
    "created.logIndex": -1,
  },
  groupId: {
    "groupId.value": -1,
  },
  "buyNow.price": {
    "buyNow.value.listing.price": -1,
    "buyNow.value.isActive": -1,
  },
  "buyNow.timestamp": {
    "buyNow.time.timestamp": -1,
    "buyNow.value.isActive": -1,
  },
  children: {
    children: -1,
  },
  history: {
    history: -1,
  },
};
