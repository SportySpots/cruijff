import React from 'react'
import PropTypes from 'prop-types'

import { View, StyleSheet, Text, Image } from 'react-native'
import { Dialog, DialogDefaultActions } from 'react-native-material-ui'
import I18n from 'react-native-i18n'

const actions = ['cancel', 'allow']

const onAction = props => action => {
  if (action === I18n.t(actions[0])) { props.onCancel() }
  if (action === I18n.t(actions[1])) { props.onAllow() }
}

const AskLocation = props =>
  <View style={styles.outerContainer}>
    <Dialog>
      <Dialog.Content>
        <View style={styles.contentContainer}>
          <Image
            source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Map_pin_icon_green.svg/2000px-Map_pin_icon_green.svg.png'}}
            style={styles.image}
            />
          <Text>
            {I18n.t('askLocation')}
          </Text>
        </View>
      </Dialog.Content>
      <Dialog.Actions>
        <DialogDefaultActions
          actions={actions.map(action => I18n.t(action))}
          onActionPress={onAction(props)}
        />
      </Dialog.Actions>
    </Dialog>
  </View>

AskLocation.propTypes = {
  onAllow: PropTypes.func,
  onCancel: PropTypes.func
}

export default AskLocation

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 30,
    width: 22,
    margin: 20
  }
})
