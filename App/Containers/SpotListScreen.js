import React, { Component } from 'react'
import {
  Image,
  Text,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native'
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

import Api from '../Services/FixtureApi'

// TODO: Implement blank screen if no spots were found

export default class SpotListScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      spots: null,
      isLoading: true
    }
  }

  componentDidMount () {
    const { data } = Api.getAllSpots()
    this.setState({ isLoading: false, spots: data })
  }

  render () {
    const { navigate } = this.props.navigation
    const { isLoading, spots } = this.state

    if (isLoading) {
      return (
        <Container>
          <Content>
            <ActivityIndicator />
          </Content>
        </Container>
      )
    }

    return (
      <Container>
        <Content>
          {spots.map(spot => {
            return (
              <TouchableHighlight
                key={spot.id}
                onPress={() =>
                  navigate('SpotDetailsScreen', { spotId: spot.id })
                }
              >
                <Card style={styles.cardContainer}>
                  <CardItem>
                    <Body>
                      <Text style={Fonts.style.h4}>{spot.label}</Text>
                      <Text note>Spot Address</Text>
                    </Body>
                  </CardItem>
                  <CardItem cardBody>
                    <Image
                      source={{
                        uri: spot.image
                          ? spot.image
                          : 'https://img.aws.livestrongcdn.com/ls-article-image-673/ds-photo/getty/article/108/170/480138677.jpg'
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
                      <Text style={styles.label}>
                        {spot.sport.toLowerCase()}
                      </Text>
                    </Body>
                    <Right style={styles.labelsContainer}>
                      <Text style={styles.label}>
                        {Math.floor(Math.random() * 20)} games
                      </Text>
                    </Right>
                  </CardItem>
                </Card>
              </TouchableHighlight>
            )
          })}
        </Content>
      </Container>
    )
  }
}
