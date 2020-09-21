# hasura.goodcity

Deployment and testing of the Hasura GraphQL server

## Development

Run the following script to start the hasura server locally

```bash
HASURA_GRAPHQL_ADMIN_SECRET=testadminkey ./scripts/docker-run-development.sh
```

## Azure deployment

A sample script for deploying on an Azure Container Instance is available [here](./scripts/az-deploy.sample.sh)