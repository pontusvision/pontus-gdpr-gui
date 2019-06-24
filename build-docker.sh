#!/bin/bash

DIR="$( cd "$(dirname "$0")" ; pwd -P )"
cd $DIR/docker
docker build --no-cache --rm . -t pontusvisiongdpr/pontus-gdpr-comply-lib

docker push pontusvisiongdpr/pontus-gdpr-comply-lib

