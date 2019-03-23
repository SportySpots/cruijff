import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import I18n from '../../../../I18n';
import Text from '../../Text';
import Row from '../../Row';
import Block from '../../Block';
import Calendar from '../../Calendar';
import CancelConfirmModal from '../CancelConfirmModal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class DatePickerModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || null,
    };
  }

  handleDayPress = (day) => {
    this.setState({ value: day });
  }

  render() {
    const { visible, onSelect, onClose } = this.props;
    const { value } = this.state;

    const header = (
      <Row alignItems="center" justifyContent="space-between">
        <Text size="ML">
          {I18n.t('datePickerModal.header')}
        </Text>
        {value && (
          <Text size="M" color="primaryGreen">
            {value.clone()
              .local()
              .format('ddd, MMM D')
              .replace(/\./g, '')
              .toTitleCase()
            }
          </Text>
        )}
      </Row>
    );

    return (
      <CancelConfirmModal
        visible={visible}
        onClose={onClose}
        header={header}
        okBtnLabel={I18n.t('datePickerModal.footer.okBtnLabel')}
        cancelBtnLabel={I18n.t('datePickerModal.footer.cancelBtnLabel')}
        onOk={() => { onSelect(value); }}
        onCancel={onClose}
      >
        <Block>
          <Calendar
            value={value}
            onDayPress={this.handleDayPress}
          />
        </Block>
      </CancelConfirmModal>
    );
  }
}

DatePickerModal.propTypes = {
  value: PropTypes.instanceOf(moment),
  visible: PropTypes.bool,
  onSelect: PropTypes.func,
  onClose: PropTypes.func,
};

DatePickerModal.defaultProps = {
  value: null,
  visible: false,
  onSelect: () => {},
  onClose: () => {},
};

export default DatePickerModal;
