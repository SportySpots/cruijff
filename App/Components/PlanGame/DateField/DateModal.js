import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import I18n from '../../../I18n/index';
import Text from '../../../Components/Text';
import { ModalOuter, ModalInner } from '../style';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DateModal = ({ visible, onSelect }) => (
  <Modal
    visible={visible}
    animationType="fade"
    onRequestClose={() => { onSelect(null); }}
    transparent
  >
    <ModalOuter>
      <ModalInner>
        <Text.L>{I18n.t('Select a date')}</Text.L>
        <Calendar
          current={new Date().toISOString().slice(0, 10)}
          minDate={new Date().toISOString().slice(0, 10)}
          onDayPress={(day) => { onSelect(day.dateString); }}
        />
      </ModalInner>
    </ModalOuter>
  </Modal>
);

DateModal.propTypes = {
  visible: PropTypes.bool,
  onSelect: PropTypes.func,
};

DateModal.defaultProps = {
  visible: false,
  onSelect: () => {},
};

export default DateModal;
