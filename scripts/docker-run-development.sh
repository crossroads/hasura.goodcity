#! /bin/bash

cd "$(dirname "$0")"

set -e

[ -z "$HASURA_GRAPHQL_ADMIN_SECRET" ] && echo "Need to set HASURA_GRAPHQL_ADMIN_SECRET" && exit 1;

docker run -d -p 8080:8080 \
  --name hasura_gql \
  -e HASURA_GRAPHQL_UNAUTHORIZED_ROLE=public \
  -e HASURA_GRAPHQL_DATABASE_URL=postgres://postgres:@host.docker.internal:5432/goodcity_server_development \
  -e HASURA_GRAPHQL_ENABLE_CONSOLE=true \
  -e HASURA_GRAPHQL_JWT_SECRET=`node hasura_jwt.js` \
  -e HASURA_GRAPHQL_ADMIN_SECRET=$HASURA_GRAPHQL_ADMIN_SECRET \
  hasura/graphql-engine:`cat ../hasura_version.txt`