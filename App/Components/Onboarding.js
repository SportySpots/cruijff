import React from 'react'
import ScreenSlider from './ScreenSlider/index'
import OnboardingScreen from '../Screens/OnboardingScreen'
import I18n from '../I18n'
import Images from '../Themes/Images'

const data = [
  {
    title: I18n.t('hi-sport'),
    text: I18n.t('onboarding-1'),
    image: Images.illustrationWizard1
  },
  {
    title: I18n.t('join-a-game'),
    text: I18n.t('onboarding-2'),
    image: Images.illustrationWizard2
  },
  {
    title: I18n.t('plan-a-game'),
    text: I18n.t('onboarding-3'),
    image: Images.illustrationWizard3
  }
]

export default class Onboarding extends React.Component {
  render () {
    const { navigate } = this.props.navigation
    return (
      <ScreenSlider
        data={data}
        style={{ flex: 1 }}
        renderItem={({ item }) => <OnboardingScreen {...item} />}
        footerText={(item, index) =>
          I18n.t(index < data.length - 1 ? 'continue' : 'lets go')
        }
        onDone={() => navigate('LocationPermissionScreen')}
      />
    )
  }
}
