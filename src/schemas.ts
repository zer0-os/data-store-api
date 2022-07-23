import { Address, DomainId } from "@zero-tech/data-store-core";
import { DomainFindOptions } from "@zero-tech/data-store-core/lib/shared/types/findOptions";
import Ajv, { JSONSchemaType } from "ajv";
import { PartialSchema } from "ajv/dist/types/json-schema";

const ajv = new Ajv({ coerceTypes: true });

const domainId: JSONSchemaType<DomainId> = {
  type: "string",
  minLength: 66,
  maxLength: 66,
};

const blockchainAddress: JSONSchemaType<Address> = {
  type: "string",
  minLength: 42,
  maxLength: 42,
};

const domainSortOptionsDef: PartialSchema<DomainFindOptions> = {
  $id: "domainSortOptions",
  definitions: {
    sort: {
      type: "object",
      required: [],
      properties: {
        // -1 descending, 1 ascending
        label: {
          type: "number",
          oneOf: [
            { type: "number", minimum: 1, maximum: 1 },
            { type: "number", minimum: -1, maximum: -1 },
          ],
        },
        name: {
          type: "number",
          oneOf: [
            { type: "number", minimum: 1, maximum: 1 },
            { type: "number", minimum: -1, maximum: -1 },
          ],
        },
        parent: {
          type: "number",
          oneOf: [
            { type: "number", minimum: 1, maximum: 1 },
            { type: "number", minimum: -1, maximum: -1 },
          ],
        },
        labelHash: {
          type: "number",
          oneOf: [
            { type: "number", minimum: 1, maximum: 1 },
            { type: "number", minimum: -1, maximum: -1 },
          ],
        },
        owner: {
          type: "number",
          oneOf: [
            { type: "number", minimum: 1, maximum: 1 },
            { type: "number", minimum: -1, maximum: -1 },
          ],
        },
        metadataUri: {
          type: "number",
          oneOf: [
            { type: "number", minimum: 1, maximum: 1 },
            { type: "number", minimum: -1, maximum: -1 },
          ],
        },
        royaltyAmount: {
          type: "number",
          oneOf: [
            { type: "number", minimum: 1, maximum: 1 },
            { type: "number", minimum: -1, maximum: -1 },
          ],
        },
        locked: {
          type: "number",
          oneOf: [
            { type: "number", minimum: 1, maximum: 1 },
            { type: "number", minimum: -1, maximum: -1 },
          ],
        },
        lockedBy: {
          type: "number",
          oneOf: [
            { type: "number", minimum: 1, maximum: 1 },
            { type: "number", minimum: -1, maximum: -1 },
          ],
        },
        minter: {
          type: "number",
          oneOf: [
            { type: "number", minimum: 1, maximum: 1 },
            { type: "number", minimum: -1, maximum: -1 },
          ],
        },
        "created.timestamp": {
          type: "number",
          oneOf: [
            { type: "number", minimum: 1, maximum: 1 },
            { type: "number", minimum: -1, maximum: -1 },
          ],
        },
        "created.blockNumber": {
          type: "number",
          oneOf: [
            { type: "number", minimum: 1, maximum: 1 },
            { type: "number", minimum: -1, maximum: -1 },
          ],
        },
        "created.logIndex": {
          type: "number",
          oneOf: [
            { type: "number", minimum: 1, maximum: 1 },
            { type: "number", minimum: -1, maximum: -1 },
          ],
        },
      },
      additionalProperties: false,
    },
  },
};

const domainProjectionOptionsDef: PartialSchema<DomainFindOptions> = {
  $id: "domainProjectionOptions",
  definitions: {
    projection: {
      type: "object",
      nullable: true,
      required: [],
      properties: {
        domainId: { type: "number", minimum: 0, maximum: 1 },
        children: { type: "number", minimum: 0, maximum: 1 },
        label: { type: "number", minimum: 0, maximum: 1 },
        name: { type: "number", minimum: 0, maximum: 1 },
        parent: { type: "number", minimum: 0, maximum: 1 },
        labelHash: { type: "number", minimum: 0, maximum: 1 },
        owner: { type: "number", minimum: 0, maximum: 1 },
        metadataUri: { type: "number", minimum: 0, maximum: 1 },
        royaltyAmount: { type: "number", minimum: 0, maximum: 1 },
        locked: { type: "number", minimum: 0, maximum: 1 },
        lockedBy: { type: "number", minimum: 0, maximum: 1 },
        minter: { type: "number", minimum: 0, maximum: 1 },
        created: { type: "number", minimum: 0, maximum: 1 },
        "history.transfers": { type: "number", minimum: 0, maximum: 1 },
      },
      additionalProperties: false,
    },
  },
};

/**
 * AJV does not currently discriminate between null/undefined, so ignoring the ts directive to force props nullable
 * https://github.com/ajv-validator/ajv/issues/1375 - to be fixed in ajv v9
 */
// @ts-ignore
const domainFindOptions: JSONSchemaType<DomainFindOptions> = {
  $id: "domainFindOptions",
  type: "object",
  required: [],
  /* eslint-disable @typescript-eslint/ban-ts-comment */
  properties: {
    limit: { type: "number", minimum: 1 },
    skip: { type: "number", minimum: 1 },
    sort: { $ref: "domainSortOptions#/definitions/sort" },
    projection: { $ref: "domainProjectionOptions#/definitions/projection" },
  },
  /* eslint-enable @typescript-eslint/ban-ts-comment */
  additionalProperties: false,
};
// @ts-ignore

export const validateFindOptions = ajv
  .addSchema(domainSortOptionsDef)
  .addSchema(domainProjectionOptionsDef)
  .compile(domainFindOptions);

export const validateDomainId = ajv.compile(domainId);
export const validateAddress = ajv.compile(blockchainAddress);
