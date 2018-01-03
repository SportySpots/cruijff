import 'react-native'
import React from 'react'
import SplashScreen from '../../App/Containers/Screens/Splash'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

jest.mock('react-native-svg')

test('Splash Screen renders correctly', () => {
  const tree = renderer.create(
    <SplashScreen />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
