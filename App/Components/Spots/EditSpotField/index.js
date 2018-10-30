import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import getInputPalette from '../../../Themes/Palettes';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
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
// TODO: refactor SpotListCardSmallBody and pass theme
const EditSpotField = ({
  spot,
  theme,
  disabled,
  onPress,
}) => {
  const Root = disabled ? View : TouchableOpacity;
  const { iconColor, disabledColor } = getInputPalette(theme);

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
          color={disabled ? disabledColor : iconColor}
        />
      </Row>
    </Root>
  );
}

EditSpotField.propTypes = {
  spot: propType(spotFragment).isRequired,
  theme: PropTypes.oneOf(['black']), // ATM only black theme
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

EditSpotField.defaultProps = {
  theme: 'black',
  disabled: false,
  onPress: () => {},
};

export default EditSpotField;
