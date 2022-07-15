import { Domain, DomainFindOptions, Maybe } from "@zero-tech/data-store-core";

export abstract class DomainService<T> {
  dbService: T;
  constructor(service: T) {
    this.dbService = service;
  }
  abstract listDomains(
    findOptions: Maybe<DomainFindOptions>
  ): Promise<Domain[]>;
  abstract getDomain(
    id: string,
    findOptions: Maybe<DomainFindOptions>
  ): Promise<Domain>;
  abstract getSubdomains(
    id: string,
    findOptions: Maybe<DomainFindOptions>
  ): Promise<Domain[]>;
  abstract searchDomainsByOwner(
    address: string,
    findOptions: Maybe<DomainFindOptions>
  ): Promise<Domain[]>;
  abstract searchDomainsByName(
    searchTerm: string,
    findOptions: Maybe<DomainFindOptions>
  ): Promise<Domain[]>;
  abstract doServiceOperation(serviceFn: Function): Promise<Domain[] | Domain>;
}
