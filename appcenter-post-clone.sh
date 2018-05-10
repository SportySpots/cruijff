#!/usr/bin/env bash

# install git-crypt
brew install git-crypt

cd $APPCENTER_SOURCE_DIRECTORY

echo $GIT_CRYPT_BASE64_SYMMETRIC_KEY

# decode base64 encoded symmetric key
echo $GIT_CRYPT_BASE64_SYMMETRIC_KEY | openssl base64 -d -out git_crypt_symmetric_base64_decoded.key

# unlock git crypt encrypted files
git-crypt unlock git_crypt_symmetric_base64_decoded.key

cat .env.prd