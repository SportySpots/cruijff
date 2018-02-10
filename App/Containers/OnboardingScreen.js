import React, { Component } from 'react'
import { Image } from 'react-native'
import Onboarding from '../Components/Onboarding'
import Images from '../Themes/Images'
import Colors from '../Themes/Colors'

export default class OnboardingScreen extends Component {
  render () {
    const { navigate } = this.props.navigation
    return (
      <Onboarding
        pages={[
          {
            backgroundColor: Colors.secondaryGreen,
            image: <Image source={Images.illustrationWizard1} />,
            title: 'Hi Sport',
            subtitle:
              'Thanks for joining the yet to become biggest free sportclub in the world. \n Happy sporting!'
          },
          {
            backgroundColor: Colors.secondaryGreen,
            image: <Image source={Images.illustrationWizard2} />,
            title: 'Join a Game',
            subtitle:
              "Browse the list all Sportyspots near you. Tap the 'Join a game' icon to find organized games near you"
          },
          {
            backgroundColor: Colors.secondaryGreen,
            image: <Image source={Images.illustrationWizard3} />,
            title: 'Plan a Game',
            subtitle:
              "Tap the 'Plan a game' icon to organize a game of your favorite sport with your friends or other players"
          }
        ]}
        onSkip={() => navigate('LocationPermissionScreen')}
        onDone={() => navigate('LocationPermissionScreen')}
      />
    )
  }
}
