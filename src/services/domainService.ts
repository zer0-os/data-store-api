import { Domain, DomainFindOptions, Maybe } from "@zero-tech/data-store-core";
import { PaginationResponse } from "../types";

export abstract class DomainService<T> {
  dbService: T;
  constructor(service: T) {
    this.dbService = service;
  }
  abstract listDomains(
    findOptions: Maybe<DomainFindOptions>
  ): Promise<PaginationResponse<Domain>>;
  abstract getDomain(
    id: string,
    findOptions: Maybe<DomainFindOptions>
  ): Promise<Domain>;
  abstract getSubdomains(
    id: string,
    findOptions: Maybe<DomainFindOptions>
  ): Promise<PaginationResponse<Domain>>;
  abstract searchDomainsByOwner(
    address: string,
    findOptions: Maybe<DomainFindOptions>
  ): Promise<PaginationResponse<Domain>>;
  abstract searchDomainsByName(
    searchTerm: string,
    findOptions: Maybe<DomainFindOptions>
  ): Promise<PaginationResponse<Domain>>;
  abstract doServiceOperation(
    serviceFn: Function
  ): Promise<PaginationResponse<Domain> | Domain>;

  domainsToDomainsResponse(domains: Domain[]): PaginationResponse<Domain> {
    const response: PaginationResponse<Domain> = {
      numResults: domains.length,
      results: domains,
    };
    return response;
  }
}
