import React from 'react'

import { View, StyleSheet, Text, Image } from 'react-native'
import { Dialog, DialogDefaultActions } from 'react-native-material-ui'
import I18n from 'react-native-i18n'

const actions = ['cancel', 'allow']

const onAction = action => {
  if (action === I18n.t(actions[0])) { }// cancel
  if (action === I18n.t(actions[1])) { }// allow
}

export default props =>
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
          onActionPress={onAction}
        />
      </Dialog.Actions>
    </Dialog>
  </View>

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
