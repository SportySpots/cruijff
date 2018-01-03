import React from 'react'
// import Fonts from '../Themes/Fonts'
// import PropTypes from 'prop-types'
import { View, StyleSheet, Text, Image } from 'react-native'
import { Dialog, DialogDefaultActions } from 'react-native-material-ui'
import I18n from 'react-native-i18n'

const actions = ['continue']

const onAction = action => {

}

const OnBoarding = (props, context) =>
  <View style={styles.outerContainer}>
    <Dialog style={dialogStyle}>
      <Dialog.Content style={dialogStyle}>
        <View>
          <View style={styles.header}>
            <Image
              source={{uri: 'https://cdn.pixabay.com/photo/2013/09/16/22/23/football-183054_640.png'}}
              style={styles.image}
              />
          </View>
          <View style={styles.content}>
            <Text style={styles.text}>
              {I18n.t('onboarding1')}
            </Text>
          </View>
        </View>
      </Dialog.Content>
      <Dialog.Actions>
        <DialogDefaultActions
          actions={actions.map(action => I18n.t(action))}
          onActionPress={onAction}
        />
      </Dialog.Actions>
    </Dialog>
  </View>

export default OnBoarding

const dialogStyle = {
  container: {
    paddingTop: 0,
    width: 480
  },
  contentContainer: {
    paddingHorizontal: 0
  }

}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    height: 100,
    backgroundColor: 'green',
    alignItems: 'center'
  },
  content: {
    flexDirection: 'column',
    paddingHorizontal: 35,
    paddingTop: 15
  },
  image: {
    height: 95,
    width: 100
  },
  text: {
    fontFamily: 'Rajdhani-Bold',
    fontSize: 16,
    lineHeight: 24
  }
})
