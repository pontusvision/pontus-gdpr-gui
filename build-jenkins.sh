#!/bin/bash
git pull
DIR="$( cd "$(dirname "$0")" ; pwd -P )"
VERSION=PVGDPR_Sandbox-001
NODE_VERSION=node-v8.4.0-linux-x64
echo DIR is $DIR
export DISTDIR="$DIR/opt/pontus/pontus-gui/$VERSION/lib";

CURDIR=`pwd`
cd $DIR
/bin/npm update
/bin/npm run-script build



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

cd $DIR/opt/pontus
tar czvf pontus-gui.tar.gz pontus-gui

cd $CURDIR
