#!/bin/bash
set -e 
DIR="$( cd "$(dirname "$0")" ; pwd -P )"
cd $DIR
#docker build --no-cache --rm . -t pontusvisiongdpr/pontus-gdpr-comply-lib
docker build  --rm . -t pontusvisiongdpr/pontus-gdpr-comply-lib

docker push pontusvisiongdpr/pontus-gdpr-comply-lib

