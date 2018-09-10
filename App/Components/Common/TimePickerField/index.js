import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TimePickerModal from 'react-native-modal-datetime-picker';
import I18n from '../../../I18n/index';
import ModalProps from '../../../RenderProps/modal-props';
import InputField from '../InputField';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const TimePickerField = ({ value, onChange, ...rest }) => (
  <ModalProps>
    {({ visible, openModal, closeModal }) => [
      <InputField
        key="field"
        value={value ? moment(value).format('HH:mm') : I18n.t('Select')}
        onPress={openModal}
        {...rest}
      />,
      <TimePickerModal
        key="modal"
        mode="time"
        isVisible={visible}
        date={value || new Date()}
        onConfirm={(time) => {
          onChange(time);
          closeModal();
        }}
        onCancel={closeModal}
      />,
    ]}
  </ModalProps>
);

TimePickerField.propTypes = {
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  // Plus all InputField props (theme, size)
};

TimePickerField.defaultProps = {
  value: '',
  onChange: () => {},
};

export default TimePickerField;
