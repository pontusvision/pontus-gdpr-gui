#!/bin/bash
set -e 
git pull
DIR="$( cd "$(dirname "$0")" ; pwd -P )"
VERSION=PVGDPR_Sandbox-001
NODE_VERSION=10.9.0
#export NODE_DIR=$DIR/../node
export NODE_DISTDIR=$DIR/../pontus-dist/opt/pontus/pontus-node/${NODE_VERSION}
echo DIR is $DIR
export DISTDIR="$DIR/../pontus-dist/opt/pontus/pontus-gui/$VERSION/lib";

CURDIR=`pwd`
cd $DIR
npm install
