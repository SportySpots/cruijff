import React from 'react'
import { View, Image, StyleSheet, TextInput, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import Text from './Text'
import I18n from '../I18n'
import Slider from './Slider'
import Colors from '../Themes/Colors'
import BasicButton from './BasicButton'

export default class ProfileDetailsScreen extends React.PureComponent {
  static propTypes = {
    facebook: PropTypes.shape({
      status: PropTypes.string,
      data: PropTypes.shape({
        declinedPermission: PropTypes.array,
        grantedPermissions: PropTypes.array,
        token: PropTypes.shape({
          accessToken: PropTypes.string,
          userID: PropTypes.string
        })
      })
    })
  }

  componentWillMount () {
    if (this.props.facebook.status !== 'SUCCESS') {
      this.props.navigation.navigate('ProfileLoginScreen')
    }
  }
  componentWillReceiveProps () {
    if (this.props.facebook.status === 'SUCCESS') {
      this.props.navigation.navigate('ProfileLoginScreen')
    }
  }

  render () {
    if (
      this.props.facebook.status !== 'SUCCESS' ||
      !this.props.facebook.data.token ||
      !this.props.facebook.data.profile
    ) {
      return null
    }

    const imageUrl = `https://graph.facebook.com/${
      this.props.facebook.data.token.userID
    }/picture?type=large`
    return (
      <ScrollView style={styles.outerContainer}>
        <View style={styles.center}>
          <Image style={styles.image} source={{ uri: imageUrl }} />
        </View>
        <View style={styles.fields}>
          <View style={styles.fieldSet}>
            <Text>{I18n.t('Name')}</Text>
            <TextInput defaultValue={this.props.facebook.data.profile.name} />
          </View>
          <View style={styles.fieldSet}>
            <Text>{I18n.t('Age')}</Text>
            <TextInput keyboardType='numeric' defaultValue='30' />
          </View>
          <View style={styles.fieldSet}>
            <Text>{I18n.t('Style')}</Text>
            <View style={styles.sliderLabels}>
              <Text.S>{I18n.t('recreative')}</Text.S>
              <Text.S>{I18n.t('competitive')}</Text.S>
            </View>
            <View style={{ flex: 1, height: 50 }}>
              <Slider value={0.5} onChange={console.log} />
            </View>
          </View>
          <BasicButton style={{ width: 100 }} text='save' />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    borderRadius: 100
  },
  center: {
    alignItems: 'center'
  },
  outerContainer: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: Colors.white
  },
  fields: {
    marginHorizontal: 16
  },
  fieldSet: {
    marginTop: 16
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
