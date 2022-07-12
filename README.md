### Build Info

## Environment Entries

Instead of a `.env` file, Azure functions use a `local.settings.json` file to define environment entries

# Logging
  The data store api should automatically send trace and error level messages to the instance of application insights that it is connected to

# Configurable Settings
- **APPLICATIONINSIGHTS_CONNECTION_STRING** - An application insights connection string, for sending log traces and errors to an instance of application insights
- **DATABASE_USERNAME** The database username
- **DATABASE_PASSWORD** The database password
- **DATABASE_CLUSTER_ADDRESS** The address of the database cluster
- **DATABASE_CONFIG** Optional - Config options for the db, defaults to data-store-core default config
- **DATABASE_URI_PREFIX** Optional - URI prefix for the db, defaults to atlas db mongo prefix
- **DATABASE_NAME** - The name of the database
- **DOMAIN_COLLECTION_NAME** - The name of the mongo collection to read from, should be domains by default

### Local

* Install the Azure functions extension in VSCode
* `npm start` - deploys the azure functions API to localhost
* You can now hit the endpoints on localhost:7071. You can use the CPT workspace data-store postman collection to test endpoints.

### API
Visit the [Wiki](https://github.com/zer0-os/data-store-api/wiki) for a complete guide on API methods available and examples.

