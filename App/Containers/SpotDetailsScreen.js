import React, { Component } from 'react'
import { Image, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Badge } from 'native-base'

import Fonts from '../Themes/Fonts'
import styles from './Styles/SpotDetailsScreenStyles'
import Colors from '../Themes/Colors'

import Api from '../Services/FixtureApi'

export default class SpotDetailsScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      spot: null,
      isLoading: true
    }
  }

  componentDidMount () {
    const { data } = Api.getSpot(this.props.navigation.state.params.spotId)
    this.setState({ isLoading: false, spot: data })
  }

  render () {
    const { navigate } = this.props.navigation
    const { isLoading, spot } = this.state

    if (isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <ScrollView>
        <Image
          source={{
            uri: spot.image
              ? spot.image
              : 'https://img.aws.livestrongcdn.com/ls-article-image-673/ds-photo/getty/article/108/170/480138677.jpg'
          }}
          style={{
            height: 200,
            width: null,
            flex: -1,
            backgroundColor: 'red'
          }}
          resizeMode='cover'
        />
        <View style={styles.section}>
          <Text style={Fonts.style.h4}>{spot.label}</Text>
          <Text style={Fonts.style.normal}>Spot Address</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.rating}>
              <Icon
                name='star'
                color={Colors.secondaryGreen}
                size={Fonts.size.regular}
              />
              <Icon
                name='star'
                color={Colors.secondaryGreen}
                size={Fonts.size.regular}
              />
              <Icon
                name='star'
                color={Colors.secondaryGreen}
                size={Fonts.size.regular}
              />
              <Icon
                name='star'
                color={Colors.secondaryGreen}
                size={Fonts.size.regular}
              />
              <Icon
                name='star'
                color={Colors.secondaryGreen}
                size={Fonts.size.regular}
              />
            </View>
            <View style={styles.col}>
              <Text>{spot.sport.toLowerCase()}</Text>
            </View>
            <View style={styles.col}>
              <Text>5 Games</Text>
            </View>
          </View>
          {spot.attributes.map(attribute => {
            return (
              <View key={attribute.attribute_name} style={styles.section}>
                <View style={styles.row}>
                  <Text style={Fonts.style.normal}>
                    {attribute.attribute_name}:{' '}
                  </Text>
                  <Badge success>
                    <Text>{attribute.value}</Text>
                  </Badge>
                </View>
              </View>
            )
          })}
        </View>
      </ScrollView>
    )
  }
}
