#!/usr/bin/env bash
export
pwd
ls
if [ "$APPCENTER_BRANCH" != "master" ]; then
    echo "GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_API_KEY}" > $APPCENTER_SOURCE_DIRECTORY/.env;
fi
