import { Text } from 'react-native'

// Allow/disallow font-scaling in app
Text.defaultProps.allowFontScaling = true

const settings = {
  seedorfRestUrl: 'https://sportyspots.com/api',
  seedorfGraphQLUrl: 'https://sportyspots.com/api/graphql',
  useFixtures: false
}

if (__DEV__) {
  // If ReactNative's yellow box warnings are too much, it is possible to turn
  // it off, but the healthier approach is to fix the warnings.  =)
  console.disableYellowBox = false

  // https://stackoverflow.com/questions/39022216/react-native-programmatically-check-if-in-remote-js-debugging-is-enabled
  const isDebuggingEnabled = typeof atob !== 'undefined'

  /* When using React Native Debugger with Network debug enabled, all network calls are proxied from the host system.
     So in this case use localhost, otherwise the host IP as seen from the device 10.0.3.2.
   */
  const networkDebugEnabled = false // set to false if not using network debugger
  settings.seedorfRestUrl =
    isDebuggingEnabled && networkDebugEnabled
      ? 'http://localhost:8000/api'
      : 'http://10.0.3.2:8000/api'
  settings.seedorfGraphQLUrl =
    isDebuggingEnabled && networkDebugEnabled
      ? 'http://localhost:8000/graphql'
      : 'http://10.0.3.2:8000/graphql'
  console.log(settings.seedorfRestUrl)
  settings.useFixtures = false
}

export default settings
