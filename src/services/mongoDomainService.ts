import { Domain, Maybe, ValidDomain } from "@zero-tech/data-store-core";
import { MongoDbService } from "@zero-tech/data-store-core/lib/database/mongo/mongoDbService";
import { DomainFindOptions } from "@zero-tech/data-store-core/lib/shared/types/findOptions";
import { MongoClient } from "mongodb";
import { DomainDto, Logger, PaginationResponse } from "../types";
import { DomainService } from "./domainService";

//Remake to MONGODomainService implemented with mongo
export class MongoDomainService extends DomainService<MongoDbService> {
  dbClient: MongoClient;
  logger: Logger;
  constructor(client: MongoClient, service: MongoDbService, logger: Logger) {
    super(service);
    this.dbClient = client;
    this.logger = logger;
  }

  async listDomains(
    findOptions: Maybe<DomainFindOptions>
  ): Promise<PaginationResponse<DomainDto>> {
    const domains: ValidDomain[] = await this.doServiceOperation(async () => {
      this.logger(`Listing all domains`, JSON.stringify(findOptions));
      return await this.dbService.getAllDomains(findOptions);
    });
    return this.domainsToPaginationResponse(domains);
  }

  async getDomain(
    id: string,
    findOptions: Maybe<DomainFindOptions>
  ): Promise<DomainDto> {
    const domain: ValidDomain = await this.doServiceOperation(async () => {
      this.logger(`Getting domain ${id}`, JSON.stringify(findOptions));
      return await this.dbService.getValidDomain(id, findOptions);
    });
    return this.validDomainToDomainDto(domain);
  }

  async getSubdomains(
    id: string,
    findOptions: Maybe<DomainFindOptions>
  ): Promise<PaginationResponse<DomainDto>> {
    const domains: ValidDomain[] = await this.doServiceOperation(async () => {
      this.logger(`Getting subdomains for ${id}`, JSON.stringify(findOptions));
      return await this.dbService.getSubdomainsById(id, findOptions);
    });
    return this.domainsToPaginationResponse(domains);
  }

  async searchDomainsByOwner(
    address: string,
    findOptions: Maybe<DomainFindOptions>
  ): Promise<PaginationResponse<DomainDto>> {
    const domains: ValidDomain[] = await this.doServiceOperation(async () => {
      this.logger(
        `Searching domains by owner ${address}`,
        JSON.stringify(findOptions)
      );
      return await this.dbService.getDomainsByOwner(address, findOptions);
    });
    return this.domainsToPaginationResponse(domains);
  }

  async searchDomainsByName(
    searchTerm: string,
    findOptions: Maybe<DomainFindOptions>
  ): Promise<PaginationResponse<DomainDto>> {
    const domains: ValidDomain[] = await this.doServiceOperation(async () => {
      this.logger(
        `Searching domains by name ${searchTerm}`,
        JSON.stringify(findOptions)
      );
      return await this.dbService.getDomainsByName(searchTerm, findOptions);
    });
    return this.domainsToPaginationResponse(domains);
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
}
