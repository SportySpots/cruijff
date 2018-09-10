import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../../I18n';
import Text from '../../Text';
import Block from '../../Block';
import Divider from '../../Divider';
import SportsList from '../../SportsList';
import Modal from '../Modal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SportPickerModal = ({
  visible,
  onSelect,
  onClose,
}) => (
  <Modal visible={visible} onClose={onClose}>
    <Block>
      <Text.ML>{I18n.t('Choose sport')}</Text.ML>
    </Block>
    <Divider />
    <SportsList onSelect={onSelect} />
  </Modal>
);

SportPickerModal.propTypes = {
  visible: PropTypes.bool,
  onSelect: PropTypes.func,
  onClose: PropTypes.func,
};

SportPickerModal.defaultProps = {
  visible: false,
  onSelect: () => {},
  onClose: () => {},
};

export default SportPickerModal;
