import React from 'react'
import I18n from '../../I18n'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import NavDots from '../NavDots'
import { style, navDotsTheme } from './Styles/Footer'
import ContinueButton from './ContinueButton'

export default class Footer extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    onDone: PropTypes.func
  }
  onNext = () => {
    const navState = this.props.navigation.state
    if (navState.index + 1 < navState.routes.length) {
      this.props.navigation.navigate('' + (navState.index + 1))
    } else {
      if (this.props.onDone) this.props.onDone()
    }
  }

  render () {
    return (
      <View style={style.container}>
        <NavDots
          count={this.props.navigation.state.routes.length}
          active={this.props.navigation.state.index}
          theme={navDotsTheme}
          style={style.navDots}
        />
        <ContinueButton
          text={I18n.t('continue')}
          style={style.continueButton}
          onPress={this.onNext}
        />
      </View>
    )
  }
}
