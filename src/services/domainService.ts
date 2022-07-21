import { Domain, Maybe, ValidDomain } from "@zero-tech/data-store-core";
import { DomainFindOptions } from "@zero-tech/data-store-core/lib/shared/types/findOptions";
import { DomainDto, PaginationResponse } from "../types";

export abstract class DomainService<T> {
  dbService: T;
  constructor(service: T) {
    this.dbService = service;
  }
  abstract listDomains(
    findOptions: Maybe<DomainFindOptions>
  ): Promise<PaginationResponse<DomainDto>>;
  abstract getDomain(
    id: string,
    findOptions: Maybe<DomainFindOptions>
  ): Promise<DomainDto>;
  abstract getSubdomains(
    id: string,
    findOptions: Maybe<DomainFindOptions>
  ): Promise<PaginationResponse<DomainDto>>;
  abstract searchDomainsByOwner(
    address: string,
    findOptions: Maybe<DomainFindOptions>
  ): Promise<PaginationResponse<DomainDto>>;
  abstract searchDomainsByName(
    searchTerm: string,
    findOptions: Maybe<DomainFindOptions>
  ): Promise<PaginationResponse<DomainDto>>;
  abstract doServiceOperation(serviceFn: Function): Promise<Domain[] | Domain>;

  domainsToPaginationResponse(
    domains: ValidDomain[]
  ): PaginationResponse<DomainDto> {
    const domainResponses = domains.map((x) => this.validDomainToDomainDto(x));
    const response: PaginationResponse<DomainDto> = {
      numResults: domains.length,
      results: domainResponses,
    };
    return response;
  }

  validDomainToDomainDto(domain: ValidDomain): DomainDto {
    const response: DomainDto = {
      domainId: domain.domainId,
      isRoot: domain.isRoot,
      isValid: domain.isValid,
      registrar: domain.registrar,
      label: domain.label,
      name: domain.name,
      parent: domain.parent,
      labelHash: domain.labelHash,
      minter: domain.minter,
      owner: domain.owner.value,
      metadataUri: domain.metadataUri.value,
      royaltyAmount: domain.royaltyAmount.value,
      locked: domain.locked.value,
      lockedBy: domain.lockedBy.value,
      created: domain.created,
      children: domain.children,
      history: domain.history,
      groupId: domain.groupId.value,
      groupFileIndex: domain.groupFileIndex,
    };
    return response;
  }
}
