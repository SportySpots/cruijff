import React, { Component } from 'react'
import { Text, Image, TouchableHighlight } from 'react-native'
import {
  Container,
  Content,
  Card,
  CardItem,
  Left,
  Icon,
  Body,
  Button,
  Right
} from 'native-base'

import Fonts from '../Themes/Fonts'

// TODO: Implement blank screen if no spots were found

export default class SpotListScreen extends Component {
  render () {
    const { navigate } = this.props.navigation
    return (
      <Container>
        <Content>
          <TouchableHighlight onPress={() => navigate('SpotDetailsScreen')}>
            <Card>
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
                <Text style={Fonts.style.h4}>Spot Name</Text>
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent>
                    <Icon active name='ios-star' />
                    <Icon active name='ios-star' />
                    <Icon active name='ios-star' />
                    <Icon active name='ios-star' />
                    <Icon active name='ios-star-outline' />
                  </Button>
                </Left>
                <Body>
                  <Button transparent>
                    <Text>Football</Text>
                  </Button>
                </Body>
                <Right>
                  <Text>5 Games</Text>
                </Right>
              </CardItem>
            </Card>
          </TouchableHighlight>
        </Content>
      </Container>
    )
  }
}
