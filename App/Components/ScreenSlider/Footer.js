import React from 'react'
import I18n from '../../I18n'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import NavDots from '../NavDots'
import { footerStyle, navDotsTheme } from './Styles'
import ContinueButton from './ContinueButton'

export default class Footer extends React.Component {
  static propTypes = {
    numPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onNext: PropTypes.func,
    showNext: PropTypes.bool,
    buttonText: PropTypes.string
  }

  static defaultProps = {
    buttonText: I18n.t('continue'),
    showNext: true
  }

  onNext = () => {
    this.props.onNext && this.props.onNext()
  }

  render () {
    return (
      <View style={footerStyle.container}>
        <NavDots
          count={this.props.numPages}
          active={this.props.currentPage}
          theme={navDotsTheme}
          style={footerStyle.navDots}
        />
        {this.props.showNext && (
          <ContinueButton
            text={this.props.buttonText}
            style={footerStyle.continueButton}
            onPress={this.onNext}
          />
        )}
      </View>
    )
  }
}
