import { Context, HttpRequest } from "@azure/functions";
import {
  Address,
  DomainFindOptions,
  DomainId,
  Maybe,
} from "@zero-tech/data-store";
import { MongoDbService } from "@zero-tech/data-store/lib/database/mongo/mongoDbService";
import { MongoClient } from "mongodb";
import { getConnectedDbClient, getDatabaseService } from "../helpers";
import { validateBlockchainAddress, validateDomainId } from "../schemas";

// add try/catch/finally wrapper for 500s
export async function doServiceOperation(
  serviceFn: Function,
  context: Context,
  request: HttpRequest
) {
  let dbClient: Maybe<MongoClient>;

  try {
    dbClient = await getConnectedDbClient(context);
    const dbService: MongoDbService = getDatabaseService(dbClient);
    await serviceFn(context, request, dbService);
  } catch (e: any) {
    const error: Error = {
      name: e.name ?? "Unknown Internal Server Error",
      message: e.message ?? "An unexpected server error occured.",
    };
    context.log(e.name, e.message, e.stack);

    context.res = {
      status: 500,
      body: `${error.name} \n ${error.message}`,
    };
  } finally {
    if (dbClient) {
      await dbClient.close();
    }
  }
}

export async function listDomains(
  context: Context,
  request: HttpRequest,
  dbService: MongoDbService
) {
  let findOptions: Maybe<DomainFindOptions>;
  if (request.body) {
    findOptions = request.body.options;
  }
  const results = await dbService.getAllDomains(findOptions);

  const responseBody = {
    numResults: results.length,
    results: results,
  };

  context.res = {
    body: responseBody,
  };
}

export async function getDomain(
  context: Context,
  request: HttpRequest,
  dbService: MongoDbService
) {
  const domainId: DomainId = request.params.id;
  if (!validateDomainId(domainId)) {
    context.res = {
      status: 400,
      body: validateDomainId.errors,
    };
    return;
  }

  let findOptions: Maybe<DomainFindOptions>;
  if (request.body) {
    findOptions = request.body.options;
  }

  const result = await dbService.getValidDomain(request.params.id, findOptions);

  const responseBody = {
    result: result,
  };
  context.res = {
    body: responseBody,
  };
}

export async function getSubdomains(
  context: Context,
  request: HttpRequest,
  dbService: MongoDbService
) {
  const domainId: DomainId = request.params.id;
  if (!validateDomainId(domainId)) {
    context.res = {
      status: 400,
      body: validateDomainId.errors,
    };
    return;
  }

  let findOptions: Maybe<DomainFindOptions>;
  if (request.body) {
    findOptions = request.body.options;
  }

  const results = await dbService.getSubdomainsById(
    request.params.id,
    findOptions
  );

  const responseBody = {
    numResults: results.length,
    result: results,
  };
  context.res = {
    body: responseBody,
  };
}

export async function searchDomainsByOwner(
  context: Context,
  request: HttpRequest,
  dbService: MongoDbService
) {
  const ownerAddress: Address = request.params.address;
  if (!validateBlockchainAddress(ownerAddress)) {
    context.res = {
      status: 400,
      body: validateBlockchainAddress.errors,
    };
    return;
  }

  let findOptions: Maybe<DomainFindOptions>;
  if (request.body) {
    findOptions = request.body.options;
  }

  const results = await dbService.getDomainsByOwner(ownerAddress, findOptions);

  const responseBody = {
    numResults: results.length,
    result: results,
  };
  context.res = {
    body: responseBody,
  };
}

export async function searchDomainsByName(
  context: Context,
  request: HttpRequest,
  dbService: MongoDbService
) {
  const domainName: string = request.params.name;

  let findOptions: Maybe<DomainFindOptions>;
  if (request.body) {
    findOptions = request.body.options;
  }

  const results = await dbService.getDomainsByName(domainName, findOptions);

  const responseBody = {
    numResults: results.length,
    result: results,
  };
  context.res = {
    body: responseBody,
  };
}
