import {
  Domain,
  Maybe,
  ResourceType,
  ValidDomain,
} from "@zero-tech/data-store-core";
import { DomainFindOptions } from "@zero-tech/data-store-core/lib/shared/types/findOptions";
import { DomainDto, ResourceRegistryDto } from "../types";

export abstract class DomainService<T> {
  dbService: T;
  constructor(service: T) {
    this.dbService = service;
  }
  abstract listDomains(
    findOptions: DomainFindOptions
  ): Promise<DomainDto[]>;
  abstract getDomain(
    id: string,
    findOptions: DomainFindOptions
  ): Promise<Maybe<DomainDto>>;
  abstract getSubdomains(
    id: string,
    findOptions: DomainFindOptions,
    nameFilter: string
  ): Promise<DomainDto[]>;
  abstract getSubdomainsDeep(
    id: string,
    findOptions: DomainFindOptions,
    nameFilter: string
  ): Promise<DomainDto[]>;
  abstract searchDomainsByOwner(
    address: string,
    findOptions: DomainFindOptions
  ): Promise<DomainDto[]>;
  abstract searchDomainsByName(
    searchTerm: string,
    findOptions: DomainFindOptions
  ): Promise<DomainDto[]>;
  abstract doServiceOperation(serviceFn: Function): Promise<Domain[] | Domain>;
  abstract getResourceRegistry(
    resourceType: string
  ): Promise<Maybe<ResourceRegistryDto>>;

  validDomainToDomainDto(domain: ValidDomain): DomainDto {
    const resources = Object.keys(domain.resources).reduce((prev, current) => {
      const resource = domain.resources[current as ResourceType];
      return {
        ...prev,
        [current]: resource!.value,
      };
    }, {});

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
      activeBids: domain.activeBids,
      groupId: domain.groupId.value,
      groupFileIndex: domain.groupFileIndex,
      buyNow: domain.buyNow.value,
      resources: resources,
    };
    return response;
  }
}
