import { Domain } from "@zero-tech/data-store-core";

export interface PaginationResponse<T> {
  numResults: number;
  results: T[];
}

export enum DomainSortDirection {
  desc = 0,
  asc = 1,
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
  /**
   * Writes to warning level logging or lower.
   */
  warn(...args: any[]): void;
  /**
   * Writes to info level logging or lower.
   */
  info(...args: any[]): void;
  /**
   * Writes to verbose level logging.
   */
  verbose(...args: any[]): void;
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
