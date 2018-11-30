import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import getInputPalette from '../../../Themes/Palettes';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import sportFragment from '../../../GraphQL/Sports/Fragments/sport';
import ModalProps from '../../../RenderProps/modal-props';
import Row from '../Row';
import Spacer from '../Spacer';
import SpotHeader from '../../Spots/SpotHeader';
import SpotPickerModal from '../Modals/SpotPickerModal';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexGrow = styled.View`
  flex-grow: 1; /* take all remaining width */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotPickerField = ({
  value,
  sport,
  onChange,
  theme,
  disabled,
}) => {
  const Root = disabled ? View : TouchableOpacity;
  const { iconColor, disabledColor } = getInputPalette(theme);

  return (
    <ModalProps>
      {({ visible, openModal, closeModal }) => [
        <Root key="field" onPress={openModal}>
          <Row alignItems="center">
            <FlexGrow>
              <SpotHeader
                spot={value}
                gray={disabled}
                withDistance
              />
            </FlexGrow>
            <Spacer row size="M" />
            <Icon
              size={24}
              name="keyboard-arrow-down"
              color={disabled ? disabledColor : iconColor}
            />
          </Row>
        </Root>,
        <SpotPickerModal
          key="modal"
          value={value}
          sport={sport}
          visible={visible}
          onSelect={(spot) => {
            // Pass event up to parent component
            onChange(spot);
            closeModal();
          }}
          onClose={closeModal}
        />,
      ]}
    </ModalProps>

  );
};

SpotPickerField.propTypes = {
  value: propType(spotFragment).isRequired,
  sport: propType(sportFragment).isRequired,
  theme: PropTypes.oneOf(['black']), // ATM only black theme
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

SpotPickerField.defaultProps = {
  theme: 'black',
  disabled: false,
  onChange: () => {},
};

export default SpotPickerField;
