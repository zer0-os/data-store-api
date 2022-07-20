import {
  Address,
  Domain,
  DomainId,
  Stamped,
  UInt256,
} from "@zero-tech/data-store-core";
import { Time } from "@zero-tech/data-store-core/lib/shared/helpers/time";
import { DomainHistory } from "@zero-tech/data-store-core/lib/shared/types/history";

export interface PaginationResponse<T> {
  numResults: number;
  results: T[];
}

export enum DomainSortDirection {
  desc = 0,
  asc = 1,
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
  history: DomainHistory;
  groupId: UInt256;
  groupFileIndex: UInt256;
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
