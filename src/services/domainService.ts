import { Domain, DomainFindOptions, Maybe } from "@zero-tech/data-store-core";
import { DomainsApiResponse } from "../types";

export abstract class DomainService<T> {
  dbService: T;
  constructor(service: T) {
    this.dbService = service;
  }
  abstract listDomains(
    findOptions: Maybe<DomainFindOptions>
  ): Promise<DomainsApiResponse>;
  abstract getDomain(
    id: string,
    findOptions: Maybe<DomainFindOptions>
  ): Promise<Domain>;
  abstract getSubdomains(
    id: string,
    findOptions: Maybe<DomainFindOptions>
  ): Promise<DomainsApiResponse>;
  abstract searchDomainsByOwner(
    address: string,
    findOptions: Maybe<DomainFindOptions>
  ): Promise<DomainsApiResponse>;
  abstract searchDomainsByName(
    searchTerm: string,
    findOptions: Maybe<DomainFindOptions>
  ): Promise<DomainsApiResponse>;
  abstract doServiceOperation(
    serviceFn: Function
  ): Promise<DomainsApiResponse | Domain>;

  domainsToDomainsResponse(domains: Domain[]): DomainsApiResponse {
    const response: DomainsApiResponse = {
      numResults: domains.length,
      results: domains,
    };
    return response;
  }
}
