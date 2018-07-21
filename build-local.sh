#!/bin/bash
git pull
DIR="$( cd "$(dirname "$0")" ; pwd -P )"
VERSION=PVGDPR_Sandbox-001
NODE_VERSION=node-v8.11.3-linux-x64
export NODE_DIR=$DIR/../${NODE_VERSION}
export NODE_DISTDIR=$DIR/../pontus-dist/opt/pontus/node/${NODE_VERSION}
echo DIR is $DIR
export DISTDIR="$DIR/../pontus-dist/opt/pontus/pontus-gui/$VERSION/lib";

CURDIR=`pwd`
cd $DIR
$NODE_DIR/bin/npm update
$NODE_DIR/bin/npm run-script build

if [[ ! -d $NODE_DISTDIR ]]; then
  mkdir -p $NODE_DISTDIR
fi

cp -r  $NODE_DIR/* $NODE_DISTDIR
cd $NODE_DISTDIR/..
unlink current
ln -s ${NODE_VERSION} current

if [[ ! -d $DISTDIR ]]; then
  mkdir -p $DISTDIR
fi

cd $DISTDIR/../..
unlink current
ln -s $VERSION current

cp -r $DIR/build/* $DISTDIR 

mkdir -p $DISTDIR/../bin

cat << "EOF" > $DISTDIR/../bin/run-gui.sh
#!/bin/bash
export PATH=$PATH:/opt/pontus/node/current/bin
DIRNAME="$( cd "$(dirname "$0")" ; pwd -P )"
$DIRNAME/../../../node/current/bin/http-server -p 3000 $DIRNAME/../lib
EOF

chmod 755 $DISTDIR/../bin/run-gui.sh

cd $CURDIR
