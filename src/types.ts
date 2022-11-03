import { AddressZero, EtherSymbol, HashZero } from "@ethersproject/constants";
import {
  Address,
  BuyNow,
  Domain,
  DomainId,
  ResourceAssociation,
  UInt256,
} from "@zero-tech/data-store-core";
import { Time } from "@zero-tech/data-store-core/lib/shared/helpers/time";
import { History } from "@zero-tech/data-store-core/lib/shared/types/history";
import {
  noBuyNowListing,
  defaultValueMessageTime,
} from "@zero-tech/data-store-core/lib/aggregator/constants";

export type StringMapping<T> = {
  [key: string]: T;
};

export type Sort = -1 | 1;
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
  resourceType: string;
  resourceRegistry: string;
}

export interface MappingResourceAssociations {
  [resourceType: string]: ResourceAssociation;
}

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

/**
 * If this ever fails to compile, initialize the missing variable with a default value
 */
export const domainReflectionSchema: Domain = {
  domainId: "",
  isRoot: false,
  children: [],
  history: [],
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
  buyNow: {
    value: {
      listing: noBuyNowListing,
      isActive: false,
    },
    time: defaultValueMessageTime,
  },
  resources: {},
};
