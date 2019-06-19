#!/usr/bin/env bash

#update node
brew uninstall node@6
NODE_VERSION="8.12.0"
curl "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}.pkg" > "$HOME/Downloads/node-installer.pkg"
sudo installer -store -pkg "$HOME/Downloads/node-installer.pkg" -target "/"

# install git-crypt
brew install git-crypt

cd $APPCENTER_SOURCE_DIRECTORY

# decode base64 encoded symmetric key
echo $GIT_CRYPT_BASE64_SYMMETRIC_KEY | openssl base64 -d -out git_crypt_symmetric_base64_decoded.key

# unlock git crypt encrypted files
git-crypt unlock git_crypt_symmetric_base64_decoded.key

cp ./.env.prd ./.env

echo 'Appcenter Post Clone: Done'
