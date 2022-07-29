import { Sort } from "./types";

export const defaultLimit = 100;
export const defaultSkip = 0;
export const defaultSort = ["name"];
export const defaultSortDirection: Sort[] = [-1];
export const routes = {
  v1: {
    listDomains: "v1/domains/list",
    searchDomainsByName: "v1/domains/search/name/",
    searchDomainsByOwner: "v1/domains/search/owner/",
    getSubdomainsById: "v1/domains/subdomains/",
    getDomainsById: "v1/domains/get/",
  },
};
