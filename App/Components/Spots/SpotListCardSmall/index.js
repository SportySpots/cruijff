import React from 'react';
import { Image, View } from 'react-native';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import Colors from '../../../Themes/Colors';
import Rating from '../../Common/Rating';
import Text from '../../Common/Text';
import Row from '../../Common/Row';
import Block from '../../Common/Block';
import DotSpacer from '../../Common/DotSpacer';
import SpotImage from '../SpotImage';
import toTitleCase from './utils';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const SIZE = 80;
const BORDER_RADIUS = 2;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  height: ${SIZE}px;
  flex: 1; /* full width */
  background-color: ${Colors.white};
  border-radius: ${BORDER_RADIUS};
`;
//------------------------------------------------------------------------------
const FlexGrow = styled.View`
  flex-grow: 1; /* take all remaining width */
`;
//------------------------------------------------------------------------------
const Flex = styled.View`
  display: flex;
  justify-content: space-between;
`;
//------------------------------------------------------------------------------
const imgStyle = {
  height: 80,
  width: 80,
  borderTopRightRadius: BORDER_RADIUS,
  borderBottomRightRadius: BORDER_RADIUS,
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotListCardSmall = ({ spot }) => {
  const sports = spot.sports.map(({ category }) => (
    toTitleCase(category.replace('_', ' '))
  )).join(' ');

  return (
    <Container>
      <Row>
        <FlexGrow>
          <Block>
            <Flex>
              <Text.ML>{spot.name}</Text.ML>
              <Text.M>{sports}</Text.M>
              {/* <View style={{ flexDirection: 'row', paddingTop: 8 }}>
                  <Rating rating={spot.rating || 4} />
                  <DotSpacer />
                  <Text.S>{distance.toFixed(1)} km</Text.S>
                </View>
              */}
            </Flex>
          </Block>
        </FlexGrow>
        <SpotImage spot={spot} style={imgStyle} />
      </Row>
    </Container>
  );
}

SpotListCardSmall.propTypes = {
  spot: propType(spotFragment).isRequired,
};

export default SpotListCardSmall;

/*
import React from 'react';
import { Image, View } from 'react-native';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import Rating from '../../Common/Rating';
import Text from '../../Common/Text';
import Row from '../../Common/Row';
import DotSpacer from '../../Common/DotSpacer';
import { cardSmall } from '../Styles/CardStyles';
import getImageUrl from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  height: 80px;
  flex: 1; /* full width /
  `;
  //------------------------------------------------------------------------------
  // COMPONENT:
  //------------------------------------------------------------------------------
  const SpotListCardSmall = ({ spot }) => {
    let image = 'https://via.placeholder.com/350x150';
    if (spot.images.length > 0) {
      image = getImageUrl(spot.images[0].image);
    }
  
    return (
      <Container>
        <Row>
          <Text.M>{spot.name}</Text.M>
          {/* <View style={{ flexDirection: 'row', paddingTop: 8 }}>
              <Rating rating={spot.rating || 4} />
              <DotSpacer />
              <Text.S>{distance.toFixed(1)} km</Text.S>
            </View>
          //}
          <Image style={cardSmall.image} source={{ uri: image }} />
        </Row>
      </Container>
    );
  };
  
  SpotListCardSmall.propTypes = {
    spot: propType(spotFragment).isRequired,
  };
  
  export default SpotListCardSmall;
*/

/*
/* Card component, this is the Card that is used in a list of many Cards /
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Config from 'react-native-config/index';
import { Image, View } from 'react-native';
import Rating from '../../Common/Rating';
import Text from '../../Common/Text';
import { cardSmall } from '../Styles/CardStyles';

const Spacer = () => <Text style={{ marginLeft: 8, marginRight: 8 }}>·</Text>;

const distance = 1.3;

export default class SpotListCardSmall extends Component {
  static propTypes = {
    spot: PropTypes.object,
    style: PropTypes.number,
  };

  /* forward setNativeProps to the root (View) so that Card can be used as Touchable //
  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  };

  componentWillMount() {
    this.distance = 5;
  }

  static getImageUrl = (image) => {
    if (image.startsWith('http')) {
      return image;
    }
    return Config.SEEDORF_HOST + image;
  }

  render() {
    const spot = this.props.spot;
    let image = 'https://via.placeholder.com/350x150';
    if (spot.images.length > 0) {
      image = SpotListCardSmall.getImageUrl(spot.images[0].image);
    }

    return (
      <View style={[cardSmall.container, this.props.style]}>
        <View style={cardSmall.details}>
          <Text.M>{spot.name}</Text.M>
          { false &&
            <View style={{ flexDirection: 'row', paddingTop: 8 }}>
              <Rating rating={spot.rating || 4} />
              <Spacer />
              <Text.S>{distance.toFixed(1)} km</Text.S>
            </View>
          }
        </View>
        <Image style={cardSmall.image} source={{ uri: image }} />
      </View>
    );
  }
}
*/