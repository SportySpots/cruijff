import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import Colors from '../../../Themes/Colors';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import SpotListCardSmallBody from '../SpotListCardSmallBody';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const SIZE = 80;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const StyledTouchableOpacity = styled.TouchableOpacity`
  height: ${SIZE}px;
  background-color: ${Colors.white};
`;
//------------------------------------------------------------------------------
const FlexGrow = styled.View`
  flex-grow: 1; /* take all remaining width */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const EditSpotField = ({ spot, onPress }) => (
  <StyledTouchableOpacity onPress={onPress}>
    <Row alignItems="center">
      <FlexGrow>
        <SpotListCardSmallBody spot={spot} />
      </FlexGrow>
      <Spacer orientation="row" size="M" />
      <Icon
        size={24}
        name="keyboard-arrow-right"
        color={Colors.black}
      />
    </Row>
  </StyledTouchableOpacity>
);

EditSpotField.propTypes = {
  spot: propType(spotFragment).isRequired,
  onPress: PropTypes.func,
};

EditSpotField.defaultProps = {
  onPress: () => {},
};

export default EditSpotField;
