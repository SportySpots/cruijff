import React from 'react'
import I18n from '../../I18n/index'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import NavDots from '../NavDots'
import Button from './Button'
import Colors from '../../Themes/Colors'
import Fonts from '../../Themes/Fonts'

export default class Footer extends React.Component {
  static propTypes = {
    numPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onNext: PropTypes.func,
    showNext: PropTypes.bool,
    disableNext: PropTypes.bool,
    buttonNextText: PropTypes.string,
    onBack: PropTypes.func,
    showBack: PropTypes.bool,
    disableBack: PropTypes.bool,
    buttonBackText: PropTypes.string
  }

  static defaultProps = {
    buttonNextText: I18n.t('continue'),
    showNext: true,
    buttonBackText: I18n.t('back'),
    showBack: true
  }

  onNext = () => {
    this.props.onNext && this.props.onNext()
  }

  onBack = () => {
    this.props.onBack && this.props.onBack()
  }

  render () {
    return (
      <View style={style.container}>
        {this.props.showBack && (
          <Button
            text={this.props.buttonBackText}
            style={style.backButton}
            onPress={this.onBack}
            disabled={this.props.disableBack}
            isBack
          />
        )}
        <NavDots
          count={this.props.numPages}
          active={this.props.currentPage}
          theme={navDotsTheme}
          style={style.navDots}
        />
        {this.props.showNext && (
          <Button
            text={this.props.buttonNextText}
            style={style.nextButton}
            onPress={this.onNext}
            disabled={this.props.disableNext}
          />
        )}
      </View>
    )
  }
}

const navDotsTheme = StyleSheet.create({
  circle: {
    backgroundColor: Colors.white20
  },
  active: {
    backgroundColor: Colors.actionYellow
  }
})

const style = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'column',
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    ...Fonts.style.L
  },
  navDots: {},
  nextButton: {
    position: 'absolute',
    right: 5
  },
  backButton: {
    position: 'absolute',
    left: 5
  }
})
