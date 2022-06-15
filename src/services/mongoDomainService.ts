import { Domain, DomainFindOptions, Maybe } from "@zero-tech/data-store-core";
import { MongoDbService } from "@zero-tech/data-store-core/lib/database/mongo/mongoDbService";
import { MongoClient } from "mongodb";
import { DomainsApiResponse } from "../types";
import { DomainService } from "./domainService";

//Remake to MONGODomainService implemented with mongo
export class MongoDomainService extends DomainService<MongoDbService> {
  dbClient: MongoClient;

  constructor(client: MongoClient, service: MongoDbService) {
    super(service);
    this.dbClient = client;
  }

  async listDomains(
    findOptions: Maybe<DomainFindOptions>
  ): Promise<DomainsApiResponse> {
    const domains: Domain[] = await this.doServiceOperation(async () => {
      return await this.dbService.getAllDomains(findOptions);
    });
    return this.domainsToDomainsResponse(domains);
  }

  async getDomain(
    id: string,
    findOptions: Maybe<DomainFindOptions>
  ): Promise<Domain> {
    const domain: Domain = await this.doServiceOperation(async () => {
      return await this.dbService.getValidDomain(id, findOptions);
    });
    return domain;
  }

  async getSubdomains(
    id: string,
    findOptions: Maybe<DomainFindOptions>
  ): Promise<DomainsApiResponse> {
    const domains: Domain[] = await this.doServiceOperation(async () => {
      return await this.dbService.getSubdomainsById(id, findOptions);
    });
    return this.domainsToDomainsResponse(domains);
  }

  async searchDomainsByOwner(
    address: string,
    findOptions: Maybe<DomainFindOptions>
  ): Promise<DomainsApiResponse> {
    const domains: Domain[] = await this.doServiceOperation(async () => {
      return await this.dbService.getDomainsByOwner(address, findOptions);
    });
    return this.domainsToDomainsResponse(domains);
  }

  async searchDomainsByName(
    searchTerm: string,
    findOptions: Maybe<DomainFindOptions>
  ): Promise<DomainsApiResponse> {
    const domains: Domain[] = await this.doServiceOperation(async () => {
      return await this.dbService.getDomainsByName(searchTerm, findOptions);
    });
    return this.domainsToDomainsResponse(domains);
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