import { Maybe } from "@zero-tech/data-store-core";
import { StringMapping } from "../types";

export function replaceOfDefinedKeys<T, TR>(
  original: StringMapping<T>,
  replaceBy: StringMapping<Maybe<TR>>
): StringMapping<T> {
  return Object.keys(origin).reduce(
    (prev: StringMapping<T>, current: string) => {
      if (replaceBy[current]) {
        return {
          ...prev,
          [current]: {
            ...original[current],
            ...replaceBy[current],
          },
        };
      }
      return { ...prev };
    },
    {} as StringMapping<T>
  );
}
