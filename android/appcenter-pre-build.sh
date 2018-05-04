#!/usr/bin/env bash

if [ "$APPCENTER_BRANCH" != "master" ];
then
    export
    pwd
    ls
    echo "GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_API_KEY}" > $APPCENTER_SOURCE_DIRECTORY/.env
fi
