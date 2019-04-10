import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../../I18n';
import Text from '../../Text';
import Block from '../../Block';
import CapacityPicker from '../../CapacityPicker';
import CancelConfirmModal from '../CancelConfirmModal';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const MAX_CAPACITY = 1000;
const MIN_CAPACITY = 2;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class CapacityPickerModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value ? parseInt(props.value, 10) : MIN_CAPACITY,
    };
  }

  handleBtnPress = (value) => {
    this.setState({ value });
  }

  increase = () => {
    this.setState(prevState => (
      { value: prevState.value < MAX_CAPACITY ? prevState.value + 1 : MAX_CAPACITY }
    ));
  }

  decrease = () => {
    this.setState(prevState => (
      { value: prevState.value > MIN_CAPACITY ? prevState.value - 1 : MIN_CAPACITY }
    ));
  }

  render() {
    const { visible, onSelect, onClose } = this.props;
    const { value } = this.state;

    const header = (
      <Text size="ML">
        {I18n.t('capacityPickerModal.header')}
      </Text>
    );

    return (
      <CancelConfirmModal
        visible={visible}
        onClose={onClose}
        header={header}
        okBtnLabel={I18n.t('capacityPickerModal.footer.okBtnLabel')}
        cancelBtnLabel={I18n.t('capacityPickerModal.footer.cancelBtnLabel')}
        onOk={() => { onSelect(value); }}
        onCancel={onClose}
      >
        <Block>
          <CapacityPicker
            value={value}
            onBtnPress={this.handleBtnPress}
            onIncrease={this.increase}
            onDecrease={this.decrease}
          />
        </Block>
      </CancelConfirmModal>
    );
  }
}

CapacityPickerModal.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  visible: PropTypes.bool,
  onSelect: PropTypes.func,
  onClose: PropTypes.func,
};

CapacityPickerModal.defaultProps = {
  value: MIN_CAPACITY,
  visible: false,
  onSelect: () => {},
  onClose: () => {},
};

export default CapacityPickerModal;
