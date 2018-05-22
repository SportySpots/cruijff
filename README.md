# SportySpots

[![Greenkeeper badge](https://badges.greenkeeper.io/SportySpots/cruijff.svg)](https://greenkeeper.io/)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)
[![TravisCIBadge](https://travis-ci.org/SportySpots/cruijff.svg?branch=master)](https://travis-ci.org/SportySpots/cruijff)
Android: [![Build status](https://build.appcenter.ms/v0.1/apps/a040d989-6713-458b-8692-5cc9c14b0f0f/branches/master/badge)](https://appcenter.ms)
[![Build status](https://build.appcenter.ms/v0.1/apps/ad2b18a6-2a59-48b8-8e73-8614df116aa8/branches/master/badge)](https://appcenter.ms)

## Get started

### Prerequisites
* Node (Version: v8.9.4)
* Yarn (Version: 1.3.2)
* NPM (Version: 5.6.0)
* NVM (Version: 0.33.8)

### Local Development

#### Setup
```bash
$ nvm use
$ yarn reset
```

#### Run App
```bash
$ yarn run react-native run-ios
```

#### Run Storybook
```bash
$ yarn run storybook
```


### How to Run App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run `react-native run-ios`
  * for Android
    * Run Genymotion
    * run `react-native run-android`

### Standard Compliant

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
This project adheres to Standard.  Our CI enforces this, so we suggest you enable linting to keep your project compliant during development.

**To Lint on Commit**

This is implemented using [husky](https://github.com/typicode/husky). There is no additional setup needed.

**Bypass Lint**

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

**Understanding Linting Errors**

The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

### Secrets

This project uses [react-native-config](https://github.com/luggit/react-native-config) to expose config variables to your javascript code in React Native. You can store API keys
and other sensitive information in a `.env` file:

```
API_URL=https://myapi.com
GOOGLE_MAPS_API_KEY=abcdefgh
```

and access them from React Native like so:

```
import Secrets from 'react-native-config'

Secrets.API_URL  // 'https://myapi.com'
Secrets.GOOGLE_MAPS_API_KEY  // 'abcdefgh'
```

Generate release key
[React Native Official Release Documentation](http://facebook.github.io/react-native/docs/signed-apk-android.html#content)
```
keytool -genkey -v -keystore sportyspots-release-key.keystore -alias sportyspots-release-key-alias -keyalg RSA -keysize 2048 -validity 20000
```
Place sportyspots-release-key.keystore in android/app directory

Create a gradle.properties file in ~/.gradle/

Add the following to gradle.properties file
```
SPORTYSPOTS_RELEASE_STORE_FILE=sportyspots-release-key.keystore
SPORTYSPOTS_RELEASE_KEY_ALIAS=sportyspots-release-key-alias
SPORTYSPOTS_RELEASE_STORE_PASSWORD=******
SPORTYSPOTS_RELEASE_KEY_PASSWORD=******
```

The `.env` file is ignored by git keeping those secrets out of your repo.

### Get started
1. Copy .env.example to .env
2. Add your config variables
3. Follow instructions at [https://github.com/luggit/react-native-config#setup](https://github.com/luggit/react-native-config#setup)
4. Done!

### Git Crypt
[Git Crypt](https://github.com/AGWA/git-crypt)

[Github Reference - Associate Email with GPG Key](https://help.github.com/articles/associating-an-email-with-your-gpg-key/)
List your keys
```bash
gpg --list-secret-keys --keyid-format LONG
```

Git crypt export symmetric key
```bash
$ git-crypt export-key /path/to/key/symmetric_binary_key.key
```

Convert binary key to base64 encoded string
```bash
$ openssl base64 -A -in symmetric_binary_key.key -out symmetric_base64.key
```

Convery base64 key to binary key
```bash
$ openssl base64 -d -A -in symmetric_base64_key.key -out symmetric_binary_key.key
```
