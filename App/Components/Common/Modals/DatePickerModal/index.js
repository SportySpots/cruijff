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
const DatePickerModal = ({
  value,
  visible,
  onSelect,
  onClose,
}) => {
  const header = (
    <Row
      alignItems="center"
      justifyContent="space-between"
    >
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
      onOk={() => { onSelect(value); }}
      onCancel={onClose}
    >
      <Calendar
        current={(new Date()).toISOString().slice(0, 10)}
        minDate={(new Date()).toISOString().slice(0, 10)}
        onDayPress={(day) => { onSelect(day.dateString); }}
      />
    </CancelConfirmModal>
  );
};

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


/*
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import I18n from '../../../../I18n';
import Colors from '../../../../Themes/Colors';
import Text from '../../Text';
import Block from '../../Block';
import Row from '../../Row';
import Spacer from '../../Spacer';
import Calendar from '../../Calendar';
import Modal from '../Modal';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const SelectedDate = styled(Text.M)`
  color: ${Colors.primaryGreen};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DatePickerModal = ({
  value,
  visible,
  onSelect,
  onClose,
}) => (
  <Modal visible={visible} onClose={onClose}>
    <Block>
      <Row
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Text.ML>{I18n.t('Select a date')}</Text.ML>
        <SelectedDate>
          {value && moment(value).format('ddd, MMM D')}
        </SelectedDate>
      </Row>
    </Block>
    <Spacer orientation="column" size="L" />
    <Calendar
      current={(new Date()).toISOString().slice(0, 10)}
      minDate={(new Date()).toISOString().slice(0, 10)}
      onDayPress={(day) => { onSelect(day.dateString); }}
    />
  </Modal>
);

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

*/