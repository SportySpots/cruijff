import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../../I18n';
import Text from '../../Text';
import Block from '../../Block';
import Divider from '../../Divider';
import CapacityPicker from '../../CapacityPicker';
import Modal from '../Modal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class CapacityPickerModal extends React.PureComponent {
  state = {
    value: 0,
  }


  render() {
    const { visible, onSelect, onClose } = this.props;

    return (
      <Modal visible={visible} onClose={onClose}>
        <Block>
          <Text.ML>{I18n.t('Choose amount players')}</Text.ML>
        </Block>
        <Divider />
        <CapacityPicker onSelect={onSelect} />
      </Modal>
    );
  }
}

CapacityPickerModal.propTypes = {
  visible: PropTypes.bool,
  onSelect: PropTypes.func,
  onClose: PropTypes.func,
};

CapacityPickerModal.defaultProps = {
  visible: false,
  onSelect: () => {},
  onClose: () => {},
};

export default CapacityPickerModal;

/*
import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../../I18n';
import Text from '../../Text';
import Block from '../../Block';
import Divider from '../../Divider';
import CapacityPicker from '../../CapacityPicker';
import Modal from '../Modal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const CapacityPickerModal = ({
  visible,
  onSelect,
  onClose,
}) => (
  <Modal visible={visible} onClose={onClose}>
    <Block>
      <Text.ML>{I18n.t('Choose amount players')}</Text.ML>
    </Block>
    <Divider />
    <CapacityPicker onSelect={onSelect} />
  </Modal>
);

CapacityPickerModal.propTypes = {
  visible: PropTypes.bool,
  onSelect: PropTypes.func,
  onClose: PropTypes.func,
};

CapacityPickerModal.defaultProps = {
  visible: false,
  onSelect: () => {},
  onClose: () => {},
};

export default CapacityPickerModal;

*/