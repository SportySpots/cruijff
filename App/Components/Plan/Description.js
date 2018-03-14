import React, { Component } from 'react'
import { View, StyleSheet, TextInput, ScrollView, Keyboard } from 'react-native'
import PropTypes from 'prop-types'

import Colors from '../../Themes/Colors'
import Text from '../Text'
import I18n from '../../I18n'
import Footer from '../DarkFooter/index'

export default class Description extends Component {
  static propTypes = {
    navigation: PropTypes.any,
    setGameDetailField: PropTypes.func,
    gameDetails: PropTypes.shape({
      sport: PropTypes.string,
      date: PropTypes.string,
      startTime: PropTypes.string,
      stopTime: PropTypes.string,
      spotId: PropTypes.number,
      description: PropTypes.string,
      isPublic: PropTypes.bool
    })
  }

  componentDidMount () {
    this._input && this._input.focus()
  }

  onNext = () => {
    Keyboard.dismiss()
    this.props.navigation.navigate('created')
  }

  onBack = () => {
    Keyboard.dismiss()
    this.props.navigation.goBack()
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text.L style={styles.title}>{I18n.t('Describe the game')}</Text.L>
          <TextInput
            style={styles.input}
            multiline
            maxLength={120}
            placeholderTextColor={Colors.white}
            selectionColor={Colors.white}
            underlineColorAndroid={Colors.white}
            onChangeText={text =>
              this.props.setGameDetailField('description', text)
            }
            ref={elm => {
              this._input = elm
            }}
          />
        </ScrollView>
        <Footer
          numPages={4}
          currentPage={2}
          onBack={this.onBack}
          onNext={this.onNext}
          disableNext={!this.props.gameDetails.description}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryGreen,
    flex: 1
  },
  scrollView: {
    flex: 1,
    padding: 32
  },
  title: {
    color: Colors.white
  },
  input: {
    color: Colors.white
  }
})
