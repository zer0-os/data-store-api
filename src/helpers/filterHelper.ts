import { DomainFindOptions, Maybe } from "@zero-tech/data-store-core";
import { DataStoreApiError } from "../errors";

export function checkFilterCompatibility(
  findOptions: DomainFindOptions,
  filter: Maybe<string>,
  filterPropertyName: string
): void {
  // when filtering by a property, enforce only sorting by that property
  if (findOptions.sort && filter) {
    const sortKeys = Object.keys(findOptions.sort);
    if (sortKeys.length > 1) {
      throw new DataStoreApiError(
        `Cannot sort by more than one property when filtering by ${filterPropertyName}`
      );
    }
    if (sortKeys[0] !== filterPropertyName) {
      throw new DataStoreApiError(`Cannot sort by anything other than ${filterPropertyName}`);
    }
  }
}
