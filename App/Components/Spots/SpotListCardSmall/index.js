import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
// import Rating from '../../Common/Rating';
import Text from '../../Common/Text';
import Row from '../../Common/Row';
import Block from '../../Common/Block';
// import DotSpacer from '../../Common/DotSpacer';
import SpotImage from '../SpotImage';

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
  shadow-offset: 1px 1px;
  shadow-color: ${Colors.shade};
  shadow-opacity: 0.8;
  elevation: 2;
  border: ${({ active }) => (!active ? 1 : 1.5)}px solid ${({ active }) => (!active ? Colors.shade : Colors.primaryGreen)};
  overflow: hidden;
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
  height: SIZE,
  width: SIZE,
  backgroundColor: Colors.darkGreen,
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SpotListCardSmall extends React.PureComponent {
  // Forward setNativeProps to the root (View) so that Card can be used as Touchable
  setNativeProps = (nativeProps) => {
    // eslint-disable-next-line no-underscore-dangle
    this._root.setNativeProps(nativeProps);
  }

  render() {
    const { spot, active } = this.props;

    const sports = spot.sports.map(({ category }) => (
      I18n.t(category)
    )).join(', ');

    return (
      <Container active={active}>
        <Row>
          <FlexGrow>
            <Block>
              <Flex>
                <Text.ML>{spot.name}</Text.ML>
                <Text.M>{sports}</Text.M>
                {/*
                  <Spacer orientation="column" size="M" />
                  <Row>
                    <Rating rating={spot.rating || 4} />
                    <DotSpacer />
                    <Text.S>{distance.toFixed(1)} km</Text.S>
                  </Row>
                */}
              </Flex>
            </Block>
          </FlexGrow>
          <SpotImage images={spot.images} style={imgStyle} />
        </Row>
      </Container>
    );
  }
}

SpotListCardSmall.propTypes = {
  spot: propType(spotFragment).isRequired,
  active: PropTypes.bool,
};

SpotListCardSmall.defaultProps = {
  active: false,
};

export default SpotListCardSmall;
