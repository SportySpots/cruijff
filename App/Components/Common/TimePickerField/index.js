import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TimePickerModal from 'react-native-modal-datetime-picker';
import I18n from '../../../I18n';
import ModalProps from '../../../RenderProps/modal-props';
import InputField from '../InputField';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// in/output are UTC moments
const TimePickerField = ({ value, onChange, ...rest }) => (
  <ModalProps>
    {({ visible, openModal, closeModal }) => [
      <InputField
        key="input-field"
        comp="TextField"
        value={value ? value.clone().local().format('HH:mm') : I18n.t('timePickerField.defaultValue')}
        focusable={false}
        onPress={openModal}
        {...rest}
      />,
      <TimePickerModal
        key="modal"
        mode="time"
        date={value ? value.clone().local().toDate() : new Date()}
        isVisible={visible}
        onConfirm={(date) => {
          // Pass event up to parent component
          onChange(moment(date).utc());
          closeModal();
        }}
        onCancel={closeModal}
      />,
    ]}
  </ModalProps>
);

TimePickerField.propTypes = {
  value: PropTypes.instanceOf(moment),
  onChange: PropTypes.func,
  // Plus all InputField props (theme, size)
};

TimePickerField.defaultProps = {
  value: moment.utc(),
  onChange: () => {},
};

export default TimePickerField;
