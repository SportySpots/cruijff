/* Card component, this is the Card that is used in a list of many Cards */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import Config from 'react-native-config';
import Header from './Header';
import Colors from '../../Themes/Colors';

export default class SpotListCard extends Component {
  static propTypes = {
    spot: PropTypes.object,
    style: PropTypes.number,
  };

  /* forward setNativeProps to the root (View) so that Card can be used as Touchable */
  setNativeProps = (nativeProps) => {
    // eslint-disable-next-line no-underscore-dangle
    this._root.setNativeProps(nativeProps);
  };

  componentWillMount() {
    this.distance = 5;
  }

  getImageUrl = (image) => {
    if (image.startsWith('http')) {
      return image;
    }
    return Config.SEEDORF_HOST + image;
  }

  render() {
    const spot = this.props.spot;

    const image =
      spot.images.length > 0
        ? this.getImageUrl(spot.images[0].image)
        : 'https://raw.githubusercontent.com/SportySpots/cruijff/graphql/App/Images/spot-placeholder.png';

    return (
      <OuterContainer>
        <InnerContainer>
          <Img source={{ uri: image }} />
          <StyledHeader spot={spot} />
        </InnerContainer>
      </OuterContainer>
    );
  }
}

const OuterContainer = styled.View`
  display: flex;
  height: 240px;
  border-radius: 8px;
  shadow-offset: 1px 1px;
  shadow-color: ${Colors.shade};
  shadow-opacity: 0.8;
  margin-horizontal: 4px;
  margin-vertical: 4px;
  elevation: 2;
`;

const InnerContainer = styled.View`
  display: flex;
  height: 240px;
  border-radius: 8px;
  overflow: hidden;
`;

const Img = styled.Image`
  flex: 3;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const StyledHeader = styled(Header)`
  flex: 1;
  flex-direction: column;
  background-color: ${Colors.white};
  padding: 16px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;
