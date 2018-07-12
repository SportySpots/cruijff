import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';
import styled from 'styled-components';
import Text from '../../../../Components/Text';
import I18n from '../../../../I18n/index';
import Colors from '../../../../Themes/Colors';
import SportsList from './SportsList';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Outer = styled.View`
  flex: 1;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
`;
//------------------------------------------------------------------------------
const Inner = styled.View`
  flex: 1;
  background-color: ${Colors.white};
  margin: 36px;
  padding: 8px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SportsModal = ({ sports, visible, onSelect }) => (
  <Modal
    visible={visible}
    animationType="fade"
    onRequestClose={() => onSelect(null)}
    transparent
  >
    <Outer>
      <Inner>
        <Text.L>{I18n.t('Choose sport')}</Text.L>
        <SportsList
          sports={sports}
          onSelect={onSelect}
        />
      </Inner>
    </Outer>
  </Modal>
);

SportsModal.propTypes = {
  sports: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }).isRequired,
  ),
  visible: PropTypes.bool,
  onSelect: PropTypes.func,
};

SportsModal.defaultProps = {
  sports: [],
  visible: false,
  onSelect: () => {},
};

export default SportsModal;
