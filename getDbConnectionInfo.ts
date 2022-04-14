import { DatabaseConnectionInfo } from "@zero-tech/data-store/src/database/types";
import * as env from "env-var";

export const getDbConnectionInfo = (): DatabaseConnectionInfo => {
    return {
      uri: env.get("DATABASE_URI").required().asString(),
      dbName: env.get("DATABASE_NAME").required().asString(),
      domainCollectionName: env
        .get("DOMAIN_COLLECTION_NAME")
        .required()
        .asString(),
    };
  };
  