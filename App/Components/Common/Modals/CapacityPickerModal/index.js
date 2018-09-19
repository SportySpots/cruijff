import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import I18n from '../../../../I18n';
import Text from '../../Text';
import Block from '../../Block';
import Spacer from '../../Spacer';
import CapacityPicker from '../../CapacityPicker';
import CancelConfirmModal from '../CancelConfirmModal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class CapacityPickerModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || 0,
    };
  }

  handleBtnPress = (value) => {
    this.setState({ value });
  }

  increase = () => {
    this.setState(prevState => (
      { value: prevState.value + 1 }
    ));
  }

  decrease = () => {
    this.setState(prevState => (
      { value: prevState.value > 0 ? prevState.value - 1 : 0 }
    ));
  }

  render() {
    const { visible, onSelect, onClose } = this.props;
    const { value } = this.state;

    const header = (
      <Text.ML>{I18n.t('Choose amount players')}</Text.ML>
    );

    return (
      <CancelConfirmModal
        visible={visible}
        onClose={onClose}
        header={header}
        okBtnLabel={I18n.t('Ok')}
        cancelBtnLabel={I18n.t('Cancel')}
        onOk={() => { onSelect(value); }}
        onCancel={onClose}
      >
        <CapacityPicker
          value={value}
          onBtnPress={this.handleBtnPress}
          onIncrease={this.increase}
          onDecrease={this.decrease}
        />
      </CancelConfirmModal>
    );
  }
}

CapacityPickerModal.propTypes = {
  value: PropTypes.number,
  visible: PropTypes.bool,
  onSelect: PropTypes.func,
  onClose: PropTypes.func,
};

CapacityPickerModal.defaultProps = {
  value: 0,
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