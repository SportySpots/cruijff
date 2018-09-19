import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import I18n from '../../../../I18n';
import Colors from '../../../../Themes/Colors';
import Text from '../../Text';
import Row from '../../Row';
import Calendar from '../../Calendar';
import CancelConfirmModal from '../CancelConfirmModal';
import toTitleCase from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const SelectedDate = styled(Text.M)`
  color: ${Colors.primaryGreen};
`;
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
        <Text.ML>{I18n.t('Select a date')}</Text.ML>
        <SelectedDate>
          {value && toTitleCase(moment(value).format('ddd, MMM D').replace(/\./g, ''))}
        </SelectedDate>
      </Row>
    );

    return (
      <CancelConfirmModal
        visible={visible}
        onClose={onClose}
        header={header}
        okBtnLabel={I18n.t('Ok')}
        cancelBtnLabel={I18n.t('Cancel')}
        onOk={() => { onSelect(value.dateString); }}
        onCancel={onClose}
      >
        <Calendar
          current={(new Date()).toISOString().slice(0, 10)}
          minDate={(new Date()).toISOString().slice(0, 10)}
          // onDayPress={(day) => { onSelect(day.dateString); }}
          onDayPress={this.handleDayPress}
        />
      </CancelConfirmModal>
    );
  }
}

DatePickerModal.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.number,
  ]),
  visible: PropTypes.bool,
  onSelect: PropTypes.func,
  onClose: PropTypes.func,
};

DatePickerModal.defaultProps = {
  value: new Date(),
  visible: false,
  onSelect: () => {},
  onClose: () => {},
};

export default DatePickerModal;