#! /bin/bash

cd "$(dirname "$0")"

set -e

POSTGRES_USER=`if [ -z ${POSTGRES_USER+x} ]; then echo hasura_readonly; else echo $POSTGRES_USER; fi`

[ -z "$POSTGRES_USER" ]                 && echo "Need to set POSTGRES_USER" && exit 1;
[ -z "$POSTGRES_PASSWORD" ]             && echo "Need to set POSTGRES_PASSWORD" && exit 1;
[ -z "$POSTGRES_HOST" ]                 && echo "Need to set POSTGRES_HOST" && exit 1;
[ -z "$GOODCITY_DATABASE_NAME" ]        && echo "Need to set GOODCITY_DATABASE_NAME" && exit 1;
[ -z "$HASURA_GRAPHQL_ADMIN_SECRET" ]   && echo "Need to set HASURA_GRAPHQL_ADMIN_SECRET" && exit 1;
[ -z "$JWT_SECRET" ]                    && echo "Need to set JWT_SECRET" && exit 1;
[ -z "$AZ_CONTAINER_NAME" ]             && echo "Need to set AZ_CONTAINER_NAME" && exit 1;

az container create \
  --name $AZ_CONTAINER_NAME \
  --resource-group GoodCity \
  --image hasura/graphql-engine:`cat ../hasura_version.txt` \
  --vnet goodcity-services-vnet \
  --vnet-address-prefix 10.25.8.0/24 \
  --subnet hasura \
  --subnet-address-prefix 10.25.8.32/28 \
  --ports 8080 \
  --restart-policy OnFailure \
  --environment-variables \
    'HASURA_GRAPHQL_DATABASE_URL'='postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:5432/$GOODCITY_DATABASE_NAME?sslmode=require' \
    'HASURA_GRAPHQL_UNAUTHORIZED_ROLE'='public' \
    'HASURA_GRAPHQL_ENABLE_CONSOLE'='true' \
    'HASURA_GRAPHQL_ADMIN_SECRET'= $HASURA_GRAPHQL_ADMIN_SECRET \
    'HASURA_GRAPHQL_CORS_DOMAIN'='https://*.goodcity.hk,https://goodcity.hk' \
    'HASURA_GRAPHQL_JWT_SECRET'=`node hasura_jwt.js`
