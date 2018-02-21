import React, { Component } from 'react'
import { View, Image } from 'react-native'
import PropTypes from 'prop-types'
import Text from './Text'
export default class ProfileDetailsScreen extends Component {
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

  render () {
    if (this.props.facebook.status === 'SUCCESS') {
      const imageUrl = `https://graph.facebook.com/${
        this.props.facebook.data.token.userID
      }/picture?type=large`
      console.log(imageUrl)
      return (
        <View>
          <Text>ProfileDetailsScreen</Text>
          <Text.L>{this.props.facebook.data.profile.name}</Text.L>
          <Image
            style={{ height: 200, width: 200 }}
            source={{ uri: imageUrl }}
          />
          <Text>{JSON.stringify(this.props.facebook)}</Text>
        </View>
      )
    }
    return (
      <View>
        <Text>ProfileDetailsScreen</Text>
        <Text>{JSON.stringify(this.props.facebook)}</Text>
      </View>
    )
  }
}
