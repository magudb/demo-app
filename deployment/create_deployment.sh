#!/bin/bash

BRANCH=$(echo "$1" | tr '[:upper:]' '[:lower:]')
APPNAME=$(echo "$2" | tr '[:upper:]' '[:lower:]')

for FILE in ./deployment/branch-templates/*; do 
    if [[ -d $FILE ]]; then
        echo "$FILE is a directory"
    else
        BASENAME=$(basename $FILE)
        FILEPATH="fleet-infra/clusters/kube-local/features/$APPNAME-$BRANCH-$BASENAME"
        DIRNAME=$(dirname $FILEPATH)
        echo "$FILE WRITING TO $FILEPATH"
        mkdir -p $DIRNAME
        sed "s/(PRODUCT)/$APPNAME/g; s/(BRANCH)/$BRANCH/g" $FILE > $FILEPATH
    fi
done


for FILE in deployment/branch-templates/deployment/*; do 
    BASENAME=$(basename $FILE)
    FILEPATH="fleet-infra/clusters/kube-local/features/$APPNAME-$BRANCH/$BASENAME"
    DIRNAME=$(dirname $FILEPATH)
    echo "$FILE WRITING TO $FILEPATH"
    mkdir -p $(dirname $FILEPATH)
    sed "s/(PRODUCT)/$APPNAME/g; s/(BRANCH)/$BRANCH/g" $FILE > $FILEPATH
done
