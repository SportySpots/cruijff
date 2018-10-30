import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import Colors from '../../../Themes/Colors';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import SpotListCardSmallBody from '../SpotListCardSmallBody';

//------------------------------------------------------------------------------
const FlexGrow = styled.View`
  flex-grow: 1; /* take all remaining width */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const EditSpotField = ({ spot, disabled, onPress }) => {
  const Root = disabled ? View : TouchableOpacity;

  return (
    <Root onPress={onPress}>
      <Row alignItems="center">
        <FlexGrow>
          <SpotListCardSmallBody spot={spot} />
        </FlexGrow>
        <Spacer row size="M" />
        <Icon
          size={24}
          name="keyboard-arrow-right"
          color={Colors.black}
        />
      </Row>
    </Root>
  );
}

EditSpotField.propTypes = {
  spot: propType(spotFragment).isRequired,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

EditSpotField.defaultProps = {
  disabled: false,
  onPress: () => {},
};

export default EditSpotField;
