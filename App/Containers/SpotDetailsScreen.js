import React, { Component } from 'react'
import { Image, Text, View, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Badge } from 'native-base'

import Fonts from '../Themes/Fonts'
import styles from './Styles/SpotDetailsScreenStyles'
import Colors from '../Themes/Colors'

export default class SpotDetailsScreen extends Component {
  render () {
    const { navigate } = this.props.navigation
    const imgList = [
      'https://maps.amsterdam.nl/sport/Downloads/Botteskerksingel_2.jpg',
      'https://maps.amsterdam.nl/sport/Downloads/Steelvlietstraat_1.jpg',
      'https://maps.amsterdam.nl/sport/Downloads/Veldzicht.jpg'
    ]
    return (
      <ScrollView>
        <Image
          source={{
            uri:
              'https://img.aws.livestrongcdn.com/ls-article-image-673/ds-photo/getty/article/108/170/480138677.jpg'
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
          <Text style={Fonts.style.h4}>Spot Name</Text>
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
              <Text>Football</Text>
            </View>
            <View style={styles.col}>
              <Text>5 Games</Text>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.row}>
              <Text style={Fonts.style.normal}>Ground: </Text>
              <Badge success>
                <Text>Grass</Text>
              </Badge>
              <Text style={Fonts.style.normal}>Fencing: No Fence</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      // <Container>
      //   <Content>
      //     <Card style={styles.cardContainer}>
      //       <CardItem>
      //         <Body>
      //           <Text style={Fonts.style.h4}>Spot Name</Text>
      //           <Text note>Spot Address</Text>
      //         </Body>
      //       </CardItem>
      //       <CardItem cardBody>
      //         <Image
      //           source={{
      //             uri:
      //               'https://img.aws.livestrongcdn.com/ls-article-image-673/ds-photo/getty/article/108/170/480138677.jpg'
      //           }}
      //           style={{ height: 200, width: null, flex: 1 }}
      //         />
      //       </CardItem>
      //       <CardItem>
      //         <Left>
      //           <Icon
      //             name='star'
      //             color={Colors.secondaryGreen}
      //             size={Fonts.size.regular}
      //           />
      //           <Icon
      //             name='star'
      //             color={Colors.secondaryGreen}
      //             size={Fonts.size.regular}
      //           />
      //           <Icon
      //             name='star'
      //             color={Colors.secondaryGreen}
      //             size={Fonts.size.regular}
      //           />
      //           <Icon
      //             name='star'
      //             color={Colors.secondaryGreen}
      //             size={Fonts.size.regular}
      //           />
      //           <Icon
      //             name='star'
      //             color={Colors.secondaryGreen}
      //             size={Fonts.size.regular}
      //           />
      //         </Left>
      //         <Body style={styles.labelsContainer}>
      //           <Text style={styles.label}>Football</Text>
      //         </Body>
      //         <Right style={styles.labelsContainer}>
      //           <Text style={styles.label}>5 games</Text>
      //         </Right>
      //       </CardItem>
      //       <CardItem>
      //         <View style={styles.spotPropertiesContainer}>
      //           <View style={styles.spotProperty}>
      //             <Text style={Fonts.size.h3}>Ground: Grass</Text>
      //           </View>
      //           <View style={styles.spotProperty}>
      //             <Text style={Fonts.size.h3}>Fencing: No Fence</Text>
      //           </View>
      //         </View>
      //         <View style={styles.spotPropertiesContainer}>
      //           <View style={styles.spotProperty}>
      //             <Text style={Fonts.size.h3}>Area: 75 sq.m</Text>
      //           </View>
      //           <View style={styles.spotProperty}>
      //             <Text style={Fonts.size.h3}>Lights: No</Text>
      //           </View>
      //         </View>
      //       </CardItem>
      //     </Card>
      //   </Content>
      // </Container>
    )
  }
}
