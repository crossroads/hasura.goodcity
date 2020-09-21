# hasura.goodcity

Deployment and testing of the Hasura GraphQL server

## Development

Run the following script to start the hasura server locally

```bash
HASURA_GRAPHQL_ADMIN_SECRET=testadminkey ./scripts/docker-run-development.sh
```

## Azure deployment

A sample script for deploying on an Azure Container Instance is available [here](./scripts/az-deploy.sample.sh)

## Testing

A batch of mocha tests can be used to ensure that the cloud instance of Hasura is properly configured.

The following env variables should be provided:

- `HASURA_GRAPHQL_HOST`
- `HASURA_GRAPHQL_ADMIN_SECRET`

Run the tests with the following command line: 

```bash
npm test
```

### Snapshot testing

A [local snapshot](./tests/snapshots/hasura_meta.snapshot.json) of the expected metadata file is located in the repo.

The tests will compare the cloud configuration with the local snapshot in order to detect unplanned changes.

If changes are expected, the snapshot can be re-written by using the following command (will also run tests)

```bash
npm test:snapshot
```

**important**: Please make sure to commit the new snapshot file after updating it.

## Outputting the configuration

The hasura configuration file can be printed from the local snapshot through:

```bash
npm run hasura:config
```

That can be useful if you wish to upload the configuration to a new instance of hasura