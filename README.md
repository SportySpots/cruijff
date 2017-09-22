#  SportySpots React Native App

[![Greenkeeper badge](https://badges.greenkeeper.io/SportySpots/cruijff.svg)](https://greenkeeper.io/)
**JS Standard Style**: [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

**Travis**: [![Travis Build Status](https://travis-ci.org/SportySpots/cruijff.svg?branch=master)](https://travis-ci.org/SportySpots/cruijff)

**Mobile Center IOS**: [![Build status IOS](https://build.mobile.azure.com/v0.1/apps/2b00396c-deef-4523-8dad-d63201f4aa8b/branches/master/badge)](https://mobile.azure.com)

**Mobile Center Android**: [![Build status Android](https://build.mobile.azure.com/v0.1/apps/faccffcd-1960-4ceb-82c9-e822fbb78a7f/branches/master/badge)](https://mobile.azure.com)


## Pre-requisites
* Node: v7.10.1
* NVM: v0.33.2
* Yarn: v1.0.2
* Cocoapods (for IOS):
** `brew install cocoapods`
* [Reactron](https://github.com/infinitered/reactotron)


## How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** `nvm use`:

**Step 4:** Install the Application with `yarn`


## How to Run App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run `npm run ios:run`
  * for Android
    * Run Genymotion
    * run `npm run android:run`

## Standard Compliant

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
This project adheres to Standard.  Our CI enforces this, so we suggest you enable linting to keep your project compliant during development.

**To Lint on Commit**

This is implemented using [husky](https://github.com/typicode/husky). There is no additional setup needed.

**Bypass Lint**

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

**Understanding Linting Errors**

The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

## :closed_lock_with_key: Secrets

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

The `.env` file is ignored by git keeping those secrets out of your repo.

## CODING NOTES

* Organise imports global, local
