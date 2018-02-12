import React, { Component } from 'react'
import { Image, Text, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  Body,
  Card,
  CardItem,
  Container,
  Content,
  Left,
  Right
} from 'native-base'
import Fonts from '../Themes/Fonts'
import Colors from '../Themes/Colors'

import styles from './Styles/SpotListScreenStyles'
// TODO: Implement blank screen if no spots were found

export default class SpotListScreen extends Component {
  render () {
    const { navigate } = this.props.navigation
    return (
      <Container>
        <Content>
          <TouchableHighlight onPress={() => navigate('SpotDetailsScreen')}>
            <Card style={styles.cardContainer}>
              <CardItem>
                <Body>
                  <Text style={Fonts.style.h4}>Spot Name</Text>
                  <Text note>Spot Address</Text>
                </Body>
              </CardItem>
              <CardItem cardBody>
                <Image
                  source={{
                    uri:
                      'https://img.aws.livestrongcdn.com/ls-article-image-673/ds-photo/getty/article/108/170/480138677.jpg'
                  }}
                  style={{ height: 200, width: null, flex: 1 }}
                />
              </CardItem>
              <CardItem>
                <Left>
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
                </Left>
                <Body style={styles.labelsContainer}>
                  <Text style={styles.label}>Football</Text>
                </Body>
                <Right style={styles.labelsContainer}>
                  <Text style={styles.label}>5 games</Text>
                </Right>
              </CardItem>
            </Card>
          </TouchableHighlight>
        </Content>
      </Container>
    )
  }
}
