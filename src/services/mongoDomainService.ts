import {
  Maybe,
  ResourceRegistry,
  ResourceType,
  ValidDomain,
} from "@zero-tech/data-store-core";
import { MongoDbService } from "@zero-tech/data-store-core/lib/database/mongo/mongoDbService";
import { DomainFindOptions } from "@zero-tech/data-store-core/lib/shared/types/findOptions";
import { MongoClient } from "mongodb";
import { DomainDto, Logger, ResourceRegistryDto } from "../types";
import { DomainService } from "./domainService";

export class MongoDomainService extends DomainService<MongoDbService> {
  dbClient: MongoClient;
  logger: Logger;
  constructor(client: MongoClient, service: MongoDbService, logger: Logger) {
    super(service);
    this.dbClient = client;
    this.logger = logger;
  }

  async listDomains(
    findOptions: DomainFindOptions
  ): Promise<DomainDto[]> {
    const domains: ValidDomain[] = await this.doServiceOperation(async () => {
      this.logger(`Listing all domains`, JSON.stringify(findOptions));
      return await this.dbService.getAllDomains(findOptions);
    });
    return domains.map((x) => this.validDomainToDomainDto(x));
  }

  async getDomain(
    id: string,
    findOptions: DomainFindOptions
  ): Promise<Maybe<DomainDto>> {
    const domain: Maybe<ValidDomain> = await this.doServiceOperation(
      async () => {
        this.logger(`Getting domain ${id}`, JSON.stringify(findOptions));
        return await this.dbService.getValidDomain(id, findOptions);
      }
    );

    if (domain) {
      return this.validDomainToDomainDto(domain);
    }
  }

  async getSubdomains(
    id: string,
    findOptions: DomainFindOptions,
    nameFilter: string
  ): Promise<DomainDto[]> {
    const domains: ValidDomain[] = await this.doServiceOperation(async () => {
      this.logger(`Getting subdomains for ${id}`, JSON.stringify(findOptions));
      return await this.dbService.getSubdomainsById(id, findOptions, nameFilter);
    });
    return domains.map((x) => this.validDomainToDomainDto(x));
  }

  async getSubdomainsDeep(
    id: string,
    findOptions: DomainFindOptions,
    nameFilter: string
  ): Promise<DomainDto[]> {
    const domains: ValidDomain[] = await this.doServiceOperation(async () => {
      this.logger(
        `Getting deep subdomains for ${id}`,
        JSON.stringify(findOptions)
      );
      return await this.dbService.getSubdomainsByIdDeep(id, findOptions, nameFilter);
    });

    return domains.map((domain) => this.validDomainToDomainDto(domain));
  }

  async searchDomainsByOwner(
    address: string,
    findOptions: DomainFindOptions
  ): Promise<DomainDto[]> {
    const domains: ValidDomain[] = await this.doServiceOperation(async () => {
      this.logger(
        `Searching domains by owner ${address}`,
        JSON.stringify(findOptions)
      );
      return await this.dbService.getDomainsByOwner(address, findOptions);
    });
    return domains.map((x) => this.validDomainToDomainDto(x));
  }

  async searchDomainsByName(
    searchTerm: string,
    findOptions: DomainFindOptions
  ): Promise<DomainDto[]> {
    const domains: ValidDomain[] = await this.doServiceOperation(async () => {
      this.logger(
        `Searching domains by name ${searchTerm}`,
        JSON.stringify(findOptions)
      );
      return await this.dbService.getDomainsByName(searchTerm, findOptions);
    });
    return domains.map((x) => this.validDomainToDomainDto(x));
  }

  async doServiceOperation(serviceFn: Function): Promise<any> {
    try {
      return await serviceFn();
    } catch (e: any) {
      const error: Error = {
        name: e.name ?? "Unknown Internal Server Error",
        message: e.message ?? "An unexpected server error occured.",
      };
      throw error;
    } finally {
      if (this.dbClient) {
        await this.dbClient.close();
      }
    }
  }

  async getResourceRegistry(
    resourceType: string
  ): Promise<Maybe<ResourceRegistryDto>> {
    const registry: Maybe<ResourceRegistry> = await this.doServiceOperation(
      async () => {
        this.logger(`Getting resource registry ${resourceType}`);
        return await this.dbService.getResourceRegistry(
          resourceType as ResourceType
        );
      }
    );

    if (registry) {
      return {
        resourceType: registry.resourceType,
        resourceRegistry: registry.resourceRegistry,
      };
    }
  }
}
