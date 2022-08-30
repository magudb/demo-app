#!/bin/bash
curl -Lo jk https://github.com/jkcfg/jk/releases/download/0.4.0/jk-linux-amd64
chmod +x jk

BRANCH=$(echo "$1" | tr '[:upper:]' '[:lower:]')
APPNAME=$(echo "$2" | tr '[:upper:]' '[:lower:]')

for FILE in deployment/template/*; do ./jk run -v -p branch=$BRANCH -p product=$APPNAME $FILE; done

