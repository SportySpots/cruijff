import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../../I18n';
import Text from '../../Text';
import SportsList from '../../SportsList';
import CancelConfirmModal from '../CancelConfirmModal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SportPickerModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || null,
    };
  }

  handleSportPress = (sport) => {
    this.setState({ value: sport });
  }

  render() {
    const { visible, onSelect, onClose } = this.props;
    const { value } = this.state;

    const header = (
      <Text.ML>{I18n.t('Choose sport')}</Text.ML>
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
        <SportsList
          selectedSport={value}
          onSportPress={this.handleSportPress}
        />
      </CancelConfirmModal>
    );
  }
}

SportPickerModal.propTypes = {
  value: PropTypes.string,
  visible: PropTypes.bool,
  onSelect: PropTypes.func,
  onClose: PropTypes.func,
};

SportPickerModal.defaultProps = {
  value: '',
  visible: false,
  onSelect: () => {},
  onClose: () => {},
};

export default SportPickerModal;


/*
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

*/