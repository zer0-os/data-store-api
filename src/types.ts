import {
  Address,
  BuyNow,
  DomainId,
  ResourceAssociation,
  ResourceType,
  SortDirection,
  UInt256,
} from "@zero-tech/data-store-core";
import { Time } from "@zero-tech/data-store-core/lib/shared/helpers/time";
import { History } from "@zero-tech/data-store-core/lib/shared/types/history";

export type Projection = 0 | 1;
export interface PaginationResponse<T> {
  results: T[];
  pagination: {
    pageNumber: number;
    pageSize: number;
    pageResults: number;
    links: {
      next: string;
      previous: string;
    };
  };
}

export enum QueryParamSortDirection {
  desc = 0,
  asc = 1,
}

export interface ResourceRegistryDto {
  resourceType: ResourceType;
  resourceRegistry: Address;
}

type MappingResourceAssociations = {
  [resourceType in ResourceType]?: ResourceAssociation;
};

export interface DomainDto {
  domainId: DomainId;
  isRoot: boolean;
  isValid: boolean;
  registrar: Address;
  label: string;
  name: string;
  parent: DomainId;
  labelHash: string;
  minter: Address;
  owner: Address;
  metadataUri: string;
  royaltyAmount: UInt256;
  locked: boolean;
  lockedBy: Address;
  created: Time;
  children: DomainId[];
  history: History[];
  groupId: UInt256;
  groupFileIndex: UInt256;
  buyNow: BuyNow;
  resources: MappingResourceAssociations;
}

export interface Logger {
  /**
   * Writes streaming function logs at the default trace level.
   */
  (...args: any[]): void;
  /**
   * Writes to error level logging or lower.
   */
  error(...args: any[]): void;
}

export type MappingSortProps = {
  [key: string]: {
    [mappingKey: string]: SortDirection;
  };
};
